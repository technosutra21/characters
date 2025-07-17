import re
import os
from typing import List, Dict, Any
from pathlib import Path
import logging

logger = logging.getLogger(__name__)

class CharacterParser:
    def __init__(self, data_directory: str = "data/characters"):
        self.data_directory = Path(data_directory)
        self.section_patterns = [
            r'^[A-ZÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿĀĀĂĄĆČĎĐĒĔĖĘĚĜĞĠĢĤĦĪĬĮİĲĴĶĹĻĽĿŁŃŅŇŊŌŎŐŒŔŖŘŚŜŞŠŢŤŦŪŬŮŰŲŴŶŸŹŻŽ\s]+$',  # All caps line
            r'^[A-ZÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿĀĀĂĄĆČĎĐĒĔĖĘĚĜĞĠĢĤĦĪĬĮİĲĴĶĹĻĽĿŁŃŅŇŊŌŎŐŒŔŖŘŚŜŞŠŢŤŦŪŬŮŰŲŴŶŸŹŻŽ\s].*[A-ZÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿĀĀĂĄĆČĎĐĒĔĖĘĚĜĞĠĢĤĦĪĬĮİĲĴĶĹĻĽĿŁŃŅŇŊŌŎŐŒŔŖŘŚŜŞŠŢŤŦŪŬŮŰŲŴŶŸŹŻŽ]$',  # Mostly caps
        ]
        
        # Decorative line patterns
        self.decorative_patterns = [
            r'^={3,}',  # ===
            r'^-{3,}',  # ---
            r'^_{3,}',  # ___
            r'^#{3,}',  # ###
            r'^\*{3,}', # ***
        ]

    def is_section_header(self, line: str) -> bool:
        """Check if a line is a section header"""
        line = line.strip()
        if not line:
            return False
            
        # Check for decorative patterns
        for pattern in self.decorative_patterns:
            if re.match(pattern, line):
                return False
                
        # Check for section patterns
        for pattern in self.section_patterns:
            if re.match(pattern, line, re.IGNORECASE):
                return True
                
        return False

    def is_decorative_line(self, line: str) -> bool:
        """Check if a line is decorative (separators)"""
        line = line.strip()
        for pattern in self.decorative_patterns:
            if re.match(pattern, line):
                return True
        return False

    def extract_character_name(self, content: str) -> str:
        """Extract character name from content"""
        lines = content.split('\n')
        
        for line in lines:
            line = line.strip()
            
            # Look for "NOME DO PERSONAGEM:" pattern
            if "NOME DO PERSONAGEM:" in line.upper():
                name_part = line.split(":", 1)
                if len(name_part) > 1:
                    return name_part[1].strip()
            
            # Look for "PERFIL DE PERSONAGEM -" pattern
            if "PERFIL DE PERSONAGEM -" in line.upper():
                name_part = line.split("-", 1)
                if len(name_part) > 1:
                    return name_part[1].strip()
        
        return "Nome não encontrado"

    def parse_content_into_sections(self, content: str) -> List[Dict[str, Any]]:
        """Parse content into sections intelligently"""
        lines = content.split('\n')
        sections = []
        current_section = None
        current_items = []
        
        for i, line in enumerate(lines):
            line = line.strip()
            
            # Skip empty lines and decorative lines
            if not line or self.is_decorative_line(line):
                continue
            
            # Check if it's a section header
            if self.is_section_header(line):
                # Save previous section if exists
                if current_section and current_items:
                    sections.append({
                        "title": current_section,
                        "content": current_items
                    })
                
                # Start new section
                current_section = line
                current_items = []
                continue
            
            # Process content within section
            if current_section:
                # Check if line contains a colon (key-value pair)
                if ':' in line and not line.startswith('-') and not line.startswith('*'):
                    parts = line.split(':', 1)
                    if len(parts) == 2:
                        key = parts[0].strip()
                        value = parts[1].strip()
                        if key and value:
                            current_items.append({
                                "subtitle": key,
                                "text": value
                            })
                            continue
                
                # Check if it's a numbered or bulleted list item
                if re.match(r'^[\d\-\*]\s*\.?\s*', line):
                    # Remove bullet/number and clean up
                    cleaned_line = re.sub(r'^[\d\-\*]\s*\.?\s*', '', line).strip()
                    if cleaned_line:
                        current_items.append({
                            "text": cleaned_line
                        })
                    continue
                
                # Check if it's a sub-item with dash
                if line.startswith('-') or line.startswith('*'):
                    cleaned_line = line[1:].strip()
                    if cleaned_line:
                        current_items.append({
                            "text": cleaned_line
                        })
                    continue
                
                # Regular paragraph
                if line and len(line) > 10:  # Ignore very short lines
                    current_items.append({
                        "text": line
                    })
        
        # Don't forget the last section
        if current_section and current_items:
            sections.append({
                "title": current_section,
                "content": current_items
            })
        
        return sections

    def parse_character_file(self, file_path: Path) -> Dict[str, Any]:
        """Parse a single character file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            character_name = self.extract_character_name(content)
            sections = self.parse_content_into_sections(content)
            
            # Extract basic info from first section if available
            title = "Personagem"
            if sections and sections[0]["title"].upper() in ["INFORMAÇÕES BÁSICAS", "INFORMACOES BASICAS"]:
                for item in sections[0]["content"]:
                    if item.get("subtitle", "").lower() == "tipo":
                        title = item["text"]
                        break
            
            return {
                "id": file_path.stem,
                "name": character_name,
                "title": title,
                "sections": sections,
                "file_path": str(file_path)
            }
            
        except Exception as e:
            logger.error(f"Error parsing file {file_path}: {str(e)}")
            return None

    def get_all_characters(self) -> List[Dict[str, Any]]:
        """Get all characters from the data directory"""
        characters = []
        
        if not self.data_directory.exists():
            logger.warning(f"Data directory {self.data_directory} does not exist")
            return characters
        
        # Get all txt files
        txt_files = list(self.data_directory.glob("*.txt"))
        
        for file_path in txt_files:
            character = self.parse_character_file(file_path)
            if character:
                characters.append(character)
        
        # Sort by name
        characters.sort(key=lambda x: x["name"])
        
        return characters

    def get_character_by_id(self, character_id: str) -> Dict[str, Any]:
        """Get a specific character by ID"""
        file_path = self.data_directory / f"{character_id}.txt"
        
        if not file_path.exists():
            return None
        
        return self.parse_character_file(file_path)

    def search_characters(self, query: str) -> List[Dict[str, Any]]:
        """Search characters by name or content"""
        all_characters = self.get_all_characters()
        
        if not query:
            return all_characters
        
        query_lower = query.lower()
        filtered_characters = []
        
        for character in all_characters:
            # Search in name and title
            if (query_lower in character["name"].lower() or 
                query_lower in character["title"].lower()):
                filtered_characters.append(character)
                continue
            
            # Search in section content
            found_in_content = False
            for section in character["sections"]:
                if query_lower in section["title"].lower():
                    found_in_content = True
                    break
                for item in section["content"]:
                    if query_lower in item.get("text", "").lower():
                        found_in_content = True
                        break
                    if query_lower in item.get("subtitle", "").lower():
                        found_in_content = True
                        break
                if found_in_content:
                    break
            
            if found_in_content:
                filtered_characters.append(character)
        
        return filtered_characters
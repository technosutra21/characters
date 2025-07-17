import re
import os
from typing import List, Dict, Any, Tuple
from pathlib import Path
import logging
from collections import Counter

logger = logging.getLogger(__name__)

class CharacterParser:
    def __init__(self, data_directory: str = "data/characters"):
        self.data_directory = Path(data_directory)
        self.section_patterns = [
            r'^[A-ZÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿĀĀĂĄĆČĎĐĒĔĖĘĚĜĞĠĢĤĦĪĬĮİĲĴĶĹĻĽĿŁŃŅŇŊŌŎŐŒŔŖŘŚŜŞŠŢŤŦŪŬŮŰŲŴŶŸŹŻŽ\s]+$',
            r'^[A-ZÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿĀĀĂĄĆČĎĐĒĔĖĘĚĜĞĠĢĤĦĪĬĮİĲĴĶĹĻĽĿŁŃŅŇŊŌŎŐŒŔŖŘŚŜŞŠŢŤŦŪŬŮŰŲŴŶŸŹŻŽ\s].*[A-ZÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿĀĀĂĄĆČĎĐĒĔĖĘĚĜĞĠĢĤĦĪĬĮİĲĴĶĹĻĽĿŁŃŅŇŊŌŎŐŒŔŖŘŚŜŞŠŢŤŦŪŬŮŰŲŴŶŸŹŻŽ]$',
        ]
        
        # Decorative line patterns
        self.decorative_patterns = [
            r'^={3,}',  # ===
            r'^-{3,}',  # ---
            r'^_{3,}',  # ___
            r'^#{3,}',  # ###
            r'^\*{3,}', # ***
        ]

    def is_topic_line(self, line: str) -> bool:
        """Check if a line is a topic (ends with colon)"""
        line = line.strip()
        if not line:
            return False
        # Check if line ends with colon and is not too long
        return line.endswith(':') and len(line) > 3 and len(line) < 100

    def is_section_header(self, line: str) -> bool:
        """Check if a line is a section header"""
        line = line.strip()
        if not line:
            return False
            
        # Check for decorative patterns
        for pattern in self.decorative_patterns:
            if re.match(pattern, line):
                return False
                
        # Check for topic lines (they are not section headers)
        if self.is_topic_line(line):
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
        """Parse content into sections with improved topic detection"""
        lines = content.split('\n')
        sections = []
        current_section = None
        current_items = []
        current_topic = None
        current_subitems = []
        
        for i, line in enumerate(lines):
            line = line.strip()
            
            # Skip empty lines and decorative lines
            if not line or self.is_decorative_line(line):
                continue
            
            # Check if it's a section header
            if self.is_section_header(line):
                # Save previous topic if exists
                if current_topic and current_subitems:
                    current_items.append({
                        "subtitle": current_topic,
                        "text": "\n".join(current_subitems)
                    })
                    current_topic = None
                    current_subitems = []
                
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
                # Check if it's a topic line (ends with colon)
                if self.is_topic_line(line):
                    # Save previous topic if exists
                    if current_topic and current_subitems:
                        current_items.append({
                            "subtitle": current_topic,
                            "text": "\n".join(current_subitems)
                        })
                    
                    # Start new topic
                    current_topic = line[:-1]  # Remove colon
                    current_subitems = []
                    continue
                
                # If we have a current topic, add to subitems
                if current_topic:
                    # Check if line contains a colon (key-value pair within topic)
                    if ':' in line and not line.startswith('-') and not line.startswith('*'):
                        parts = line.split(':', 1)
                        if len(parts) == 2:
                            key = parts[0].strip()
                            value = parts[1].strip()
                            if key and value:
                                current_subitems.append(f"**{key}**: {value}")
                                continue
                    
                    # Check if it's a numbered or bulleted list item
                    if re.match(r'^[\d\-\*]\s*\.?\s*', line):
                        cleaned_line = re.sub(r'^[\d\-\*]\s*\.?\s*', '', line).strip()
                        if cleaned_line:
                            current_subitems.append(f"• {cleaned_line}")
                        continue
                    
                    # Regular line under topic
                    if line and len(line) > 3:
                        current_subitems.append(line)
                    continue
                
                # No current topic, process as regular item
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
                    cleaned_line = re.sub(r'^[\d\-\*]\s*\.?\s*', '', line).strip()
                    if cleaned_line:
                        current_items.append({
                            "text": cleaned_line
                        })
                    continue
                
                # Regular paragraph
                if line and len(line) > 10:
                    current_items.append({
                        "text": line
                    })
        
        # Don't forget the last topic and section
        if current_topic and current_subitems:
            current_items.append({
                "subtitle": current_topic,
                "text": "\n".join(current_subitems)
            })
        
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
                "file_path": str(file_path),
                "word_count": len(content.split()),
                "section_count": len(sections)
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

    def get_character_metrics(self) -> Dict[str, Any]:
        """Get metrics about all characters"""
        characters = self.get_all_characters()
        
        if not characters:
            return {}
        
        # Basic statistics
        total_characters = len(characters)
        total_sections = sum(char["section_count"] for char in characters)
        total_words = sum(char["word_count"] for char in characters)
        
        # Section analysis
        section_titles = []
        for char in characters:
            section_titles.extend([section["title"] for section in char["sections"]])
        
        section_frequency = Counter(section_titles)
        
        # Character title analysis
        character_titles = [char["title"] for char in characters]
        title_frequency = Counter(character_titles)
        
        # Common words analysis
        all_text = []
        for char in characters:
            for section in char["sections"]:
                for item in section["content"]:
                    all_text.append(item.get("text", ""))
                    if item.get("subtitle"):
                        all_text.append(item["subtitle"])
        
        # Get word frequency (excluding common words)
        stop_words = {"de", "da", "do", "das", "dos", "a", "o", "e", "em", "para", "por", "com", "um", "uma", "que", "não", "é", "se", "na", "no", "ou", "como", "mais", "sua", "seu", "suas", "seus", "os", "as", "ao", "aos", "à", "às", "pelo", "pela", "pelos", "pelas", "sobre", "sob", "entre", "através", "durante", "depois", "antes", "já", "ainda", "também", "sempre", "nunca", "todos", "todas", "cada", "outro", "outra", "outros", "outras", "mesmo", "mesma", "mesmos", "mesmas", "muito", "muita", "muitos", "muitas", "pouco", "pouca", "poucos", "poucas", "grande", "grandes", "pequeno", "pequena", "pequenos", "pequenas", "primeiro", "primeira", "primeiros", "primeiras", "último", "última", "últimos", "últimas", "bem", "mal", "melhor", "pior", "maior", "menor", "pode", "podem", "deve", "devem", "tem", "têm", "há", "havia", "houve", "será", "serão", "foi", "foram", "seja", "sejam", "sendo", "sido", "estar", "estão", "está", "esteja", "estejam", "estando", "estado", "ter", "tendo", "tido", "fazer", "faz", "fazem", "feito", "feitos", "feita", "feitas", "fazendo", "dar", "dá", "dão", "dado", "dados", "dada", "dadas", "dando", "ver", "vê", "veem", "visto", "vista", "vistos", "vistas", "vendo", "ir", "vai", "vão", "ido", "ida", "idos", "idas", "indo", "vir", "vem", "vêm", "vindo", "vindo"}
        
        word_freq = Counter()
        for text in all_text:
            words = re.findall(r'\b\w+\b', text.lower())
            for word in words:
                if len(word) > 3 and word not in stop_words:
                    word_freq[word] += 1
        
        # Common themes/patterns
        common_themes = []
        for word, freq in word_freq.most_common(20):
            if freq > 1:
                common_themes.append({"word": word, "frequency": freq})
        
        return {
            "total_characters": total_characters,
            "total_sections": total_sections,
            "total_words": total_words,
            "avg_sections_per_character": round(total_sections / total_characters, 2),
            "avg_words_per_character": round(total_words / total_characters, 2),
            "most_common_sections": dict(section_frequency.most_common(10)),
            "character_types": dict(title_frequency),
            "common_themes": common_themes,
            "section_diversity": len(section_frequency),
            "unique_sections": list(section_frequency.keys())
        }

    def find_similarities_between_characters(self, char1_id: str, char2_id: str) -> Dict[str, Any]:
        """Find similarities and differences between two characters"""
        char1 = self.get_character_by_id(char1_id)
        char2 = self.get_character_by_id(char2_id)
        
        if not char1 or not char2:
            return {}
        
        # Get section titles
        sections1 = {section["title"] for section in char1["sections"]}
        sections2 = {section["title"] for section in char2["sections"]}
        
        common_sections = sections1.intersection(sections2)
        unique_to_char1 = sections1.difference(sections2)
        unique_to_char2 = sections2.difference(sections1)
        
        # Analyze content similarities
        content_similarities = []
        for section_title in common_sections:
            section1 = next(s for s in char1["sections"] if s["title"] == section_title)
            section2 = next(s for s in char2["sections"] if s["title"] == section_title)
            
            # Extract text content
            text1 = " ".join([item.get("text", "") for item in section1["content"]])
            text2 = " ".join([item.get("text", "") for item in section2["content"]])
            
            # Simple similarity calculation based on common words
            words1 = set(re.findall(r'\b\w+\b', text1.lower()))
            words2 = set(re.findall(r'\b\w+\b', text2.lower()))
            
            common_words = words1.intersection(words2)
            total_words = words1.union(words2)
            
            if total_words:
                similarity_score = len(common_words) / len(total_words)
                content_similarities.append({
                    "section": section_title,
                    "similarity_score": round(similarity_score, 3),
                    "common_words": list(common_words)[:10]  # Top 10 common words
                })
        
        return {
            "character1": char1["name"],
            "character2": char2["name"],
            "common_sections": list(common_sections),
            "unique_to_char1": list(unique_to_char1),
            "unique_to_char2": list(unique_to_char2),
            "content_similarities": content_similarities,
            "overall_similarity": round(len(common_sections) / len(sections1.union(sections2)), 3) if sections1.union(sections2) else 0
        }
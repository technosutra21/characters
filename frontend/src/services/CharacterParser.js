// JavaScript Character Parser - Equivalent to Python version
export class CharacterParser {
  constructor() {
    this.sectionPatterns = [
      /^[A-ZÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿĀĀĂĄĆČĎĐĒĔĖĘĚĜĞĠĢĤĦĪĬĮİĲĴĶĹĻĽĿŁŃŅŇŊŌŎŐŒŔŖŘŚŜŞŠŢŤŦŪŬŮŰŲŴŶŸŹŻŽ\s]+$/,
      /^[A-ZÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿĀĀĂĄĆČĎĐĒĔĖĘĚĜĞĠĢĤĦĪĬĮİĲĴĶĹĻĽĿŁŃŅŇŊŌŎŐŒŔŖŘŚŜŞŠŢŤŦŪŬŮŰŲŴŶŸŹŻŽ\s].*[A-ZÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿĀĀĂĄĆČĎĐĒĔĖĘĚĜĞĠĢĤĦĪĬĮİĲĴĶĹĻĽĿŁŃŅŇŊŌŎŐŒŔŖŘŚŜŞŠŢŤŦŪŬŮŰŲŴŶŸŹŻŽ]$/
    ];
    
    this.decorativePatterns = [
      /^={3,}/,  // ===
      /^-{3,}/,  // ---
      /^_{3,}/,  // ___
      /^#{3,}/,  // ###
      /^\*{3,}/, // ***
    ];
  }

  isTopicLine(line) {
    const trimmed = line.trim();
    if (!trimmed) return false;
    // Check if line ends with colon and is not too long
    return trimmed.endsWith(':') && trimmed.length > 3 && trimmed.length < 100;
  }

  isSectionHeader(line) {
    const trimmed = line.trim();
    if (!trimmed) return false;
    
    // Check for decorative patterns
    for (const pattern of this.decorativePatterns) {
      if (pattern.test(trimmed)) return false;
    }
    
    // Check for topic lines (they are not section headers)
    if (this.isTopicLine(trimmed)) return false;
    
    // Check for section patterns
    return this.sectionPatterns.some(pattern => pattern.test(trimmed));
  }

  isDecorativeLine(line) {
    const trimmed = line.trim();
    return this.decorativePatterns.some(pattern => pattern.test(trimmed));
  }

  extractCharacterName(content) {
    const lines = content.split('\n');
    
    for (const line of lines) {
      const trimmed = line.trim();
      
      // Look for "NOME DO PERSONAGEM:" pattern
      if (trimmed.toUpperCase().includes('NOME DO PERSONAGEM:')) {
        const parts = trimmed.split(':', 2);
        if (parts.length > 1) {
          return parts[1].trim();
        }
      }
      
      // Look for "PERFIL DE PERSONAGEM -" pattern
      if (trimmed.toUpperCase().includes('PERFIL DE PERSONAGEM -')) {
        const parts = trimmed.split('-', 2);
        if (parts.length > 1) {
          return parts[1].trim();
        }
      }
    }
    
    return "Nome não encontrado";
  }

  parseContentIntoSections(content) {
    const lines = content.split('\n');
    const sections = [];
    let currentSection = null;
    let currentItems = [];
    let currentTopic = null;
    let currentSubitems = [];
    
    for (const line of lines) {
      const trimmed = line.trim();
      
      // Skip empty lines and decorative lines
      if (!trimmed || this.isDecorativeLine(trimmed)) {
        continue;
      }
      
      // Check if it's a section header
      if (this.isSectionHeader(trimmed)) {
        // Save previous topic if exists
        if (currentTopic && currentSubitems.length > 0) {
          currentItems.push({
            subtitle: currentTopic,
            text: currentSubitems.join('\n')
          });
          currentTopic = null;
          currentSubitems = [];
        }
        
        // Save previous section if exists
        if (currentSection && currentItems.length > 0) {
          sections.push({
            title: currentSection,
            content: currentItems
          });
        }
        
        // Start new section
        currentSection = trimmed;
        currentItems = [];
        continue;
      }
      
      // Process content within section
      if (currentSection) {
        // Check if it's a topic line (ends with colon)
        if (this.isTopicLine(trimmed)) {
          // Save previous topic if exists
          if (currentTopic && currentSubitems.length > 0) {
            currentItems.push({
              subtitle: currentTopic,
              text: currentSubitems.join('\n')
            });
          }
          
          // Start new topic
          currentTopic = trimmed.slice(0, -1); // Remove colon
          currentSubitems = [];
          continue;
        }
        
        // If we have a current topic, add to subitems
        if (currentTopic) {
          // Check if line contains a colon (key-value pair within topic)
          if (trimmed.includes(':') && !trimmed.startsWith('-') && !trimmed.startsWith('*')) {
            const parts = trimmed.split(':', 2);
            if (parts.length === 2) {
              const key = parts[0].trim();
              const value = parts[1].trim();
              if (key && value) {
                currentSubitems.push(`**${key}**: ${value}`);
                continue;
              }
            }
          }
          
          // Check if it's a numbered or bulleted list item
          if (/^[\d\-\*]\s*\.?\s*/.test(trimmed)) {
            const cleaned = trimmed.replace(/^[\d\-\*]\s*\.?\s*/, '').trim();
            if (cleaned) {
              currentSubitems.push(`• ${cleaned}`);
            }
            continue;
          }
          
          // Regular line under topic
          if (trimmed.length > 3) {
            currentSubitems.push(trimmed);
          }
          continue;
        }
        
        // No current topic, process as regular item
        // Check if line contains a colon (key-value pair)
        if (trimmed.includes(':') && !trimmed.startsWith('-') && !trimmed.startsWith('*')) {
          const parts = trimmed.split(':', 2);
          if (parts.length === 2) {
            const key = parts[0].trim();
            const value = parts[1].trim();
            if (key && value) {
              currentItems.push({
                subtitle: key,
                text: value
              });
              continue;
            }
          }
        }
        
        // Check if it's a numbered or bulleted list item
        if (/^[\d\-\*]\s*\.?\s*/.test(trimmed)) {
          const cleaned = trimmed.replace(/^[\d\-\*]\s*\.?\s*/, '').trim();
          if (cleaned) {
            currentItems.push({
              text: cleaned
            });
          }
          continue;
        }
        
        // Regular paragraph
        if (trimmed.length > 10) {
          currentItems.push({
            text: trimmed
          });
        }
      }
    }
    
    // Don't forget the last topic and section
    if (currentTopic && currentSubitems.length > 0) {
      currentItems.push({
        subtitle: currentTopic,
        text: currentSubitems.join('\n')
      });
    }
    
    if (currentSection && currentItems.length > 0) {
      sections.push({
        title: currentSection,
        content: currentItems
      });
    }
    
    return sections;
  }

  parseCharacterFile(fileName, content) {
    try {
      const characterName = this.extractCharacterName(content);
      const sections = this.parseContentIntoSections(content);
      
      // Extract basic info from first section if available
      let title = "Personagem";
      if (sections.length > 0 && sections[0].title.toUpperCase().includes('INFORMAÇÕES BÁSICAS')) {
        for (const item of sections[0].content) {
          if (item.subtitle && item.subtitle.toLowerCase() === 'tipo') {
            title = item.text;
            break;
          }
        }
      }
      
      return {
        id: fileName.replace('.txt', ''),
        name: characterName,
        title: title,
        sections: sections,
        file_path: fileName,
        word_count: content.split(/\s+/).length,
        section_count: sections.length
      };
    } catch (error) {
      console.error(`Error parsing file ${fileName}:`, error);
      return null;
    }
  }

  searchCharacters(characters, query) {
    if (!query) return characters;
    
    const queryLower = query.toLowerCase();
    const filteredCharacters = [];
    
    for (const character of characters) {
      // Search in name and title
      if (character.name.toLowerCase().includes(queryLower) || 
          character.title.toLowerCase().includes(queryLower)) {
        filteredCharacters.push(character);
        continue;
      }
      
      // Search in section content
      let foundInContent = false;
      for (const section of character.sections) {
        if (section.title.toLowerCase().includes(queryLower)) {
          foundInContent = true;
          break;
        }
        for (const item of section.content) {
          if (item.text && item.text.toLowerCase().includes(queryLower)) {
            foundInContent = true;
            break;
          }
          if (item.subtitle && item.subtitle.toLowerCase().includes(queryLower)) {
            foundInContent = true;
            break;
          }
        }
        if (foundInContent) break;
      }
      
      if (foundInContent) {
        filteredCharacters.push(character);
      }
    }
    
    return filteredCharacters;
  }

  getCharacterMetrics(characters) {
    if (!characters || characters.length === 0) return {};
    
    const totalCharacters = characters.length;
    const totalSections = characters.reduce((sum, char) => sum + char.section_count, 0);
    const totalWords = characters.reduce((sum, char) => sum + char.word_count, 0);
    
    // Section analysis
    const sectionTitles = [];
    for (const char of characters) {
      sectionTitles.push(...char.sections.map(section => section.title));
    }
    
    const sectionFrequency = this.getFrequency(sectionTitles);
    
    // Character title analysis
    const characterTitles = characters.map(char => char.title);
    const titleFrequency = this.getFrequency(characterTitles);
    
    // Common words analysis
    const allText = [];
    for (const char of characters) {
      for (const section of char.sections) {
        for (const item of section.content) {
          if (item.text) allText.push(item.text);
          if (item.subtitle) allText.push(item.subtitle);
        }
      }
    }
    
    const stopWords = new Set(['de', 'da', 'do', 'das', 'dos', 'a', 'o', 'e', 'em', 'para', 'por', 'com', 'um', 'uma', 'que', 'não', 'é', 'se', 'na', 'no', 'ou', 'como', 'mais', 'sua', 'seu', 'suas', 'seus', 'os', 'as', 'ao', 'aos', 'à', 'às', 'pelo', 'pela', 'pelos', 'pelas', 'sobre', 'sob', 'entre', 'através', 'durante', 'depois', 'antes', 'já', 'ainda', 'também', 'sempre', 'nunca', 'todos', 'todas', 'cada', 'outro', 'outra', 'outros', 'outras', 'mesmo', 'mesma', 'mesmos', 'mesmas', 'muito', 'muita', 'muitos', 'muitas', 'pouco', 'pouca', 'poucos', 'poucas', 'grande', 'grandes', 'pequeno', 'pequena', 'pequenos', 'pequenas', 'primeiro', 'primeira', 'primeiros', 'primeiras', 'último', 'última', 'últimos', 'últimas', 'bem', 'mal', 'melhor', 'pior', 'maior', 'menor', 'pode', 'podem', 'deve', 'devem', 'tem', 'têm', 'há', 'havia', 'houve', 'será', 'serão', 'foi', 'foram', 'seja', 'sejam', 'sendo', 'sido', 'estar', 'estão', 'está', 'esteja', 'estejam', 'estando', 'estado', 'ter', 'tendo', 'tido', 'fazer', 'faz', 'fazem', 'feito', 'feitos', 'feita', 'feitas', 'fazendo', 'dar', 'dá', 'dão', 'dado', 'dados', 'dada', 'dadas', 'dando', 'ver', 'vê', 'veem', 'visto', 'vista', 'vistos', 'vistas', 'vendo', 'ir', 'vai', 'vão', 'ido', 'ida', 'idos', 'idas', 'indo', 'vir', 'vem', 'vêm', 'vindo', 'vindo']);
    
    const wordFreq = new Map();
    for (const text of allText) {
      const words = text.toLowerCase().match(/\b\w+\b/g) || [];
      for (const word of words) {
        if (word.length > 3 && !stopWords.has(word)) {
          wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
        }
      }
    }
    
    const commonThemes = Array.from(wordFreq.entries())
      .filter(([word, freq]) => freq > 1)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 20)
      .map(([word, frequency]) => ({ word, frequency }));
    
    return {
      total_characters: totalCharacters,
      total_sections: totalSections,
      total_words: totalWords,
      avg_sections_per_character: Math.round((totalSections / totalCharacters) * 100) / 100,
      avg_words_per_character: Math.round((totalWords / totalCharacters) * 100) / 100,
      most_common_sections: Object.fromEntries(Object.entries(sectionFrequency).slice(0, 10)),
      character_types: titleFrequency,
      common_themes: commonThemes,
      section_diversity: Object.keys(sectionFrequency).length,
      unique_sections: Object.keys(sectionFrequency)
    };
  }

  getFrequency(items) {
    const frequency = {};
    for (const item of items) {
      frequency[item] = (frequency[item] || 0) + 1;
    }
    return frequency;
  }

  findSimilarities(char1, char2) {
    if (!char1 || !char2) return {};
    
    const sections1 = new Set(char1.sections.map(s => s.title));
    const sections2 = new Set(char2.sections.map(s => s.title));
    
    const commonSections = [...sections1].filter(s => sections2.has(s));
    const uniqueToChar1 = [...sections1].filter(s => !sections2.has(s));
    const uniqueToChar2 = [...sections2].filter(s => !sections1.has(s));
    
    const allSections = new Set([...sections1, ...sections2]);
    const overallSimilarity = commonSections.length / allSections.size;
    
    return {
      character1: char1.name,
      character2: char2.name,
      common_sections: commonSections,
      unique_to_char1: uniqueToChar1,
      unique_to_char2: uniqueToChar2,
      overall_similarity: Math.round(overallSimilarity * 1000) / 1000
    };
  }
}
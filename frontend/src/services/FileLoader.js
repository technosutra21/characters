// File loader service for GitHub Pages deployment
export class FileLoader {
  constructor() {
    this.characters = [];
    this.isLoaded = false;
  }

  // Load files from public/characters directory
  async loadCharacterFiles() {
    try {
      // First, try to load an index file that lists all character files
      const indexResponse = await fetch('/characters/index.json');
      let fileList = [];
      
      if (indexResponse.ok) {
        const indexData = await indexResponse.json();
        fileList = indexData.files || [];
      } else {
        // Fallback: try common file names
        fileList = [
          'vestila.txt',
          'acala.txt'
          // Add more file names as needed
        ];
      }
      
      // Load each character file
      const characters = [];
      for (const fileName of fileList) {
        try {
          const response = await fetch(`/characters/${fileName}`);
          if (response.ok) {
            const content = await response.text();
            const parser = new (await import('./CharacterParser.js')).CharacterParser();
            const character = parser.parseCharacterFile(fileName, content);
            if (character) {
              characters.push(character);
            }
          }
        } catch (error) {
          console.warn(`Failed to load character file ${fileName}:`, error);
        }
      }
      
      this.characters = characters.sort((a, b) => a.name.localeCompare(b.name));
      this.isLoaded = true;
      return this.characters;
    } catch (error) {
      console.error('Error loading character files:', error);
      return [];
    }
  }

  // Alternative method: Load from a single JSON file
  async loadFromJSON() {
    try {
      const response = await fetch('/characters/characters.json');
      if (response.ok) {
        const data = await response.json();
        this.characters = data.characters || [];
        this.isLoaded = true;
        return this.characters;
      }
    } catch (error) {
      console.error('Error loading characters from JSON:', error);
    }
    return [];
  }

  // Get all characters
  getCharacters() {
    return this.characters;
  }

  // Get character by ID
  getCharacterById(id) {
    return this.characters.find(char => char.id === id);
  }

  // Search characters
  searchCharacters(query) {
    if (!query) return this.characters;
    
    const parser = new (require('./CharacterParser.js')).CharacterParser();
    return parser.searchCharacters(this.characters, query);
  }

  // Get metrics
  getMetrics() {
    const parser = new (require('./CharacterParser.js')).CharacterParser();
    return parser.getCharacterMetrics(this.characters);
  }

  // Get similarity between two characters
  getSimilarity(char1Id, char2Id) {
    const char1 = this.getCharacterById(char1Id);
    const char2 = this.getCharacterById(char2Id);
    
    if (!char1 || !char2) return null;
    
    const parser = new (require('./CharacterParser.js')).CharacterParser();
    return parser.findSimilarities(char1, char2);
  }
}
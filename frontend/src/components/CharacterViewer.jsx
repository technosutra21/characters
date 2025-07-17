import React, { useState, useEffect, useRef } from 'react';
import { Search, Sparkles, BookOpen, User, MapPin, Heart, Zap, Loader2, AlertCircle, Grid, BarChart3, Eye, Layout, Upload, FileText, X, Download, Star, Shuffle, Filter, Settings, Moon, Sun, Palette, Maximize2, Minimize2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import MasonryCards from './MasonryCards';
import { CharacterParser } from '../services/CharacterParser';

const CharacterViewer = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('gallery');
  const [layoutMode, setLayoutMode] = useState('masonry');
  const [dragOver, setDragOver] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');
  const [showStats, setShowStats] = useState(false);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const parser = new CharacterParser();

  // Load demo characters on first load
  useEffect(() => {
    loadDemoCharacters();
  }, []);

  // Filter and sort characters
  useEffect(() => {
    let filtered = characters;
    
    // Search filter
    if (searchTerm) {
      filtered = parser.searchCharacters(characters, searchTerm);
    }
    
    // Type filter
    if (filterBy !== 'all') {
      filtered = filtered.filter(char => 
        char.title.toLowerCase().includes(filterBy.toLowerCase())
      );
    }
    
    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'sections':
          return b.sections.length - a.sections.length;
        case 'words':
          return b.word_count - a.word_count;
        case 'recent':
          return new Date(b.created || 0) - new Date(a.created || 0);
        default:
          return 0;
      }
    });
    
    setFilteredCharacters(filtered);
  }, [searchTerm, characters, filterBy, sortBy, parser]);

  // Load characters from localStorage
  const loadDemoCharacters = () => {
    try {
      const saved = localStorage.getItem('characterViewerData');
      if (saved) {
        const data = JSON.parse(saved);
        setCharacters(data.characters || []);
        if (data.characters && data.characters.length > 0) {
          setSelectedCharacter(data.characters[0]);
        }
      }
    } catch (error) {
      console.error('Error loading saved characters:', error);
    }
  };

  // Save characters to localStorage
  const saveCharacters = (newCharacters) => {
    try {
      localStorage.setItem('characterViewerData', JSON.stringify({
        characters: newCharacters,
        timestamp: new Date().toISOString()
      }));
    } catch (error) {
      console.error('Error saving characters:', error);
    }
  };

  // Handle file upload with enhanced feedback
  const handleFileUpload = (files) => {
    if (!files || files.length === 0) return;
    
    setLoading(true);
    setError(null);

    const newCharacters = [];
    let filesProcessed = 0;

    Array.from(files).forEach((file) => {
      if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const content = e.target.result;
            const character = parser.parseCharacterFile(file.name, content);
            if (character) {
              character.created = new Date().toISOString();
              character.fileSize = file.size;
              newCharacters.push(character);
            }
          } catch (error) {
            console.error(`Error parsing file ${file.name}:`, error);
          }
          
          filesProcessed++;
          if (filesProcessed === files.length) {
            const allCharacters = [...characters, ...newCharacters];
            const uniqueCharacters = allCharacters.filter((char, index, self) => 
              index === self.findIndex(c => c.id === char.id)
            );
            uniqueCharacters.sort((a, b) => a.name.localeCompare(b.name));
            
            setCharacters(uniqueCharacters);
            saveCharacters(uniqueCharacters);
            
            if (!selectedCharacter && uniqueCharacters.length > 0) {
              setSelectedCharacter(uniqueCharacters[0]);
            }
            
            setLoading(false);
          }
        };
        reader.readAsText(file);
      } else {
        filesProcessed++;
        if (filesProcessed === files.length) {
          setLoading(false);
        }
      }
    });
  };

  // Enhanced drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    handleFileUpload(files);
  };

  // Clear all characters
  const clearAllCharacters = () => {
    setCharacters([]);
    setSelectedCharacter(null);
    setFilteredCharacters([]);
    localStorage.removeItem('characterViewerData');
  };

  // Shuffle characters
  const shuffleCharacters = () => {
    const shuffled = [...filteredCharacters].sort(() => Math.random() - 0.5);
    setFilteredCharacters(shuffled);
  };

  // Export characters as JSON
  const exportCharacters = () => {
    const data = {
      characters: characters,
      exported: new Date().toISOString(),
      version: '2.0',
      stats: getCharacterStats()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `personagens-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Get character statistics
  const getCharacterStats = () => {
    if (characters.length === 0) return null;
    
    const totalWords = characters.reduce((sum, char) => sum + char.word_count, 0);
    const totalSections = characters.reduce((sum, char) => sum + char.sections.length, 0);
    const avgWords = Math.round(totalWords / characters.length);
    const avgSections = Math.round(totalSections / characters.length);
    
    return {
      total: characters.length,
      totalWords,
      totalSections,
      avgWords,
      avgSections,
      lastUpdated: new Date().toISOString()
    };
  };

  // Enhanced canvas animation with interactive particles
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const particles = [];
    const particleCount = 80;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.4 + 0.1,
        color: `hsl(${Math.random() * 60 + 260}, 70%, 60%)`,
        pulse: Math.random() * 0.02 + 0.01
      });
    }
    
    let mouseX = 0;
    let mouseY = 0;
    
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        // Mouse interaction
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.vx += dx * force * 0.0001;
          particle.vy += dy * force * 0.0001;
        }
        
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.opacity += Math.sin(Date.now() * particle.pulse) * 0.01;
        
        // Bounce off walls
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -0.9;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -0.9;
        
        // Draw particle with glow effect
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace('60%)', `${particle.opacity})`);
        ctx.shadowBlur = 10;
        ctx.shadowColor = particle.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Process markdown text with enhanced formatting
  const processMarkdownText = (text) => {
    if (!text) return text;
    
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-cyan-300 bg-cyan-500/10 px-1 rounded">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="font-semibold text-purple-300 bg-purple-500/10 px-1 rounded">$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-800 text-cyan-400 px-2 py-1 rounded text-sm font-mono">$1</code>');
  };

  const getSectionIcon = (title) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('básicas') || titleLower.includes('informações')) return <User className="w-5 h-5" />;
    if (titleLower.includes('física') || titleLower.includes('descrição')) return <BookOpen className="w-5 h-5" />;
    if (titleLower.includes('espirituais') || titleLower.includes('características')) return <Heart className="w-5 h-5" />;
    if (titleLower.includes('místicas') || titleLower.includes('experiência')) return <Sparkles className="w-5 h-5" />;
    if (titleLower.includes('localização') || titleLower.includes('contexto')) return <MapPin className="w-5 h-5" />;
    if (titleLower.includes('especiais') || titleLower.includes('ensinamento')) return <Zap className="w-5 h-5" />;
    return <BookOpen className="w-5 h-5" />;
  };

  const getFloatingCardStyle = (index, totalCards) => {
    const cols = Math.min(4, Math.ceil(Math.sqrt(totalCards)));
    const col = index % cols;
    const row = Math.floor(index / cols);
    
    const baseX = (col * 400) + 60;
    const baseY = (row * 440) + 60;
    
    const randomX = (Math.random() - 0.5) * 80;
    const randomY = (Math.random() - 0.5) * 60;
    const randomRotation = (Math.random() - 0.5) * 6;
    
    return {
      position: 'absolute',
      left: `${baseX + randomX}px`,
      top: `${baseY + randomY}px`,
      transform: `rotate(${randomRotation}deg)`,
      animationDelay: `${index * 0.1}s`,
      zIndex: 10
    };
  };

  // Enhanced loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white flex items-center justify-center">
        <canvas ref={canvasRef} className="absolute inset-0 z-0" />
        <div className="text-center z-10 relative">
          <div className="relative mb-8">
            <Loader2 className="w-20 h-20 animate-spin mx-auto text-cyan-400 drop-shadow-lg" />
            <div className="absolute inset-0 w-20 h-20 mx-auto border-4 border-transparent border-t-purple-400 rounded-full animate-spin animation-delay-150"></div>
          </div>
          <h2 className="text-3xl font-light mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Processando Arquivos
          </h2>
          <p className="text-lg text-gray-300 mb-2">Carregando personagens mágicos...</p>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Preparando experiência místicas</span>
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  // Enhanced error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-purple-900 text-white flex items-center justify-center p-6">
        <canvas ref={canvasRef} className="absolute inset-0 z-0" />
        <Alert className="max-w-md bg-red-900/30 border-red-500/50 z-10 backdrop-blur-xl">
          <AlertCircle className="h-5 w-5 text-red-400" />
          <AlertDescription className="text-red-200 text-lg">
            {error}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Enhanced empty state
  if (filteredCharacters.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white overflow-hidden">
        <canvas ref={canvasRef} className="fixed inset-0 z-0" />
        
        <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
          <div className="text-center max-w-3xl mx-auto">
            <div className="relative mb-8">
              <BookOpen className="w-24 h-24 mx-auto text-cyan-400 drop-shadow-2xl" />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <h1 className="text-6xl font-light mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Personagens Místicos
            </h1>
            
            <p className="text-2xl text-gray-300 mb-12 leading-relaxed">
              {characters.length === 0 ? 
                'Descubra mundos místicos através de seus personagens' : 
                'Nenhum personagem encontrado na busca'
              }
            </p>
            
            {/* Enhanced File Upload Area */}
            <div
              className={`relative border-2 border-dashed rounded-2xl p-16 transition-all duration-500 transform ${
                dragOver 
                  ? 'border-cyan-400 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 scale-105 shadow-2xl shadow-cyan-500/30' 
                  : 'border-gray-500 bg-gray-800/20 hover:border-purple-400 hover:bg-purple-900/20 hover:scale-102 hover:shadow-xl'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="relative">
                <Upload className="w-20 h-20 mx-auto mb-8 text-cyan-400 drop-shadow-lg" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full animate-pulse"></div>
              </div>
              
              <h2 className="text-3xl font-light mb-4 text-white">
                Arraste seus arquivos aqui
              </h2>
              
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Solte arquivos .txt com descrições de personagens<br />
                ou clique para selecionar da sua biblioteca
              </p>
              
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-12 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-cyan-500/30 border-0"
              >
                <FileText className="w-6 h-6 mr-3" />
                Selecionar Arquivos Mágicos
              </Button>
              
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt"
                multiple
                onChange={handleFileInputChange}
                className="hidden"
              />
            </div>
            
            {characters.length > 0 && (
              <div className="mt-12 flex items-center justify-center space-x-6">
                <Button
                  onClick={() => setSearchTerm('')}
                  variant="outline"
                  className="bg-gray-800/50 hover:bg-gray-700/50 border-gray-600 text-gray-300 backdrop-blur-sm"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Limpar Busca
                </Button>
                <Button
                  onClick={clearAllCharacters}
                  variant="outline"
                  className="bg-red-900/30 hover:bg-red-900/50 border-red-500/50 text-red-300 backdrop-blur-sm"
                >
                  <X className="w-4 h-4 mr-2" />
                  Limpar Biblioteca
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const stats = getCharacterStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white overflow-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 z-0" />
      
      {/* Enhanced Header */}
      <div className="relative z-20 p-6 bg-black/20 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Sparkles className="w-8 h-8 text-cyan-400 drop-shadow-lg" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-4xl font-light bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Personagens Místicos
                  </h1>
                  <p className="text-sm text-gray-400 mt-1">Explorador de mundos fantásticos</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="bg-cyan-900/30 text-cyan-300 border-cyan-500/50 px-4 py-2">
                  {filteredCharacters.length} personagens
                </Badge>
                
                {stats && (
                  <Badge variant="outline" className="bg-purple-900/30 text-purple-300 border-purple-500/50 px-4 py-2">
                    {stats.totalWords.toLocaleString()} palavras
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Enhanced Search */}
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-hover:text-cyan-400" />
                <Input
                  placeholder="Buscar personagens místicos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 w-96 bg-gray-800/50 border-gray-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 backdrop-blur-sm text-white placeholder-gray-400"
                />
              </div>
              
              {/* Sort & Filter */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSortBy(sortBy === 'name' ? 'sections' : 'name')}
                  className="bg-gray-800/50 hover:bg-gray-700/50 border-gray-600 backdrop-blur-sm"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {sortBy === 'name' ? 'Nome' : 'Seções'}
                </Button>
                
                <Button
                  onClick={shuffleCharacters}
                  variant="outline"
                  size="sm"
                  className="bg-gray-800/50 hover:bg-gray-700/50 border-gray-600 backdrop-blur-sm"
                >
                  <Shuffle className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Action Buttons */}
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                size="sm"
                className="bg-cyan-900/30 hover:bg-cyan-900/50 border-cyan-500/50 text-cyan-300 backdrop-blur-sm"
              >
                <Upload className="w-4 h-4 mr-2" />
                Carregar
              </Button>
              
              <Button
                onClick={exportCharacters}
                variant="outline"
                size="sm"
                className="bg-green-900/30 hover:bg-green-900/50 border-green-500/50 text-green-300 backdrop-blur-sm"
              >
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
              
              <Button
                variant={viewMode === 'gallery' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('gallery')}
                className="bg-purple-900/30 hover:bg-purple-900/50 border-purple-500/50 backdrop-blur-sm"
              >
                <Grid className="w-4 h-4 mr-2" />
                Galeria
              </Button>
              
              <Button
                variant={viewMode === 'detailed' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('detailed')}
                className="bg-purple-900/30 hover:bg-purple-900/50 border-purple-500/50 backdrop-blur-sm"
              >
                <Eye className="w-4 h-4 mr-2" />
                Detalhes
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt"
        multiple
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Enhanced Main Content */}
      <div className="relative z-10 p-8">
        <Tabs value={viewMode} onValueChange={setViewMode} className="max-w-7xl mx-auto">
          
          {/* Enhanced Gallery View */}
          <TabsContent value="gallery" className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredCharacters.map((character, index) => (
                <Card 
                  key={character.id}
                  className="group bg-gray-800/30 backdrop-blur-xl border-gray-700/50 hover:bg-gray-800/50 cursor-pointer transition-all duration-700 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 overflow-hidden hover:border-cyan-400/50"
                  onClick={() => {
                    setSelectedCharacter(character);
                    setViewMode('detailed');
                  }}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: 'slideInUp 0.8s ease-out forwards'
                  }}
                >
                  <CardHeader className="pb-4 bg-gradient-to-r from-purple-900/40 to-cyan-900/40 border-b border-cyan-500/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="relative p-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl group-hover:from-cyan-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                          <User className="w-6 h-6 text-cyan-400 drop-shadow-sm" />
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div>
                          <CardTitle className="text-xl font-medium text-white group-hover:text-cyan-100 transition-colors duration-300">
                            {character.name}
                          </CardTitle>
                          <p className="text-sm text-gray-400 mt-1">{character.title}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Badge variant="secondary" className="bg-cyan-900/50 text-cyan-200 border-cyan-500/50 px-3 py-1">
                          {character.sections.length} seções
                        </Badge>
                        <div className="flex items-center space-x-1 text-xs text-gray-400">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>Mítico</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-gray-300 bg-gray-900/30 rounded-lg p-4 backdrop-blur-sm">
                        <div className="flex items-center space-x-2">
                          <BookOpen className="w-4 h-4 text-cyan-400" />
                          <span>{character.word_count.toLocaleString()} palavras</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <BarChart3 className="w-4 h-4 text-purple-400" />
                          <span>{character.sections.length} seções</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-xs text-gray-400">
                        <Sparkles className="w-3 h-3" />
                        <span>Última atualização: {new Date().toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Enhanced Detailed View */}
          <TabsContent value="detailed">
            {selectedCharacter && (
              <div className="space-y-12">
                {/* Enhanced Character Header */}
                <div className="text-center mb-16">
                  <div className="relative inline-block mb-8">
                    <h1 className="text-8xl font-light mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl">
                      {selectedCharacter.name}
                    </h1>
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  
                  <p className="text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                    {selectedCharacter.title}
                  </p>
                  
                  {/* Enhanced Layout Toggle */}
                  <div className="flex items-center justify-center space-x-6 mb-8">
                    <Button
                      variant={layoutMode === 'masonry' ? 'default' : 'outline'}
                      size="lg"
                      onClick={() => setLayoutMode('masonry')}
                      className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 hover:from-purple-900/70 hover:to-cyan-900/70 border-purple-500/50 backdrop-blur-sm px-8 py-3"
                    >
                      <Layout className="w-5 h-5 mr-3" />
                      Masonry Grid
                    </Button>
                    <Button
                      variant={layoutMode === 'floating' ? 'default' : 'outline'}
                      size="lg"
                      onClick={() => setLayoutMode('floating')}
                      className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 hover:from-purple-900/70 hover:to-cyan-900/70 border-purple-500/50 backdrop-blur-sm px-8 py-3"
                    >
                      <Sparkles className="w-5 h-5 mr-3" />
                      Floating Cards
                    </Button>
                  </div>
                  
                  {/* Enhanced Stats */}
                  <div className="flex items-center justify-center space-x-12 text-lg text-gray-400 mb-8">
                    <div className="flex items-center space-x-3 bg-gray-800/30 px-6 py-3 rounded-full backdrop-blur-sm">
                      <BookOpen className="w-5 h-5 text-cyan-400" />
                      <span>{selectedCharacter.word_count.toLocaleString()} palavras</span>
                    </div>
                    <div className="flex items-center space-x-3 bg-gray-800/30 px-6 py-3 rounded-full backdrop-blur-sm">
                      <BarChart3 className="w-5 h-5 text-purple-400" />
                      <span>{selectedCharacter.sections.length} seções</span>
                    </div>
                    <div className="flex items-center space-x-3 bg-gray-800/30 px-6 py-3 rounded-full backdrop-blur-sm">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      <span>Personagem Mítico</span>
                    </div>
                  </div>
                  
                  <div className="w-40 h-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 mx-auto rounded-full shadow-lg"></div>
                </div>

                {/* Enhanced Cards Display */}
                {layoutMode === 'masonry' ? (
                  <MasonryCards 
                    sections={selectedCharacter.sections} 
                    getSectionIcon={getSectionIcon}
                    processMarkdownText={processMarkdownText}
                  />
                ) : (
                  <div className="overflow-x-auto overflow-y-visible pb-20">
                    <div className="relative mx-auto" style={{ 
                      minHeight: `${Math.ceil(selectedCharacter.sections.length / Math.min(4, Math.ceil(Math.sqrt(selectedCharacter.sections.length)))) * 440 + 200}px`,
                      width: `${Math.min(4, Math.ceil(Math.sqrt(selectedCharacter.sections.length))) * 400 + 200}px`
                    }}>
                      {selectedCharacter.sections.map((section, index) => (
                        <Card 
                          key={index}
                          className="w-96 bg-gray-800/40 backdrop-blur-xl border-gray-700/50 hover:bg-gray-800/60 transition-all duration-700 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 floating-card overflow-hidden hover:border-cyan-400/50"
                          style={getFloatingCardStyle(index, selectedCharacter.sections.length)}
                        >
                          <CardHeader className="pb-4 bg-gradient-to-r from-purple-900/40 to-cyan-900/40 rounded-t-lg border-b border-cyan-500/20">
                            <CardTitle className="flex items-center space-x-4 text-xl font-medium">
                              <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl">
                                {getSectionIcon(section.title)}
                              </div>
                              <span className="bg-gradient-to-r from-cyan-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
                                {section.title}
                              </span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="max-h-80 overflow-y-auto custom-scrollbar p-6">
                            <div className="space-y-4">
                              {section.content.map((item, itemIndex) => (
                                <div 
                                  key={itemIndex}
                                  className="p-5 bg-gray-900/50 rounded-xl border border-gray-700/50 hover:border-cyan-500/50 hover:bg-gray-900/70 transition-all duration-300 backdrop-blur-sm"
                                >
                                  {item.subtitle && (
                                    <h4 className="font-semibold text-cyan-200 mb-4 text-lg border-b border-cyan-500/30 pb-3">
                                      {item.subtitle}
                                    </h4>
                                  )}
                                  <div className="text-gray-200 leading-relaxed">
                                    {item.text.split('\n').map((line, lineIndex) => (
                                      <p key={lineIndex} className="mb-3 last:mb-0 text-base" 
                                         dangerouslySetInnerHTML={{
                                           __html: processMarkdownText(line)
                                         }}
                                      />
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Enhanced Character Navigation */}
                <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30">
                  <div className="flex items-center space-x-3 bg-gray-900/80 backdrop-blur-xl rounded-full p-4 border border-gray-700/50 shadow-2xl">
                    {filteredCharacters.map((char, index) => (
                      <button
                        key={char.id}
                        onClick={() => setSelectedCharacter(char)}
                        className={`relative w-4 h-4 rounded-full transition-all duration-300 ${
                          char.id === selectedCharacter.id 
                            ? 'bg-gradient-to-r from-cyan-500 to-purple-500 scale-150 shadow-lg shadow-cyan-500/50' 
                            : 'bg-gray-600 hover:bg-gray-500 hover:scale-125'
                        }`}
                        title={char.name}
                      >
                        {char.id === selectedCharacter.id && (
                          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 animate-pulse opacity-50"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-10px) rotate(1deg);
          }
          66% {
            transform: translateY(-5px) rotate(-1deg);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        .floating-card {
          animation: float 8s ease-in-out infinite;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #8B5CF6 #374151;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #374151;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #8B5CF6, #06B6D4);
          border-radius: 10px;
          border: 2px solid #374151;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #7C3AED, #0891B2);
        }
        
        .animation-delay-150 {
          animation-delay: 150ms;
        }
        
        .backdrop-blur-xl {
          backdrop-filter: blur(24px);
        }
        
        .scale-102 {
          transform: scale(1.02);
        }
        
        .drop-shadow-2xl {
          filter: drop-shadow(0 25px 25px rgb(0 0 0 / 0.15));
        }
      `}</style>
    </div>
  );
};

export default CharacterViewer;
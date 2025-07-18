import React, { useState, useEffect, useRef } from 'react';
import { Search, Sparkles, BookOpen, User, MapPin, Heart, Zap, Loader2, AlertCircle, Grid, Eye, Layout, Upload, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import MasonryCards from './MasonryCards';
import { CharacterParser } from '../services/CharacterParser';
import { FileLoader } from '../services/FileLoader';

const CharacterViewerStatic = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('gallery');
  const [layoutMode, setLayoutMode] = useState('masonry');
  const [metrics, setMetrics] = useState({});
  const canvasRef = useRef(null);
  const fileLoaderRef = useRef(new FileLoader());
  const parserRef = useRef(new CharacterParser());

  // Load characters on component mount
  useEffect(() => {
    loadCharacters();
  }, []);

  const loadCharacters = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to load from files first, then fallback to JSON
      let characters = await fileLoaderRef.current.loadCharacterFiles();
      
      if (characters.length === 0) {
        characters = await fileLoaderRef.current.loadFromJSON();
      }
      
      // If still no characters, use local data
      if (characters.length === 0) {
        characters = getLocalCharacters();
      }
      
      setCharacters(characters);
      if (characters.length > 0) {
        setSelectedCharacter(characters[0]);
      }
      
      // Calculate metrics
      const metricsData = parserRef.current.getCharacterMetrics(characters);
      setMetrics(metricsData);
      
    } catch (err) {
      console.error('Error loading characters:', err);
      setError('Erro ao carregar personagens. Usando dados locais.');
      const localChars = getLocalCharacters();
      setCharacters(localChars);
      if (localChars.length > 0) {
        setSelectedCharacter(localChars[0]);
      }
    } finally {
      setLoading(false);
    }
  };

  // Local characters data as fallback
  const getLocalCharacters = () => {
    const vestila = `PERFIL DE PERSONAGEM - CHEFE DE FAMÍLIA VEṢṬHILA
=================================================

NOME DO PERSONAGEM: CHEFE DE FAMÍLIA VEṢṬHILA

INFORMAÇÕES BÁSICAS
-------------------
Nome e Tradução: Veṣṭhila (वेष्ठिल) - "Circundado" ou "Envolvido"
Tipo: Chefe de Família (Householder) e Kalyāṇamitra (Amigo Espiritual)
Localização: Cidade de Śubhapāraṃgama
Status: Guardião de santuário tathāgata, visionário da sucessão ininterrupta dos Budas

DESCRIÇÃO FÍSICA
----------------
Aparência Visual:
- Não há descrição física detalhada no texto
- Presume-se aparência de chefe de família respeitável

Cor do Corpo: Não especificado
Cabelo: Não especificado
Olhos: Não especificado
Beleza Geral: Não especificado
Adornos: Não especificados
Vestimentas: Roupas adequadas para chefe de família

CARACTERÍSTICAS ESPIRITUAIS DISTINTIVAS
---------------------------------------
1. VISIONÁRIO DA SUCESSÃO BÚDICA:
   - Possui a "Libertação Bodhisattva Chamada Realização do Cume da Inesgotabilidade"
   - Vê sucessão ininterrupta de Budas do passado, presente e futuro
   - Percebe inumeráveis Tathāgatas em cada instante mental

2. GUARDIÃO DO SANTUÁRIO:
   - Cuida de um santuário com trono de sândalo dedicado a um Tathāgata
   - Ao abrir a porta do santuário, alcança samādhi especial
   - Atinge "Samādhi Bodhisattva Chamado Exibição da Família Incessante dos Budas"

3. MESTRE DA MEMÓRIA PERFEITA:
   - Lembra e mantém claramente os ensinamentos Dharma de todos os Tathāgatas
   - Compreende com inteligência, distingue com reverência, illumina com sabedoria
   - Possui através da memória, compreende com intelecto`;

    const acala = `PERFIL DE PERSONAGEM - UPĀSIKĀ ACALĀ
=============================================

NOME DO PERSONAGEM: UPĀSIKĀ ACALĀ

INFORMAÇÕES BÁSICAS
-------------------
Nome e Tradução: Acalā (अचला) - "Inabalável" ou "Imóvel"
Tipo: Upāsikā (Praticante Leiga Feminina) e Kalyāṇamitra (Amiga Espiritual)
Localização: Capital real de Sthirā, vivendo na casa dos pais cercada pela família
Status: Jovem bodhisattva de realização suprema, professora do Dharma para grandes assembleias

DESCRIÇÃO FÍSICA
----------------
Aparência Visual:
- Jovem mulher de beleza incomparável nos dez direções
- Corpo com lustre de cor que só é superado pelos Tathāgatas e bodhisattvas consagrados
- Forma e figura corporal sem igual em todos os mundos
- Aura de luz que só é superada pelos Budas e bodhisattvas consagrados
- Fragrância única emanando de todos os poros - superior a todos os seres

Cor do Corpo: Luminosa dourada (lustre só superado pelos Tathāgatas)
Cabelo: Não especificado detalhadamente
Olhos: Não especificado detalhadamente  
Beleza Geral: Suprema - incomparável em todos os mundos exceto pelos Budas e bodhisattvas consagrados
Adornos: Não especificados (interpretação: simples mas radiantes)
Vestimentas: Roupas de jovem leiga, adequadas para seu status de upāsikā

CARACTERÍSTICAS ESPIRITUAIS DISTINTIVAS
---------------------------------------
1. PUREZA ABSOLUTA:
   - Jamais teve pensamentos de prazer sensual ou cópula por kalpas incontáveis
   - Nunca teve um único pensamento de raiva contra kalyāṇamitras
   - Nunca teve visão de eu ou apego a posses
   - Mesmo ao morrer e renascer, jamais teve estupidez ou estado mental neutro

2. MESTRA DA SABEDORIA SUPREMA:
   - Possui "Libertação Bodhisattva Chamada Essência da Sabedoria Difícil de Atingir"
   - Domina o "Portal da Conduta Bodhisattva com Compromisso Firme"
   - Realiza o "Portal do Poder de Retenção do Nível da Igualdade de Todos os Fenômenos"`;

    const parser = new CharacterParser();
    const char1 = parser.parseCharacterFile('vestila.txt', vestila);
    const char2 = parser.parseCharacterFile('acala.txt', acala);
    
    return [char1, char2].filter(Boolean);
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (!files) return;

    const newCharacters = [];
    const parser = new CharacterParser();
    
    Array.from(files).forEach(file => {
      if (file.name.endsWith('.txt')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target.result;
          const character = parser.parseCharacterFile(file.name, content);
          if (character) {
            newCharacters.push(character);
            // Update characters list
            setCharacters(prev => {
              const updated = [...prev];
              const existingIndex = updated.findIndex(c => c.id === character.id);
              if (existingIndex >= 0) {
                updated[existingIndex] = character;
              } else {
                updated.push(character);
              }
              return updated.sort((a, b) => a.name.localeCompare(b.name));
            });
          }
        };
        reader.readAsText(file);
      }
    });
  };

  // Handle search
  useEffect(() => {
    if (searchTerm) {
      const filtered = parserRef.current.searchCharacters(characters, searchTerm);
      setCharacters(filtered);
    } else {
      loadCharacters();
    }
  }, [searchTerm]);

  // Canvas animation for floating particles
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
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.1
      });
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 51, 234, ${particle.opacity})`;
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Function to process markdown-like formatting
  const processMarkdownText = (text) => {
    if (!text) return text;
    
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-purple-200">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="font-semibold text-purple-300">$1</em>');
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
    const rows = Math.ceil(totalCards / cols);
    
    const col = index % cols;
    const row = Math.floor(index / cols);
    
    const baseX = (col * 380) + 50;
    const baseY = (row * 420) + 50;
    
    const randomX = (Math.random() - 0.5) * 60;
    const randomY = (Math.random() - 0.5) * 40;
    const randomRotation = (Math.random() - 0.5) * 8;
    
    return {
      position: 'absolute',
      left: `${baseX + randomX}px`,
      top: `${baseY + randomY}px`,
      transform: `rotate(${randomRotation}deg)`,
      animationDelay: `${index * 0.1}s`,
      zIndex: 10
    };
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <canvas ref={canvasRef} className="absolute inset-0 z-0" />
        <div className="text-center z-10">
          <Loader2 className="w-16 h-16 animate-spin mx-auto mb-6 text-purple-500" />
          <p className="text-2xl font-light mb-2">Carregando personagens...</p>
          <p className="text-sm text-gray-500">Processando arquivos txt</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <canvas ref={canvasRef} className="absolute inset-0 z-0" />
        <Alert className="max-w-md bg-red-900/20 border-red-500/50 z-10">
          <AlertCircle className="h-4 w-4 text-red-400" />
          <AlertDescription className="text-red-200">
            {error}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // No characters found
  if (characters.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <canvas ref={canvasRef} className="absolute inset-0 z-0" />
        <div className="text-center z-10">
          <Upload className="w-20 h-20 mx-auto mb-6 text-gray-500" />
          <p className="text-2xl font-light mb-2">Nenhum personagem encontrado</p>
          <p className="text-gray-500 mb-6">Faça upload de arquivos .txt ou adicione-os em /public/characters/</p>
          <input
            type="file"
            multiple
            accept=".txt"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg cursor-pointer transition-colors"
          >
            <Upload className="w-5 h-5 mr-2" />
            Fazer Upload de Arquivos
          </label>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <canvas ref={canvasRef} className="fixed inset-0 z-0" />
      
      {/* Header */}
      <div className="relative z-20 p-6 bg-black/30 backdrop-blur-sm border-b border-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-6">
              <h1 className="text-3xl font-light bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Personagens Místicos
              </h1>
              <Badge variant="outline" className="bg-purple-900/20 text-purple-300 border-purple-500/30">
                {characters.length} personagens
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar personagem..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80 bg-gray-900/50 border-gray-700 focus:border-purple-500 transition-all duration-300"
                />
              </div>
              
              <input
                type="file"
                multiple
                accept=".txt"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload-header"
              />
              <label
                htmlFor="file-upload-header"
                className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg cursor-pointer transition-colors"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </label>
              
              <Button
                variant={viewMode === 'gallery' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('gallery')}
                className="bg-purple-900/20 hover:bg-purple-900/40 border-purple-500/30"
              >
                <Grid className="w-4 h-4 mr-2" />
                Galeria
              </Button>
              
              <Button
                variant={viewMode === 'detailed' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('detailed')}
                className="bg-purple-900/20 hover:bg-purple-900/40 border-purple-500/30"
              >
                <Eye className="w-4 h-4 mr-2" />
                Detalhes
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-6">
        <Tabs value={viewMode} onValueChange={setViewMode} className="max-w-7xl mx-auto">
          
          {/* Gallery View */}
          <TabsContent value="gallery" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {characters.map((character, index) => (
                <Card 
                  key={character.id}
                  className="bg-gray-900/40 backdrop-blur-sm border-gray-700/40 hover:bg-gray-900/60 cursor-pointer transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 group overflow-hidden"
                  onClick={() => {
                    setSelectedCharacter(character);
                    setViewMode('detailed');
                  }}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: 'fadeInUp 0.8s ease-out forwards'
                  }}
                >
                  <CardHeader className="pb-3 bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border-b border-purple-500/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-purple-500/20 rounded-lg">
                          <User className="w-5 h-5 text-purple-400" />
                        </div>
                        <CardTitle className="text-lg font-medium text-purple-200 group-hover:text-purple-100 transition-colors">
                          {character.name}
                        </CardTitle>
                      </div>
                      <Badge variant="secondary" className="bg-cyan-900/30 text-cyan-200 border-cyan-500/30">
                        {character.section_count || character.sections.length}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {character.title}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-400 bg-black/20 rounded-lg p-3">
                      <div className="flex items-center space-x-1">
                        <FileText className="w-3 h-3" />
                        <span>{character.word_count} palavras</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BookOpen className="w-3 h-3" />
                        <span>{character.sections.length} seções</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Detailed View */}
          <TabsContent value="detailed">
            {selectedCharacter && (
              <div className="space-y-8">
                {/* Character Header */}
                <div className="text-center mb-12">
                  <h1 className="text-6xl font-light mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                    {selectedCharacter.name}
                  </h1>
                  <p className="text-xl text-gray-300 mb-6">{selectedCharacter.title}</p>
                  
                  {/* Layout Toggle */}
                  <div className="flex items-center justify-center space-x-4 mb-6">
                    <Button
                      variant={layoutMode === 'masonry' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setLayoutMode('masonry')}
                      className="bg-purple-900/20 hover:bg-purple-900/40 border-purple-500/30"
                    >
                      <Layout className="w-4 h-4 mr-2" />
                      Masonry
                    </Button>
                    <Button
                      variant={layoutMode === 'floating' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setLayoutMode('floating')}
                      className="bg-purple-900/20 hover:bg-purple-900/40 border-purple-500/30"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Flutuante
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4" />
                      <span>{selectedCharacter.word_count} palavras</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4" />
                      <span>{selectedCharacter.sections.length} seções</span>
                    </div>
                  </div>
                  <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full mt-6"></div>
                </div>

                {/* Cards Display */}
                {layoutMode === 'masonry' ? (
                  <MasonryCards sections={selectedCharacter.sections} getSectionIcon={getSectionIcon} />
                ) : (
                  <div className="overflow-x-auto overflow-y-visible pb-20">
                    <div className="relative mx-auto" style={{ 
                      minHeight: `${Math.ceil(selectedCharacter.sections.length / Math.min(4, Math.ceil(Math.sqrt(selectedCharacter.sections.length)))) * 420 + 200}px`,
                      width: `${Math.min(4, Math.ceil(Math.sqrt(selectedCharacter.sections.length))) * 380 + 200}px`
                    }}>
                      {selectedCharacter.sections.map((section, index) => (
                        <Card 
                          key={index}
                          className="w-80 bg-gray-900/50 backdrop-blur-md border-gray-700/50 hover:bg-gray-900/70 transition-all duration-700 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 floating-card overflow-hidden"
                          style={getFloatingCardStyle(index, selectedCharacter.sections.length)}
                        >
                          <CardHeader className="pb-4 bg-gradient-to-r from-purple-900/30 to-cyan-900/30 rounded-t-lg border-b border-purple-500/20">
                            <CardTitle className="flex items-center space-x-3 text-xl font-medium">
                              <div className="p-2 bg-purple-500/20 rounded-lg">
                                {getSectionIcon(section.title)}
                              </div>
                              <span className="bg-gradient-to-r from-purple-200 via-purple-100 to-cyan-200 bg-clip-text text-transparent">
                                {section.title}
                              </span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="max-h-80 overflow-y-auto custom-scrollbar p-4">
                            <div className="space-y-3">
                              {section.content.map((item, itemIndex) => (
                                <div 
                                  key={itemIndex}
                                  className="p-4 bg-black/40 rounded-lg border border-gray-700/30 hover:border-purple-500/40 hover:bg-black/60 transition-all duration-300"
                                >
                                  {item.subtitle && (
                                    <h4 className="font-semibold text-purple-200 mb-3 text-base border-b border-purple-500/20 pb-2">
                                      {item.subtitle}
                                    </h4>
                                  )}
                                  <div className="text-gray-200 text-sm leading-relaxed">
                                    {item.text.split('\n').map((line, lineIndex) => (
                                      <p key={lineIndex} className="mb-2 last:mb-0" 
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

                {/* Character Selection */}
                <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-30">
                  <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-sm rounded-full p-2 border border-gray-700/30">
                    {characters.map((char) => (
                      <button
                        key={char.id}
                        onClick={() => setSelectedCharacter(char)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          char.id === selectedCharacter.id 
                            ? 'bg-purple-500 scale-125 shadow-lg shadow-purple-500/50' 
                            : 'bg-gray-600 hover:bg-gray-500'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .floating-card {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #6B46C1 #1F2937;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1F2937;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #6B46C1;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #7C3AED;
        }
      `}</style>
    </div>
  );
};

export default CharacterViewerStatic;
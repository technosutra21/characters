import React, { useState, useEffect, useRef } from 'react';
import { Search, Eye, Download, Maximize2, Minimize2, BookOpen, Zap, Cpu, Wifi, Database, Shield, Activity, ChevronLeft, ChevronRight, Grid, List, Filter, Settings, X, Play, Pause, RotateCcw, ZoomIn, ZoomOut, Volume2, VolumeX, Star, Heart, Share2, Menu, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Circle, Square, Triangle, Hexagon, Users, Globe, Sparkles, Binary, Code, Terminal, Layers, Orbit, Atom, Lightbulb, Target, Link, RefreshCw, Moon, Sun, Palette, Home, FileText, Image, Video, Music, MapPin, Clock, User, Tag, Info, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { CharacterParser } from '../services/CharacterParser';

const TechnoSutraGallery = () => {
  const [activeTab, setActiveTab] = useState('gallery');
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showModelViewer, setShowModelViewer] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [theme, setTheme] = useState('cyber');
  const [showSettings, setShowSettings] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [availableModels, setAvailableModels] = useState([]);
  const [stats, setStats] = useState({
    totalCharacters: 0,
    availableModels: 0,
    completionRate: 0
  });

  const parser = new CharacterParser();
  const canvasRef = useRef(null);
  const modelViewerRef = useRef(null);

  // Lista autêntica dos 56 capítulos do Avatamsaka Sutra
  const chapters = [
    { id: 1, name: "Buda Śākyamuni", title: "O Iluminado", location: "Floresta de Jetavana", occupation: "Buda", type: "buddha", filename: "Budha_Perfil.txt" },
    { id: 2, name: "Samantabhadra", title: "All Good", location: "Floresta de Jetavana", occupation: "Bodhisattva", type: "bodhisattva", filename: "Samantabhadra_Perfil.txt" },
    { id: 3, name: "Manjushri", title: "Beautiful One with Auspiciousness", location: "Floresta de Vicitrasāladhvajavyūha", occupation: "Bodhisattva", type: "bodhisattva", filename: "Manjusri_Perfil.txt" },
    { id: 4, name: "Meghaśrī", title: "Glória da Nuvem", location: "Mosteiro", occupation: "Monge", type: "monge", filename: "Meghaśrī_Perfil.txt" },
    { id: 5, name: "Sāgaramegha", title: "Nuvem do Oceano", location: "Sāgaramukha", occupation: "Monge", type: "monge", filename: "Sāgara_megha_Perfil.txt" },
    { id: 6, name: "Supratiṣṭhita", title: "Firmemente Estabelecido", location: "Laṅkā (ilha)", occupation: "Monge", type: "monge", filename: "Supratiṣṭhita_Perfil.txt" },
    { id: 7, name: "Megha", title: "Nuvem", location: "Vajrapura (cidade)", occupation: "Gramático", type: "mestre", filename: "Megha_Dravidian_Perfil.txt" },
    { id: 8, name: "Muktaka", title: "Libertado", location: "Vanavasin (floresta)", occupation: "Comunidade de meditação", type: "mestre", filename: "Muktaka_Perfil.txt" },
    { id: 9, name: "Sāgaradhvaja", title: "Bandeira da Flecha", location: "Milaspharaṇa", occupation: "Monge", type: "monge", filename: "Sāgara_dhvaja_Perfil.txt" },
    { id: 10, name: "Āśā", title: "Esperança", location: "Samudravetāḷī (cidade)", occupation: "Devota leiga", type: "devota", filename: "Āśā_Perfil.txt" },
    { id: 11, name: "Bhīṣmottaranirghoṣa", title: "Vidente Supremo Intrépido", location: "Nālayu - Ashram na floresta", occupation: "Vidente", type: "vidente", filename: "Bhīṣmottara_nirghoṣa_Perfil.txt" },
    { id: 12, name: "Jayoṣmāyatana", title: "Lugar da Vitória e do Brilho", location: "Jayoṣmāyatana (cidade)", occupation: "Brâmane", type: "bramane", filename: "Jayoṣmāyatana_Perfil.txt" },
    { id: 13, name: "Maitrayaṇī", title: "Amizade Feminina", location: "Siṃhavijṛmbhita (cidade)", occupation: "Menina", type: "criança", filename: "Maitrayaṇī_Perfil.txt" },
    { id: 14, name: "Sudarśana", title: "Bonito, de Boa Visão", location: "Trinayana (cidade)", occupation: "Mendicante", type: "mendicante", filename: "Sudarśana_Perfil.txt" },
    { id: 15, name: "Indriyeśvara", title: "Senhor das Faculdades", location: "Sumukha (cidade)", occupation: "Menino", type: "criança", filename: "Indriyeśvara_Perfil.txt" },
    { id: 16, name: "Prabhūtā", title: "Abundante", location: "Samudrapratiṣṭhāna (cidade)", occupation: "Mulher leiga", type: "devota", filename: "Prabhūtā_Perfil.txt" },
    { id: 17, name: "Vidvān", title: "Sábio", location: "Mahāsaṃbhava (cidade)", occupation: "Chefe de família", type: "leigo", filename: "Vidvān_Perfil.txt" },
    { id: 18, name: "Ratnacūḍa", title: "Coroa de Jóias", location: "Siṃhapota (cidade)", occupation: "Chefe de família", type: "leigo", filename: "Ratnacuda_Perfil.txt" },
    { id: 19, name: "Samantanetra", title: "Olhos Universais", location: "Vetramūlaka (cidade)", occupation: "Perfumista", type: "artesão", filename: "Samantanetra_Perfil.txt" },
    { id: 20, name: "Anala", title: "Sem Fogo", location: "Tāladhvaja (cidade)", occupation: "Rei", type: "rei", filename: "Anala_Perfil.txt" },
    { id: 21, name: "Mahāprabha", title: "Grande Luz", location: "Suprabha (cidade)", occupation: "Rei", type: "rei", filename: "Mahaprabha_Perfil.txt" },
    { id: 22, name: "Acalā", title: "Imóvel, Firme", location: "Sthira (cidade)", occupation: "Mulher leiga", type: "devota", filename: "Acala_Perfil.txt" },
    { id: 23, name: "Sarvagamin", title: "Aquele que Vai a Todos os Lugares", location: "Tosala (cidade)", occupation: "Mendicante", type: "mendicante", filename: "Sarvagamin_Perfil.txt" },
    { id: 24, name: "Utpalabhūti", title: "Flores de Lótus", location: "Pṛthurāṣṭra (cidade)", occupation: "Perfumista", type: "artesão", filename: "Utpalabhuti_Perfil.txt" },
    { id: 25, name: "Vaira", title: "Diamante", location: "Kuṭagāra ()", occupation: "Marinheiro", type: "marinheiro", filename: "Vaira_Perfil.txt" },
    { id: 26, name: "Jayottama", title: "Glória da Vitória", location: "Nandiḥāra (cidade)", occupation: "Ancião da cidade", type: "ancião", filename: "Jayottama_Perfil.txt" },
    { id: 27, name: "Siṃhavijṛmbhitā", title: "Cheia de Força de Leão", location: "Kaliṅgavana (floresta)", occupation: "Freira", type: "freira", filename: "Simhavijrmbhita_Perfil.txt" },
    { id: 28, name: "Vasumitrā", title: "Amiga da Terra", location: "Ratnavyūha (cidade)", occupation: "Cortesã", type: "cortesã", filename: "Vasumitra_Perfil.txt" },
    { id: 29, name: "Veṣṭhila", title: "Cercado", location: "Śubhaparaṃgama (cidade)", occupation: "Chefe de família", type: "leigo", filename: "Vesthila_Perfil.txt" },
    { id: 30, name: "Avalokiteśvara", title: "Senhor que Ouve os Clamores do Mundo", location: "Monte Potalaka (montanha)", occupation: "Bodhisattva", type: "bodhisattva", filename: "Avalokitesvara_Perfil.txt" },
    { id: 31, name: "Ananyagāmin", title: "Aquele que Vai Sem Obstáculos", location: "Reino oriental", occupation: "Viajante universal", type: "viajante", filename: "Ananyagamin_Perfil.txt" },
    { id: 32, name: "Mahādeva", title: "Grande Deva", location: "Dvāravatī (cidade)", occupation: "Deva (divindade)", type: "deva", filename: "Mahadeva_Perfil.txt" },
    { id: 33, name: "Sthāvarā", title: "A Terra", location: "Bodhimaṇḍa em Magadha", occupation: "Deusa da Terra", type: "deusa", filename: "Sthavara_Perfil.txt" },
    { id: 34, name: "Vāsantī", title: "Deusa da Noite", location: "Kapilavastu", occupation: "Deusa da Noite", type: "deusa", filename: "Vasanti_Perfil.txt" },
    { id: 35, name: "Samantagambhīraśrīvimalaprabhā", title: "Glória Profunda Universal Imaculada", location: "Bodhimaṇḍa", occupation: "Deusa da Noite", type: "deusa", filename: "Samantagambhirasrivimalapraba_Perfil.txt" },
    { id: 36, name: "Pramuditanayanajagadvirocanā", title: "Aquela que Ilumina o Mundo com Olhos Alegres", location: "Bodhimaṇḍa", occupation: "Deusa da Noite", type: "deusa", filename: "PramuditanayanaJagadVirocana_Perfil.txt" },
    { id: 37, name: "Samantasattvatrāṇojaḥśrī", title: "Glória da Proteção Universal dos Seres", location: "Bodhimaṇḍa", occupation: "Deusa da Noite", type: "deusa", filename: "SamantaSattvaTranoja_Sri_Perfil.txt" },
    { id: 38, name: "Praśantarutasāgaravatī", title: "Aquela que Possui o Oceano de Sons Pacíficos", location: "Bodhimaṇḍa", occupation: "Deusa da Noite", type: "deusa", filename: "Prasantarutasagaravati_Perfil.txt" },
    { id: 39, name: "Sarvanagararakṣāsaṃbhavatejaḥśrī", title: "Glória do Brilho Nascido da Proteção de Todas as Cidades", location: "Bodhimaṇḍa", occupation: "Deusa da Noite", type: "deusa", filename: "SarvaNagaraRaksaSambhavaTejas_Sri_Perfil.txt" },
    { id: 40, name: "Sarvavṛkṣpraphullanasukhasaṃvāsā", title: "Aquela que Habita na Felicidade de Todas as Árvores Florescendo", location: "Bodhimaṇḍa", occupation: "Deusa da Noite", type: "deusa", filename: "Sarva_Vrkspraphullana_Sukha_Samvasa_Perfil.txt" },
    { id: 41, name: "Sarvajagadrakṣāpraṇidhānavīryaprabhā", title: "Luz do Vigor dos Votos para Proteger Todo o Mundo", location: "Bodhimaṇḍa", occupation: "Deusa da Noite", type: "deusa", filename: "Sarva_Jagad_Raksa_Pranidhana_Virya_Prabha_Perfil.txt" },
    { id: 42, name: "Sutejomaṇḍalaratiśrī", title: "Deusa da Floresta de Lumbinī", location: "Lumbinī (floresta)", occupation: "Deusa da Noite", type: "deusa", filename: "Sutejomaṇḍala_Rati_Śrī_Perfil.txt" },
    { id: 43, name: "Gopā", title: "Menina", location: "Kapilavastu", occupation: "Menina", type: "criança", filename: "Gopā_Perfil.txt" },
    { id: 44, name: "Māyādevī", title: "Ilusão, Mãe do Buda", location: "Kapilavastu", occupation: "Mãe do Buda", type: "mae", filename: "Māyādevī_Perfil.txt" },
    { id: 45, name: "Surendrābhā", title: "Deusa", location: "Paraíso de Trāyastriṃśa", occupation: "Deusa dos Trinta e Três Céus", type: "deusa", filename: "Surendrābhā_Perfil.txt" },
    { id: 46, name: "Viśvāmitra", title: "Mestre Viśvāmitra", location: "Kapilavastu", occupation: "Professor/Mestre", type: "mestre", filename: "Visvamitra_Perfil.txt" },
    { id: 47, name: "Śilpābhijña", title: "Conhecedor das Artes", location: "Kapilavastu", occupation: "Mestre de letras", type: "mestre", filename: "Silpabhijna_Perfil.txt" },
    { id: 48, name: "Bhadrottamā", title: "Mulher Supremamente Excelente", location: "Vartanaka (cidade)", occupation: "Mulher leiga", type: "devota", filename: "Bhadrottama_Perfil.txt" },
    { id: 49, name: "Muktāsāra", title: "Essência da Liberação", location: "Bharukaccha (cidade)", occupation: "Ourives", type: "artesão", filename: "Muktasara_Perfil.txt" },
    { id: 50, name: "Sucandra", title: "Boa Lua", location: "Bharukaccha (cidade)", occupation: "Chefe de família", type: "leigo", filename: "Sucandra_Perfil.txt" },
    { id: 51, name: "Ajitasena", title: "Exército Invencível", location: "Roruka (cidade)", occupation: "Chefe de família", type: "leigo", filename: "Ajitasena_Perfil.txt" },
    { id: 52, name: "Śivarāgra", title: "Pico Auspicioso", location: "Vila do Dharma", occupation: "Brâmane", type: "bramane", filename: "Sivarāgra_Perfil.txt" },
    { id: 53, name: "Śrīsaṃbhava & Śrīmati", title: "Nacimento Auspicioso e Aquele Que Possui Glória", location: "Sumanamukha (cidade)", occupation: "Jovens", type: "jovens", filename: "Srisambhava_e_Srimati_Perfil.txt" },
    { id: 54, name: "Maitreya", title: "Amigo, Bodhisattva", location: "Kūṭāgāra", occupation: "Bodhisattva", type: "bodhisattva", filename: "Maitreya_Perfil.txt" },
    { id: 55, name: "Manjushri", title: "Senhor da Sabedoria", location: "Sumanāmukha", occupation: "Bodhisattva", type: "bodhisattva", filename: "Manjusri_Perfil.txt" },
    { id: 56, name: "Samantabhadra", title: "Universalmente Venerável", location: "Diante do Buda", occupation: "Bodhisattva", type: "bodhisattva", filename: "Samantabhadra_Perfil.txt" }
  ];

  // Verificar se modelo 3D existe
  const checkModelExists = async (modelId) => {
    try {
      const response = await fetch(`/models/modelo${modelId}.glb`, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  };

  // Detectar modelos disponíveis
  const detectAvailableModels = async () => {
    const detected = [];
    for (let i = 1; i <= 56; i++) {
      const exists = await checkModelExists(i);
      if (exists) {
        detected.push(i);
      }
    }
    setAvailableModels(detected);
    return detected;
  };

  // Carregar personagem do arquivo de texto
  const loadCharacterFromFile = async (filename) => {
    try {
      const response = await fetch(`/api/characters/${filename}`);
      if (!response.ok) throw new Error('Arquivo não encontrado');
      const content = await response.text();
      return parser.parseFile(content);
    } catch (error) {
      console.error('Erro ao carregar personagem:', error);
      return null;
    }
  };

  // Carregar personagens
  const loadCharacters = async () => {
    setLoading(true);
    try {
      const charactersData = [];
      for (const chapter of chapters) {
        const characterData = await loadCharacterFromFile(chapter.filename);
        if (characterData) {
          charactersData.push({
            ...chapter,
            ...characterData,
            hasModel: availableModels.includes(chapter.id)
          });
        } else {
          charactersData.push({
            ...chapter,
            content: `Personagem ${chapter.name} - ${chapter.title}`,
            hasModel: availableModels.includes(chapter.id)
          });
        }
      }
      setCharacters(charactersData);
      setFilteredCharacters(charactersData);
      
      // Atualizar estatísticas
      setStats({
        totalCharacters: charactersData.length,
        availableModels: availableModels.length,
        completionRate: Math.round((availableModels.length / 56) * 100)
      });
    } catch (error) {
      setError('Erro ao carregar personagens');
    } finally {
      setLoading(false);
    }
  };

  // Filtrar personagens
  const filterCharacters = () => {
    let filtered = characters;

    // Filtro por categoria
    if (filterCategory !== 'all') {
      filtered = filtered.filter(char => char.type === filterCategory);
    }

    // Filtro por busca
    if (searchTerm) {
      filtered = filtered.filter(char => 
        char.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        char.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        char.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        char.occupation.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenação
    filtered.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    setFilteredCharacters(filtered);
    setCurrentPage(1);
  };

  // Efeitos
  useEffect(() => {
    const init = async () => {
      await detectAvailableModels();
    };
    init();
  }, []);

  useEffect(() => {
    if (availableModels.length > 0) {
      loadCharacters();
    }
  }, [availableModels]);

  useEffect(() => {
    filterCharacters();
  }, [characters, filterCategory, searchTerm, sortBy, sortOrder]);

  // Partículas de fundo cyberpunk
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        life: Math.random() * 100,
        decay: Math.random() * 0.02 + 0.005
      });
    }

    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= particle.decay;

        if (particle.life <= 0 || particle.x < 0 || particle.x > canvas.width || particle.y < 0 || particle.y > canvas.height) {
          particles[index] = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            life: Math.random() * 100,
            decay: Math.random() * 0.02 + 0.005
          };
        }

        const alpha = particle.life / 100;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = '#00ffff';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00ffff';
        ctx.fillRect(particle.x, particle.y, 1, 1);
        ctx.restore();
      });

      // Conexões entre partículas
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const distance = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
          if (distance < 100) {
            const alpha = (1 - distance / 100) * 0.1;
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = '#00ffff';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  // Paginar resultados
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredCharacters.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredCharacters.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-black text-cyan-400 overflow-hidden relative">
      {/* Canvas de partículas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle at 20% 80%, rgba(0, 255, 255, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 0, 255, 0.03) 0%, transparent 50%)' }}
      />

      {/* Header cyberpunk */}
      <div className="relative z-10 border-b border-cyan-800/30 bg-black/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Atom className="w-8 h-8 text-black animate-spin" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  TECHNO SUTRA
                </h1>
                <p className="text-cyan-600 text-sm">3D Gallery & Character Archive</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <Badge variant="outline" className="border-cyan-600 text-cyan-400">
                  <Database className="w-3 h-3 mr-1" />
                  {stats.totalCharacters}
                </Badge>
                <Badge variant="outline" className="border-green-600 text-green-400">
                  <Cpu className="w-3 h-3 mr-1" />
                  {stats.availableModels}
                </Badge>
                <Badge variant="outline" className="border-purple-600 text-purple-400">
                  <Activity className="w-3 h-3 mr-1" />
                  {stats.completionRate}%
                </Badge>
              </div>
              
              <Button
                onClick={() => setShowSettings(!showSettings)}
                variant="outline"
                size="sm"
                className="border-cyan-600 text-cyan-400 hover:bg-cyan-600/10"
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navegação principal */}
      <div className="relative z-10 bg-black/60 backdrop-blur-sm border-b border-cyan-800/20">
        <div className="max-w-7xl mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-black/50 border-cyan-800/30">
              <TabsTrigger value="gallery" className="text-cyan-400 data-[state=active]:bg-cyan-600/20">
                <Grid className="w-4 h-4 mr-2" />
                3D Gallery
              </TabsTrigger>
              <TabsTrigger value="archive" className="text-cyan-400 data-[state=active]:bg-cyan-600/20">
                <FileText className="w-4 h-4 mr-2" />
                Character Archive
              </TabsTrigger>
              <TabsTrigger value="explorer" className="text-cyan-400 data-[state=active]:bg-cyan-600/20">
                <Globe className="w-4 h-4 mr-2" />
                Explorer
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          
          {/* Galeria 3D */}
          <TabsContent value="gallery">
            <div className="space-y-6">
              {/* Controles da galeria */}
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyan-500" />
                    <Input
                      placeholder="Buscar modelos 3D..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-black/50 border-cyan-800/30 text-cyan-400 placeholder-cyan-600 focus:border-cyan-500"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                    className="border-cyan-600 text-cyan-400 hover:bg-cyan-600/10"
                  >
                    {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
                  </Button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setAutoRotate(!autoRotate)}
                    className="border-cyan-600 text-cyan-400 hover:bg-cyan-600/10"
                  >
                    {autoRotate ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setAudioEnabled(!audioEnabled)}
                    className="border-cyan-600 text-cyan-400 hover:bg-cyan-600/10"
                  >
                    {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {/* Grid de modelos 3D */}
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
                {getCurrentPageItems().map((character) => (
                  <Card key={character.id} className="bg-black/40 border-cyan-800/30 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300 group">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="border-cyan-600 text-cyan-400">
                          #{character.id}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          {character.hasModel && (
                            <Badge variant="outline" className="border-green-600 text-green-400">
                              <Cpu className="w-3 h-3 mr-1" />
                              3D
                            </Badge>
                          )}
                          <Badge variant="outline" className="border-purple-600 text-purple-400">
                            <FileText className="w-3 h-3 mr-1" />
                            TXT
                          </Badge>
                        </div>
                      </div>
                      <CardTitle className="text-lg text-cyan-400">{character.name}</CardTitle>
                      <p className="text-sm text-cyan-600">{character.title}</p>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* Área do modelo 3D */}
                      <div className="aspect-square bg-black/60 rounded-lg border border-cyan-800/30 flex items-center justify-center relative overflow-hidden">
                        {character.hasModel ? (
                          <div className="w-full h-full relative">
                            {/* Placeholder para model-viewer */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="animate-spin">
                                <Orbit className="w-12 h-12 text-cyan-400" />
                              </div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          </div>
                        ) : (
                          <div className="text-center">
                            <AlertCircle className="w-12 h-12 text-cyan-600 mx-auto mb-2" />
                            <p className="text-sm text-cyan-600">Em desenvolvimento</p>
                          </div>
                        )}
                      </div>

                      {/* Informações */}
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <User className="w-4 h-4 text-cyan-500" />
                          <span className="text-cyan-400">{character.occupation}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <MapPin className="w-4 h-4 text-cyan-500" />
                          <span className="text-cyan-400">{character.location}</span>
                        </div>
                      </div>

                      {/* Ações */}
                      <div className="flex space-x-2">
                        {character.hasModel && (
                          <Button
                            size="sm"
                            className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-black"
                            onClick={() => {
                              setSelectedModel(character);
                              setShowModelViewer(true);
                            }}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            3D View
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 border-cyan-600 text-cyan-400 hover:bg-cyan-600/10"
                          onClick={() => {
                            setSelectedCharacter(character);
                            setActiveTab('archive');
                          }}
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Read
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Paginação */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="border-cyan-600 text-cyan-400 hover:bg-cyan-600/10"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  
                  <span className="text-cyan-400 text-sm">
                    Página {currentPage} de {totalPages}
                  </span>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="border-cyan-600 text-cyan-400 hover:bg-cyan-600/10"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Arquivo de Personagens */}
          <TabsContent value="archive">
            <div className="space-y-6">
              {/* Controles do arquivo */}
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyan-500" />
                    <Input
                      placeholder="Buscar personagens..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-black/50 border-cyan-800/30 text-cyan-400 placeholder-cyan-600 focus:border-cyan-500"
                    />
                  </div>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="bg-black/50 border border-cyan-800/30 text-cyan-400 rounded-md px-3 py-2 focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="all">Todas as categorias</option>
                    <option value="buddha">Buddha</option>
                    <option value="bodhisattva">Bodhisattva</option>
                    <option value="monge">Monge</option>
                    <option value="deusa">Deusa</option>
                    <option value="rei">Rei</option>
                    <option value="leigo">Leigo</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-black/50 border border-cyan-800/30 text-cyan-400 rounded-md px-3 py-2 focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="id">ID</option>
                    <option value="name">Nome</option>
                    <option value="occupation">Ocupação</option>
                    <option value="location">Localização</option>
                  </select>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="border-cyan-600 text-cyan-400 hover:bg-cyan-600/10"
                  >
                    {sortOrder === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {/* Lista de personagens */}
              <div className="grid gap-4">
                {getCurrentPageItems().map((character) => (
                  <Card key={character.id} className="bg-black/40 border-cyan-800/30 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300 cursor-pointer"
                        onClick={() => setSelectedCharacter(character)}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                            <span className="text-cyan-400 font-bold">#{character.id}</span>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-cyan-400">{character.name}</h3>
                            <p className="text-sm text-cyan-600">{character.title}</p>
                            <div className="flex items-center space-x-4 text-xs text-cyan-500 mt-1">
                              <span>{character.occupation}</span>
                              <span>•</span>
                              <span>{character.location}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {character.hasModel && (
                            <Badge variant="outline" className="border-green-600 text-green-400">
                              <Cpu className="w-3 h-3 mr-1" />
                              3D
                            </Badge>
                          )}
                          <Badge variant="outline" className="border-purple-600 text-purple-400">
                            <FileText className="w-3 h-3 mr-1" />
                            TXT
                          </Badge>
                          <ChevronRight className="w-5 h-5 text-cyan-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Paginação */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="border-cyan-600 text-cyan-400 hover:bg-cyan-600/10"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  
                  <span className="text-cyan-400 text-sm">
                    Página {currentPage} de {totalPages}
                  </span>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="border-cyan-600 text-cyan-400 hover:bg-cyan-600/10"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Explorer */}
          <TabsContent value="explorer">
            <div className="text-center py-20">
              <Globe className="w-16 h-16 text-cyan-400 mx-auto mb-4 animate-pulse" />
              <h3 className="text-xl text-cyan-400 mb-2">Explorer Mode</h3>
              <p className="text-cyan-600">Funcionalidade em desenvolvimento</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modal de personagem selecionado */}
      {selectedCharacter && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black/90 border border-cyan-800/30 rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-cyan-800/30">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-cyan-400">{selectedCharacter.name}</h2>
                  <p className="text-cyan-600">{selectedCharacter.title}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedCharacter(null)}
                  className="text-cyan-400 hover:bg-cyan-600/10"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-cyan-400 mb-4">Informações</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-cyan-500" />
                      <span className="text-cyan-400">{selectedCharacter.occupation}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-cyan-500" />
                      <span className="text-cyan-400">{selectedCharacter.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Tag className="w-4 h-4 text-cyan-500" />
                      <span className="text-cyan-400">{selectedCharacter.type}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-cyan-400 mb-4">Ações</h3>
                  <div className="space-y-2">
                    {selectedCharacter.hasModel && (
                      <Button
                        className="w-full bg-cyan-600 hover:bg-cyan-700 text-black"
                        onClick={() => {
                          setSelectedModel(selectedCharacter);
                          setShowModelViewer(true);
                          setSelectedCharacter(null);
                        }}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Visualizar em 3D
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      className="w-full border-cyan-600 text-cyan-400 hover:bg-cyan-600/10"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Baixar Arquivo
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-cyan-400 mb-4">Descrição</h3>
                <div className="bg-black/40 border border-cyan-800/30 rounded-lg p-4">
                  <p className="text-cyan-300 leading-relaxed">
                    {selectedCharacter.content || `Personagem ${selectedCharacter.name} do capítulo ${selectedCharacter.id} do Avatamsaka Sutra. ${selectedCharacter.title}.`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de visualizador 3D */}
      {showModelViewer && selectedModel && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black/95 border border-cyan-800/30 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b border-cyan-800/30">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-cyan-400">{selectedModel.name}</h2>
                  <p className="text-cyan-600">{selectedModel.title}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="text-cyan-400 hover:bg-cyan-600/10"
                  >
                    {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowModelViewer(false)}
                    className="text-cyan-400 hover:bg-cyan-600/10"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="relative">
              {/* Área do model-viewer */}
              <div className="aspect-video bg-black/60 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin mb-4">
                    <Orbit className="w-16 h-16 text-cyan-400 mx-auto" />
                  </div>
                  <p className="text-cyan-400">Carregando modelo 3D...</p>
                  <p className="text-cyan-600 text-sm mt-2">modelo{selectedModel.id}.glb</p>
                </div>
              </div>
              
              {/* Controles */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-cyan-600 text-cyan-400 hover:bg-cyan-600/10"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-cyan-600 text-cyan-400 hover:bg-cyan-600/10"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-cyan-600 text-cyan-400 hover:bg-cyan-600/10"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-cyan-600 text-cyan-400 hover:bg-cyan-600/10"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-cyan-600 text-cyan-400 hover:bg-cyan-600/10"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Painel de configurações */}
      {showSettings && (
        <div className="fixed top-0 right-0 h-full w-80 bg-black/95 border-l border-cyan-800/30 backdrop-blur-sm z-40 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-cyan-400">Configurações</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSettings(false)}
              className="text-cyan-400 hover:bg-cyan-600/10"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-cyan-400 mb-3">Tema</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={theme === 'cyber' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTheme('cyber')}
                  className="text-xs"
                >
                  Cyber
                </Button>
                <Button
                  variant={theme === 'dark' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTheme('dark')}
                  className="text-xs"
                >
                  Dark
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-cyan-400 mb-3">Modelo 3D</h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={autoRotate}
                    onChange={(e) => setAutoRotate(e.target.checked)}
                    className="text-cyan-400"
                  />
                  <span className="text-sm text-cyan-300">Rotação automática</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={audioEnabled}
                    onChange={(e) => setAudioEnabled(e.target.checked)}
                    className="text-cyan-400"
                  />
                  <span className="text-sm text-cyan-300">Sons de interface</span>
                </label>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-cyan-400 mb-3">Estatísticas</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-cyan-300">Total de personagens:</span>
                  <span className="text-cyan-400">{stats.totalCharacters}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-300">Modelos 3D:</span>
                  <span className="text-cyan-400">{stats.availableModels}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-300">Completude:</span>
                  <span className="text-cyan-400">{stats.completionRate}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Botão de rolagem para o topo */}
      <Button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-12 h-12 bg-cyan-600 hover:bg-cyan-700 text-black rounded-full shadow-lg z-30"
      >
        <ArrowUp className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default TechnoSutraGallery;
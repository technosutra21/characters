import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Eye, Download, Maximize2, Minimize2, BookOpen, Zap, Cpu, Database, 
  Activity, ChevronLeft, ChevronRight, Grid, List, Settings, X, Play, Pause, 
  RotateCcw, ZoomIn, ZoomOut, Volume2, VolumeX, ArrowUp, Users, Globe, 
  Sparkles, Terminal, Layers, Orbit, Atom, FileText, User, MapPin, Tag, 
  AlertCircle, Menu, Wifi, Shield, Target, Lightbulb, Binary, Code, Home,
  Clock, Info, CheckCircle, Star, Heart, Share2, Filter, RefreshCw, Moon,
  Sun, Palette, Image, Video, Music, Link, Bluetooth, Radio, Mic, MicOff,
  Speaker, SpeakerOff, Monitor, Smartphone, Tablet, Watch, Tv, Camera,
  Projector, Printer, Router, Server, HardDrive, Usb, Ethernet, Rss,
  TrendingUp, TrendingDown, BarChart, PieChart, Activity2, Zap2, Flash,
  Bolt, Lightning, Fire, Flame, Snowflake, Droplets, Wind, CloudRain,
  CloudSnow, Sun2, Moon2, Star2, Stars, Sparkles2, Comet, Orbit2, Planet,
  Satellite, Rocket, Ufo, Anchor, Boat, Car, Plane, Train, Truck, Bike,
  Scooter, Skateboard, Wheelchair, Footprints, Flag, Pyramid, Mountain,
  Volcano, Island, Desert, Forest, Tree, Flower, Leaf, Mushroom, Cactus,
  Seedling, Herb, Clover, Cherry, Apple, Banana, Orange, Lemon, Lime,
  Coconut, Avocado, Grapes, Strawberry, Melon, Watermelon, Pineapple,
  Mango, Peach, Pear, Tomato, Corn, Carrot, Potato, Onion, Garlic,
  Pepper, Chili, Cucumber, Lettuce, Broccoli, Cabbage, Spinach, Kale,
  Celery, Asparagus, Headphones, Gamepad2, Loader2
} from 'lucide-react';

const MobileOptimizedGallery = () => {
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
  const [showSettings, setShowSettings] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Reduced for mobile
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [availableModels, setAvailableModels] = useState([]);
  const [stats, setStats] = useState({
    totalCharacters: 0,
    availableModels: 0,
    completionRate: 0
  });
  const [particles, setParticles] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [showStats, setShowStats] = useState(false);
  const [connectionLines, setConnectionLines] = useState([]);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [matrixRain, setMatrixRain] = useState(true);
  const [neonGlow, setNeonGlow] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [orientation, setOrientation] = useState('portrait');
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const canvasRef = useRef(null);
  const matrixCanvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const containerRef = useRef(null);

  // Lista autêntica dos 56 capítulos do Avatamsaka Sutra
  const chapters = [
    { id: 1, name: "Buda Śākyamuni", title: "O Iluminado", location: "Floresta de Jetavana", occupation: "Buda", type: "buddha", filename: "Budha_Perfil.txt" },
    { id: 2, name: "Samantabhadra", title: "All Good", location: "Floresta de Jetavana", occupation: "Bodhisattva", type: "bodhisattva", filename: "Samantabhadra_Perfil.txt" },
    { id: 3, name: "Manjushri", title: "Beautiful One with Auspiciousness", location: "Floresta de Vicitrasāladhvajavyūha", occupation: "Bodhisattva", type: "bodhisattva", filename: "Manjusri_Perfil.txt" },
    { id: 30, name: "Avalokiteśvara", title: "Senhor que Ouve os Clamores do Mundo", location: "Monte Potalaka (montanha)", occupation: "Bodhisattva", type: "bodhisattva", filename: "Avalokitesvara_Perfil.txt" },
    { id: 54, name: "Maitreya", title: "Amigo, Bodhisattva", location: "Kūṭāgāra", occupation: "Bodhisattva", type: "bodhisattva", filename: "Maitreya_Perfil.txt" },
    { id: 55, name: "Manjushri", title: "Senhor da Sabedoria", location: "Sumanāmukha", occupation: "Bodhisattva", type: "bodhisattva", filename: "Manjusri_Perfil.txt" },
    { id: 56, name: "Samantabhadra", title: "Universalmente Venerável", location: "Diante do Buda", occupation: "Bodhisattva", type: "bodhisattva", filename: "Samantabhadra_Perfil.txt" }
  ];

  // Detectar dispositivo móvel
  const detectDevice = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    setIsMobile(width < 768);
    setIsTablet(width >= 768 && width < 1024);
    setOrientation(width > height ? 'landscape' : 'portrait');
  };

  // Carregar personagem do arquivo de texto
  const loadCharacterFromFile = async (filename) => {
    try {
      const response = await fetch(`/characters/${filename}`);
      if (!response.ok) {
        console.warn(`Arquivo ${filename} não encontrado`);
        return null;
      }
      const content = await response.text();
      return { content, filename };
    } catch (error) {
      console.error(`Erro ao carregar personagem ${filename}:`, error);
      return null;
    }
  };

  // Detectar modelos disponíveis
  const detectAvailableModels = async () => {
    // Simular alguns modelos disponíveis para demonstração
    const simulatedModels = [1, 2, 3, 30, 54, 55, 56];
    setAvailableModels(simulatedModels);
    return simulatedModels;
  };

  // Carregar personagens
  const loadCharacters = async () => {
    setLoading(true);
    try {
      const charactersData = [];
      for (const chapter of chapters) {
        const characterData = await loadCharacterFromFile(chapter.filename);
        charactersData.push({
          ...chapter,
          content: characterData?.content || `Personagem ${chapter.name} - ${chapter.title}`,
          hasModel: availableModels.includes(chapter.id)
        });
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

  // Inicializar partículas (menos partículas para mobile)
  const initParticles = () => {
    const particleCount = isMobile ? 50 : 100;
    const newParticles = [];
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        life: Math.random() * 100,
        decay: Math.random() * 0.02 + 0.005,
        size: Math.random() * 1.5 + 0.5,
        color: Math.random() > 0.5 ? '#00ffff' : '#ff0080',
        pulse: Math.random() * Math.PI * 2
      });
    }
    setParticles(newParticles);
  };

  // Animação de partículas otimizada para mobile
  const animateParticles = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    setParticles(prevParticles => {
      return prevParticles.map(particle => {
        // Atualizar posição
        particle.x += particle.vx * animationSpeed;
        particle.y += particle.vy * animationSpeed;
        particle.life -= particle.decay;
        particle.pulse += 0.05; // Slower pulse for mobile

        // Efeito de atração ao touch/mouse (reduzido para mobile)
        const dx = mousePos.x - particle.x;
        const dy = mousePos.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < (isMobile ? 50 : 100)) {
          const force = (distance / (isMobile ? 50 : 100));
          particle.vx += dx * force * 0.00005;
          particle.vy += dy * force * 0.00005;
        }

        // Resetar partícula se morreu
        if (particle.life <= 0 || particle.x < 0 || particle.x > canvas.width || 
            particle.y < 0 || particle.y > canvas.height) {
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
          particle.vx = (Math.random() - 0.5) * 0.5;
          particle.vy = (Math.random() - 0.5) * 0.5;
          particle.life = Math.random() * 100;
          particle.color = Math.random() > 0.5 ? '#00ffff' : '#ff0080';
        }

        // Desenhar partícula
        const alpha = (particle.life / 100) * (0.3 + Math.sin(particle.pulse) * 0.2);
        const size = particle.size * (1 + Math.sin(particle.pulse) * 0.2);
        
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = particle.color;
        if (neonGlow && !isMobile) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = particle.color;
        }
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        return particle;
      });
    });
  };

  // Matrix rain effect (desabilitado no mobile para performance)
  const animateMatrixRain = () => {
    if (!matrixCanvasRef.current || !matrixRain || isMobile) return;
    
    const canvas = matrixCanvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-={}[]|:;<>,.?/~`';
    const fontSize = 12;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ffff';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  };

  // Touch handling
  const handleTouchStart = (e) => {
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };

  const handleTouchMove = (e) => {
    if (!touchStart) return;
    
    const currentTouch = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    };
    
    setMousePos(currentTouch);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    
    const touchEnd = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY
    };
    
    const deltaX = touchEnd.x - touchStart.x;
    const deltaY = touchEnd.y - touchStart.y;
    
    // Swipe gestures
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 50) {
        // Swipe right
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      } else if (deltaX < -50) {
        // Swipe left
        const totalPages = Math.ceil(filteredCharacters.length / itemsPerPage);
        if (currentPage < totalPages) {
          setCurrentPage(currentPage + 1);
        }
      }
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Haptic feedback para mobile
  const vibrate = (pattern = 50) => {
    if (navigator.vibrate && isMobile) {
      navigator.vibrate(pattern);
    }
  };

  // Audio context para efeitos sonoros
  const initAudioContext = () => {
    if (!audioContextRef.current && audioEnabled) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
  };

  // Tocar som de interface
  const playSound = (frequency = 440, duration = 50) => {
    if (!audioEnabled || !audioContextRef.current || isMobile) return;
    
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.05, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration / 1000);
    
    oscillator.start();
    oscillator.stop(audioContextRef.current.currentTime + duration / 1000);
  };

  // Efeitos
  useEffect(() => {
    const init = async () => {
      detectDevice();
      await detectAvailableModels();
      initParticles();
      initAudioContext();
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

  useEffect(() => {
    const animationLoop = () => {
      animateParticles();
      requestAnimationFrame(animationLoop);
    };
    if (!isMobile || animationSpeed > 0.5) {
      animationLoop();
    }
  }, [particles, mousePos, animationSpeed, neonGlow, isMobile]);

  useEffect(() => {
    if (!isMobile) {
      const cleanup = animateMatrixRain();
      return cleanup;
    }
  }, [matrixRain, isMobile]);

  useEffect(() => {
    const handleResize = () => {
      detectDevice();
      initParticles();
    };
    
    const handleMouseMove = (e) => {
      if (!isMobile) {
        setMousePos({ x: e.clientX, y: e.clientY });
      }
    };
    
    const handleClick = () => {
      if (audioEnabled) playSound(800, 30);
      vibrate(10);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, [audioEnabled, isMobile]);

  // Paginar resultados
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredCharacters.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredCharacters.length / itemsPerPage);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <Orbit className="w-12 h-12 text-cyan-400 mx-auto" />
          </div>
          <p className="text-cyan-400 text-lg">Inicializando TECHNO SUTRA...</p>
          <p className="text-cyan-600 text-sm mt-2">Carregando matriz de dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`min-h-screen bg-black text-cyan-400 overflow-hidden relative ${glitchEffect ? 'animate-pulse' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Canvas de partículas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ 
          background: 'radial-gradient(circle at 20% 80%, rgba(0, 255, 255, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 0, 255, 0.02) 0%, transparent 50%)',
          opacity: isMobile ? 0.5 : 1
        }}
      />

      {/* Matrix rain canvas - apenas desktop */}
      {!isMobile && matrixRain && (
        <canvas
          ref={matrixCanvasRef}
          className="fixed inset-0 pointer-events-none z-0 opacity-10"
        />
      )}

      {/* Header mobile-optimized */}
      <div className="relative z-10 border-b border-cyan-800/30 bg-black/90 backdrop-blur-sm">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Atom className="w-6 h-6 text-black animate-spin" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  TECHNO SUTRA
                </h1>
                <p className="text-cyan-600 text-xs">3D Gallery & Archive</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Stats badges - compact for mobile */}
              <div className="flex items-center space-x-1">
                <div className="flex items-center space-x-1 bg-black/50 px-2 py-1 rounded-full border border-cyan-600/30">
                  <Database className="w-3 h-3 text-cyan-400" />
                  <span className="text-cyan-400 text-xs">{stats.totalCharacters}</span>
                </div>
                <div className="flex items-center space-x-1 bg-black/50 px-2 py-1 rounded-full border border-green-600/30">
                  <Cpu className="w-3 h-3 text-green-400" />
                  <span className="text-green-400 text-xs">{stats.availableModels}</span>
                </div>
              </div>
              
              <button
                onClick={() => {
                  setShowMobileMenu(!showMobileMenu);
                  vibrate(10);
                }}
                className="w-10 h-10 bg-black/50 border border-cyan-600/30 rounded-lg flex items-center justify-center active:bg-cyan-600/20"
              >
                <Menu className="w-5 h-5 text-cyan-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {showMobileMenu && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex">
          <div className="w-full max-w-sm bg-black/90 border-r border-cyan-800/30 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-cyan-400">Menu</h3>
              <button
                onClick={() => setShowMobileMenu(false)}
                className="w-8 h-8 bg-black/50 border border-cyan-600/30 rounded-lg flex items-center justify-center"
              >
                <X className="w-4 h-4 text-cyan-400" />
              </button>
            </div>
            
            <div className="space-y-4">
              {[
                { id: 'gallery', label: '3D Gallery', icon: Grid },
                { id: 'archive', label: 'Character Archive', icon: FileText },
                { id: 'explorer', label: 'Explorer', icon: Globe }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => {
                    setActiveTab(id);
                    setShowMobileMenu(false);
                    vibrate(10);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeTab === id
                      ? 'bg-cyan-600/20 text-cyan-400 border border-cyan-600/50'
                      : 'text-cyan-600 hover:bg-cyan-600/10 hover:text-cyan-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{label}</span>
                </button>
              ))}
              
              <div className="border-t border-cyan-800/30 pt-4">
                <button
                  onClick={() => {
                    setShowSettings(true);
                    setShowMobileMenu(false);
                    vibrate(10);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-cyan-600 hover:bg-cyan-600/10 hover:text-cyan-400 transition-all duration-200"
                >
                  <Settings className="w-5 h-5" />
                  <span className="font-medium">Configurações</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex-1" onClick={() => setShowMobileMenu(false)} />
        </div>
      )}

      {/* Conteúdo principal */}
      <div className="relative z-10 px-4 py-6">
        {/* Galeria 3D */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            {/* Controles da galeria - mobile optimized */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyan-500" />
                <input
                  type="text"
                  placeholder="Buscar modelos 3D..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black/50 border border-cyan-800/30 rounded-lg text-cyan-400 placeholder-cyan-600 focus:border-cyan-500 focus:outline-none text-base"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
                    vibrate(10);
                  }}
                  className="flex-1 bg-black/50 border border-cyan-600/30 rounded-lg py-3 px-4 flex items-center justify-center space-x-2 active:bg-cyan-600/20"
                >
                  {viewMode === 'grid' ? <List className="w-4 h-4 text-cyan-400" /> : <Grid className="w-4 h-4 text-cyan-400" />}
                  <span className="text-cyan-400 text-sm">{viewMode === 'grid' ? 'Lista' : 'Grade'}</span>
                </button>
                
                <button
                  onClick={() => {
                    setAutoRotate(!autoRotate);
                    vibrate(10);
                  }}
                  className={`flex-1 border rounded-lg py-3 px-4 flex items-center justify-center space-x-2 ${
                    autoRotate 
                      ? 'bg-cyan-600/20 border-cyan-600/50 text-cyan-400' 
                      : 'bg-black/50 border-cyan-600/30 text-cyan-600 active:bg-cyan-600/10'
                  }`}
                >
                  {autoRotate ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span className="text-sm">Auto</span>
                </button>
              </div>
            </div>

            {/* Grid de modelos 3D - mobile optimized */}
            <div className={`grid gap-4 ${
              viewMode === 'grid' 
                ? (isMobile ? 'grid-cols-1' : 'grid-cols-2') 
                : 'grid-cols-1'
            }`}>
              {getCurrentPageItems().map((character) => (
                <div key={character.id} className="bg-black/40 border border-cyan-800/30 rounded-lg backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300 overflow-hidden">
                  <div className="p-4 border-b border-cyan-800/20">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-1 bg-black/50 px-2 py-1 rounded-full border border-cyan-600/30">
                        <span className="text-cyan-400 text-sm font-mono">#{character.id}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {character.hasModel && (
                          <div className="flex items-center space-x-1 bg-black/50 px-2 py-1 rounded-full border border-green-600/30">
                            <Cpu className="w-3 h-3 text-green-400" />
                            <span className="text-green-400 text-xs">3D</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-1 bg-black/50 px-2 py-1 rounded-full border border-purple-600/30">
                          <FileText className="w-3 h-3 text-purple-400" />
                          <span className="text-purple-400 text-xs">TXT</span>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-cyan-400 mb-1">{character.name}</h3>
                    <p className="text-sm text-cyan-600 mb-2">{character.title}</p>
                    <div className="flex items-center space-x-2 text-xs text-cyan-500">
                      <User className="w-3 h-3" />
                      <span>{character.occupation}</span>
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-4">
                    {/* Área do modelo 3D */}
                    <div className="aspect-square bg-black/60 rounded-lg border border-cyan-800/30 flex items-center justify-center relative overflow-hidden">
                      {character.hasModel ? (
                        <div className="w-full h-full relative">
                          {/* Placeholder para model-viewer */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="animate-spin">
                              <Orbit className="w-8 h-8 text-cyan-400" />
                            </div>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute top-2 right-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center">
                          <AlertCircle className="w-8 h-8 text-cyan-600 mx-auto mb-2 opacity-50" />
                          <p className="text-xs text-cyan-600">Em desenvolvimento</p>
                        </div>
                      )}
                    </div>

                    {/* Informações adicionais */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin className="w-4 h-4 text-cyan-500" />
                        <span className="text-cyan-400 truncate">{character.location}</span>
                      </div>
                    </div>

                    {/* Ações */}
                    <div className="flex space-x-2">
                      {character.hasModel && (
                        <button
                          onClick={() => {
                            setSelectedModel(character);
                            setShowModelViewer(true);
                            vibrate(20);
                          }}
                          className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 active:from-cyan-700 active:to-blue-700 text-black font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                        >
                          <Eye className="w-4 h-4" />
                          <span>3D View</span>
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setSelectedCharacter(character);
                          setActiveTab('archive');
                          vibrate(10);
                        }}
                        className="flex-1 bg-black/50 border border-cyan-600/30 text-cyan-400 active:bg-cyan-600/20 py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Read</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Paginação mobile */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-4 mt-8">
                <button
                  onClick={() => {
                    setCurrentPage(Math.max(1, currentPage - 1));
                    vibrate(10);
                  }}
                  disabled={currentPage === 1}
                  className="w-12 h-12 bg-black/50 border border-cyan-600/30 rounded-lg flex items-center justify-center active:bg-cyan-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5 text-cyan-400" />
                </button>
                
                <div className="flex items-center space-x-2">
                  <span className="text-cyan-400 text-sm bg-black/50 px-4 py-2 rounded-full border border-cyan-600/30">
                    {currentPage} / {totalPages}
                  </span>
                </div>
                
                <button
                  onClick={() => {
                    setCurrentPage(Math.min(totalPages, currentPage + 1));
                    vibrate(10);
                  }}
                  disabled={currentPage === totalPages}
                  className="w-12 h-12 bg-black/50 border border-cyan-600/30 rounded-lg flex items-center justify-center active:bg-cyan-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5 text-cyan-400" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Arquivo de Personagens */}
        {activeTab === 'archive' && (
          <div className="space-y-6">
            <div className="text-center py-20">
              <FileText className="w-16 h-16 text-cyan-400 mx-auto mb-4 animate-pulse" />
              <h3 className="text-xl text-cyan-400 mb-2">Character Archive</h3>
              <p className="text-cyan-600">Arquivo de personagens em desenvolvimento</p>
            </div>
          </div>
        )}

        {/* Explorer */}
        {activeTab === 'explorer' && (
          <div className="text-center py-20">
            <Globe className="w-16 h-16 text-cyan-400 mx-auto mb-4 animate-pulse" />
            <h3 className="text-xl text-cyan-400 mb-2">Explorer Mode</h3>
            <p className="text-cyan-600">Funcionalidade em desenvolvimento</p>
          </div>
        )}
      </div>

      {/* Modal de visualizador 3D - mobile optimized */}
      {showModelViewer && selectedModel && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black/95 border border-cyan-800/30 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b border-cyan-800/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center border border-cyan-600/30">
                    <span className="text-cyan-400 font-bold text-sm">#{selectedModel.id}</span>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-cyan-400">{selectedModel.name}</h2>
                    <p className="text-cyan-600 text-sm">{selectedModel.title}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setIsFullscreen(!isFullscreen);
                      vibrate(10);
                    }}
                    className="w-10 h-10 bg-black/50 border border-cyan-600/30 rounded-lg flex items-center justify-center active:bg-cyan-600/20"
                  >
                    {isFullscreen ? <Minimize2 className="w-5 h-5 text-cyan-400" /> : <Maximize2 className="w-5 h-5 text-cyan-400" />}
                  </button>
                  <button
                    onClick={() => {
                      setShowModelViewer(false);
                      vibrate(10);
                    }}
                    className="w-10 h-10 bg-black/50 border border-cyan-600/30 rounded-lg flex items-center justify-center active:bg-cyan-600/20"
                  >
                    <X className="w-5 h-5 text-cyan-400" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="relative">
              {/* Área do model-viewer */}
              <div className="aspect-video bg-black/60 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin mb-4">
                    <Orbit className="w-12 h-12 text-cyan-400 mx-auto" />
                  </div>
                  <p className="text-cyan-400 text-lg">Carregando modelo 3D...</p>
                  <p className="text-cyan-600 text-sm mt-2">modelo{selectedModel.id}.glb</p>
                  <div className="mt-4 space-y-2">
                    <div className="w-48 h-1 bg-black/50 rounded-full mx-auto overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                    </div>
                    <p className="text-cyan-500 text-xs">Processando geometria...</p>
                  </div>
                </div>
              </div>
              
              {/* Controles mobile */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => vibrate(10)}
                    className="w-10 h-10 bg-black/50 border border-cyan-600/30 rounded-lg flex items-center justify-center active:bg-cyan-600/20"
                  >
                    <RotateCcw className="w-4 h-4 text-cyan-400" />
                  </button>
                  <button
                    onClick={() => vibrate(10)}
                    className="w-10 h-10 bg-black/50 border border-cyan-600/30 rounded-lg flex items-center justify-center active:bg-cyan-600/20"
                  >
                    <ZoomIn className="w-4 h-4 text-cyan-400" />
                  </button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => vibrate(10)}
                    className="w-10 h-10 bg-black/50 border border-cyan-600/30 rounded-lg flex items-center justify-center active:bg-cyan-600/20"
                  >
                    <Download className="w-4 h-4 text-cyan-400" />
                  </button>
                  <button
                    onClick={() => vibrate(10)}
                    className="w-10 h-10 bg-black/50 border border-cyan-600/30 rounded-lg flex items-center justify-center active:bg-cyan-600/20"
                  >
                    <Share2 className="w-4 h-4 text-cyan-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Painel de configurações mobile */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex">
          <div className="w-full max-w-sm bg-black/90 border-r border-cyan-800/30 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-cyan-400">Configurações</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="w-8 h-8 bg-black/50 border border-cyan-600/30 rounded-lg flex items-center justify-center"
              >
                <X className="w-4 h-4 text-cyan-400" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-cyan-400 mb-3">Efeitos Visuais</h4>
                <div className="space-y-3">
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-cyan-300">Brilho neon</span>
                    <input
                      type="checkbox"
                      checked={neonGlow}
                      onChange={(e) => setNeonGlow(e.target.checked)}
                      className="w-5 h-5 bg-black border-cyan-600 text-cyan-400 rounded focus:ring-cyan-500"
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-cyan-300">Matrix rain</span>
                    <input
                      type="checkbox"
                      checked={matrixRain && !isMobile}
                      onChange={(e) => setMatrixRain(e.target.checked)}
                      disabled={isMobile}
                      className="w-5 h-5 bg-black border-cyan-600 text-cyan-400 rounded focus:ring-cyan-500 disabled:opacity-50"
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-cyan-300">Rotação automática</span>
                    <input
                      type="checkbox"
                      checked={autoRotate}
                      onChange={(e) => setAutoRotate(e.target.checked)}
                      className="w-5 h-5 bg-black border-cyan-600 text-cyan-400 rounded focus:ring-cyan-500"
                    />
                  </label>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-cyan-400 mb-3">Animações</h4>
                <div className="space-y-2">
                  <label className="block text-sm text-cyan-300">
                    Velocidade das animações
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="2"
                    step="0.1"
                    value={animationSpeed}
                    onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
                    className="w-full h-2 bg-black border-cyan-600 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-xs text-cyan-500">{animationSpeed}x</span>
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
              
              <div>
                <h4 className="text-sm font-medium text-cyan-400 mb-3">Dispositivo</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-cyan-300">Tipo:</span>
                    <span className="text-cyan-400">{isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cyan-300">Orientação:</span>
                    <span className="text-cyan-400">{orientation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cyan-300">Partículas:</span>
                    <span className="text-cyan-400">{particles.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1" onClick={() => setShowSettings(false)} />
        </div>
      )}

      {/* FAB - Floating Action Button */}
      <button
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          vibrate(10);
        }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-cyan-600 to-blue-600 active:from-cyan-700 active:to-blue-700 text-black rounded-full shadow-lg z-30 flex items-center justify-center transition-all duration-200"
      >
        <ArrowUp className="w-6 h-6" />
      </button>

      {/* Indicador de status */}
      <div className="fixed bottom-6 left-6 flex items-center space-x-2 z-30">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-green-400 text-xs">Online</span>
      </div>
    </div>
  );
};

export default MobileOptimizedGallery;
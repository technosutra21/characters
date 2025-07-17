import React, { useState, useEffect, useRef } from 'react';
import { Search, Eye, Download, Maximize2, Minimize2, BookOpen, Zap, Cpu, Wifi, Database, Shield, Activity, ChevronLeft, ChevronRight, Grid, List, Filter, Settings, X, Play, Pause, RotateCcw, ZoomIn, ZoomOut, Volume2, VolumeX, Star, Heart, Share2, Menu, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Circle, Square, Triangle, Hexagon, Users, Globe, Sparkles, Binary, Code, Terminal, Layers, Orbit, Atom, Lightbulb, Target, Link, RefreshCw, Moon, Sun, Palette, Home, FileText, Image, Video, Music, MapPin, Clock, User, Tag, Info, AlertCircle, CheckCircle, Loader2, Headphones, Gamepad2, Wifi3, WifiOff, Bluetooth, BluetoothOff, Radio, Mic, MicOff, Speaker, SpeakerOff, Monitor, Smartphone, Tablet, Watch, Tv, Camera, Projector, Printer, Router, Server, HardDrive, Usb, Ethernet, Rss, TrendingUp, TrendingDown, BarChart, PieChart, Activity2, Zap2, Flash, Bolt, Lightning, Fire, Flame, Snowflake, Droplets, Wind, CloudRain, CloudSnow, Sun2, Moon2, Star2, Stars, Sparkles2, Comet, Orbit2, Planet, Satellite, Rocket, Ufo, Anchor, Boat, Car, Plane, Train, Truck, Bike, Scooter, Skateboard, Wheelchair, Footprints, Flag, Pyramid, Mountain, Volcano, Island, Desert, Forest, Tree, Flower, Leaf, Mushroom, Cactus, Seedling, Herb, Clover, Cherry, Apple, Banana, Orange, Lemon, Lime, Coconut, Avocado, Grapes, Strawberry, Melon, Watermelon, Pineapple, Mango, Peach, Pear, Tomato, Corn, Carrot, Potato, Onion, Garlic, Pepper, Chili, Cucumber, Lettuce, Broccoli, Cabbage, Spinach, Kale, Celery, Asparagus, Mushroom2, Peanut, Almond, Walnut, Chestnut, Hazelnut, Pistachio, Cashew, Macadamia, Pecan, Brazil, Pine, Coconut2, Olive, Grape, Raisin, Date, Fig, Persimmon, Pomegranate, Kiwi, Passion, Dragon, Lychee, Rambutan, Durian, Jackfruit, Breadfruit, Plantain, Guava, Papaya, Starfruit, Tamarind, Soursop, Custard, Sugar, Bitter, Sweet, Sour, Salty, Spicy, Hot, Cold, Warm, Cool, Dry, Wet, Soft, Hard, Smooth, Rough, Sharp, Dull, Bright, Dark, Light, Heavy, Thick, Thin, Wide, Narrow, Tall, Short, Long, Small, Big, Huge, Tiny, Mini, Micro, Nano, Mega, Giga, Tera, Peta, Exa, Zetta, Yotta, Kilo, Hecto, Deka, Deci, Centi, Milli, Byte, Bit, Pixel, Vector, Scalar, Matrix, Array, List2, Set, Map, Hash, Tree2, Graph, Node, Edge, Vertex, Path, Route, Link2, Chain, Loop, Cycle, Spiral, Helix, Curve, Line, Point, Angle, Shape, Form, Pattern, Texture, Surface, Volume, Space, Time, Speed, Velocity, Acceleration, Force, Energy, Power, Pressure, Temperature, Humidity, Density, Weight, Mass, Length, Width, Height, Depth, Area, Perimeter, Circumference, Diameter, Radius, Arc, Chord, Sector, Segment, Polygon, Circle2, Square2, Triangle2, Rectangle, Rhombus, Trapezoid, Parallelogram, Pentagon, Hexagon2, Octagon, Decagon, Dodecagon, Icosagon, Ellipse, Oval, Sphere, Cube, Prism, Pyramid2, Cone, Cylinder, Torus, Tetrahedron, Octahedron, Dodecahedron, Icosahedron, Fractal, Mandelbrot, Julia, Sierpinski, Koch, Cantor, Menger, Hilbert, Peano, Dragon2, Gosper, Levy, Minkowski, Vicsek, Barnsley, Henon, Lorenz, Rossler, Chua, Duffing, Vanderpol, Pendulum, Oscillator, Wave, Sine, Cosine, Tangent, Cotangent, Secant, Cosecant, Logarithm, Exponential, Polynomial, Rational, Irrational, Transcendental, Algebraic, Geometric, Arithmetic, Harmonic, Fibonacci, Golden, Pi, E, Phi, Tau, Infinity, Null, Void, Empty, Full, Complete, Incomplete, Partial, Total, Sum, Product, Difference, Quotient, Remainder, Modulo, Factorial, Permutation, Combination, Probability, Statistics, Mean, Median, Mode, Range, Variance, Deviation, Correlation, Regression, Distribution, Normal, Uniform, Exponential2, Poisson, Binomial, Hypergeometric, Geometric2, Negative, Positive, Zero, One, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten, Eleven, Twelve, Thirteen, Fourteen, Fifteen, Sixteen, Seventeen, Eighteen, Nineteen, Twenty, Thirty, Forty, Fifty, Sixty, Seventy, Eighty, Ninety, Hundred, Thousand, Million, Billion, Trillion, Quadrillion, Quintillion, Sextillion, Septillion, Octillion, Nonillion, Decillion, Googol, Googolplex, Aleph, Beth, Gimel, Daleth, He, Vav, Zayin, Het, Tet, Yod, Kaf, Lamed, Mem, Nun, Samekh, Ayin, Pe, Tsade, Qof, Resh, Shin, Tav, Alpha, Beta, Gamma, Delta, Epsilon, Zeta, Eta, Theta, Iota, Kappa, Lambda, Mu, Nu, Xi, Omicron, Pi2, Rho, Sigma, Tau2, Upsilon, Phi2, Chi, Psi, Omega, Alif, Ba, Ta, Tha, Jim, Ha, Kha, Dal, Dhal, Ra, Zay, Sin, Shin2, Sad, Dad, Ta2, Za, Ain, Ghain, Fa, Qaf, Kaf2, Lam, Mim, Nun2, Ha2, Waw, Ya, Hamza, Aleph2, Bet, Gimel2, Dalet, He2, Vav2, Zayin2, Chet, Tet2, Yod2, Kaf3, Lamed2, Mem2, Nun3, Samech, Ayin2, Pe2, Tsadi, Qof2, Resh2, Shin3, Tav2, A, B, C, D, E2, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, Y, Z } from 'lucide-react';

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
  const [particles, setParticles] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [showStats, setShowStats] = useState(false);
  const [connectionLines, setConnectionLines] = useState([]);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [matrixRain, setMatrixRain] = useState(true);
  const [neonGlow, setNeonGlow] = useState(true);
  const [screenSaver, setScreenSaver] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());

  const canvasRef = useRef(null);
  const matrixCanvasRef = useRef(null);
  const audioContextRef = useRef(null);

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

  // Inicializar partículas
  const initParticles = () => {
    const newParticles = [];
    for (let i = 0; i < 150; i++) {
      newParticles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        life: Math.random() * 100,
        decay: Math.random() * 0.02 + 0.005,
        size: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? '#00ffff' : '#ff0080',
        pulse: Math.random() * Math.PI * 2
      });
    }
    setParticles(newParticles);
  };

  // Animação de partículas
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
        particle.pulse += 0.1;

        // Efeito de atração ao mouse
        const dx = mousePos.x - particle.x;
        const dy = mousePos.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.vx += dx * force * 0.0001;
          particle.vy += dy * force * 0.0001;
        }

        // Resetar partícula se morreu
        if (particle.life <= 0 || particle.x < 0 || particle.x > canvas.width || 
            particle.y < 0 || particle.y > canvas.height) {
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
          particle.vx = (Math.random() - 0.5) * 0.8;
          particle.vy = (Math.random() - 0.5) * 0.8;
          particle.life = Math.random() * 100;
          particle.color = Math.random() > 0.5 ? '#00ffff' : '#ff0080';
        }

        // Desenhar partícula
        const alpha = (particle.life / 100) * (0.5 + Math.sin(particle.pulse) * 0.3);
        const size = particle.size * (1 + Math.sin(particle.pulse) * 0.3);
        
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = particle.color;
        ctx.shadowBlur = neonGlow ? 20 : 0;
        ctx.shadowColor = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        return particle;
      });
    });

    // Desenhar conexões
    if (connectionLines.length > 0) {
      ctx.strokeStyle = '#00ffff';
      ctx.lineWidth = 0.5;
      ctx.globalAlpha = 0.3;
      
      connectionLines.forEach(line => {
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.stroke();
      });
    }
  };

  // Matrix rain effect
  const animateMatrixRain = () => {
    if (!matrixCanvasRef.current || !matrixRain) return;
    
    const canvas = matrixCanvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-={}[]|:;<>,.?/~`';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    // Inicializar drops
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

    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  };

  // Glitch effect
  const triggerGlitch = () => {
    setGlitchEffect(true);
    setTimeout(() => setGlitchEffect(false), 200);
  };

  // Audio context para efeitos sonoros
  const initAudioContext = () => {
    if (!audioContextRef.current && audioEnabled) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
  };

  // Tocar som de interface
  const playSound = (frequency = 440, duration = 100) => {
    if (!audioEnabled || !audioContextRef.current) return;
    
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration / 1000);
    
    oscillator.start();
    oscillator.stop(audioContextRef.current.currentTime + duration / 1000);
  };

  // Detectar inatividade para screensaver
  const resetActivity = () => {
    setLastActivity(Date.now());
    setScreenSaver(false);
  };

  // Efeitos
  useEffect(() => {
    const init = async () => {
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
    animationLoop();
  }, [particles, mousePos, animationSpeed, neonGlow]);

  useEffect(() => {
    const cleanup = animateMatrixRain();
    return cleanup;
  }, [matrixRain]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      resetActivity();
    };
    
    const handleClick = () => {
      if (audioEnabled) playSound(800, 50);
      resetActivity();
    };

    const handleKeyPress = () => {
      resetActivity();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [audioEnabled]);

  // Screensaver
  useEffect(() => {
    const checkInactivity = () => {
      if (Date.now() - lastActivity > 300000) { // 5 minutos
        setScreenSaver(true);
      }
    };

    const interval = setInterval(checkInactivity, 10000);
    return () => clearInterval(interval);
  }, [lastActivity]);

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
            <Orbit className="w-16 h-16 text-cyan-400 mx-auto" />
          </div>
          <p className="text-cyan-400 text-xl">Inicializando TECHNO SUTRA...</p>
          <p className="text-cyan-600 text-sm mt-2">Carregando matriz de dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-black text-cyan-400 overflow-hidden relative ${glitchEffect ? 'animate-pulse' : ''}`}>
      {/* Canvas de partículas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle at 20% 80%, rgba(0, 255, 255, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 0, 255, 0.03) 0%, transparent 50%)' }}
      />

      {/* Matrix rain canvas */}
      {matrixRain && (
        <canvas
          ref={matrixCanvasRef}
          className="fixed inset-0 pointer-events-none z-0 opacity-20"
        />
      )}

      {/* Screensaver */}
      {screenSaver && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center"
             onClick={resetActivity}>
          <div className="text-center">
            <div className="animate-bounce mb-4">
              <Orbit className="w-24 h-24 text-cyan-400 mx-auto animate-spin" />
            </div>
            <p className="text-cyan-400 text-2xl">TECHNO SUTRA</p>
            <p className="text-cyan-600 text-sm mt-2">Modo hibernação ativo</p>
            <p className="text-cyan-800 text-xs mt-4">Clique para reativar</p>
          </div>
        </div>
      )}

      {/* Header cyberpunk */}
      <div className="relative z-10 border-b border-cyan-800/30 bg-black/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center relative overflow-hidden">
                <Atom className="w-8 h-8 text-black animate-spin" />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20"></div>
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
                <div className="flex items-center space-x-1 bg-black/50 px-3 py-1 rounded-full border border-cyan-600/30">
                  <Database className="w-3 h-3 text-cyan-400" />
                  <span className="text-cyan-400">{stats.totalCharacters}</span>
                </div>
                <div className="flex items-center space-x-1 bg-black/50 px-3 py-1 rounded-full border border-green-600/30">
                  <Cpu className="w-3 h-3 text-green-400" />
                  <span className="text-green-400">{stats.availableModels}</span>
                </div>
                <div className="flex items-center space-x-1 bg-black/50 px-3 py-1 rounded-full border border-purple-600/30">
                  <Activity className="w-3 h-3 text-purple-400" />
                  <span className="text-purple-400">{stats.completionRate}%</span>
                </div>
              </div>
              
              <button
                onClick={() => {
                  setShowSettings(!showSettings);
                  if (audioEnabled) playSound(600, 50);
                }}
                className="w-10 h-10 bg-black/50 border border-cyan-600/30 rounded-lg flex items-center justify-center hover:bg-cyan-600/10 transition-all duration-200"
              >
                <Settings className="w-4 h-4 text-cyan-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navegação principal */}
      <div className="relative z-10 bg-black/60 backdrop-blur-sm border-b border-cyan-800/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex space-x-1">
              {[
                { id: 'gallery', label: '3D Gallery', icon: Grid },
                { id: 'archive', label: 'Character Archive', icon: FileText },
                { id: 'explorer', label: 'Explorer', icon: Globe }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => {
                    setActiveTab(id);
                    if (audioEnabled) playSound(400, 50);
                  }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === id
                      ? 'bg-cyan-600/20 text-cyan-400 border border-cyan-600/50'
                      : 'text-cyan-600 hover:bg-cyan-600/10 hover:text-cyan-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{label}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  triggerGlitch();
                  if (audioEnabled) playSound(1000, 100);
                }}
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <Zap className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => {
                  setShowStats(!showStats);
                  if (audioEnabled) playSound(500, 50);
                }}
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <Activity className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Galeria 3D */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            {/* Controles da galeria */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyan-500" />
                  <input
                    type="text"
                    placeholder="Buscar modelos 3D..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-black/50 border border-cyan-800/30 rounded-lg text-cyan-400 placeholder-cyan-600 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>
                <button
                  onClick={() => {
                    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
                    if (audioEnabled) playSound(600, 50);
                  }}
                  className="w-10 h-10 bg-black/50 border border-cyan-600/30 rounded-lg flex items-center justify-center hover:bg-cyan-600/10 transition-all duration-200"
                >
                  {viewMode === 'grid' ? <List className="w-4 h-4 text-cyan-400" /> : <Grid className="w-4 h-4 text-cyan-400" />}
                </button>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setAutoRotate(!autoRotate);
                    if (audioEnabled) playSound(500, 50);
                  }}
                  className={`w-10 h-10 border rounded-lg flex items-center justify-center transition-all duration-200 ${
                    autoRotate ? 'bg-cyan-600/20 border-cyan-600/50 text-cyan-400' : 'bg-black/50 border-cyan-600/30 text-cyan-600 hover:bg-cyan-600/10'
                  }`}
                >
                  {autoRotate ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => {
                    setAudioEnabled(!audioEnabled);
                    if (!audioEnabled) playSound(800, 100);
                  }}
                  className={`w-10 h-10 border rounded-lg flex items-center justify-center transition-all duration-200 ${
                    audioEnabled ? 'bg-cyan-600/20 border-cyan-600/50 text-cyan-400' : 'bg-black/50 border-cyan-600/30 text-cyan-600 hover:bg-cyan-600/10'
                  }`}
                >
                  {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Grid de modelos 3D */}
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
              {getCurrentPageItems().map((character) => (
                <div key={character.id} className="bg-black/40 border border-cyan-800/30 rounded-lg backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300 group overflow-hidden">
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
                              <Orbit className="w-12 h-12 text-cyan-400" />
                            </div>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute top-2 right-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center">
                          <AlertCircle className="w-12 h-12 text-cyan-600 mx-auto mb-2 opacity-50" />
                          <p className="text-sm text-cyan-600">Em desenvolvimento</p>
                        </div>
                      )}
                    </div>

                    {/* Informações adicionais */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin className="w-4 h-4 text-cyan-500" />
                        <span className="text-cyan-400">{character.location}</span>
                      </div>
                    </div>

                    {/* Ações */}
                    <div className="flex space-x-2">
                      {character.hasModel && (
                        <button
                          onClick={() => {
                            setSelectedModel(character);
                            setShowModelViewer(true);
                            if (audioEnabled) playSound(800, 100);
                          }}
                          className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-black font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                        >
                          <Eye className="w-4 h-4" />
                          <span>3D View</span>
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setSelectedCharacter(character);
                          setActiveTab('archive');
                          if (audioEnabled) playSound(600, 50);
                        }}
                        className="flex-1 bg-black/50 border border-cyan-600/30 text-cyan-400 hover:bg-cyan-600/10 py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Read</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Paginação */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-8">
                <button
                  onClick={() => {
                    setCurrentPage(Math.max(1, currentPage - 1));
                    if (audioEnabled) playSound(400, 50);
                  }}
                  disabled={currentPage === 1}
                  className="w-10 h-10 bg-black/50 border border-cyan-600/30 rounded-lg flex items-center justify-center hover:bg-cyan-600/10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4 text-cyan-400" />
                </button>
                
                <div className="flex items-center space-x-2">
                  <span className="text-cyan-400 text-sm bg-black/50 px-3 py-1 rounded-full border border-cyan-600/30">
                    {currentPage} / {totalPages}
                  </span>
                </div>
                
                <button
                  onClick={() => {
                    setCurrentPage(Math.min(totalPages, currentPage + 1));
                    if (audioEnabled) playSound(400, 50);
                  }}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 bg-black/50 border border-cyan-600/30 rounded-lg flex items-center justify-center hover:bg-cyan-600/10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4 text-cyan-400" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Arquivo de Personagens */}
        {activeTab === 'archive' && (
          <div className="space-y-6">
            {/* Controles do arquivo */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyan-500" />
                  <input
                    type="text"
                    placeholder="Buscar personagens..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-black/50 border border-cyan-800/30 rounded-lg text-cyan-400 placeholder-cyan-600 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="bg-black/50 border border-cyan-800/30 text-cyan-400 rounded-lg px-3 py-2 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
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
                  className="bg-black/50 border border-cyan-800/30 text-cyan-400 rounded-lg px-3 py-2 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                >
                  <option value="id">ID</option>
                  <option value="name">Nome</option>
                  <option value="occupation">Ocupação</option>
                  <option value="location">Localização</option>
                </select>
                <button
                  onClick={() => {
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    if (audioEnabled) playSound(500, 50);
                  }}
                  className="w-10 h-10 bg-black/50 border border-cyan-600/30 rounded-lg flex items-center justify-center hover:bg-cyan-600/10 transition-all duration-200"
                >
                  {sortOrder === 'asc' ? <ArrowUp className="w-4 h-4 text-cyan-400" /> : <ArrowDown className="w-4 h-4 text-cyan-400" />}
                </button>
              </div>
            </div>

            {/* Lista de personagens */}
            <div className="space-y-4">
              {getCurrentPageItems().map((character) => (
                <div key={character.id} className="bg-black/40 border border-cyan-800/30 rounded-lg backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300 cursor-pointer overflow-hidden"
                     onClick={() => {
                       setSelectedCharacter(character);
                       if (audioEnabled) playSound(600, 50);
                     }}>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center border border-cyan-600/30">
                          <span className="text-cyan-400 font-bold text-sm">#{character.id}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-cyan-400 mb-1">{character.name}</h3>
                          <p className="text-sm text-cyan-600 mb-2">{character.title}</p>
                          <div className="flex items-center space-x-4 text-xs text-cyan-500">
                            <div className="flex items-center space-x-1">
                              <User className="w-3 h-3" />
                              <span>{character.occupation}</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>{character.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
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
                        <ChevronRight className="w-5 h-5 text-cyan-500" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Paginação */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-8">
                <button
                  onClick={() => {
                    setCurrentPage(Math.max(1, currentPage - 1));
                    if (audioEnabled) playSound(400, 50);
                  }}
                  disabled={currentPage === 1}
                  className="w-10 h-10 bg-black/50 border border-cyan-600/30 rounded-lg flex items-center justify-center hover:bg-cyan-600/10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4 text-cyan-400" />
                </button>
                
                <div className="flex items-center space-x-2">
                  <span className="text-cyan-400 text-sm bg-black/50 px-3 py-1 rounded-full border border-cyan-600/30">
                    {currentPage} / {totalPages}
                  </span>
                </div>
                
                <button
                  onClick={() => {
                    setCurrentPage(Math.min(totalPages, currentPage + 1));
                    if (audioEnabled) playSound(400, 50);
                  }}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 bg-black/50 border border-cyan-600/30 rounded-lg flex items-center justify-center hover:bg-cyan-600/10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4 text-cyan-400" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Explorer */}
        {activeTab === 'explorer' && (
          <div className="text-center py-20">
            <div className="animate-bounce mb-4">
              <Globe className="w-16 h-16 text-cyan-400 mx-auto animate-pulse" />
            </div>
            <h3 className="text-2xl text-cyan-400 mb-2">Explorer Mode</h3>
            <p className="text-cyan-600 mb-4">Funcionalidade em desenvolvimento</p>
            <div className="bg-black/40 border border-cyan-800/30 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-cyan-500 text-sm">
                Esta seção permitirá explorar conexões entre personagens, 
                visualizar mapas interativos e navegar pela jornada do Avatamsaka Sutra.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Modal de personagem selecionado */}
      {selectedCharacter && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black/90 border border-cyan-800/30 rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-cyan-800/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center border border-cyan-600/30">
                    <span className="text-cyan-400 font-bold">#{selectedCharacter.id}</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-cyan-400">{selectedCharacter.name}</h2>
                    <p className="text-cyan-600">{selectedCharacter.title}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedCharacter(null);
                    if (audioEnabled) playSound(400, 50);
                  }}
                  className="w-10 h-10 bg-black/50 border border-cyan-600/30 rounded-lg flex items-center justify-center hover:bg-cyan-600/10 transition-all duration-200"
                >
                  <X className="w-5 h-5 text-cyan-400" />
                </button>
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
                      <button
                        onClick={() => {
                          setSelectedModel(selectedCharacter);
                          setShowModelViewer(true);
                          setSelectedCharacter(null);
                          if (audioEnabled) playSound(800, 100);
                        }}
                        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-black font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Visualizar em 3D</span>
                      </button>
                    )}
                    <button
                      onClick={() => {
                        // Download do arquivo
                        if (audioEnabled) playSound(600, 100);
                      }}
                      className="w-full bg-black/50 border border-cyan-600/30 text-cyan-400 hover:bg-cyan-600/10 py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Baixar Arquivo</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-cyan-400 mb-4">Descrição</h3>
                <div className="bg-black/40 border border-cyan-800/30 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <pre className="text-cyan-300 leading-relaxed whitespace-pre-wrap font-mono text-sm">
                    {selectedCharacter.content || `Personagem ${selectedCharacter.name} do capítulo ${selectedCharacter.id} do Avatamsaka Sutra. ${selectedCharacter.title}.`}
                  </pre>
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
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center border border-cyan-600/30">
                    <span className="text-cyan-400 font-bold text-sm">#{selectedModel.id}</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-cyan-400">{selectedModel.name}</h2>
                    <p className="text-cyan-600">{selectedModel.title}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setIsFullscreen(!isFullscreen);
                      if (audioEnabled) playSound(700, 50);
                    }}
                    className="w-10 h-10 bg-black/50 border border-cyan-600/30 rounded-lg flex items-center justify-center hover:bg-cyan-600/10 transition-all duration-200"
                  >
                    {isFullscreen ? <Minimize2 className="w-5 h-5 text-cyan-400" /> : <Maximize2 className="w-5 h-5 text-cyan-400" />}
                  </button>
                  <button
                    onClick={() => {
                      setShowModelViewer(false);
                      if (audioEnabled) playSound(400, 50);
                    }}
                    className="w-10 h-10 bg-black/50 border border-cyan-600/30 rounded-lg flex items-center justify-center hover:bg-cyan-600/10 transition-all duration-200"
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
                    <Orbit className="w-16 h-16 text-cyan-400 mx-auto" />
                  </div>
                  <p className="text-cyan-400 text-xl">Carregando modelo 3D...</p>
                  <p className="text-cyan-600 text-sm mt-2">modelo{selectedModel.id}.glb</p>
                  <div className="mt-4 space-y-2">
                    <div className="w-64 h-1 bg-black/50 rounded-full mx-auto overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                    </div>
                    <p className="text-cyan-500 text-xs">Processando geometria...</p>
                  </div>
                </div>
              </div>
              
              {/* Controles */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      if (audioEnabled) playSound(500, 50);
                    }}
                    className="w-10 h-10 bg-black/50 border border-cyan-600/30 rounded-lg flex items-center justify-center hover:bg-cyan-600/10 transition-all duration-200"
                  >
                    <RotateCcw className="w-4 h-4 text-cyan-400" />
                  </button>
                  <button
                    onClick={() => {
                      if (audioEnabled) playSound(600, 50);
                    }}
                    className="w-10 h-10 bg-black/50 border border-cyan-600/30 rounded-lg flex items-center justify-center hover:bg-cyan-600/10 transition-all duration-200"
                  >
                    <ZoomIn className="w-4 h-4 text-cyan-400" />
                  </button>
                  <button
                    onClick={() => {
                      if (audioEnabled) playSound(500, 50);
                    }}
                    className="w-10 h-10 bg-black/50 border border-cyan-600/30 rounded-lg flex items-center justify-center hover:bg-cyan-600/10 transition-all duration-200"
                  >
                    <ZoomOut className="w-4 h-4 text-cyan-400" />
                  </button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      if (audioEnabled) playSound(700, 100);
                    }}
                    className="w-10 h-10 bg-black/50 border border-cyan-600/30 rounded-lg flex items-center justify-center hover:bg-cyan-600/10 transition-all duration-200"
                  >
                    <Download className="w-4 h-4 text-cyan-400" />
                  </button>
                  <button
                    onClick={() => {
                      if (audioEnabled) playSound(600, 50);
                    }}
                    className="w-10 h-10 bg-black/50 border border-cyan-600/30 rounded-lg flex items-center justify-center hover:bg-cyan-600/10 transition-all duration-200"
                  >
                    <Share2 className="w-4 h-4 text-cyan-400" />
                  </button>
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
            <button
              onClick={() => {
                setShowSettings(false);
                if (audioEnabled) playSound(400, 50);
              }}
              className="w-8 h-8 bg-black/50 border border-cyan-600/30 rounded-lg flex items-center justify-center hover:bg-cyan-600/10 transition-all duration-200"
            >
              <X className="w-4 h-4 text-cyan-400" />
            </button>
          </div>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-cyan-400 mb-3">Efeitos Visuais</h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={neonGlow}
                    onChange={(e) => setNeonGlow(e.target.checked)}
                    className="bg-black border-cyan-600 text-cyan-400 rounded focus:ring-cyan-500"
                  />
                  <span className="text-sm text-cyan-300">Brilho neon</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={matrixRain}
                    onChange={(e) => setMatrixRain(e.target.checked)}
                    className="bg-black border-cyan-600 text-cyan-400 rounded focus:ring-cyan-500"
                  />
                  <span className="text-sm text-cyan-300">Matrix rain</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={autoRotate}
                    onChange={(e) => setAutoRotate(e.target.checked)}
                    className="bg-black border-cyan-600 text-cyan-400 rounded focus:ring-cyan-500"
                  />
                  <span className="text-sm text-cyan-300">Rotação automática</span>
                </label>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-cyan-400 mb-3">Áudio</h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={audioEnabled}
                    onChange={(e) => setAudioEnabled(e.target.checked)}
                    className="bg-black border-cyan-600 text-cyan-400 rounded focus:ring-cyan-500"
                  />
                  <span className="text-sm text-cyan-300">Sons de interface</span>
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
                  className="w-full bg-black border-cyan-600 text-cyan-400 rounded focus:ring-cyan-500"
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
              <h4 className="text-sm font-medium text-cyan-400 mb-3">Diagnóstico</h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-cyan-300">Partículas ativas:</span>
                  <span className="text-cyan-400">{particles.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-300">FPS:</span>
                  <span className="text-cyan-400">60</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-300">Posição mouse:</span>
                  <span className="text-cyan-400">{mousePos.x}, {mousePos.y}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Botão de rolagem para o topo */}
      <button
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          if (audioEnabled) playSound(500, 50);
        }}
        className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-br from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-black rounded-full shadow-lg z-30 flex items-center justify-center transition-all duration-200"
      >
        <ArrowUp className="w-6 h-6" />
      </button>

      {/* Indicador de status */}
      <div className="fixed bottom-6 left-6 flex items-center space-x-2 z-30">
        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-green-400 text-sm">Sistema Online</span>
      </div>
    </div>
  );
};

export default TechnoSutraGallery;
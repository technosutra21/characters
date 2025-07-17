import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { User, BookOpen, Heart, Sparkles, MapPin, Zap, Star, Layers, Wand2 } from 'lucide-react';

const MasonryCards = ({ sections, getSectionIcon, processMarkdownText }) => {
  const [columns, setColumns] = useState(3);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        if (width < 768) setColumns(1);
        else if (width < 1024) setColumns(2);
        else if (width < 1440) setColumns(3);
        else setColumns(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Trigger animation after component mounts
    setTimeout(() => setIsLoaded(true), 100);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Enhanced processing function with more formatting options
  const enhancedProcessMarkdownText = (text) => {
    if (!text) return text;
    
    return processMarkdownText ? processMarkdownText(text) : text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-cyan-300 bg-cyan-500/10 px-1 rounded">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="font-semibold text-purple-300 bg-purple-500/10 px-1 rounded">$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-800 text-cyan-400 px-2 py-1 rounded text-sm font-mono">$1</code>');
  };

  const getColumnItems = () => {
    const columnItems = Array.from({ length: columns }, () => []);
    
    sections.forEach((section, index) => {
      const columnIndex = index % columns;
      columnItems[columnIndex].push({ ...section, originalIndex: index });
    });
    
    return columnItems;
  };

  const getCardHeight = (section) => {
    const baseHeight = 200;
    const contentHeight = section.content.length * 80;
    return Math.min(baseHeight + contentHeight, 600);
  };

  const getSectionColor = (title) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('básicas') || titleLower.includes('informações')) 
      return { from: 'from-blue-900/40', to: 'to-indigo-900/40', accent: 'blue' };
    if (titleLower.includes('física') || titleLower.includes('descrição')) 
      return { from: 'from-emerald-900/40', to: 'to-teal-900/40', accent: 'emerald' };
    if (titleLower.includes('espirituais') || titleLower.includes('características')) 
      return { from: 'from-rose-900/40', to: 'to-pink-900/40', accent: 'rose' };
    if (titleLower.includes('místicas') || titleLower.includes('experiência')) 
      return { from: 'from-purple-900/40', to: 'to-violet-900/40', accent: 'purple' };
    if (titleLower.includes('localização') || titleLower.includes('contexto')) 
      return { from: 'from-amber-900/40', to: 'to-orange-900/40', accent: 'amber' };
    if (titleLower.includes('especiais') || titleLower.includes('ensinamento')) 
      return { from: 'from-cyan-900/40', to: 'to-sky-900/40', accent: 'cyan' };
    return { from: 'from-gray-900/40', to: 'to-slate-900/40', accent: 'gray' };
  };

  const columnItems = getColumnItems();

  return (
    <div ref={containerRef} className="w-full max-w-7xl mx-auto px-6">
      <div className="flex gap-8 items-start">
        {columnItems.map((column, columnIndex) => (
          <div key={columnIndex} className="flex-1 space-y-8">
            {column.map((section, itemIndex) => {
              const colors = getSectionColor(section.title);
              const cardId = `card-${section.originalIndex}`;
              
              return (
                <Card 
                  key={section.originalIndex}
                  className={`group relative bg-gray-800/30 backdrop-blur-xl border-gray-700/50 hover:bg-gray-800/50 transition-all duration-700 transform hover:scale-105 hover:shadow-2xl hover:shadow-${colors.accent}-500/20 overflow-hidden hover:border-${colors.accent}-400/50 cursor-pointer`}
                  style={{
                    animationDelay: `${section.originalIndex * 0.15}s`,
                    animation: isLoaded ? 'slideInUp 0.8s ease-out forwards' : 'none',
                    opacity: isLoaded ? 1 : 0
                  }}
                  onMouseEnter={() => setHoveredCard(cardId)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r ${colors.from} ${colors.to} blur-xl`}></div>
                  
                  {/* Card Header */}
                  <CardHeader className={`relative z-10 pb-6 bg-gradient-to-r ${colors.from} ${colors.to} border-b border-${colors.accent}-500/30`}>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`relative p-3 bg-gradient-to-r from-${colors.accent}-500/20 to-${colors.accent}-400/20 rounded-xl group-hover:from-${colors.accent}-500/30 group-hover:to-${colors.accent}-400/30 transition-all duration-300`}>
                          {getSectionIcon(section.title)}
                          {hoveredCard === cardId && (
                            <div className={`absolute -top-1 -right-1 w-4 h-4 bg-${colors.accent}-500 rounded-full flex items-center justify-center animate-pulse`}>
                              <Sparkles className="w-2 h-2 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <span className={`text-xl font-medium bg-gradient-to-r from-${colors.accent}-200 via-${colors.accent}-100 to-white bg-clip-text text-transparent`}>
                            {section.title}
                          </span>
                          <div className="flex items-center space-x-2 mt-2">
                            <Layers className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-400">{section.content.length} itens</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 bg-${colors.accent}-500 rounded-full animate-pulse`}></div>
                        <Star className={`w-4 h-4 text-${colors.accent}-400 fill-${colors.accent}-400/30`} />
                      </div>
                    </CardTitle>
                  </CardHeader>
                  
                  {/* Card Content */}
                  <CardContent className="relative z-10 p-6 max-h-96 overflow-y-auto custom-scrollbar">
                    <div className="space-y-4">
                      {section.content.map((item, itemIndex) => (
                        <div 
                          key={itemIndex}
                          className={`group/item relative p-5 bg-gray-900/50 rounded-xl border border-gray-700/50 hover:border-${colors.accent}-500/50 hover:bg-gray-900/70 transition-all duration-300 backdrop-blur-sm`}
                        >
                          {/* Item glow effect */}
                          <div className={`absolute inset-0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-${colors.accent}-500/5 to-transparent rounded-xl`}></div>
                          
                          {item.subtitle && (
                            <div className="relative z-10 mb-4">
                              <h4 className={`font-semibold text-${colors.accent}-200 text-lg border-b border-${colors.accent}-500/30 pb-3 flex items-center space-x-2`}>
                                <Wand2 className="w-4 h-4" />
                                <span>{item.subtitle}</span>
                              </h4>
                            </div>
                          )}
                          
                          <div className="relative z-10 text-gray-200 leading-relaxed">
                            {item.text.split('\n').map((line, lineIndex) => (
                              <p key={lineIndex} className="mb-3 last:mb-0 text-base" 
                                 dangerouslySetInnerHTML={{
                                   __html: enhancedProcessMarkdownText(line)
                                 }}
                              />
                            ))}
                          </div>
                          
                          {/* Decorative corner */}
                          <div className={`absolute top-2 right-2 w-1 h-1 bg-${colors.accent}-500 rounded-full opacity-50 group-hover/item:opacity-100 transition-opacity duration-300`}></div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Section footer */}
                    <div className="mt-6 pt-4 border-t border-gray-700/30">
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 bg-${colors.accent}-500 rounded-full animate-pulse`}></div>
                          <span>Seção mística</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Sparkles className="w-3 h-3" />
                          <span>Explorado</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  
                  {/* Bottom accent line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-${colors.accent}-500 to-${colors.accent}-400 opacity-50 group-hover:opacity-100 transition-opacity duration-300`}></div>
                </Card>
              );
            })}
          </div>
        ))}
      </div>
      
      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(60px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        
        .floating-card {
          animation: float 6s ease-in-out infinite;
        }
        
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #8B5CF6 #374151;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
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
        
        .backdrop-blur-xl {
          backdrop-filter: blur(24px);
        }
      `}</style>
    </div>
  );
};

export default MasonryCards;
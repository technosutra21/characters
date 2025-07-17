import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { User, BookOpen, Heart, Sparkles, MapPin, Zap } from 'lucide-react';

const MasonryCards = ({ sections, getSectionIcon }) => {
  const [columns, setColumns] = useState(3);
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
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Function to process markdown-like formatting
  const processMarkdownText = (text) => {
    if (!text) return text;
    
    // Process **bold** and *italic* formatting
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-purple-200">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="font-semibold text-purple-300">$1</em>');
  };

  const getColumnItems = () => {
    const columnItems = Array.from({ length: columns }, () => []);
    
    sections.forEach((section, index) => {
      const columnIndex = index % columns;
      columnItems[columnIndex].push({ ...section, originalIndex: index });
    });
    
    return columnItems;
  };

  const columnItems = getColumnItems();

  return (
    <div ref={containerRef} className="w-full max-w-7xl mx-auto px-4">
      <div className="flex gap-6 items-start">
        {columnItems.map((column, columnIndex) => (
          <div key={columnIndex} className="flex-1 space-y-6">
            {column.map((section, itemIndex) => (
              <Card 
                key={section.originalIndex}
                className="bg-gray-900/50 backdrop-blur-md border-gray-700/50 hover:bg-gray-900/70 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 floating-card overflow-hidden"
                style={{
                  animationDelay: `${section.originalIndex * 0.1}s`,
                  animation: 'fadeInUp 0.8s ease-out forwards'
                }}
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
                <CardContent className="p-4">
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
        ))}
      </div>
    </div>
  );
};

export default MasonryCards;
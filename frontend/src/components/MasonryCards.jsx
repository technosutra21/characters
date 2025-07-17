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
                className="bg-gray-900/40 backdrop-blur-md border-gray-700/40 hover:bg-gray-900/60 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 floating-card"
                style={{
                  animationDelay: `${section.originalIndex * 0.1}s`,
                  animation: 'fadeInUp 0.8s ease-out forwards'
                }}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-lg font-light">
                    {getSectionIcon(section.title)}
                    <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      {section.title}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <div 
                        key={itemIndex}
                        className="p-3 bg-black/30 rounded-lg border border-gray-700/20 hover:border-purple-500/30 transition-all duration-300"
                      >
                        {item.subtitle && (
                          <h4 className="font-medium text-purple-300 mb-2 text-sm">
                            {item.subtitle}
                          </h4>
                        )}
                        <div className="text-gray-300 text-sm leading-relaxed">
                          {item.text.split('\n').map((line, lineIndex) => (
                            <p key={lineIndex} className="mb-1 last:mb-0">
                              {line}
                            </p>
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
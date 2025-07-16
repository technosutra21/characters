import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, Sparkles, BookOpen, User, MapPin, Heart, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { mockCharacters } from '../data/mock';

const CharacterViewer = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCharacters, setFilteredCharacters] = useState(mockCharacters);
  const [currentSections, setCurrentSections] = useState([]);

  useEffect(() => {
    const filtered = mockCharacters.filter(char =>
      char.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      char.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCharacters(filtered);
  }, [searchTerm]);

  useEffect(() => {
    if (filteredCharacters[selectedCharacter]) {
      setCurrentSections(filteredCharacters[selectedCharacter].sections);
    }
  }, [selectedCharacter, filteredCharacters]);

  const nextCharacter = () => {
    setSelectedCharacter((prev) => (prev + 1) % filteredCharacters.length);
  };

  const prevCharacter = () => {
    setSelectedCharacter((prev) => (prev - 1 + filteredCharacters.length) % filteredCharacters.length);
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

  const currentChar = filteredCharacters[selectedCharacter];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 p-6 border-b border-gray-800/30 backdrop-blur-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar personagem..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64 bg-gray-800/50 border-gray-700 focus:border-purple-500 transition-all duration-300"
              />
            </div>
            <div className="text-sm text-gray-400">
              {filteredCharacters.length} personagens encontrados
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={prevCharacter}
              className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 transition-all duration-300"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <div className="text-sm font-medium px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700">
              {selectedCharacter + 1} / {filteredCharacters.length}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={nextCharacter}
              className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 transition-all duration-300"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Character Content */}
      {currentChar && (
        <div className="relative z-10 p-6 max-w-7xl mx-auto">
          {/* Character Header */}
          <div className="mb-8 text-center">
            <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {currentChar.name}
            </h1>
            <p className="text-xl text-gray-300 mb-4">{currentChar.title}</p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full"></div>
          </div>

          {/* Sections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentSections.map((section, index) => (
              <Card 
                key={index}
                className="bg-gray-800/30 backdrop-blur-sm border-gray-700/50 hover:bg-gray-800/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 0.8s ease-out forwards'
                }}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-lg">
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
                        className="p-3 bg-gray-900/50 rounded-lg border border-gray-700/30 hover:border-purple-500/30 transition-all duration-300"
                      >
                        {item.subtitle && (
                          <h4 className="font-semibold text-purple-300 mb-2 text-sm">
                            {item.subtitle}
                          </h4>
                        )}
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Character Navigation */}
          <div className="mt-12 flex justify-center space-x-2">
            {filteredCharacters.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedCharacter(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === selectedCharacter 
                    ? 'bg-purple-500 scale-125' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      )}

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
      `}</style>
    </div>
  );
};

export default CharacterViewer;
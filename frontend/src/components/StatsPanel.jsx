import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  BookOpen, 
  Sparkles, 
  Star,
  Zap,
  Eye,
  Heart,
  Target,
  Award,
  Crown
} from 'lucide-react';

const StatsPanel = ({ characters, isVisible, onClose }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isVisible && characters.length > 0) {
      calculateStats();
    }
  }, [isVisible, characters]);

  const calculateStats = () => {
    setLoading(true);
    
    const totalCharacters = characters.length;
    const totalWords = characters.reduce((sum, char) => sum + (char.word_count || 0), 0);
    const totalSections = characters.reduce((sum, char) => sum + (char.sections?.length || 0), 0);
    
    // Calculate averages
    const avgWordsPerChar = Math.round(totalWords / totalCharacters);
    const avgSectionsPerChar = Math.round(totalSections / totalCharacters);
    
    // Find most common sections
    const sectionCounts = {};
    characters.forEach(char => {
      char.sections?.forEach(section => {
        sectionCounts[section.title] = (sectionCounts[section.title] || 0) + 1;
      });
    });
    
    const mostCommonSections = Object.entries(sectionCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([title, count]) => ({ title, count }));
    
    // Character rankings
    const topByWords = [...characters]
      .sort((a, b) => (b.word_count || 0) - (a.word_count || 0))
      .slice(0, 3);
    
    const topBySections = [...characters]
      .sort((a, b) => (b.sections?.length || 0) - (a.sections?.length || 0))
      .slice(0, 3);
    
    // Character types
    const typeCounts = {};
    characters.forEach(char => {
      const type = char.title || 'Desconhecido';
      typeCounts[type] = (typeCounts[type] || 0) + 1;
    });
    
    const characterTypes = Object.entries(typeCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([type, count]) => ({ type, count }));
    
    setStats({
      totalCharacters,
      totalWords,
      totalSections,
      avgWordsPerChar,
      avgSectionsPerChar,
      mostCommonSections,
      topByWords,
      topBySections,
      characterTypes
    });
    
    setLoading(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl">
              <BarChart3 className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-3xl font-light bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Estatísticas Místicas
              </h2>
              <p className="text-gray-400 mt-1">Análise detalhada dos seus personagens</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
          >
            <Eye className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-cyan-400">
                    <Users className="w-5 h-5" />
                    <span>Total de Personagens</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-2">
                    {stats.totalCharacters}
                  </div>
                  <p className="text-sm text-gray-400">Universo místico</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-purple-400">
                    <BookOpen className="w-5 h-5" />
                    <span>Total de Palavras</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-2">
                    {stats.totalWords.toLocaleString()}
                  </div>
                  <p className="text-sm text-gray-400">Histórias épicas</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-emerald-400">
                    <Target className="w-5 h-5" />
                    <span>Total de Seções</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-2">
                    {stats.totalSections}
                  </div>
                  <p className="text-sm text-gray-400">Aspectos detalhados</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-amber-400">
                    <TrendingUp className="w-5 h-5" />
                    <span>Média de Palavras</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-2">
                    {stats.avgWordsPerChar}
                  </div>
                  <p className="text-sm text-gray-400">Por personagem</p>
                </CardContent>
              </Card>
            </div>

            {/* Rankings */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-yellow-400">
                    <Crown className="w-5 h-5" />
                    <span>Top por Palavras</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats.topByWords.map((char, index) => (
                      <div key={char.id} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            index === 0 ? 'bg-yellow-500 text-black' :
                            index === 1 ? 'bg-gray-400 text-black' :
                            'bg-amber-600 text-white'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <div className="text-white font-medium">{char.name}</div>
                            <div className="text-xs text-gray-400">{char.title}</div>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-yellow-900/30 text-yellow-300 border-yellow-500/50">
                          {char.word_count?.toLocaleString() || 0}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-blue-400">
                    <Award className="w-5 h-5" />
                    <span>Top por Seções</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats.topBySections.map((char, index) => (
                      <div key={char.id} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            index === 0 ? 'bg-blue-500 text-white' :
                            index === 1 ? 'bg-indigo-400 text-white' :
                            'bg-purple-600 text-white'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <div className="text-white font-medium">{char.name}</div>
                            <div className="text-xs text-gray-400">{char.title}</div>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-blue-900/30 text-blue-300 border-blue-500/50">
                          {char.sections?.length || 0}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-green-400">
                    <Sparkles className="w-5 h-5" />
                    <span>Seções Mais Comuns</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {stats.mostCommonSections.map((section, index) => (
                      <div key={section.title} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-white">{section.title}</span>
                        </div>
                        <Badge variant="outline" className="bg-green-900/30 text-green-300 border-green-500/50">
                          {section.count}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-purple-400">
                    <Heart className="w-5 h-5" />
                    <span>Tipos de Personagem</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {stats.characterTypes.map((type, index) => (
                      <div key={type.type} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-white">{type.type}</span>
                        </div>
                        <Badge variant="outline" className="bg-purple-900/30 text-purple-300 border-purple-500/50">
                          {type.count}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsPanel;
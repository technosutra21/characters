import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, BookOpen, Zap, Target, Eye, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const MetricsView = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState(null);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const response = await axios.get(`${API}/characters/metrics`);
      setMetrics(response.data);
    } catch (error) {
      console.error('Error fetching metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 space-y-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="p-8 text-center text-gray-400">
        <BarChart3 className="w-16 h-16 mx-auto mb-4" />
        <p>Nenhuma métrica disponível</p>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-light mb-2 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Análise de Personagens
        </h2>
        <p className="text-gray-400">Métricas e insights sobre a coleção de personagens</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-900/40 backdrop-blur-sm border-gray-700/40 hover:bg-gray-900/60 transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg font-light">
              <Users className="w-5 h-5 text-purple-400" />
              <span className="text-purple-300">Total de Personagens</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-2">
              {metrics.total_characters}
            </div>
            <p className="text-gray-400 text-sm">
              {metrics.total_sections} seções no total
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/40 backdrop-blur-sm border-gray-700/40 hover:bg-gray-900/60 transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg font-light">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              <span className="text-cyan-300">Total de Palavras</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-2">
              {metrics.total_words.toLocaleString()}
            </div>
            <p className="text-gray-400 text-sm">
              {Math.round(metrics.avg_words_per_character)} palavras por personagem
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/40 backdrop-blur-sm border-gray-700/40 hover:bg-gray-900/60 transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg font-light">
              <BarChart3 className="w-5 h-5 text-green-400" />
              <span className="text-green-300">Seções por Personagem</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-2">
              {metrics.avg_sections_per_character}
            </div>
            <p className="text-gray-400 text-sm">
              {metrics.section_diversity} tipos únicos de seções
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/40 backdrop-blur-sm border-gray-700/40 hover:bg-gray-900/60 transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg font-light">
              <Target className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-300">Diversidade</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-2">
              {metrics.section_diversity}
            </div>
            <p className="text-gray-400 text-sm">
              Tipos únicos de seções
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Most Common Sections */}
      <Card className="bg-gray-900/40 backdrop-blur-sm border-gray-700/40">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-xl font-light">
            <TrendingUp className="w-6 h-6 text-purple-400" />
            <span className="text-purple-300">Seções Mais Comuns</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(metrics.most_common_sections).map(([section, count], index) => (
              <div key={section} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <span className="text-purple-300 text-sm font-medium">{index + 1}</span>
                  </div>
                  <span className="text-gray-300">{section}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Progress 
                    value={(count / metrics.total_characters) * 100} 
                    className="w-32"
                  />
                  <Badge variant="secondary" className="bg-purple-900/20 text-purple-300">
                    {count}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Character Types */}
      <Card className="bg-gray-900/40 backdrop-blur-sm border-gray-700/40">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-xl font-light">
            <Users className="w-6 h-6 text-cyan-400" />
            <span className="text-cyan-300">Tipos de Personagens</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(metrics.character_types).map(([type, count]) => (
              <div key={type} className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/30">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">{type}</span>
                  <Badge variant="outline" className="bg-cyan-900/20 text-cyan-300 border-cyan-500/30">
                    {count}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Common Themes */}
      <Card className="bg-gray-900/40 backdrop-blur-sm border-gray-700/40">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-xl font-light">
            <Zap className="w-6 h-6 text-yellow-400" />
            <span className="text-yellow-300">Temas Comuns</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {metrics.common_themes.map((theme, index) => (
              <Button
                key={theme.word}
                variant={selectedTheme === theme.word ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTheme(selectedTheme === theme.word ? null : theme.word)}
                className="bg-gray-800/30 hover:bg-gray-800/50 border-gray-700/30 text-gray-300 hover:text-white"
              >
                {theme.word}
                <Badge variant="secondary" className="ml-2 bg-yellow-900/20 text-yellow-300">
                  {theme.frequency}
                </Badge>
              </Button>
            ))}
          </div>
          
          {selectedTheme && (
            <div className="mt-4 p-4 bg-gray-800/20 rounded-lg border border-gray-700/20">
              <p className="text-gray-300 text-sm">
                A palavra "<span className="text-yellow-300 font-medium">{selectedTheme}</span>" 
                aparece {metrics.common_themes.find(t => t.word === selectedTheme)?.frequency} vezes 
                nos textos dos personagens.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsView;
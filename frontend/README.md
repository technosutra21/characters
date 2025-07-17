# Character Viewer - Personagens Místicos ✨

Uma aplicação React moderna e elegante para visualizar e gerenciar perfis de personagens. Esta aplicação permite carregar arquivos `.txt` com descrições de personagens e os exibe em uma interface mística e interativa.

## 🌟 Características Principais

- **💫 Interface Moderna**: Design dark com gradientes místicos em roxo e cyan
- **📁 Upload de Arquivos**: Arraste e solte ou selecione arquivos `.txt`
- **💾 Armazenamento Local**: Personagens salvos automaticamente no navegador
- **🔍 Busca Inteligente**: Pesquisa em tempo real por nomes e conteúdo
- **📊 Estatísticas Avançadas**: Análise detalhada dos personagens
- **🎨 Duas Visualizações**: 
  - Galeria para visão geral
  - Modo detalhado com layouts masonry ou flutuante
- **📤 Exportação**: Exporte seus personagens como JSON
- **📱 Responsivo**: Funciona perfeitamente em desktop e mobile
- **⚡ Animações Fluidas**: Transições suaves e efeitos visuais

## 🚀 Demonstração

A aplicação está disponível em: [GitHub Pages Link]

## 🛠️ Tecnologias Utilizadas

- **React 19** - Framework principal
- **Tailwind CSS** - Estilização moderna
- **Lucide React** - Ícones elegantes
- **Radix UI** - Componentes acessíveis
- **Local Storage** - Persistência de dados
- **File Reader API** - Processamento de arquivos

## 📋 Formato dos Arquivos

Os arquivos de personagem devem estar em formato `.txt` com a seguinte estrutura:

```
NOME DO PERSONAGEM: Nome do Personagem

INFORMAÇÕES BÁSICAS
Tipo: Tipo do personagem
Idade: Idade do personagem
Outras informações básicas...

DESCRIÇÃO FÍSICA
Descrição física detalhada do personagem...

CARACTERÍSTICAS ESPIRITUAIS
Características espirituais e mentais...

EXPERIÊNCIAS MÍSTICAS
Experiências místicas e sobrenaturais...

LOCALIZAÇÃO E CONTEXTO
Informações sobre onde o personagem se encontra...

ENSINAMENTOS ESPECIAIS
Ensinamentos ou habilidades especiais...
```

## 🏗️ Instalação e Desenvolvimento

### Pré-requisitos

- Node.js (v18 ou superior)
- Yarn (recomendado)

### Configuração

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/character-viewer.git
cd character-viewer
```

2. Instale as dependências:
```bash
cd frontend
yarn install
```

3. Inicie o servidor de desenvolvimento:
```bash
yarn start
```

4. Abra http://localhost:3000 no seu navegador

### Build para Produção

```bash
yarn build
```

### Deploy para GitHub Pages

1. Atualize o campo `homepage` no `package.json` com a URL do seu GitHub Pages
2. Execute o deploy:
```bash
yarn deploy
```

## 🎯 Como Usar

### Para Usuários

1. **Carregar Personagens**: 
   - Arraste arquivos `.txt` para a área de upload
   - Ou clique em "Selecionar Arquivos" para escolher da sua biblioteca

2. **Explorar Personagens**:
   - Visualize na galeria para uma visão geral
   - Clique em qualquer personagem para ver detalhes
   - Use a busca para encontrar personagens específicos

3. **Análise de Dados**:
   - Clique em "Stats" para ver estatísticas detalhadas
   - Rankings por palavras e seções
   - Análise de tipos de personagem

4. **Exportar Dados**:
   - Clique em "Exportar" para baixar todos os personagens como JSON
   - Os dados incluem estatísticas e metadados

### Para Desenvolvedores

A aplicação é estruturada de forma modular:

```
src/
├── components/
│   ├── CharacterViewer.jsx    # Componente principal
│   ├── MasonryCards.jsx       # Layout masonry
│   ├── StatsPanel.jsx         # Painel de estatísticas
│   └── ui/                    # Componentes de interface
├── services/
│   ├── CharacterParser.js     # Parser de personagens
│   └── FileLoader.js          # Carregador de arquivos
└── data/
    └── mock.js                # Dados de exemplo
```

## 🎨 Customização

### Cores e Temas

O design usa um sistema de cores baseado em:
- **Primária**: Gradientes roxo → cyan
- **Secundária**: Tons de cinza escuro
- **Acentos**: Cores específicas por seção

### Animações

As animações podem ser customizadas através das classes CSS:
- `slideInUp`: Animação de entrada
- `floating-card`: Cartões flutuantes
- `fadeInUp`: Transição suave

## 📊 Arquitetura

A aplicação funciona inteiramente no navegador sem necessidade de backend:

- **Frontend**: React com Tailwind CSS
- **Armazenamento**: Local Storage do navegador
- **Processamento**: File Reader API nativa
- **Deploy**: GitHub Pages (estático)

## 🔧 Configuração Avançada

### Personalizando o Parser

O parser pode ser estendido em `services/CharacterParser.js`:

```javascript
// Adicionar novos padrões de seção
this.sectionPatterns = [
  /^[A-Z\s]+$/,
  // Seus padrões personalizados
];
```

### Adicionando Novos Tipos de Arquivo

Extenda o `handleFileUpload` para suportar outros formatos:

```javascript
if (file.type === 'application/json') {
  // Processar JSON
} else if (file.name.endsWith('.md')) {
  // Processar Markdown
}
```

## 🤝 Contribuindo

1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🌟 Roadmap

- [ ] Suporte a múltiplos idiomas
- [ ] Modo escuro/claro
- [ ] Importação de JSON
- [ ] Comparação entre personagens
- [ ] Geração de relatórios PDF
- [ ] Integração com APIs externas
- [ ] Modo colaborativo
- [ ] Versionamento de personagens

## 💡 Suporte

Se você encontrar algum problema ou tiver sugestões:

1. Verifique as [Issues](https://github.com/seu-usuario/character-viewer/issues) existentes
2. Crie uma nova issue se necessário
3. Forneça detalhes sobre o problema e seu ambiente

## 🎖️ Reconhecimentos

- Design inspirado em interfaces místicas e fantásticas
- Ícones por [Lucide](https://lucide.dev/)
- Componentes UI por [Radix UI](https://www.radix-ui.com/)
- Estilização por [Tailwind CSS](https://tailwindcss.com/)

---

Feito com ✨ e magia para exploradores de mundos fantásticos!

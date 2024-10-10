# 🖼️ **Projeto de Processamento de Imagens**

## 🌐 Projeto Disponível
Você pode acessar o projeto em: [processamentodigitaldeimagem.netlify.app](https://processamentodigitaldeimagem.netlify.app)

## 👤 Autores
- **Gualter Albino**: [GitHub](https://github.com/GualterAlbino)
- **João Vitor Teixeira**: [GitHub](https://github.com/jvtei45)
- **Marcos Paulo**: [GitHub](https://github.com/jvtei45](https://github.com/MarcosPauloV))

## 📚 Descrição
Repositório relacionado a atividade da disciplina de CGPDI - UniFagoc 2024.2 que propos o desenvolvimneto de um software para computar e exibir a imagem resultante de várias funções de processamento de imagens. As funções implementadas incluem:

### 🔧 Funcionalidades Implementadas:
- **Função Ponta de Prova**: Apresenta o nível de cinza (NC) e as coordenadas do pixel apontado pelo mouse.
- **Filtro Negativo**: Inverte as cores da imagem.
- **Filtro de Logaritmo e Logaritmo Inverso**: Realiza transformações logarítmicas na imagem.
- **Filtro de Potência e Raiz (Correção de Gamma)**: Ajusta a intensidade da imagem com correção de gamma.
- **Ampliação da Imagem com Interpolação por Replicação de Pixels (Nearest Neighbor Resampling)**: Ampliar de 256x256 para 512x512 e 1024x1024.
- **Ampliação da Imagem com Interpolação Bilinear (Bilinear Interpolation Resampling)**: Ampliar de 256x256 para 512x512 e 1024x1024.
- **Histograma Gráfico da Imagem**: Gera o histograma da imagem original.
- **Equalização da Imagem**: Equaliza a imagem e gera o histograma gráfico resultante.
- **Espelhamento Horizontal**: Espelha a imagem horizontalmente.
- **Espelhamento Vertical**: Espelha a imagem verticalmente.
- **Rotação de 90°**: Rotaciona a imagem 90 graus (horário e anti-horário).
- **Rotação de 180°**: Rotaciona a imagem 180 graus.
- **Filtro de Expansão e Compressão**: 
  - Expansão: \( g = a \cdot r + b \)
  - Compressão: \( g = \frac{r}{a} - b \) (valores informados pelo usuário).
- **Soma de Duas Imagens**: Oferece a opção de porcentagem para somar duas imagens.
- **Filtros de Média, Mediana, Moda, MIN e MAX**: Aplica diferentes filtros estatísticos na imagem.
- **Operadores Laplaciano e High Boost**: Realça detalhes na imagem.
- **Operadores Prewitt e Sobel**: Detecta bordas na imagem.
  
## 🎨 Tecnologias Utilizadas
- **Vue.js**: Para construção da interface do usuário.
- **TypeScript**: Para garantir a tipagem estática e melhorar a manutenção do código.
- **HTML5 Canvas**: Para manipulação de imagens.

## 📄 Licença
Este projeto está licenciado sob a [MIT License](LICENSE).

## 📅 Como Executar o Projeto
1. Clone o repositório:
2. Execute o comando:
   ````
   npm install
   ````
3. E em seguida:
     ````
   npm run dev
   ````


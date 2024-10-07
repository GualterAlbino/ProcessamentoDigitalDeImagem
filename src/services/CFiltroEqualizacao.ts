export default class CFiltroEqualizacao implements IFiltro {

  pClarear: number = 0
  pEscurecer: number  = 0
  pContrastar: number = 0
  // Ajustar clarear
  private Clarear(porcentagem: number): (pixel: number) => number {
    return (pixel) => Math.min(pixel + (pixel * (porcentagem / 100)), 255);
  }

  // Ajustar escurecer
  private Escurecer(porcentagem: number): (pixel: number) => number {
    return (pixel) => Math.max(pixel - (pixel * (porcentagem / 100)), 0);
  }

  // Ajustar contrastar
  private Contrastrar(porcentagem: number): (pixel: number) => number {
    const fator = (259 * (porcentagem + 255)) / (255 * (259 - porcentagem));
    return (pixel) => {
      const novoValor = fator * (pixel - 128) + 128;
      return Math.min(Math.max(novoValor, 0), 255);
    };
  }

  

  // Executar sem parâmetros extras
  executar(pImagem: number[][]): number[][] {

    try {
      const linhas = pImagem.length;
      const colunas = pImagem[0].length;
      const totalPixels = linhas * colunas;
      const histograma = new Array(256).fill(0);
      const imagemEqualizada = Array.from(Array(linhas), () => new Array(colunas).fill(0));

      // Calcular o histograma
      for (let i = 0; i < linhas; i++) {
        for (let j = 0; j < colunas; j++) {
          histograma[pImagem[i][j]]++;
        }
      }

      // Calcular a função de distribuição acumulada (CDF)
      let cdf = 0;
      const cdfMin = histograma.find((h) => h > 0);
      const cdfNormalizado = histograma.map((valor) => {
        cdf += valor;
        return Math.round(((cdf - cdfMin) / (totalPixels - cdfMin)) * 255);
      });


      // Funções de ajuste
      const ajustarClarear = this.Clarear(this.pClarear);
      const ajustarEscurecer = this.Escurecer(this.pEscurecer);
      const ajustarContrastar = this.Contrastrar(this.pContrastar);

      for (let i = 0; i < linhas; i++) {
        for (let j = 0; j < colunas; j++) {
          // Aplica a equalização primeiro
          let valorEqualizado = cdfNormalizado[pImagem[i][j]];
          
          // Aplicar cada ajuste de acordo com os parâmetros fornecidos
          valorEqualizado = ajustarClarear(valorEqualizado);
          valorEqualizado = ajustarEscurecer(valorEqualizado);
          valorEqualizado = ajustarContrastar(valorEqualizado);

          // Define o valor ajustado na imagem final
          imagemEqualizada[i][j] = valorEqualizado;
        }
      }

      return imagemEqualizada;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

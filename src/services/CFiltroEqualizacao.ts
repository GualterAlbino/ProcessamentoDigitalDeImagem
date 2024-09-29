export default class CFiltroEqualizacao implements IFiltro {
  executar(pImagem: number[][]): number[][] {
    try {
      const linhas = pImagem.length
      const colunas = pImagem[0].length
      const totalPixels = linhas * colunas
      const histograma = new Array(256).fill(0)
      const imagemEqualizada = Array.from(Array(linhas), () => new Array(colunas).fill(0))

      // Calcular o histograma.
      for (let i = 0; i < linhas; i++) {
        for (let j = 0; j < colunas; j++) {
          histograma[pImagem[i][j]]++
        }
      }

      // Calcular a função de distribuição acumulada (CDF).
      let cdf = 0
      const cdfMin = histograma.find((h) => h > 0)
      const cdfNormalizado = histograma.map((valor) => {
        cdf += valor
        return Math.round(((cdf - cdfMin) / (totalPixels - cdfMin)) * 255)
      })

      // Aplicar a equalização à imagem.
      for (let i = 0; i < linhas; i++) {
        for (let j = 0; j < colunas; j++) {
          imagemEqualizada[i][j] = cdfNormalizado[pImagem[i][j]]
        }
      }

      return imagemEqualizada
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

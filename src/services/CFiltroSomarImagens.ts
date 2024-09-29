export default class CFiltroSomarImagens implements IFiltro {
  imagem: number[][] = []

  executar(pImagem: number[][]): number[][] {
    try {
      if (!Array.isArray(pImagem)) {
        throw 'A imagem passado como parâmetro deve ser uma matriz de números.'
      }

      const linhas = pImagem.length
      const colunas = this.imagem[0].length
      const imagemResultado: number[][] = Array.from(Array(linhas), () =>
        new Array(colunas).fill(0)
      )

      // Somar pixel a pixel, garantindo que o valor não ultrapasse 255.
      for (let i = 0; i < linhas; i++) {
        for (let j = 0; j < colunas; j++) {
          imagemResultado[i][j] = Math.min(pImagem[i][j] + this.imagem[i][j], 255)
        }
      }

      return imagemResultado
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

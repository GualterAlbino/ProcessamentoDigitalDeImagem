export default class CFiltroRotacao180 implements IFiltro {
  executar(pImagem: number[][]): number[][] {
    try {
      const linhas = pImagem.length
      const colunas = pImagem[0].length
      const imagemRotacionada = Array.from(Array(linhas), () => new Array(colunas))

      // Rotaciona a imagem 180 graus, espelhando as posições.
      for (let i = 0; i < linhas; i++) {
        for (let j = 0; j < colunas; j++) {
          imagemRotacionada[i][j] = pImagem[linhas - 1 - i][colunas - 1 - j]
        }
      }

      return imagemRotacionada
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

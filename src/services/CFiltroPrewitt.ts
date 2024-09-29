export default class CFiltroPrewitt implements IFiltro {
  executar(pImagem: number[][]): number[][] {
    try {
      const linhas = pImagem.length
      const colunas = pImagem[0].length
      const imagemFiltrada = Array.from(Array(linhas), () => new Array(colunas).fill(0))

      // Máscaras Prewitt para detecção de bordas horizontal e vertical.
      const prewittX = [
        [-1, 0, 1],
        [-1, 0, 1],
        [-1, 0, 1]
      ]
      const prewittY = [
        [-1, -1, -1],
        [0, 0, 0],
        [1, 1, 1]
      ]

      // Aplicação do filtro de Prewitt.
      for (let i = 1; i < linhas - 1; i++) {
        for (let j = 1; j < colunas - 1; j++) {
          let gradienteX = 0
          let gradienteY = 0

          // Aplicar as máscaras X e Y.
          for (let m = -1; m <= 1; m++) {
            for (let n = -1; n <= 1; n++) {
              gradienteX += pImagem[i + m][j + n] * prewittX[m + 1][n + 1]
              gradienteY += pImagem[i + m][j + n] * prewittY[m + 1][n + 1]
            }
          }

          // A magnitude do gradiente combinando as contribuições horizontais (X) e verticais (Y).
          const gradiente = Math.sqrt(gradienteX ** 2 + gradienteY ** 2)

          // Normalizar para manter dentro do intervalo [0, 255].
          imagemFiltrada[i][j] = Math.min(255, Math.max(0, Math.round(gradiente)))
        }
      }

      return imagemFiltrada
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

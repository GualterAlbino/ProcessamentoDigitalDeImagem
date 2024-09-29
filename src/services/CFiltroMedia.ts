export default class CFiltroMedia implements IFiltro {
  constructor() {}

  tamanhoMascara: number = 3

  public executar(pImagem: number[][]): number[][] {
    try {

      if (this.tamanhoMascara % 2 === 0) {
        throw new Error('O tamanho da máscara deve ser um número ímpar')
      }

      const matriz = pImagem
      const linhas = matriz.length
      const colunas = matriz[0].length
      
      const matrizMedia: number[][] = Array.from({ length: linhas }, () => Array(colunas).fill(0))

      // Percorre a matriz, excluindo as bordas
      for (let i = 1; i < linhas - 1; i++) {
        for (let j = 1; j < colunas - 1; j++) {
          // Calcula a soma dos pixels na vizinhança 3x3
          let soma = 0
          let contagem = 0

          for (let k = -1; k <= 1; k++) {
            for (let l = -1; l <= 1; l++) {
              soma += matriz[i + k][j + l]
              contagem++
            }
          }

          // Calcula a média e atribui à posição central
          matrizMedia[i][j] = Math.floor(soma / contagem)
        }
      }

      // Copia as bordas da matriz original para a matriz de saída
      for (let i = 0; i < linhas; i++) {
        matrizMedia[i][0] = matriz[i][0] // Borda esquerda
        matrizMedia[i][colunas - 1] = matriz[i][colunas - 1] // Borda direita
      }

      for (let j = 0; j < colunas; j++) {
        matrizMedia[0][j] = matriz[0][j] // Borda superior
        matrizMedia[linhas - 1][j] = matriz[linhas - 1][j] // Borda inferior
      }

      return matrizMedia
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

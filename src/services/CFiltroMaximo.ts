export default class CFiltroMaximo implements IFiltro {
  tamanhoMascara: number = 3

  constructor() {}

  public executar(pImagem: number[][]): number[][] {
    try {
      if (this.tamanhoMascara % 2 === 0) {
        throw new Error('O tamanho da máscara deve ser um número ímpar.')
      }

      const matriz = pImagem
      const linhas = matriz.length
      const colunas = matriz[0].length
      const matrizMaximo: number[][] = Array.from({ length: linhas }, () => Array(colunas).fill(0))
      const raio = Math.floor(this.tamanhoMascara / 2)

      // Percorre a matriz
      for (let i = 0; i < linhas; i++) {
        for (let j = 0; j < colunas; j++) {
          const vizinhos: number[] = []

          // Coleta os pixels na vizinhança definida pela máscara, incluindo bordas com replicação
          for (let k = -raio; k <= raio; k++) {
            for (let l = -raio; l <= raio; l++) {
              const x = i + k
              const y = j + l

              // Verifica se está dentro dos limites da matriz
              if (x < 0) {
                vizinhos.push(matriz[0][j + l]) // Replicação da borda superior
              } else if (x >= linhas) {
                vizinhos.push(matriz[linhas - 1][j + l]) // Replicação da borda inferior
              } else if (y < 0) {
                vizinhos.push(matriz[x][0]) // Replicação da borda esquerda
              } else if (y >= colunas) {
                vizinhos.push(matriz[x][colunas - 1]) // Replicação da borda direita
              } else {
                vizinhos.push(matriz[x][y]) // Pixel válido
              }
            }
          }

          // Calcula o valor máximo e atribui à posição central
          matrizMaximo[i][j] = this.calcularMaximo(vizinhos)
        }
      }

      return matrizMaximo
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  private calcularMaximo(valores: number[]): number {
    // Retorna o valor máximo
    return Math.max(...valores)
  }
}

/*
export default class CFiltroMaximo implements IFiltro {
  tamanhoMascara: number = 3

  constructor() {}

  public executar(pImagem: number[][]): number[][] {
    try {
      if (this.tamanhoMascara % 2 === 0) {
        throw new Error('O tamanho da máscara deve ser um número ímpar.')
      }

      const matriz = pImagem
      const linhas = matriz.length
      const colunas = matriz[0].length
      const matrizMaximo: number[][] = Array.from({ length: linhas }, () => Array(colunas).fill(0))
      const raio = Math.floor(this.tamanhoMascara / 2)

      // Percorre a matriz, incluindo bordas
      for (let i = 0; i < linhas; i++) {
        for (let j = 0; j < colunas; j++) {
          const vizinhos: number[] = []

          // Coleta os pixels na vizinhança definida pela máscara, considerando as bordas
          for (let k = -raio; k <= raio; k++) {
            for (let l = -raio; l <= raio; l++) {
              const x = i + k
              const y = j + l

              // Verifica se está dentro dos limites da matriz
              if (x >= 0 && x < linhas && y >= 0 && y < colunas) {
                vizinhos.push(matriz[x][y])
              }
            }
          }

          // Calcula o valor máximo e atribui à posição central
          matrizMaximo[i][j] = this.calcularMaximo(vizinhos)
        }
      }

      return matrizMaximo
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  private calcularMaximo(valores: number[]): number {
    // Retorna o valor máximo
    return Math.max(...valores)
  }
}
*/

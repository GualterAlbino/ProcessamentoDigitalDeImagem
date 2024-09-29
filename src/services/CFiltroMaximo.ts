export default class CFiltroMaximo implements IFiltro {
  tamanhoMascara: number = 3

  constructor() {}

  executar(pImagem: number[][]): number[][] {
    if (this.tamanhoMascara % 2 === 0) {
      throw 'O tamanho da máscara deve ser um número ímpar.'
    }

    const linhas = pImagem.length
    const colunas = pImagem[0].length
    const imagemFiltrada = Array.from(Array(linhas), () => new Array(colunas).fill(0))
    const margem = Math.floor(this.tamanhoMascara / 2)

    // Aplicação do filtro máximo com máscara.
    for (let i = margem; i < linhas - margem; i++) {
      for (let j = margem; j < colunas - margem; j++) {
        let maximo = 0

        // Encontrar o valor máximo na vizinhança.
        for (let m = -margem; m <= margem; m++) {
          for (let n = -margem; n <= margem; n++) {
            maximo = Math.max(maximo, pImagem[i + m][j + n])
          }
        }

        imagemFiltrada[i][j] = maximo
      }
    }

    return imagemFiltrada
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

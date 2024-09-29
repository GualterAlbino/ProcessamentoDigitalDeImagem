export default class CFiltroMediana implements IFiltro {
  tamanhoMascara: number = 3

  constructor() {}

  public executar(pImagem: number[][]): number[][] {
    try {
      if (this.tamanhoMascara % 2 === 0) {
        throw 'O tamanho da máscara deve ser um número ímpar.'
      }

      const matriz = pImagem
      const linhas = matriz.length
      const colunas = matriz[0].length
      const matrizMediana: number[][] = Array.from({ length: linhas }, () => Array(colunas).fill(0))
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

          // Calcula a mediana e atribui à posição central
          matrizMediana[i][j] = this.calcularMediana(vizinhos)
        }
      }

      return matrizMediana
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  private calcularMediana(valores: number[]): number {
    // Ordena os valores
    valores.sort((a, b) => a - b)
    const meio = Math.floor(valores.length / 2)

    // Retorna a mediana
    return valores[meio]
  }
}

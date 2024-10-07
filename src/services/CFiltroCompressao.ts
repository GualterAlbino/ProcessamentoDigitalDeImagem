export default class CFiltroCompressao implements IFiltro {
  public a: number | null = null
  public b: number | null = null

  tamanhoMascara: number = 3

  constructor() {}

  // Método para definir os parâmetros a e b
  public definirParametros(a: number, b: number): void {
    this.a = a
    this.b = b
  }

  public executar(pImagem: number[][]): number[][] {
    try {
      if (this.a === null || this.b === null) {
        throw 'Os valores de a e b devem ser definidos antes de executar o filtro.'
      }
      if (this.tamanhoMascara % 2 === 0 || this.tamanhoMascara < 1) {
        throw 'O tamanho da máscara deve ser um número ímpar maior que zero'
      }

      const matriz = pImagem
      const linhas = matriz.length
      const colunas = matriz[0].length
      const matrizCompressao: number[][] = Array.from({ length: linhas }, () =>
        Array(colunas).fill(0)
      )

      const metadeMascara = Math.floor(this.tamanhoMascara / 2)

      // Percorre a matriz, excluindo as bordas
      for (let i = metadeMascara; i < linhas - metadeMascara; i++) {
        for (let j = metadeMascara; j < colunas - metadeMascara; j++) {
          const vizinhos: number[] = []

          // Aplica a máscara de compressão
          for (let k = -metadeMascara; k <= metadeMascara; k++) {
            for (let l = -metadeMascara; l <= metadeMascara; l++) {
              const pixel = matriz[i + k][j + l]
              vizinhos.push(pixel) // Armazena os valores dos pixels vizinhos
            }
          }

          // Calcula a mediana dos vizinhos
          vizinhos.sort((a, b) => a - b)
          const mediana = vizinhos[Math.floor(vizinhos.length / 2)]

          // Aplica a fórmula g = a * mediana + b
          // Certifique-se de que a é menor que 1 para compressão
          const valorNovo = Math.round(this.a * mediana + this.b)
          matrizCompressao[i][j] = Math.min(255, Math.max(0, valorNovo)) // Clamping
        }
      }

      // Copia as bordas da matriz original para a matriz de saída
      for (let i = 0; i < linhas; i++) {
        matrizCompressao[i][0] = matriz[i][0] // Borda esquerda
        matrizCompressao[i][colunas - 1] = matriz[i][colunas - 1] // Borda direita
      }

      for (let j = 0; j < colunas; j++) {
        matrizCompressao[0][j] = matriz[0][j] // Borda superior
        matrizCompressao[linhas - 1][j] = matriz[linhas - 1][j] // Borda inferior
      }

      return matrizCompressao
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

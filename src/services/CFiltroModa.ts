export default class CFiltroModa implements IFiltro {
  constructor() {}

  tamanhoMascara: number = 3
  
  public executar(pImagem: number[][]): number[][] {
    try {
      if (this.tamanhoMascara % 2 === 0 || this.tamanhoMascara < 1) {
        throw 'O tamanho da máscara deve ser um número ímpar maior que zero'
      }

      const matriz = pImagem
      const linhas = matriz.length
      const colunas = matriz[0].length
      const matrizModa: number[][] = Array.from({ length: linhas }, () => Array(colunas).fill(0))

      const metadeMascara = Math.floor(this.tamanhoMascara / 2)

      // Percorre a matriz, excluindo as bordas
      for (let i = metadeMascara; i < linhas - metadeMascara; i++) {
        for (let j = metadeMascara; j < colunas - metadeMascara; j++) {
          const contagem: { [key: number]: number } = {}

          // Calcula a contagem dos pixels na vizinhança
          for (let k = -metadeMascara; k <= metadeMascara; k++) {
            for (let l = -metadeMascara; l <= metadeMascara; l++) {
              const valor = matriz[i + k][j + l]
              contagem[valor] = (contagem[valor] || 0) + 1
            }
          }

          // Encontra a moda
          let moda: number = matriz[i][j] // Inicia com o valor central
          let maxContagem: number = contagem[moda] // Inicia com a contagem da moda

          for (const valor in contagem) {
            if (contagem[valor] > maxContagem) {
              maxContagem = contagem[valor]
              moda = Number(valor)
            }
          }

          // Atribui a moda na posição central
          matrizModa[i][j] = moda
        }
      }

      // Copia as bordas da matriz original para a matriz de saída
      
      for (let i = 0; i < linhas; i++) {
        matrizModa[i][0] = matriz[i][0] // Borda esquerda
        matrizModa[i][colunas - 1] = matriz[i][colunas - 1] // Borda direita
      }

      for (let j = 0; j < colunas; j++) {
        matrizModa[0][j] = matriz[0][j] // Borda superior
        matrizModa[linhas - 1][j] = matriz[linhas - 1][j] // Borda inferior
      }

      return matrizModa
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
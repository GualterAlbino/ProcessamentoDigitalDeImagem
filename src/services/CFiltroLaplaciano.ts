export default class CFiltroLaplaciano implements IFiltro {
  tamanhoMascara: number = 3 // Tamanho da máscara, padrão é 3

  constructor() {}

  executar(pImagem: number[][]): number[][] {
    if (this.tamanhoMascara % 2 === 0) {
      throw new Error('O tamanho da máscara deve ser ímpar!')
    }

    try {
      const matriz = pImagem
      const matrizCalculada: number[][] = []
      const linhas = matriz.length
      const colunas = matriz[0].length

      // Pega a matriz da máscara laplaciana
      const mascaraLaplaciana = this.gerarMascaraLaplaciana(this.tamanhoMascara)

      // Percorre a matriz ignorando as bordas
      for (
        let i = Math.floor(this.tamanhoMascara / 2); // Calcula a margem de acordo com o tamanho da máscara
        i < linhas - Math.floor(this.tamanhoMascara / 2);
        i++
      ) {
        matrizCalculada[i] = []
        for (
          let j = Math.floor(this.tamanhoMascara / 2);
          j < colunas - Math.floor(this.tamanhoMascara / 2);
          j++
        ) {
          let soma = 0

          // Aplica a máscara de covolução ignorando novamente as bordas
          for (
            let mi = -Math.floor(this.tamanhoMascara / 2);
            mi <= Math.floor(this.tamanhoMascara / 2);
            mi++
          ) {
            for (
              let mj = -Math.floor(this.tamanhoMascara / 2);
              mj <= Math.floor(this.tamanhoMascara / 2);
              mj++
            ) {
              soma +=
                matriz[i + mi][j + mj] *
                mascaraLaplaciana[mi + Math.floor(this.tamanhoMascara / 2)][
                  mj + Math.floor(this.tamanhoMascara / 2)
                ]
            }
          }

          matrizCalculada[i][j] = soma
        }
      }

      // Preenche as bordas com zeros
      for (let i = 0; i < linhas; i++) {
        matrizCalculada[i] = matrizCalculada[i] || [] // Caso a posição não exista é adicionado uma matiz vazia.
        if (i === 0 || i === linhas - 1) {
          for (let j = 0; j < colunas; j++) {
            matrizCalculada[i][j] = 0 // Bordas superiores e inferiores
          }
        } else {
          matrizCalculada[i][0] = 0 // Borda esquerda
          matrizCalculada[i][colunas - 1] = 0 // Borda direita
        }
      }

      return matrizCalculada
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  private gerarMascaraLaplaciana(tamanho: number): number[][] {
    const mascara = Array.from({ length: tamanho }, () => Array(tamanho).fill(0)) //Inicializa a máscara com zeros
    const meio = Math.floor(tamanho / 2) //Calcula o meio da máscara

    for (let i = 0; i < tamanho; i++) {
      for (let j = 0; j < tamanho; j++) {
        if (i === meio && j === meio) {
          mascara[i][j] = tamanho * tamanho - 1 // Adiciona o ponto central positivo indicando uma área homogênea
        } else {
          mascara[i][j] = -1 // Completa a máscara com pesos negativos representando as bordas
        }
      }
    }

    return mascara
  }
}

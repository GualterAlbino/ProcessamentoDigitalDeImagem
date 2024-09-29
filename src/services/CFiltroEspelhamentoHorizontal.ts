export default class CFiltroEspelhamentoHorizontal implements IFiltro {
  ordem: number = 0

  constructor() {}

  public executar(pImagem: number[][]): number[][] {
    try {
      const matriz = pImagem
      const matrizEspelhada: number[][] = []

      // Itera sobre as linhas da matriz
      for (let i = 0; i < matriz.length; i++) {
        const linhaEspelhada: number[] = []

        // Adiciona os pixels na ordem invertida
        for (let j = matriz[i].length - 1; j >= 0; j--) {
          linhaEspelhada.push(matriz[i][j])
        }

        // Adiciona a linha espelhada à nova matriz
        matrizEspelhada.push(linhaEspelhada)
      }

      return matrizEspelhada
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

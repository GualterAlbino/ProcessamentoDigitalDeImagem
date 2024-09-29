export default class CFiltroEspelhamentoVertical implements IFiltro {
  constructor() {}

  public executar(pImagem: number[][]): number[][] {
    try {
      const matriz = pImagem
      const matrizEspelhada: number[][] = []

      // Itera sobre as linhas da matriz de trás para frente
      for (let i = matriz.length - 1; i >= 0; i--) {
        // Adiciona cada linha na nova matriz na ordem inversa
        matrizEspelhada.push(matriz[i])
      }
      return matrizEspelhada
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

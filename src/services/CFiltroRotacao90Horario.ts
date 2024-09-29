export default class CFiltroRotacao90 implements IFiltro {
  public executar(pImagem: number[][]): number[][] {
    try {
      const matriz = pImagem
      const matrizRotacionada: number[][] = []

      for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[i].length; j++) {
          matrizRotacionada[j] = matrizRotacionada[j] || [] // cria a linha se ainda não existir
          matrizRotacionada[j][i] = matriz[i][j] // copia o pixel
        }
      }
      return matrizRotacionada
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

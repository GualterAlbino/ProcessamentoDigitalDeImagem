import CFiltro from './base/CFiltro'

export default class CFiltroNegativo implements IFiltro {
  ordem: number = 0

  public executar(pImagem: number[][]): number[][] {
    try {
      const matriz = pImagem
      let imagemProcessada: number[][] = []
      let resultado = 0
      for (let i = 0; i < matriz.length; i++) {
        imagemProcessada[i] = []
        for (let j = 0; j < matriz[i].length; j++) {
          resultado = 255 - matriz[i][j]

          if (resultado < 0) {
            resultado = 0
          }

          if (resultado > 255) {
            resultado = 255
          }

          imagemProcessada[i].push(CFiltro.arredondar(resultado))
        }
      }

      return imagemProcessada
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

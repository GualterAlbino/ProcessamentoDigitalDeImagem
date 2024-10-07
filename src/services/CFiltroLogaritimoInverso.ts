import CFiltro from './base/CFiltro'

export default class CFiltroLogaritmoInverso implements IFiltro {
  executar(pImagem: number[][]): number[][] {
    try {
      const pixelMaximo = 255
      const matriz = pImagem
      const matrizResultate: number[][] = []
      let pixelCalulado = 0
      const c = pixelMaximo / Math.log(1 + pixelMaximo)

      for (let i = 0; i < matriz.length; i++) {
        matrizResultate.push([])

        for (let j = 0; j < matriz[i].length; j++) {
          pixelCalulado = Math.exp(matriz[i][j] / c) - 1

          if (pixelCalulado > pixelMaximo) {
            pixelCalulado = pixelMaximo
          } else if (pixelCalulado < 0) {
            pixelCalulado = 0
          }

          matrizResultate[i].push(pixelCalulado)
        }
      }

      return matrizResultate
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

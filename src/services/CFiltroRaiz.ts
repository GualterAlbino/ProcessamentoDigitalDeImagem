export default class CFiltroRaiz implements IFiltro {
  public gamma: number = 0

  executar(pImagem: number[][]): number[][] {
    try {
      if (!this.gamma) {
        throw 'O Gamma deve ser infomado!'
      }

      const matriz = pImagem
      const matrizCalculada: number[][] = []
      const expoente = 255 / Math.pow(255, 1 / this.gamma) //Constante da escala baseada na raiz do gamma
      let pixelCalulado = 0

      for (let i = 0; i < matriz.length; i++) {
        matrizCalculada.push([])
        for (let j = 0; j < matriz[0].length; j++) {
          pixelCalulado = Math.pow(matriz[i][j], 1 / this.gamma) * expoente //Como o sqrt não permite passar o parâmetro do gamma como expoente da raiz, foi feita a utilização do metodo de potência elevado a 1/gamma que seria a mesma coisa que a raiz do mesmo.

          if (pixelCalulado > 255) {
            pixelCalulado = 255
          } else if (pixelCalulado < 0) {
            pixelCalulado = 0
          }

          matrizCalculada[i].push(pixelCalulado)
        }
      }

      return matrizCalculada
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

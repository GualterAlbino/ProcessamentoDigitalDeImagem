export default class CFiltroPotencia implements IFiltro {
  public gamma: number = 0

  executar(pImagem: number[][]): number[][] {
    try {
      if (!this.gamma) {
        throw 'O Gamma deve ser infomado!'
      }
      const matriz = pImagem
      const matrizPotencia: number[][] = []
      const expoente = 255 / Math.pow(255, this.gamma); //Constante da escala
      
      for (let i= 0; i < matriz.length; i++) {
        const linhaPotencia: number[] = []
        for (let j = 0; j < matriz[i].length; j++) {
          const pixelOriginal = matriz[i][j]
          let pixelPotencia = expoente * Math.pow(pixelOriginal, this.gamma)
          //Garante que os valores sejam entre 0 e 255
          if (pixelPotencia > 255) {
            pixelPotencia = 255
          } else if (pixelPotencia < 0) {
            pixelPotencia = 0
          }
          linhaPotencia.push(Math.round(pixelPotencia)); // Arredondar para inteiro
        }
        matrizPotencia.push(linhaPotencia)

      }
      return matrizPotencia;
    
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

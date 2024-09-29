import CFiltro from './base/CFiltro'

export default class CFiltroLogaritimo implements IFiltro {
  ordem: number = 0
  constructor() {}

  public executar(pImagem: number[][]): number[][] {
    try {
        const matriz = pImagem;
        const matrizLog: number[][] = [];
        const c = 255 / Math.log(1+255); //Constante da escala
        console.log(c)
       // let pixelLog = 0


        for (let i = 0; i < matriz.length; i++){

          const linhaLog: number[] = [];

          //Aplica a transformção de Log em cada pixel
          for (let j = 0; j < matriz[i].length; j++) {
            const pixelOriginal = matriz[i][j];
            let pixelLog = c * Math.log(1 + pixelOriginal);
            if (pixelLog > 255){
              pixelLog = 255;
            }else if (pixelLog < 0){
              pixelLog = 0;
            }
            linhaLog.push(pixelLog);
                     
          }
          console.log(linhaLog);
          matrizLog.push(linhaLog);

        
        
        }
        return matrizLog
      }
     catch (error) {
      console.error(error);
      throw error;
    }
  }
}



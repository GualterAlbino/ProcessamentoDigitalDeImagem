export default class CFiltroSobel implements IFiltro {


  public executar(pImagem: number[][]): number[][] {
    try {
      const matriz = pImagem;
      const linhas = matriz.length;
      const colunas = matriz[0].length;
      const matrizSobel: number[][] = Array.from({ length: linhas }, () => Array(colunas).fill(0));

      // Máscaras de Sobel
      const gradienteX = [
        [-1, 0, 1],
        [-2, 0, 2],
        [-1, 0, 1],
      ];

      const gradienteY = [
        [1, 2, 1],
        [0, 0, 0],
        [-1, -2, -1],
      ];

      // Percorre a matriz excluindo as bordas
      for (let i = 1; i < linhas - 1; i++) {
        for (let j = 1; j < colunas - 1; j++) {
          let gx = 0; // gradienteX
          let gy = 0; // gradienteY

          // Aplica as máscaras de Sobel
          for (let k = -1; k <= 1; k++) {
            for (let l = -1; l <= 1; l++) {
              const pixel = matriz[i + k][j + l];
              gx += pixel * gradienteX[k + 1][l + 1]; // Usando gradienteX
              gy += pixel * gradienteY[k + 1][l + 1]; // Usando gradienteY
            }
          }

          // Calcula a magnitude do gradiente
          const magnitude = Math.sqrt(gx ** 2 + gy ** 2);

          // Garante que o valor esteja no intervalo [0, 255]
          matrizSobel[i][j] = Math.min(255, Math.max(0, Math.round(magnitude)));
        }
      }

      // Copia as bordas da matriz original para a matriz de saída
      for (let i = 0; i < linhas; i++) {
        matrizSobel[i][0] = matriz[i][0]; // Borda esquerda
        matrizSobel[i][colunas - 1] = matriz[i][colunas - 1]; // Borda direita
      }

      for (let j = 0; j < colunas; j++) {
        matrizSobel[0][j] = matriz[0][j]; // Borda superior
        matrizSobel[linhas - 1][j] = matriz[linhas - 1][j]; // Borda inferior
      }

      return matrizSobel;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

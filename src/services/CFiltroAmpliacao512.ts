export default class CFiltroAmpliacao512 implements IFiltro {
  executar(pImagem: number[][]): number[][] {
    try {

      const alturaOriginal = pImagem.length;
      const larguraOriginal = pImagem[0].length;

      const matrizAmpliada: number[][] = Array.from(
        { length: 512},
        () => Array(512).fill(0) // Cria uma matriz de 512x512 com todos os pixels preenchidos com 0
      )

      for (let i = 0; i < alturaOriginal; i++) {
        for (let j = 0; j < larguraOriginal; j++) {
          const novaLinha = i * 2  // Cada pixel vai ser replicado em 2 pixels na nova imagem
          const novaColuna = j * 2

          // Preencehe os pixels da nova imagem
          matrizAmpliada[novaLinha][novaColuna] = pImagem[i][j] 
          matrizAmpliada[novaLinha][novaColuna + 1] = pImagem[i][j]
          matrizAmpliada[novaLinha + 1][novaColuna] = pImagem[i][j]
          matrizAmpliada[novaLinha + 1][novaColuna + 1] = pImagem[i][j]
        }
      }

      return matrizAmpliada

    } catch (error) {
    console.error(error);
    throw error;
    }
  }
}

export default class CFiltroAmpliacao1024 implements IFiltro {
  executar(pImagem: number[][]): number[][] {
    try {

      const alturaOriginal = pImagem.length;
      const larguraOriginal = pImagem[0].length;

      const matrizAmpliada: number[][] = Array.from(
        { length: 1024},
        () => Array(1024).fill(0) // Cria uma matriz de 1024x1024 com todos os pixels preenchidos com 0
      )

      for (let i = 0; i < alturaOriginal; i++) {
        for (let j = 0; j < larguraOriginal; j++) {
          const novaLinha = i * 4  // Cada pixel vai ser replicado em 4 pixels na nova imagem
          const novaColuna = j * 4

          // Preencehe os pixels da nova imagem
          matrizAmpliada[novaLinha][novaColuna] = pImagem[i][j]
          matrizAmpliada[novaLinha][novaColuna + 1] = pImagem[i][j]
          matrizAmpliada[novaLinha][novaColuna + 2] = pImagem[i][j]
          matrizAmpliada[novaLinha][novaColuna + 3] = pImagem[i][j]
          matrizAmpliada[novaLinha + 1][novaColuna] = pImagem[i][j]
          matrizAmpliada[novaLinha + 1][novaColuna + 1] = pImagem[i][j]
          matrizAmpliada[novaLinha + 1][novaColuna + 2] = pImagem[i][j]
          matrizAmpliada[novaLinha + 1][novaColuna + 3] = pImagem[i][j]
          matrizAmpliada[novaLinha + 2][novaColuna] = pImagem[i][j]
          matrizAmpliada[novaLinha + 2][novaColuna + 1] = pImagem[i][j]
          matrizAmpliada[novaLinha + 2][novaColuna + 2] = pImagem[i][j]
          matrizAmpliada[novaLinha + 2][novaColuna + 3] = pImagem[i][j]
          matrizAmpliada[novaLinha + 3][novaColuna] = pImagem[i][j]
          matrizAmpliada[novaLinha + 3][novaColuna + 1] = pImagem[i][j]
          matrizAmpliada[novaLinha + 3][novaColuna + 2] = pImagem[i][j]
          matrizAmpliada[novaLinha + 3][novaColuna + 3] = pImagem[i][j]
        }
      }

      return matrizAmpliada

    } catch (error) {
    console.error(error);
    throw error;
    }
  }
}

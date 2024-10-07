export interface IFiltro {
  executar(pImagem: number[][]): number[][]
}

export default class CFiltroAmpliacaoBilinear512 implements IFiltro {
  executar(pImagem: number[][]): number[][] {
    try {
      const alturaOriginal = pImagem.length
      const larguraOriginal = pImagem[0].length

      // A matriz ampliada terá 512 vezes a altura e a largura da original
      const matrizAmpliada: number[][] = Array.from(
        { length: alturaOriginal * 512 },
        () => Array(larguraOriginal * 512).fill(0) // Cria uma matriz com os novos tamanhos
      )

      // Preenchendo a matriz ampliada com interpolação bilinear
      for (let i = 0; i < alturaOriginal; i++) {
        for (let j = 0; j < larguraOriginal; j++) {
          const novaLinha = i * 512 // Cada pixel original será ampliado em 512 pixels na nova imagem
          const novaColuna = j * 512

          // Preenchendo os 4 pixels correspondentes à posição original
          for (let dy = 0; dy < 512; dy++) {
            for (let dx = 0; dx < 512; dx++) {
              // Calcular a interpolação
              const pesoX = dx / 512
              const pesoY = dy / 512

              const valorCima = this.obterValor(pImagem, j, i, pesoX)
              const valorBaixo = this.obterValor(pImagem, j, i + 1, pesoX)

              // Interpolação vertical
              const valorInterpolado = valorCima * (1 - pesoY) + valorBaixo * pesoY

              // Atribuir o valor interpolado à nova matriz
              matrizAmpliada[novaLinha + dy][novaColuna + dx] = valorInterpolado
            }
          }
        }
      }

      return matrizAmpliada
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  private obterValor(pImagem: number[][], x: number, y: number, pesoX: number): number {
    const largura = pImagem[0].length
    const altura = pImagem.length

    // Verifica se as coordenadas estão dentro dos limites da imagem original
    if (x < 0 || x >= largura || y < 0 || y >= altura) {
      return 0 // Retorna 0 se fora dos limites
    }

    // Retorna o valor do pixel original
    return pImagem[y][x]
  }
}

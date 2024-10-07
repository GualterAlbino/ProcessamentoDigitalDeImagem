export interface IFiltro {
  executar(pImagem: number[][]): number[][]
}

export default class CFiltroAmpliacaoBilinear1024 implements IFiltro {
  executar(pImagem: number[][]): number[][] {
    const alturaOriginal = pImagem.length
    const larguraOriginal = pImagem[0].length
    const alturaAmpliada = alturaOriginal * 1024
    const larguraAmpliada = larguraOriginal * 1024

    // Cria uma nova matriz para a imagem ampliada
    const imagemAmpliada: number[][] = Array.from({ length: alturaAmpliada }, () =>
      Array(larguraAmpliada).fill(0)
    )

    // Realiza a ampliação bilinear
    for (let y = 0; y < alturaOriginal; y++) {
      for (let x = 0; x < larguraOriginal; x++) {
        const yAmpliado = y * 1024
        const xAmpliado = x * 1024

        // Aplica a interpolação bilinear
        for (let dy = 0; dy < 1024; dy++) {
          for (let dx = 0; dx < 1024; dx++) {
            // Calcula a posição na imagem original
            const pesoX = dx / 1024
            const pesoY = dy / 1024

            // Interpolação horizontal
            const valorCima = this.obterValor(pImagem, x, y, pesoX)
            const valorBaixo = this.obterValor(pImagem, x, y + 1, pesoX)

            // Interpolação vertical
            const valorInterpolado = valorCima * (1 - pesoY) + valorBaixo * pesoY

            // Atribui o valor interpolado à nova imagem
            imagemAmpliada[yAmpliado + dy][xAmpliado + dx] = valorInterpolado
          }
        }
      }
    }

    return imagemAmpliada
  }

  private obterValor(pImagem: number[][], x: number, y: number, pesoX: number): number {
    const largura = pImagem[0].length
    const altura = pImagem.length

    // Valida os limites para evitar acesso fora da matriz
    if (x < 0 || x >= largura || y < 0 || y >= altura) {
      return 0 // Valor padrão se fora dos limites
    }

    // Retorna o valor do pixel original
    return pImagem[y][x]
  }
}

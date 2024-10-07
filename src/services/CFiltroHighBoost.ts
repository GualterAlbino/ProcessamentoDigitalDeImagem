export default class CFiltroHighBoost implements IFiltro {
  tamanhoMascara: number = 3
  ampliacao: number = 5 // Fator de ampliação para o cálculo do filtro High Boost
  desvioPadrao: number = 4.0 // Desvio padrão para o cálculo da máscara Gaussiana

  private matrizGaussiana(): number[][] {
    const mascara: number[][] = []
    const meiaMascara = Math.floor(this.tamanhoMascara / 2)
    const desvioPadraoAoQuadrado = this.desvioPadrao ** 2
    const normalizacao = 1 / (2 * Math.PI * desvioPadraoAoQuadrado)
    let somaTotal = 0

    for (let i = -meiaMascara; i <= meiaMascara; i++) {
      const linha: number[] = []
      for (let j = -meiaMascara; j <= meiaMascara; j++) {
        const resultado = normalizacao * Math.exp(-(i * i + j * j) / (2 * desvioPadraoAoQuadrado))
        linha.push(resultado)
        somaTotal += resultado
      }
      mascara.push(linha)
    }

    //Realiza a normalização da matriz da máscara gaussiana
    for (let i = 0; i < this.tamanhoMascara; i++) {
      for (let j = 0; j < this.tamanhoMascara; j++) {
        mascara[i][j] /= somaTotal
      }
    }

    return mascara
  }

  //Calcula a suavização da imagem com base no tamanho da mascara
  private suavizar(imagem: number[][], mascara: number[][]): number[][] {
    const linhas = imagem.length
    const colunas = imagem[0].length
    const resultado: number[][] = []
    const meiaMascara = Math.floor(mascara.length / 2)

    //Realiza a suavização da imagem perdendo a borda
    for (let i = 0; i < linhas; i++) {
      resultado[i] = []
      for (let j = 0; j < colunas; j++) {
        let soma = 0
        for (let ki = 0; ki < mascara.length; ki++) {
          for (let kj = 0; kj < mascara[0].length; kj++) {
            const x = i + ki - meiaMascara
            const y = j + kj - meiaMascara
            if (x >= 0 && x < linhas && y >= 0 && y < colunas) {
              soma += imagem[x][y] * mascara[ki][kj]
            }
          }
        }
        resultado[i][j] = soma
      }
    }

    return resultado
  }

  executar(pImagem: number[][]): number[][] {
    if (this.tamanhoMascara % 2 === 0) {
      throw new Error('O tamanho da máscara deve ser ímpar!')
    }

    try {
      const matrizOriginal = pImagem
      const linhas = matrizOriginal.length
      const colunas = matrizOriginal[0].length

      const mascaraGaussiana = this.matrizGaussiana()
      const matrizSuavizada = this.suavizar(matrizOriginal, mascaraGaussiana)
      const matrizCalculada: number[][] = []

      // Realiza o cálculo do filtro High Boost
      for (let i = 0; i < linhas; i++) {
        matrizCalculada.push([])
        for (let j = 0; j < colunas; j++) {
          const valorOriginal = matrizOriginal[i][j]
          const valorSuavizado = matrizSuavizada[i][j]

          // Aplica a fórmula: fhb(x, y) = f(x, y) + (ampliacao - 1) * (f(x, y) - fs(x, y))
          const valorHighBoost =
            valorOriginal + (this.ampliacao - 1) * (valorOriginal - valorSuavizado)

          // Seta que o resultado será limitado entre 0 e 255
          const valorLimitado = Math.max(0, Math.min(255, valorHighBoost))
          matrizCalculada[i].push(valorLimitado)
        }
      }

      return matrizCalculada
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

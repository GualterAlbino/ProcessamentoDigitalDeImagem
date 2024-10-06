export default class CFiltroSomarImagens implements IFiltro {
  imagem: number[][] = []
  
  porcentagemImagem1: number = 50 // Porcentagem padrão que o usuário pode alterar

  // Método para o usuário definir a porcentagem da primeira imagem
  definirPorcentagem(porcentagem: number) {
    if (porcentagem < 0 || porcentagem > 100) {
      throw 'A porcentagem da primeira imagem deve estar entre 0 e 100.'
    }
    this.porcentagemImagem1 = porcentagem
  }

  executar(pImagem: number[][]): number[][] {
    try {
      if (!Array.isArray(pImagem)) {
        throw 'A imagem passada como parâmetro deve ser uma matriz de números.'
      }

      // A porcentagem da segunda imagem é o complemento de 100
      const porcentagemImagem2 = 100 - this.porcentagemImagem1

      // Verifica se o tamanho da imagem da primeira imagem é igual ao da imagem da segunda imagem
      const linhas = pImagem.length
      const colunas = this.imagem[0].length
      const imagemResultado: number[][] = Array.from(Array(linhas), () =>
        new Array(colunas).fill(0)
      )

      // Somar a imagem da primeira imagem com a imagem da segunda imagem
      // e somar os valores menores que 0 ou maior que 255 para obter os valores de 0 a 255
      for (let i = 0; i < linhas; i++) {
        for (let j = 0; j < colunas; j++) {
          const valorImagem1 = (pImagem[i][j] * this.porcentagemImagem1) / 100
          const valorImagem2 = (this.imagem[i][j] * porcentagemImagem2) / 100
          imagemResultado[i][j] = Math.min(Math.round(valorImagem1 + valorImagem2), 255)
        }
      }

      return imagemResultado
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
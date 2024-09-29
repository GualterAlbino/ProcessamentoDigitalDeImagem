export default class CFiltroHistograma implements IFiltro {
  executar(pImagem: number[][]): number[][] {
    throw new Error('Method not implemented.')
  }

  gerarDadosGrafico(pImagem: number[][]): { labels: string[]; dados: number[] } {
    const linhas = pImagem.length
    const colunas = pImagem[0].length
    const histograma = new Array(256).fill(0)

    // Contagem da frequência de cada valor de pixel.
    for (let i = 0; i < linhas; i++) {
      for (let j = 0; j < colunas; j++) {
        histograma[pImagem[i][j]]++
      }
    }

    // Gerar labels (0 a 255) e associar aos dados do histograma.
    const labels = Array.from({ length: 256 }, (_, i) => String(i))
    const dados = histograma

    return { labels, dados }
  }
}

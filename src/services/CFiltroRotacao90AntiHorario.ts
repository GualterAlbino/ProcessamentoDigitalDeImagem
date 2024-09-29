export default class CFiltroRotacao90AntiHorario implements IFiltro {
  executar(pImagem: number[][]): number[][] {
    try {
      const linhas = pImagem.length
      const colunas = pImagem[0].length
      const matrizRotacionada: number[][] = Array.from({ length: colunas }, () => [])
    
      // Rotaciona a matriz 90 graus no sentido anti-horário
      for (let i = 0; i < linhas; i++) {
        for (let j = 0; j < colunas; j++) {
          // Copia os pixels para a nova posição
          matrizRotacionada[colunas - 1 - j][i] = pImagem[i][j]
        }
      }
    
      return matrizRotacionada
    } catch (error) {
      console.error(error)
      throw error
    }
    
  }
}

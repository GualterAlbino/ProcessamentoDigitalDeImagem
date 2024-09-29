export default class CFiltroRotacao90Horario implements IFiltro {
  public executar(pImagem: number[][]): number[][] {
    try {
      const linhas = pImagem.length
      const colunas = pImagem[0].length
      const matrizRotacionada: number[][] = Array.from({ length: colunas }, () => [])
    
      // Rotaciona a matriz 90 graus no sentido horário
      for (let i = 0; i < linhas; i++) {
        for (let j = 0; j < colunas; j++) {
          // Copia os pixels para a nova posição
          matrizRotacionada[j][linhas - 1 - i] = pImagem[i][j]
        }
      }
    
      return matrizRotacionada
    } catch (error) {
      console.error(error)
      throw error
    }
    
  }
}

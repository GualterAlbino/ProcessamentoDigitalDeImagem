export default class CFiltroExpansao implements IFiltro {
  public a: number | null = null
  public b: number | null = null

  tamanhoMascara: number = 3;

  constructor() {}
   // Método para definir os parâmetros a e b
  public definirParametros(a: number, b: number): void {
    this.a = a;
    this.b = b;
  }


  public executar(pImagem: number[][]): number[][] {
    try {
      if (this.a === null || this.b === null) { // Verifica se os parâmetros a e b foram definidos
        throw 'Os valores de a e b devem ser definidos antes de executar o filtro.';
      }
      if (this.tamanhoMascara % 2 === 0 || this.tamanhoMascara < 1) { // Verifica se o tamanho da máscara
        throw 'O tamanho da máscara deve ser um número ímpar maior que zero';
      }

      const matriz = pImagem;
      const linhas = matriz.length;
      const colunas = matriz[0].length;
      const matrizExpansao: number[][] = Array.from({ length: linhas }, () => Array(colunas).fill(0));

      const metadeMascara = Math.floor(this.tamanhoMascara / 2);

      // Percorre a matriz, excluindo as bordas
      for (let i = metadeMascara; i < linhas - metadeMascara; i++) {
        for (let j = metadeMascara; j < colunas - metadeMascara; j++) {
          let maxValor = 0;

          // Aplica a máscara de dilatação
          for (let k = -metadeMascara; k <= metadeMascara; k++) {
            for (let l = -metadeMascara; l <= metadeMascara; l++) {
              const pixel = matriz[i + k][j + l];
              maxValor = Math.max(maxValor, pixel); // Encontra o valor máximo na vizinhança 
            }
          }
          matrizExpansao[i][j] = Math.min(255, Math.max(0, Math.round(this.a * maxValor + this.b))); // Aplica a fórmula g = a * r + b
        } 
      }
    
    // Copia as bordas da matriz original para a matriz de saída
    for (let i = 0; i < linhas; i++) {
      matrizExpansao[i][0] = matriz[i][0]; // Borda esquerda
      matrizExpansao[i][colunas - 1] = matriz[i][colunas - 1]; // Borda direita
    }

    for (let j = 0; j < colunas; j++) {
      matrizExpansao[0][j] = matriz[0][j]; // Borda superior
      matrizExpansao[linhas - 1][j] = matriz[linhas - 1][j]; // Borda inferior
    }

    return matrizExpansao;  

    }catch (error) {
      console.error(error);
      throw error;
    }
  }
}

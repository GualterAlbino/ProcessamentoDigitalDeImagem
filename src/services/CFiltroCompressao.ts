export default class CFiltroCompressao implements IFiltro {
  ordem: number = 0
  public a: number = 0
  public b: number = 0

  constructor() {}

  executar(pImagem: number[][]): number[][] {
    throw new Error('Method not implemented.')
  }
}

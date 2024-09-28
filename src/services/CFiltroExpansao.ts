export default class CFiltroExpansao implements IFiltro {
  public a: number | null = null
  public b: number | null = null

  constructor() {}
  executar(pImagem: number[][]): number[][] {
    throw new Error('Method not implemented.')
  }
}

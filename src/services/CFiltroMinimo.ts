export default class CFiltroMinimo implements IFiltro {
  tamanhoMascara: number = 3

  executar(pImagem: number[][]): number[][] {
    const matriz = pImagem
    const matrizCalculada: number[][] = []
    const linhas = matriz.length
    const colunas = matriz[0].length

    // Calcula o tamanho dos subitens da máscara
    const subItens = Math.floor(this.tamanhoMascara / 2)

    // Total de elementos por subvetor
    const totalElementosSubVetor = this.tamanhoMascara ** 2

    try {
      // Percorre a matriz completa
      for (let i = 0; i < linhas; i++) {
        matrizCalculada.push([])

        for (let j = 0; j < colunas; j++) {
          //Matriz contendo os subvetores
          const subVetores: number[][] = []

          // Cria um array de subvetores
          let subVetorAtual: number[] = []

          for (let l = -subItens; l <= subItens; l++) {
            for (let m = -subItens; m <= subItens; m++) {
              const vizinhoX = i + l
              const vizinhoY = j + m

              // Valida se o vizinho está dentro da matriz
              if (vizinhoX >= 0 && vizinhoX < linhas && vizinhoY >= 0 && vizinhoY < colunas) {
                subVetorAtual.push(matriz[vizinhoX][vizinhoY])
              }
            }
          }

          // Adiciona os subvetores a matriz dos itens da máscara
          if (subVetorAtual.length === totalElementosSubVetor) {
            subVetores.push([...subVetorAtual])
          }

          // Calcula o mínimo de cada subvetor
          const minimosSubVetores = subVetores.map((subVetor) => Math.min(...subVetor))

          // Calcula o máximo dos mínimos
          const maxMinimo = Math.max(...minimosSubVetores)

          // Adiciona o valor calculado ao indice da nova matriz
          matrizCalculada[i].push(maxMinimo)
        }
      }

      return matrizCalculada
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

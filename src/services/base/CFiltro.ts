export default class CFiltro {
  /**
   *  Converte uma imagem em Base64 para uma matriz bidimensional de intensidades de pixels.
   * @param pImagem - Imagem no formato Base64
   * @returns - Uma Promise que resolve em uma matriz bidimensional (number[][]) com as intensidades dos pixels
   */
  public static obterMatrizImagem(pImagem: string): Promise<number[][]> {
    try {
      return new Promise((resolve, reject) => {
        const image = new Image() // Cria um novo objeto de imagem
        image.src = pImagem // Define a fonte da imagem como a string Base64

        // Quando a imagem é carregada, executa o código abaixo
        image.onload = () => {
          // Cria um canvas temporário para desenhar a imagem
          const canvas = document.createElement('canvas')
          const context = canvas.getContext('2d')

          // Verifica se o contexto 2D está disponível (necessário para manipular a imagem)
          if (!context) {
            reject('Contexto do canvas não disponível')
            return
          }

          // Define a largura e altura do canvas com base no tamanho da imagem
          canvas.width = image.width
          canvas.height = image.height

          // Desenha a imagem no canvas
          context.drawImage(image, 0, 0)

          // Extrai os dados de pixel da imagem desenhada
          const imageData = context.getImageData(0, 0, image.width, image.height)
          const pixels = imageData.data // Dados de pixels (RGBA)

          // Cria uma matriz bidimensional para armazenar a intensidade de cada pixel
          const matrizPixels: number[][] = []

          // Itera sobre cada linha de pixels (eixo Y)
          for (let y = 0; y < image.height; y++) {
            const row: number[] = [] // Cria uma nova linha de intensidades
            // Itera sobre cada pixel da linha (eixo X)
            for (let x = 0; x < image.width; x++) {
              const index = (y * image.width + x) * 4 // Cada pixel tem 4 valores (R, G, B, A)
              const r = pixels[index] // Canal vermelho
              const g = pixels[index + 1] // Canal verde
              const b = pixels[index + 2] // Canal azul
              // Calcula a intensidade do pixel como a média dos canais R, G e B
              const intensity = (r + g + b) / 3

              row.push(intensity) // Adiciona a intensidade à linha
            }
            matrizPixels.push(row) // Adiciona a linha à matriz de pixels
          }

          resolve(matrizPixels) // Retorna a matriz de intensidade de pixels
        }

        // Caso ocorra um erro ao carregar a imagem
        image.onerror = () => {
          reject('Falha ao carregar a imagem')
        }
      })
    } catch (error) {
      console.log(error)
      throw error // Lança o erro para tratamento externo
    }
  }
}

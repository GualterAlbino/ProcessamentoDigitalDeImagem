import type CFiltroExpansao from '../CFiltroExpansao'
import type CFiltroNegativo from '../CFiltroNegativo'
import type CFiltroCompressao from '../CFiltroCompressao'
import type CFiltroLogaritimo from '../CFiltroLogaritimo'
import type CFiltroEspelhamentoVertical from '../CFiltroEpelhamentoVertical'
import type CFiltroEspelhamentoHorizontal from '../CFiltroEspelhamentoHorizontal'

// Store
import { useLayoutStore } from '@/stores/LayoutStore'

export default class CFiltro {
  negativo: CFiltroNegativo[] = []
  logaritimo: CFiltroLogaritimo[] = []
  logaritimoInverso: CFiltroLogaritimo[] = []
  potencia: CFiltroLogaritimo[] = []
  raiz: CFiltroLogaritimo[] = []
  ampliacaoReplicacao512x512: CFiltroLogaritimo[] = []
  ampliacaoReplicacao1024x1024: CFiltroLogaritimo[] = []
  ampliacaoBilinear512x512: CFiltroLogaritimo[] = []
  ampliacaoBilinear1024x1024: CFiltroLogaritimo[] = []
  espelhamentoHorizontal: CFiltroEspelhamentoHorizontal[] = []
  espelhamentoVertical: CFiltroEspelhamentoVertical[] = []
  expansao: CFiltroExpansao[] = []
  compressao: CFiltroCompressao[] = []
  somarImagens: CFiltroLogaritimo[] = []
  media: CFiltroLogaritimo[] = []
  mediana: CFiltroLogaritimo[] = []
  moda: CFiltroLogaritimo[] = []
  minimo: CFiltroLogaritimo[] = []
  maximo: CFiltroLogaritimo[] = []
  laplaciano: CFiltroLogaritimo[] = []
  highBoost: CFiltroLogaritimo[] = []
  prewitt: CFiltroLogaritimo[] = []
  sobel: CFiltroLogaritimo[] = []

  /**
   *  Converte uma imagem em Base64 para uma matriz bidimensional de intensidades de pixels.
   * @param pImagem - Imagem no formato Base64
   * @returns - Uma Promise que resolve em uma matriz bidimensional (number[][]) com as intensidades dos pixels
   */
  public static async base64ToMatriz(pImagem: string): Promise<number[][]> {
    try {
      useLayoutStore().loading.mensagem = 'Convertendo imagem para matriz de pixels...'
      return new Promise((resolve, reject) => {
        const image = new Image() // Cria um novo objeto de imagem
        image.src = pImagem // Define a fonte da imagem como a string Base64

        // Quando a imagem é carregada, executa o código abaixo
        image.onload = async () => {
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
    } finally {
      useLayoutStore().loading.mensagem = ''
    }
  }

  /**
   * Converte uma matriz bidimensional de intensidades de pixels de volta para uma imagem em Base64.
   * @param matriz - Matriz bidimensional contendo as intensidades dos pixels (número de 0 a 255)
   * @returns - Uma Promise que resolve para uma string Base64 que representa a imagem
   */
  public static async matrizToBase64(matriz: number[][]): Promise<string> {
    try {
      useLayoutStore().loading.mensagem = 'Convertendo matriz de pixels para imagem...'
      return new Promise((resolve, reject) => {
        // Cria um canvas temporário
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')

        // Verifica se o contexto 2D está disponível
        if (!context) {
          reject('Contexto do canvas não disponível')
          return
        }

        // Define as dimensões do canvas de acordo com a matriz (altura e largura)
        const height = matriz.length // O número de linhas da matriz é a altura
        const width = matriz[0].length // O número de colunas é a largura
        canvas.width = width
        canvas.height = height

        // Cria um novo ImageData com a mesma largura e altura da matriz
        const imageData = context.createImageData(width, height)

        // Itera sobre cada pixel da matriz e insere os valores de intensidade no ImageData
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const intensity = matriz[y][x] // Obtém o valor de intensidade da matriz
            const index = (y * width + x) * 4 // Cada pixel tem 4 valores (R, G, B, A)

            // Define os valores R, G e B com a intensidade (para tons de cinza, os três são iguais)
            imageData.data[index] = intensity // Red
            imageData.data[index + 1] = intensity // Green
            imageData.data[index + 2] = intensity // Blue
            imageData.data[index + 3] = 255 // Alpha (opacidade total)
          }
        }

        // Desenha os dados de pixel no canvas
        context.putImageData(imageData, 0, 0)

        // Converte o canvas em uma imagem Base64 (formato PNG)
        const base64Image = canvas.toDataURL('image/png')

        resolve(base64Image) // Retorna a string Base64 da imagem
      })
    } catch (error) {
      console.log(error)
      throw error // Lança o erro para tratamento externo
    } finally {
      useLayoutStore().loading.mensagem = ''
    }
  }

  public static arredondar(pNumber: number): number {
    return Number(pNumber.toFixed(0))
    //return Math.max(0, Math.min(255, pNumber))
  }
}

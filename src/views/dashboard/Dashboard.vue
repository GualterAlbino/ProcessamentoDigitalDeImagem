<template>
  <ToolbarDashboard
    :opcoesVisualizacao="opcoesVisualizacao"
    v-model:opcaoVisualizacao="opcaoVisualizacao"
    @onClickFiltros="onClickFiltros()"
  />

  <v-row v-if="showCardImagens">
    <v-col v-if="exibeImagemEntrada" :cols="$vuetify.display.smAndUp ? colunasImagem : 12">
      <CardImage
        :titulo="'Imagem de Entrada'"
        v-model:imagem="imagemEntradaBase64"
        :maxWidhtCard="widhtImage"
        @onClickFullscrenImagem="onClickFullScreenImagem()"
      >
        <template #actions>
          <v-file-input
            :color="'primary'"
            :prependIcon="''"
            :variant="'outlined'"
            :appendInnerIcon="'mdi-upload'"
            :label="'Carregar imagem'"
            :accept="'image/png, image/jpeg, image/bmp'"
            v-model="inputFile"
            @change="onImageEntradaChange($event)"
            @click:clear="onClearImagem()"
          ></v-file-input>
        </template>
      </CardImage>
    </v-col>

    <v-col v-if="exibeImagemResultado" :cols="$vuetify.display.smAndUp ? colunasImagem : 12">
      <CardImage
        :maxWidhtCard="widhtImage"
        :titulo="'Imagem Resultante'"
        v-model:imagem="imagemResultadoBase64"
        @onClickFullscrenImagem="onClickFullScreenImagem()"
      >
        <template #actions>
          <v-btn
            :color="'primary'"
            :variant="'outlined'"
            :size="'large'"
            @click="onClickBaixarImagem()"
          >
            Baixar imagem<v-icon>mdi-download</v-icon></v-btn
          >
        </template>
      </CardImage>
    </v-col>
  </v-row>

  <FormFiltros
    v-model:exibirDialog="exibirFiltros"
    v-model:imagem="imagemResultadoMatriz"
    @onImagemAtualizada="onImagemAtualizada($event)"
  />

  <SpeedDial
    @onClickRotacao180="onClickRotacao180()"
    @onClickRotacao90Horario="onClickRotacao90Horario()"
    @onClickRotacao90AntiHorario="onClickRotacao90AntiHorario()"
    @onClickExibirHistogramaImagemEntrada="onClickExibirHistogramaImagemEntrada()"
    @onClickExibirHistogramaImagemResultante="onClickExibirHistogramaImagemResultante()"
  />

  <Histograma v-model:imagem="imagemMatrizHistograma" v-model:exibirDialog="exibirHistograma" />
</template>

<script setup lang="ts">
// Vue
import { ref, computed } from 'vue'

// Store
import { useLayoutStore } from '@/stores/LayoutStore'
const layout = useLayoutStore()

// Components
import SpeedDial from './components/SpeedDial.vue'
import CardImage from './components/CardImage.vue'
import Histograma from './components/Histograma.vue'
import FormFiltros from './components/FormFiltros.vue'
import ToolbarDashboard from './components/ToolbarDashboard.vue'

// Services
import CFiltro from '@/services/base/CFiltro'
import CFiltroRotacao180 from '@/services/CFiltroRotacao180'
import CFiltroRotacao90Horario from '@/services/CFiltroRotacao90Horario'
import CFiltroRotacao90AntiHorario from '@/services/CFiltroRotacao90AntiHorario'

// Enums
import { EOpcoesVisualizacao } from '@/enums/EOpcoesVisualizacao'

// Propriedades reativas
const inputFile = ref()

const showCardImagens = ref<boolean>(true)

const exibirFiltros = ref<boolean>(false)
const exibirHistograma = ref<boolean>(false)

const imagemEntradaMatriz = ref<number[][]>([])
const imagemResultadoMatriz = ref<number[][]>([])
const imagemEntradaBase64 = ref<string | null>(null)
const imagemResultadoBase64 = ref<string | null>(null)
const imagemMatrizHistograma = ref<number[][]>([])

const expandirImagem = ref<boolean>(false)
const opcaoVisualizacao = ref<number>(EOpcoesVisualizacao.APENAS_ENTRADA)

// Manipula o evento de mudança de imagem
async function onImageEntradaChange(event: Event) {
  onClearImagem()

  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file) {
    const reader = new FileReader()

    reader.onload = async () => {
      imagemEntradaBase64.value = reader.result as string
      imagemResultadoBase64.value = reader.result as string

      imagemEntradaMatriz.value = await CFiltro.base64ToMatriz((reader.result as string) || '')
      imagemResultadoMatriz.value = await CFiltro.base64ToMatriz((reader.result as string) || '')
    }

    reader.readAsDataURL(file)
  } else {
    onClearImagem()
  }
  showCardImagens.value = false
  setTimeout(() => {
    showCardImagens.value = true
  }, 100)

  opcaoVisualizacao.value = EOpcoesVisualizacao.COMPARACAO
}

function onClickBaixarImagem() {
  if (imagemResultadoBase64.value) {
    // Converter a imagem Base64 para Blob
    const link = document.createElement('a')
    const dataUrl = imagemResultadoBase64.value
    const mimeType = dataUrl.split(';')[0].split(':')[1]
    const byteString = atob(dataUrl.split(',')[1])
    const arrayBuffer = new ArrayBuffer(byteString.length)
    const intArray = new Uint8Array(arrayBuffer)

    // Preencher a array de bytes
    for (let i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i)
    }

    // Criar o Blob a partir da array de bytes
    const blob = new Blob([intArray], { type: mimeType })

    // Criar um link temporário para download
    const url = URL.createObjectURL(blob)
    link.href = url
    link.download = 'imagem_resultante.png' // Nome do arquivo de download
    link.click()

    // Limpar o objeto URL após o download
    URL.revokeObjectURL(url)
  }
}

function onClearImagem() {
  imagemEntradaBase64.value = null
  imagemResultadoBase64.value = null

  imagemEntradaMatriz.value = []
  imagemResultadoMatriz.value = []

  opcaoVisualizacao.value = EOpcoesVisualizacao.APENAS_ENTRADA
}

function onClickFiltros() {
  exibirFiltros.value = !exibirFiltros.value
}

function onClickFullScreenImagem() {
  expandirImagem.value = !expandirImagem.value
}

async function onImagemAtualizada(pMatriz: number[][]) {
  try {
    useLayoutStore().loading.mensagem = 'Aplicando filtros...'
    imagemResultadoMatriz.value = pMatriz
    imagemResultadoBase64.value = await CFiltro.matrizToBase64(imagemResultadoMatriz.value)
  } catch (error) {
    exibirMensagem('Erro ao atualizar imagem resultante', error)
    throw error
  } finally {
    useLayoutStore().loading.mensagem = ''
  }
}

async function onClickRotacao180() {
  try {
    layout.loading.mensagem = 'Rotacionando imagem...'

    // Pequeno atraso para garantir que o loading seja exibido
    await new Promise((resolve) => setTimeout(resolve, 50))

    imagemResultadoMatriz.value = new CFiltroRotacao180().executar(imagemResultadoMatriz.value)
    imagemResultadoBase64.value = await CFiltro.matrizToBase64(imagemResultadoMatriz.value)
  } catch (error) {
    exibirMensagem('Erro ao rotacionar imagem', error)
    throw error
  } finally {
    layout.loading.mensagem = ''
  }
}

async function onClickRotacao90Horario() {
  try {
    layout.loading.mensagem = 'Rotacionando imagem...'

    // Pequeno atraso para garantir que o loading seja exibido
    await new Promise((resolve) => setTimeout(resolve, 50))

    imagemResultadoMatriz.value = new CFiltroRotacao90Horario().executar(
      imagemResultadoMatriz.value
    )
    imagemResultadoBase64.value = await CFiltro.matrizToBase64(imagemResultadoMatriz.value)
  } catch (error) {
    exibirMensagem('Erro ao rotacionar imagem', error)
    throw error
  } finally {
    layout.loading.mensagem = ''
  }
}

async function onClickRotacao90AntiHorario() {
  try {
    layout.loading.mensagem = 'Rotacionando imagem...'

    // Pequeno atraso para garantir que o loading seja exibido
    await new Promise((resolve) => setTimeout(resolve, 50))

    imagemResultadoMatriz.value = new CFiltroRotacao90AntiHorario().executar(
      imagemResultadoMatriz.value
    )
    imagemResultadoBase64.value = await CFiltro.matrizToBase64(imagemResultadoMatriz.value)
  } catch (error) {
    exibirMensagem('Erro ao rotacionar imagem', error)
    throw error
  } finally {
    layout.loading.mensagem = ''
  }
}

function onClickExibirHistogramaImagemEntrada() {
  exibirHistograma.value = !exibirHistograma.value
  imagemMatrizHistograma.value = imagemEntradaMatriz.value
}

function onClickExibirHistogramaImagemResultante() {
  exibirHistograma.value = !exibirHistograma.value
  imagemMatrizHistograma.value = imagemResultadoMatriz.value
}

function exibirMensagem(pTitulo: string = 'Erro', pErro: string | any) {
  useLayoutStore().messageDialog.show = true
  useLayoutStore().messageDialog.titulo = pTitulo
  useLayoutStore().messageDialog.mensagem = pErro instanceof Error ? pErro.message : pErro
}

//-----
// Computed's
//-----

const opcoesVisualizacao = computed(() => {
  const opcoes = [{ texto: 'Apenas Entrada', valor: EOpcoesVisualizacao.APENAS_ENTRADA }]

  if (imagemResultadoBase64.value) {
    opcoes.push({ texto: 'Apenas Resultado', valor: EOpcoesVisualizacao.APENAS_RESULTADO })
    opcoes.push({ texto: 'Comparação', valor: EOpcoesVisualizacao.COMPARACAO })
  }

  return opcoes
})

const colunasImagem = computed(() => {
  return opcaoVisualizacao.value === EOpcoesVisualizacao.COMPARACAO ? 6 : 12
})

const widhtImage = computed(() => {
  return expandirImagem.value ? '1000px' : '400px'
})

const exibeImagemEntrada = computed(() => {
  if (!imagemEntradaBase64.value) {
    return true
  }

  if (opcaoVisualizacao.value === EOpcoesVisualizacao.APENAS_ENTRADA) {
    return true
  }

  if (opcaoVisualizacao.value === EOpcoesVisualizacao.COMPARACAO) {
    return true
  }

  return false
})

const exibeImagemResultado = computed(() => {
  if (opcaoVisualizacao.value === EOpcoesVisualizacao.APENAS_RESULTADO) {
    return true
  }

  if (opcaoVisualizacao.value === EOpcoesVisualizacao.COMPARACAO) {
    return true
  }

  return false
})
</script>

<style scoped>
.LStyleCardActions {
  background-color: red;
}
</style>

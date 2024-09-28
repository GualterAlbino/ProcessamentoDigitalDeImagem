<template>
  <ToolbarDashboard
    :opcoesVisualizacao="opcoesVisualizacao"
    v-model:opcaoVisualizacao="opcaoVisualizacao"
    @onClickFiltros="onClickFiltros()"
  />

  <v-row>
    <v-col v-if="exibeImagemEntrada" :cols="colunasImagem">
      <CardImage
        :titulo="'Imagem de Entrada'"
        v-model:imagem="imagemEntradaBase64"
        :maxWidhtCard="widhtImage"
        @onClickFullscrenImagem="onClickFullScreenImagemEntrada()"
      >
        <template #actions>
          <v-file-input
            :color="'primary'"
            :prependIcon="''"
            :variant="'outlined'"
            :appendInnerIcon="'mdi-upload'"
            :label="'Carregar imagem'"
            :accept="'image/png, image/jpeg, image/bmp'"
            @change="onImageEntradaChange($event)"
            @click:clear="onClearImagem()"
          ></v-file-input>
        </template>
      </CardImage>
    </v-col>

    <v-col v-if="exibeImagemResultado" :cols="colunasImagem">
      <CardImage
        :maxWidhtCard="widhtImage"
        :titulo="'Imagem Resultante'"
        v-model:imagem="imagemResultadoBase64"
        @onClickFullscrenImagem="onClickFullscrenImagemResultado()"
      >
        <template #actions>
          <v-btn :color="'primary'" :variant="'outlined'" :size="'large'">
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

  <SpeedDial />
</template>

<script setup lang="ts">
// Vue
import { ref, computed } from 'vue'

// Store
import { useLayoutStore } from '@/stores/LayoutStore'

// Components
import CardImage from './components/CardImage.vue'
import FormFiltros from './components/FormFiltros.vue'
import ToolbarDashboard from './components/ToolbarDashboard.vue'

// Services
import CFiltro from '@/services/base/CFiltro'

// Enums
import { EOpcoesVisualizacao } from '@/enums/EOpcoesVisualizacao'
import SpeedDial from './components/SpeedDial.vue'

// Propriedades reativas
const exibirFiltros = ref<boolean>(false)

const imagemEntradaMatriz = ref<number[][]>([])
const imagemResultadoMatriz = ref<number[][]>([])
const imagemEntradaBase64 = ref<string | null>(null)
const imagemResultadoBase64 = ref<string | null>(null)

const expandirImagemEntrada = ref<boolean>(false)
const expandirImagemResultado = ref<boolean>(false)
const opcaoVisualizacao = ref<number>(EOpcoesVisualizacao.APENAS_ENTRADA)

// Manipula o evento de mudança de imagem
async function onImageEntradaChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file) {
    const reader = new FileReader()

    reader.onload = async () => {
      imagemEntradaBase64.value = reader.result as string
      imagemResultadoBase64.value = reader.result as string

      imagemEntradaMatriz.value = await CFiltro.base64ToMatriz((reader.result as string) || '')
      imagemResultadoMatriz.value = await CFiltro.base64ToMatriz((reader.result as string) || '')
      //console.log(await CFiltro.obterMatrizImagem((reader.result as string) || ''))
    }

    reader.readAsDataURL(file)
  } else {
    onClearImagem()
  }

  opcaoVisualizacao.value = EOpcoesVisualizacao.COMPARACAO
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

function onClickFullScreenImagemEntrada() {
  expandirImagemEntrada.value = !expandirImagemEntrada.value
}

function onClickFullscrenImagemResultado() {
  expandirImagemResultado.value = !expandirImagemResultado.value
}

async function onImagemAtualizada(pMatriz: number[][]) {
  try {
    useLayoutStore().loading.mensagem = 'Aplicando filtros...'
    imagemResultadoMatriz.value = pMatriz
    imagemResultadoBase64.value = await CFiltro.matrizToBase64(imagemResultadoMatriz.value)
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    useLayoutStore().loading.mensagem = ''
  }
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
  return expandirImagemEntrada.value || expandirImagemResultado.value ? '1000' : '400px'
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

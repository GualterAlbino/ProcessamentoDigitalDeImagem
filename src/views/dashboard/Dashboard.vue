<template>
  <ToolbarDashboard
    :opcoesVisualizacao="opcoesVisualizacao"
    v-model:opcaoVisualizacao="opcaoVisualizacao"
    @onClickFiltros="onClickFiltos()"
  />

  <v-row>
    <v-col v-if="exibeImagemEntrada" :cols="colunasImagem">
      <CardImage
        :titulo="'Imagem de Entrada'"
        v-model:imagem="imagemEntrada"
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
            @click:clear="
             onClearImagem()
            "
          ></v-file-input>
        </template>
      </CardImage>
    </v-col>

    <v-col v-if="exibeImagemResultado" :cols="colunasImagem">
      <CardImage
        :maxWidhtCard="widhtImage"
        :titulo="'Imagem Resultante'"
        v-model:imagem="imagemResultado"
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

  <FormFiltros v-model:exibirDialog="exibirFiltros">
    <template #default>
      <v-row dense>
        <v-col cols="12" md="4" sm="6">
          <v-text-field label="First name*" required></v-text-field>
        </v-col>

        <v-col cols="12" md="4" sm="6">
          <v-text-field
            hint="example of helper text only on focus"
            label="Middle name"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4" sm="6">
          <v-text-field
            hint="example of persistent helper text"
            label="Last name*"
            persistent-hint
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4" sm="6">
          <v-text-field label="Email*" required></v-text-field>
        </v-col>

        <v-col cols="12" md="4" sm="6">
          <v-text-field label="Password*" type="password" required></v-text-field>
        </v-col>

        <v-col cols="12" md="4" sm="6">
          <v-text-field label="Confirm Password*" type="password" required></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-select :items="['0-17', '18-29', '30-54', '54+']" label="Age*" required></v-select>
        </v-col>

        <v-col cols="12" sm="6">
          <v-autocomplete
            :items="[
              'Skiing',
              'Ice hockey',
              'Soccer',
              'Basketball',
              'Hockey',
              'Reading',
              'Writing',
              'Coding',
              'Basejump'
            ]"
            label="Interests"
            auto-select-first
            multiple
          ></v-autocomplete>
        </v-col>
      </v-row>
    </template>
  </FormFiltros>
</template>

<script setup lang="ts">
// Vue
import { ref, computed } from 'vue'

// Components
import CardImage from './components/CardImage.vue'
import FormFiltros from './components/FormFiltros.vue'
import ToolbarDashboard from './components/ToolbarDashboard.vue'

// Enums
import { EOpcoesVisualizacao } from '@/enums/EOpcoesVisualizacao'

// Propriedades reativas
const exibirFiltros = ref<boolean>(false)
const imagemEntrada = ref<string | null>(null)
const imagemResultado = ref<string | null>(null)
const expandirImagemEntrada = ref<boolean>(false)
const expandirImagemResultado = ref<boolean>(false)
const opcaoVisualizacao = ref<number>(EOpcoesVisualizacao.APENAS_ENTRADA)

function onClearImagem() {
  imagemEntrada.value = null
  imagemResultado.value = null
}

function onClickFiltos() {
  exibirFiltros.value = !exibirFiltros.value
}

function onClickFullScreenImagemEntrada() {
  expandirImagemEntrada.value = !expandirImagemEntrada.value
}

function onClickFullscrenImagemResultado() {
  expandirImagemResultado.value = !expandirImagemResultado.value
}

// Manipula o evento de mudança de imagem
function onImageEntradaChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file) {
    const reader = new FileReader()

    reader.onload = () => {
      imagemEntrada.value = reader.result as string
      imagemResultado.value = reader.result as string
    }

    reader.readAsDataURL(file)
  } else {
    imagemEntrada.value = null
    imagemResultado.value = null
  }

  opcaoVisualizacao.value = EOpcoesVisualizacao.COMPARACAO
}

const opcoesVisualizacao = computed(() => {
  const opcoes = [{ texto: 'Apenas Entrada', valor: EOpcoesVisualizacao.APENAS_ENTRADA }]

  if (imagemResultado.value) {
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
  if (!imagemEntrada.value) {
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

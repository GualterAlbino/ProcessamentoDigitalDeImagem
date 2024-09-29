<template>
  <div>
    <v-container :fluid="true">
      <v-divider />

      <v-card class="pb-5" :elevation="2">
        <v-row>
          <!-- Título -->
          <v-col :cols="12">
            <v-card-title>
              <div class="d-flex justify-space-between align-center w-100">
                <div>
                  <h3>{{ props.titulo }}</h3>
                  <p v-if="props.subtitulo" class="subheading">{{ props.subtitulo }}</p>
                </div>

                <v-btn
                  color="error"
                  class="ml-auto"
                  :variant="'outlined'"
                  @click="onDeleteItem(props.index)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </v-card-title>
          </v-col>
        </v-row>

        <v-card-subtitle class="mb-3"
          >Ordem: <strong> {{ props.ordem }}</strong></v-card-subtitle
        >

        <!-- Input reativo para os parâmetros -->
        <v-row class="justify-center">
          <v-col
            v-for="(param, index) in params"
            :sm="4"
            :cols="12"
            :key="index"
            class="d-flex justify-center"
          >
            <v-file-input
              v-if="String(index) == 'imagem'"
              :color="'primary'"
              :prependIcon="''"
              :variant="'outlined'"
              :label="'Carregar imagem'"
              :appendInnerIcon="'mdi-upload'"
              :accept="'image/png, image/jpeg, image/bmp'"
              @change="onImageParametroChange(String(index), $event)"
            ></v-file-input>

            <v-text-field
              v-else
              :variant="'outlined'"
              v-model="params[index]"
              :label="`Parâmetro: ${index}`"
              @input="atualizarParametro(String(index), param)"
            />
          </v-col>
        </v-row>
      </v-card>

      <v-divider />
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import CFiltro from '@/services/base/CFiltro'

// Vue
const emit = defineEmits(['onDelete'])

// Props do componente
const props = defineProps({
  titulo: { type: String, required: true },
  subtitulo: { type: String, required: false },
  ordem: { type: Number, required: true },
  index: { type: Number, required: true }
})

const params = defineModel<any>('params', {
  required: true
})

// Função para deletar item
function onDeleteItem(pIndex: number) {
  emit('onDelete', pIndex)
}

// Função chamada quando o parâmetro é alterado
function atualizarParametro(pIndexCampo: string, pValor: any) {
  //Atribui o valor ao parâmetro
  //ex: params.value['tamanhoMascara'] = 5
  if (params.value) {
    params.value[pIndexCampo] = pValor
  }
}

function onImageParametroChange(pIndex: string, pEvent: Event) {
  try {
    const target = pEvent.target as HTMLInputElement
    const file = target.files?.[0]

    let imagemBase64 = ''
    let imagemMatriz: number[][] = []

    if (file) {
      const reader = new FileReader()

      reader.onload = async () => {
        imagemBase64 = reader.result as string
        imagemMatriz = await CFiltro.base64ToMatriz(imagemBase64)

        atualizarParametro(pIndex, imagemMatriz)
      }

      reader.readAsDataURL(file)
    } else {
      imagemBase64 = ''
      imagemMatriz = []
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}
</script>

<style scoped></style>

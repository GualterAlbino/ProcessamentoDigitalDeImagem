<template>
  <v-container :fluid="true">
    <v-form class="LStyleForm">
      <div>
        <v-row>
          <v-col v-if="exibeImagemEntrada" :cols="colunasVisualizacaoImagem">
            <v-card>
              <div class="LStyleImageUploader">
                <!-- Exibe a imagem ou o logo padrão -->

                <v-card
                  :width="tamanhoImagemEntrada.width"
                  :height="tamanhoImagemEntrada.height"
                  class="LStyleImagePreview ma-5"
                >
                  <img
                    v-if="imageUrl"
                    :src="imageUrl"
                    alt="Imagem carregada"
                    class="LStyleUploadedImage"
                  />
                  <img v-else src="@/assets/logo.svg" alt="Logo padrão" class="LStyleDefaultLogo" />
                </v-card>
              </div>

              <v-card-actions>
                <v-row :align-content="'center'" :justify="'center'">
                  <v-col :cols="8">
                    <v-file-input
                      :label="'Carregar imagem de entrada'"
                      bg-color="white"
                      :accept="'image/png, image/jpeg, image/bmp'"
                      :variant="'outlined'"
                      @change="onImageChange"
                    ></v-file-input>
                  </v-col>

                  <v-col :cols="4">
                    <v-btn
                      :size="'large'"
                      :variant="'outlined'"
                      :color="'primary'"
                      @click="onExpandirImagemEntrada()"
                      ><v-icon>mdi-fullscreen</v-icon></v-btn
                    >
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col v-if="exibeImagemResultado" :cols="colunasVisualizacaoImagem">
            <v-card>
              <div class="LStyleImageUploader">
                <div class="LStyleImagePreview">
                  <img
                    v-if="imageUrl"
                    :src="imageUrl"
                    alt="Imagem carregada"
                    class="LStyleUploadedImage"
                  />
                  <img v-else src="@/assets/logo.svg" alt="Logo padrão" class="LStyleDefaultLogo" />
                </div>
              </div>

              <v-card-actions>
                <v-file-input
                  :label="'Carregar imagem de entrada'"
                  bg-color="white"
                  :accept="'image/png, image/jpeg, image/bmp'"
                  :variant="'outlined'"
                  @change="onImageChange"
                ></v-file-input>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { EOpcoesVisualizacao } from '@/enums/EOpcoesVisualizacao'
import { ref, computed } from 'vue'

const imageUrl = ref<string | null>(null)
const imagemEntrada = ref<string | null>(null)
const imagemResultado = ref<string | null>(null)
const expandirImagemEntrada = ref<boolean>(false)
const expandirImagemResultado = ref<boolean>(false)

interface PropTypes {
  /**
   * Indica a forma de visualização do componente
   */
  opcaoVisualizacao: number
}
const props = withDefaults(defineProps<PropTypes>(), {
  opcaoVisualizacao: EOpcoesVisualizacao.COMPARACAO
})

function onExpandirImagemEntrada() {
  expandirImagemEntrada.value = !expandirImagemEntrada.value
}

const tamanhoImagemEntrada = computed(() => {
  if (expandirImagemEntrada.value) {
    return { width: '700px', height: '700px' }
  } else {
    return { width: '400px', height: '500px' }
  }
})

function onExpandirImagemResultado() {
  expandirImagemResultado.value = !expandirImagemResultado.value
}

const colunasVisualizacaoImagem = computed(() => {
  return props.opcaoVisualizacao == EOpcoesVisualizacao.COMPARACAO ? 6 : 12
})

const exibeImagemResultado = computed(() => {
  return props.opcaoVisualizacao !== EOpcoesVisualizacao.APENAS_ENTRADA
})

const exibeImagemEntrada = computed(() => {
  return props.opcaoVisualizacao !== EOpcoesVisualizacao.APENAS_RESULTADO
})

// Manipula o evento de mudança de imagem
function onImageChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file) {
    const reader = new FileReader()

    reader.onload = () => {
      imageUrl.value = reader.result as string
    }

    reader.readAsDataURL(file)
  } else {
    imageUrl.value = null
  }
}
</script>

<style scoped>
.LStyleImageUploader {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Estilo para a área de pré-visualização da imagem */
.LStyleImagePreview {
  min-width: 300px;
  min-height: 300px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed #ccc;
}

/* Estilo da imagem carregada */
.LStyleUploadedImage {
  max-width: 100%;
  max-height: 100%;
}

/* Estilo do logo padrão */
.LStyleDefaultLogo {
  max-width: 50%;
  max-height: 100%;
  opacity: 0.5; /* Torne o logo um pouco mais opaco para indicar um placeholder */
}
</style>

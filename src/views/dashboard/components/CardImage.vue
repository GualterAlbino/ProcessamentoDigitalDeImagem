<template>
  <v-container :fluid="true">
    <v-form class="LStyleForm">
      <div>
        <v-row>
          <v-col :cols="props.colunasCard">
            <v-card class="text-center" :maxWidth="props.maxWidhtCard">
              <v-card-title>
                <v-row>
                  <v-col>
                    {{ props.titulo }}
                  </v-col>

                  <v-col>
                    <v-btn
                      :variant="'outlined'"
                      :color="'primary'"
                      v-tooltip="'Expandir Imagem'"
                      @click="onClickFullscrenImagem"
                    >
                      <v-icon>mdi-fullscreen</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-title>

              <div class="LStyleImageUploader">
                <v-card class="LStyleImagePreview" :max-width="props.maxWidhtCard">
                  <img
                    v-if="imagem"
                    :id="'ImagePreview-' + uid"
                    :src="imagem"
                    alt="Imagem carregada"
                    class="LStyleUploadedImage"
                    @mousemove="onMouseMove"
                    @load="onImageLoad"
                  />

                  <img v-else src="@/assets/logo.svg" alt="Logo padrão" class="LStyleDefaultLogo" />
                </v-card>
                <div v-if="coordenadas">
                  Coordenadas: ({{ coordenadas.x }}, {{ coordenadas.y }}), NC: {{ nivelCinza }}
                </div>
              </div>

              <v-card-actions>
                <v-row>
                  <v-col class="LStyleCardActions">
                    <slot name="actions"></slot>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
// Vue
import { ref, watch, onMounted } from 'vue'
const emit = defineEmits(['onClickFullscrenImagem'])

interface PropTypes {
  /**
   * Título do card
   */
  titulo?: string

  /**
   * Largura máxima do card
   */
  maxWidhtCard?: string

  /**
   * Número de colunas do card
   */
  colunasCard?: number
}

const props = withDefaults(defineProps<PropTypes>(), {
  titulo: '',
  colunasCard: 12,
  maxWidhtCard: '500px'
})

const imagem = defineModel<string | null>('imagem', {
  default: null
})
const uid = gerarUid()
const coordenadas = ref({ x: 0, y: 0 })
const nivelCinza = ref<number | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
const imageElement = ref<HTMLImageElement | null>(null)
const context = ref<CanvasRenderingContext2D | null>(null)

onMounted(() => {
  imageElement.value = document.getElementById(`ImagePreview-${uid}`) as HTMLImageElement
  onImageLoad()
})

watch(imagem, (newValue) => {
  if (newValue) {
    //imageElement.value = document.getElementById(`ImagePreview-${uid}`) as HTMLImageElement
    onImageLoad()
  }
})

// Função para gerar IDs únicos
function gerarUid() {
  return Math.random().toString(36).substr(2, 9)
}

// Função chamada ao carregar a imagem
function onImageLoad() {
  if (imageElement.value) {
    canvas.value = document.createElement('canvas')
    context.value = canvas.value.getContext('2d')

    // Ajusta o tamanho do canvas ao tamanho da imagem
    canvas.value!.width = imageElement.value.width
    canvas.value!.height = imageElement.value.height

    // Desenha a imagem no canvas
    context.value?.drawImage(imageElement.value, 0, 0)
  }
}

// Função para capturar o movimento do mouse e calcular o NC
function onMouseMove(event: MouseEvent) {
  if (canvas.value && context.value && imageElement.value) {
    const rect = imageElement.value.getBoundingClientRect()
    coordenadas.value.x = Math.floor(event.clientX - rect.left)
    coordenadas.value.y = Math.floor(event.clientY - rect.top)

    const imgData = context.value.getImageData(coordenadas.value.x, coordenadas.value.y, 1, 1).data
    const [r, g, b] = imgData

    // Calcula o nível de cinza
    nivelCinza.value = Math.floor((r + g + b) / 3)
  }
}

function onClickFullscrenImagem() {
  emit('onClickFullscrenImagem')
}
</script>

<style scoped>
/** Estilo do formulário */
.LStyleForm {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
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
  opacity: 0.5;
}

.LStyleImageUploader {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Estilo para a área de pré-visualização da imagem */
.LStyleImagePreview {
  min-width: 300px;
  min-height: 300px;

  /*max-width: 300px; *Tamanho da imagem */

  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed #ccc;
}

.LStyleCardActions {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;

  height: 80px;
  margin: 10px;
}
</style>

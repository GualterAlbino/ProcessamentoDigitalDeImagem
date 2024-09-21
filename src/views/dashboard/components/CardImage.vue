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
                      v-tooltip="'Tela Cheia'"
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
                    :src="imagem"
                    alt="Imagem carregada"
                    class="LStyleUploadedImage"
                  />
                  <img v-else src="@/assets/logo.svg" alt="Logo padrão" class="LStyleDefaultLogo" />
                </v-card>
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
import { computed } from 'vue'
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

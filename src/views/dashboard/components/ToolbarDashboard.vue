<template>
  <v-app-bar :color="'primary'" :elevation="0" :height="70">
    <v-row class="pt-5 pl-5">
      <v-col :cols="3">
        <v-select
          :variant="'solo'"
          :itemTitle="'texto'"
          :itemValue="'valor'"
          v-model="opcaoVisualizacao"
          :items="opcoesVisualizacao"
          :label="'Opções de visualização'"
        ></v-select>
      </v-col>
    </v-row>

    <v-btn :size="'x-large'" v-tooltip="'Tela Cheia'" @click="onClickTelaCheia()">
      <v-icon>{{ layoutStore.telaCheia ? 'mdi-fullscreen-exit' : 'mdi-fullscreen' }}</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
// Enums
import { EOpcoesVisualizacao } from '@/enums/EOpcoesVisualizacao'

// Store
import { useLayoutStore } from '@/stores/LayoutStore'

// Constantes
const layoutStore = useLayoutStore()

const opcaoVisualizacao = defineModel<number>('opcaoVisualizacao', {
  default: EOpcoesVisualizacao.COMPARACAO
})

const opcoesVisualizacao = [
  { texto: 'Comparação', valor: EOpcoesVisualizacao.COMPARACAO },
  { texto: 'Apenas Entrada', valor: EOpcoesVisualizacao.APENAS_ENTRADA },
  { texto: 'Apenas Resultado', valor: EOpcoesVisualizacao.APENAS_RESULTADO }
]

function onClickTelaCheia() {
  toggleFullScreen()
}

//----------------
// Manipulação de tela cheia
//---------------

function toggleFullScreen() {
  const element = document.documentElement

  if (!layoutStore.telaCheia) {
    if (element.requestFullscreen) {
      element.requestFullscreen()
      // } else if (element.mozRequestFullScreen) {
      //   element.mozRequestFullScreen();
      // } else if (element.webkitRequestFullscreen) {
      //   element.webkitRequestFullscreen();
      // } else if (element.msRequestFullscreen) {
      //   element.msRequestFullscreen();
      //
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
      // } else if (document.mozCancelFullScreen) {
      //   document.mozCancelFullScreen();
      // } else if (document.webkitExitFullscreen) {
      //   document.webkitExitFullscreen();
      // } else if (document.msExitFullscreen) {
      //   document.msExitFullscreen();
      //
    }
  }

  layoutStore.telaCheia = !layoutStore.telaCheia
}
</script>

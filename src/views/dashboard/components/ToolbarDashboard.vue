<template>
  <v-app-bar :color="'primary'" :elevation="0" :height="70">
    <v-row class="pt-5 pl-5">
      <v-col :cols="5">
        <v-select
          :variant="'solo'"
          :itemTitle="'texto'"
          :itemValue="'valor'"
          v-model="opcaoVisualizacao"
          :items="props.opcoesVisualizacao"
          :label="'Opções de visualização'"
        ></v-select>
      </v-col>
    </v-row>

    <v-spacer></v-spacer>

    <slot></slot>

    <v-col :cols="1">
      <v-btn v-tooltip="'Filtros'" :variant="'outlined'" @click="onClickFiltros()"
        ><v-icon>mdi-filter</v-icon></v-btn
      >
    </v-col>
  </v-app-bar>
</template>

<script setup lang="ts">
// Vue
const emit = defineEmits(['onClickFiltros'])

// Enums
import { EOpcoesVisualizacao } from '@/enums/EOpcoesVisualizacao'

// Store
import { useLayoutStore } from '@/stores/LayoutStore'

// Constantes
const layoutStore = useLayoutStore()

interface PropTypes {
  /**
   * Lista de opções de visualização
   */
  opcoesVisualizacao: { texto: string; valor: number }[]
}

function onClickFiltros() {
  emit('onClickFiltros')
}

const props = withDefaults(defineProps<PropTypes>(), {
  opcoesVisualizacao: () => []
})

const opcaoVisualizacao = defineModel<number>('opcaoVisualizacao', {
  default: EOpcoesVisualizacao.COMPARACAO
})

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

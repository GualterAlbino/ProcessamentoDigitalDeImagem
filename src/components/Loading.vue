<template>
  <v-dialog
    :persistent="true"
    :fullscreen="true"
    :transition="transition"
    v-model="exibeLoading"
    :reverse-transition="reverseTransition"
  >
    <div bloqueio>
      <div
        :style="{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }"
      >
        <v-progress-circular
          :width="7"
          :rotate="360"
          :size="props.size"
          :color="'primary'"
          v-model="props.percentual"
          :indeterminate="true"
        >
          <template v-slot:default v-if="exibePercentual"> {{ props.percentual }} % </template>
        </v-progress-circular>
      </div>
    </div>
    <v-snackbar v-model="exibeLoading" :timeout="-1" :bottom="true" :right="true">
      {{ props.mensagem }}
    </v-snackbar>
  </v-dialog>
</template>

<script setup lang="ts">
//Vue
import { ref, computed } from 'vue'

interface PropTypes {
  /**
   * Indica se o componente deve exibir o processamento
   * e qual mensagem deve ser exibida
   */
  mensagem?: string

  /**
   * Indica o percentual de processamento
   */
  percentual?: number

  /**
   * Define o tamanho do componente de loading
   * @default 100
   */
  size?: number
}
const props = withDefaults(defineProps<PropTypes>(), {
  size: 100,
  mensagem: '',
  percentual: 0
})

const transition = ref<string>('slide-x-reverse-transition')
const reverseTransition = ref<string>('slide-x-transition')

const exibeLoading = computed(() => {
  if (props.mensagem == '') {
    return false
  } else {
    return true
  }
})

const exibePercentual = computed(() => {
  if (props.percentual && props.percentual > 0) {
    return true
  } else {
    return false
  }
})
</script>

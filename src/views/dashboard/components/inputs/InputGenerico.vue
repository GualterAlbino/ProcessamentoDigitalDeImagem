<template>
  <div v-if="filtros.length > 0">
    <v-container :fluid="true">
      <v-row v-for="(filtro, index) in filtros">
        <v-col :cols="1">
          <v-btn :variant="'text'" :color="'error'" @click="onDeleteItem(index)"
            ><v-icon>mdi-delete</v-icon></v-btn
          >
        </v-col>

        <v-col :cols="6">
          <v-card-title>{{ props.titulo }}</v-card-title></v-col
        >

        <v-col :cols="4">
          <v-card-title>Ordem: {{ index }}</v-card-title>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
// Vue
import type CFiltroNegativo from '@/services/CFiltroNegativo'

// Propriedades Reativas
const filtros = defineModel<CFiltroNegativo[]>('filtros', {
  required: true,
  default: []
})

interface PropTypes {
  /**
   * Titulo do filtro
   */
  titulo: string
}
const props = withDefaults(defineProps<PropTypes>(), {
  titulo: 'Filtro genérico'
})

function onDeleteItem(pIndex: number) {
  filtros.value.splice(pIndex, 1)
}
</script>

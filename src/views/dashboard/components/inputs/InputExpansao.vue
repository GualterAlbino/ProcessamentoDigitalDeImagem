<template>
  <div v-if="filtros.length > 0">
    <v-card-title>Baseado na formula <strong>E = (g = a*r + b)</strong> informe A e B</v-card-title>
    <v-container :fluid="true">
      <v-row v-for="(filtro, index) in filtros">
        <v-col :cols="2">
          <v-btn :variant="'text'" :color="'error'" @click="onDeleteItem(index)"
            ><v-icon>mdi-delete</v-icon></v-btn
          >
        </v-col>

        <v-col :cols="12" :md="5" :sm="5">
          <v-text-field
            :label="'A'"
            :required="true"
            :variant="'solo'"
            v-model="filtro.a"
            :rules="rulesComputed"
          ></v-text-field>
        </v-col>

        <v-col :cols="12" :md="5" :sm="5">
          <v-text-field
            :label="'B'"
            :variant="'solo'"
            v-model="filtro.b"
            :rules="rulesComputed"
          ></v-text-field>
        </v-col>

        <v-divider></v-divider>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
// Vue
import { computed } from 'vue'
import CFiltroExpansao from '@/services/CFiltroExpansao'

// Propriedades Reativas
const filtros = defineModel<CFiltroExpansao[]>('filtros', {
  required: true,
  default: []
})

function onDeleteItem(pIndex: number) {
  filtros.value.splice(pIndex, 1)
}

const rulesComputed = computed(() => {
  return [(v: string) => !!v || 'Campo obrigatório!']
})
</script>

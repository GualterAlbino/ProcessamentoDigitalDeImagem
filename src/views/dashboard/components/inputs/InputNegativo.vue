<template>
  <div v-if="filtros.length > 0">
    <v-card-title>Filtro negativo</v-card-title>
    <div v-for="(filtro, index) in filtros">
      <span>{{ index }}</span>
    </div>
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
</script>

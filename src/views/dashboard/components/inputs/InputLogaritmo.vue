<template>
  <div v-if="filtros.length > 0">
    <v-card-title>Logaritimo</v-card-title>
    <div v-for="(filtro, index) in filtros">
      <span>{{ index }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
// Services
import type CFiltroLogaritimo from '@/services/CFiltroLogaritimo';

// Propriedades Reativas
const filtros = defineModel<CFiltroLogaritimo[]>('filtros', {
  required: true,
  default: []
})
</script>

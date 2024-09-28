<template>
  <div v-if="filtros.length > 0">
    <v-card-title>Filtro Horizontal</v-card-title>
    <div v-for="(filtro, index) in filtros">
      <span>{{ index }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
// Services
import type CFiltroEspelhamentoHorizontal from '@/services/CFiltroEspelhamentoHorizontal'

// Propriedades Reativas
const filtros = defineModel<CFiltroEspelhamentoHorizontal[]>('filtros', {
  required: true,
  default: []
})
</script>

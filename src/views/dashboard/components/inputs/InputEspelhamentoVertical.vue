<template>
  <div v-if="filtros.length > 0">
    <v-card-title>Filtro Vertical</v-card-title>
    <div v-for="(filtro, index) in filtros">
      <span>{{ index }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
// Services
import CFiltroEspelhamentoVertical from '@/services/CFiltroEpelhamentoVertical'

// Propriedades Reativas
const filtros = defineModel<CFiltroEspelhamentoVertical[]>('filtros', {
  required: true,
  default: []
})
</script>

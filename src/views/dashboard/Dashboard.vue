<template>
  <ToolbarDashboard v-model:opcaoVisualizacao="opcaoVisualizacao" />

  <FormImagem :opcaoVisualizacao="opcaoVisualizacao" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Components
import ToolbarDashboard from './components/ToolbarDashboard.vue'
import FormImagem from './components/FormImagem.vue'
import { EOpcoesVisualizacao } from '@/enums/EOpcoesVisualizacao'

// Propriedades reativas
const opcaoVisualizacao = ref<number>(EOpcoesVisualizacao.COMPARACAO)
</script>

<style scoped></style>

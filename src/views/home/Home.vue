<template>
  <v-container fluid class="LStyleHomePage">
    <v-row align="center" justify="center" class="fill-height">
      <v-col cols="12" class="text-center">
        <v-btn @click="onIrParaDashboard" class="LStyleButton" depressed large>
          <v-icon>mdi-play</v-icon>
          Iniciar
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
// Constantes
import { cROTAS_DASHBOARD } from '@/router/ConfigRotas'

// Router
import { useRouter } from 'vue-router'
const router = useRouter()

function onIrParaDashboard() {
  // Adicione uma classe de animação ao botão
  const startButton = document.querySelector('.LStyleButton')
  if (startButton) {
    startButton.classList.add('LStyleAnimateButton')
  }

  // Espere a animação terminar antes de mudar de rota
  setTimeout(() => {
    router.push({ name: cROTAS_DASHBOARD.dashboard.name })
  }, 500) // 500ms é a duração da animação
}
</script>

<style scoped>
.LStyleHomePage {
  /* Defina o fundo da página */
  background: linear-gradient(135deg, #2563eb, #202d4c);
  height: 100vh;
}

/* Estilo do botão */
.LStyleButton {
  color: white;
  background-color: #2196f3;
  transition: transform 0.3s ease-in-out;
}

/* Animação para o botão */
.LStyleAnimateButton {
  transform: scale(1.2); /* Aumenta o tamanho do botão */
  opacity: 0; /* Desaparece o botão */
  transition:
    transform 0.5s ease-in-out,
    opacity 0.5s ease-in-out;
}
</style>

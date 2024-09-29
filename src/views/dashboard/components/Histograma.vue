<template>
  <div class="pa-4 text-center">
    <v-row>
      <v-dialog
        :width="1000"
        :fullscreen="false"
        v-model="exibirDialog"
        transition="dialog-bottom-transition"
      >
        <v-card>
          <!-- Toolbar fixada no topo do card -->
          <v-toolbar :color="'primary'" :height="80">
            <v-row class="text-center">
              <v-col :cols="12" :sm="12"> <v-card-title>Histograma</v-card-title></v-col>
            </v-row>
          </v-toolbar>

          <div class="LStyleScrollableContent">
            <GraficoDeBarras
              :labels="dadosGrafico.labels"
              :valores="dadosGrafico.valores"
              titulo="Histograma de Níveis de Cinza"
            />
          </div>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
// Vue
import { ref, watch } from 'vue'

// Services
import CFiltroHistograma from '@/services/CFiltroHistograma'

// Components
import GraficoDeBarras from '@/components/GraficoDeBarras.vue'

const imagem = defineModel<number[][]>('imagem', { required: true }) // Imagem a ser processada
const exibirDialog = defineModel<boolean>('exibirDialog', { required: true })

// Definir variável para os dados do gráfico
const dadosGrafico = ref({
  labels: [] as string[],
  valores: [] as number[]
})

// Função que calcula os dados do histograma
const calcularDadosGrafico = () => {
  const filtroHistograma = new CFiltroHistograma()
  const { labels, dados } = filtroHistograma.gerarDadosGrafico(imagem.value)

  dadosGrafico.value = {
    labels: labels.map((l) => l.toString()), // Converter os níveis de cinza para string
    valores: dados // Frequência de cada nível de cinza
  }
}

watch([imagem, exibirDialog], () => {
  if (exibirDialog.value && imagem.value) {
    calcularDadosGrafico()
  }
})
</script>

<style scoped>
/* Estilos para fixar a toolbar, footer, autocomplete e botão */
.LStyleStickyToolbar {
  position: sticky;
  top: 0;
  z-index: 10;
}

.LStyleStickyFooter {
  position: sticky;
  bottom: 0;
  z-index: 10;
}

.LStyleStickyAutoComplete,
.LStyleStickyAddButton {
  position: sticky;
  top: 50px;
  z-index: 9;
}

.LStyleScrollableContent {
  min-height: 400px;
  max-height: 700px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>

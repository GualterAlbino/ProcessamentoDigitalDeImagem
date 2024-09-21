<template>
  <div class="pa-4 text-center">
    <v-row>
      <v-dialog v-model="exibirDialog" :fullscreen="true" transition="dialog-bottom-transition">
        <v-card>
          <!--Toolbar fixada no topo do card-->
          <v-toolbar :color="'primary'">
            <v-toolbar-title><v-icon>mdi-filter</v-icon>Filtros</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon @click="onClickFecharDialog">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>

          <!--Contéudo do Card -->
          <v-card-text>
            <v-row>
              <v-col :cols="6">
                <v-autocomplete
                  :variant="'solo'"
                  :items="filtros"
                  :itemTitle="'texto'"
                  :itemValue="'valor'"
                  :returnObject="true"
                  :label="'Seleciona o filtro'"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <slot></slot>
              </v-col>
            </v-row>

            <small class="text-caption text-medium-emphasis text-error"
              >*Indica que o campo é obrigatório</small
            >
          </v-card-text>

          <v-divider></v-divider>

          <!--Botões da parte inferior-->
          <div>
            <!--Divisão-->
            <v-divider></v-divider>

            <v-card-actions>
              <v-btn color="error" :variant="'elevated'" @click="onClickFecharDialog()">
                Cancelar
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary" :variant="'elevated'" @click="onClickSalvar()"> Salvar </v-btn>
            </v-card-actions>
          </div>
        </v-card>
      </v-dialog></v-row
    >
  </div>
</template>

<script lang="ts" setup>
// Vue
import { ETipoFiltroPDI } from '@/enums/ETipoFiltroPDI'
import { ref } from 'vue'

// Propriedades reativas
const filtroSelecionado = ref<string | null>(null)
const filtros = ref<{ texto: string; valor: number }[]>([
  { texto: 'Filtro Negativo', valor: ETipoFiltroPDI.NEGATIVO },
  { texto: 'Filtro Logaritimo', valor: ETipoFiltroPDI.LOGARITIMO },
  { texto: 'Filtro Logaritimo Inverso', valor: ETipoFiltroPDI.LOGARITIMO_INVERSO },
  { texto: 'Filtro Potência', valor: ETipoFiltroPDI.POTENCIA },
  { texto: 'Filtro de Raiz', valor: ETipoFiltroPDI.RAIZ },
  { texto: 'Filtro de ampliação 512x512', valor: ETipoFiltroPDI.AMPLIACAO_512X512 },
  { texto: 'Filtro de ampliação 1024x1024', valor: ETipoFiltroPDI.AMPLIACAO_1024X1024 },
  { texto: 'Histograma', valor: ETipoFiltroPDI.HISTOGRAMA },
  { texto: 'Filtro de Equalização', valor: ETipoFiltroPDI.EQUALIZACAO },
  { texto: 'Espelhamento Horizontal', valor: ETipoFiltroPDI.ESPELHAMENTO_HORIZONTAL },
  { texto: 'Espelhamento Vertical', valor: ETipoFiltroPDI.ESPELHAMENTO_VERTICAL },
  { texto: 'Rotação 90 Graus', valor: ETipoFiltroPDI.ROTACAO_90_GRAUS },
  { texto: 'Rotação 180 Graus', valor: ETipoFiltroPDI.ROTACAO_180_GRAUS },
  { texto: 'Expansão', valor: ETipoFiltroPDI.EXPANSAO },
  { texto: 'Compressão', valor: ETipoFiltroPDI.COMPRESSAO },
  { texto: 'Somar Imagens', valor: ETipoFiltroPDI.SOMAR_IMAGENS },
  { texto: 'Média', valor: ETipoFiltroPDI.MEDIA },
  { texto: 'Mediana', valor: ETipoFiltroPDI.MEDIANA },
  { texto: 'Moda', valor: ETipoFiltroPDI.MODA },
  { texto: 'Máximo', valor: ETipoFiltroPDI.MAXIMO },
  { texto: 'Mínimo', valor: ETipoFiltroPDI.MINIMO },
  { texto: 'Laplaciano', valor: ETipoFiltroPDI.LAPLACIANO },
  { texto: 'High Boost', valor: ETipoFiltroPDI.HIGH_BOOST },
  { texto: 'Sobel', valor: ETipoFiltroPDI.SOBEL },
  { texto: 'Prewitt', valor: ETipoFiltroPDI.PREWITT }
])

const exibirDialog = defineModel('exibirDialog', {
  default: false
})

function onClickFecharDialog() {
  exibirDialog.value = false
}

function onClickSalvar() {
  console.log('Salvando...')
}
</script>

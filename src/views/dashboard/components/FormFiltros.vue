<template>
  <div class="pa-4 text-center">
    <v-row>
      <v-dialog
        :width="750"
        :fullscreen="false"
        v-model="exibirDialog"
        transition="dialog-bottom-transition"
      >
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
          <v-card-text class="LStyleConteudoCard">
            <v-row>
              <v-col>
                <slot></slot>
              </v-col>
            </v-row>

            <v-divider></v-divider>

            <v-form v-model="isFormValido" @submit.prevent>
              <v-container>
                <div>
                  <InputExpansao v-model:filtros="filtro.expansao" />
                </div>

                <div>
                  <InputCompressao v-model:filtros="filtro.compressao" />
                </div>

                <div>
                  <InputEspelhamentoVertical v-model:filtros="filtro.espelhamentoVertical" />
                </div>

                <div>
                  <InputEspelhamentoHorizontal v-model:filtros="filtro.espelhamentoHorizontal" />
                </div>

                <div>
                  <InputGenerico v-model:filtros="filtro.negativo" titulo="Filtro Negativo" />
                </div>
              </v-container>
            </v-form>

            <div class="mt-3 mb-3">
              <v-row>
                <v-col :cols="6" :sm="6">
                  <v-autocomplete
                    :width="250"
                    :variant="'solo'"
                    :itemTitle="'texto'"
                    :itemValue="'valor'"
                    :returnObject="true"
                    :items="opcoesFiltros"
                    :label="'Selecionar o filtro'"
                    v-model="filtroSelecionado"
                  />
                </v-col>

                <v-col :cols="6" :sm="6">
                  <v-btn
                    class="mt-3 ml-3"
                    :color="'primary'"
                    :variant="'outlined'"
                    @click="onClickAdicionarFiltro()"
                  >
                    Adicionar Filtro <v-icon>mdi-filter-plus</v-icon></v-btn
                  >
                </v-col>
              </v-row>
            </div>
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
              <v-btn color="primary" :variant="'elevated'" @click="onAplicarFiltros()">
                Aplicar
              </v-btn>
            </v-card-actions>
          </div>
        </v-card>
      </v-dialog></v-row
    >
  </div>
</template>

<script lang="ts" setup>
// Vue
import { ref } from 'vue'
const emit = defineEmits(['onImagemAtualizada'])

// Enums
import { ETipoFiltroPDI } from '@/enums/ETipoFiltroPDI'

// Services
import CFiltro from '@/services/base/CFiltro'
import CFiltroRaiz from '@/services/CFiltroRaiz'
import CFiltroMedia from '@/services/CFiltroMedia'
import CFiltroPotencia from '@/services/CFiltroPotencia'
import CFiltroNegativo from '@/services/CFiltroNegativo'
import CFiltroExpansao from '@/services/CFiltroExpansao'
import CFiltroCompressao from '@/services/CFiltroCompressao'
import CFiltroLogaritimo from '@/services/CFiltroLogaritimo'
import CFiltroEqualizacao from '@/services/CFiltroEqualizacao'
import CFiltroAmpliacao512 from '@/services/CFiltroAmpliacao512'
import CFiltroSomarImagens from '@/services/CFiltroSomarImagens'
import CFiltroEspelhamentoVertical from '@/services/CFiltroEpelhamentoVertical'
import CFiltroEspelhamentoHorizontal from '@/services/CFiltroEspelhamentoHorizontal'

// Components
import InputNegativo from './inputs/InputNegativo.vue'
import InputExpansao from './inputs/InputExpansao.vue'
import InputGenerico from './inputs/InputGenerico.vue'
import InputCompressao from './inputs/InputCompressao.vue'
import InputEspelhamentoVertical from './inputs/InputEspelhamentoVertical.vue'
import InputEspelhamentoHorizontal from './inputs/InputEspelhamentoHorizontal.vue'

// Propriedades reativas
const ordem = ref<number>(0)
const filtro = ref<CFiltro>(new CFiltro())
const isFormValido = ref<boolean>(false)
const opcoesFiltros = ref<{ texto: string; valor: number }[]>([
  { texto: 'Filtro Negativo', valor: ETipoFiltroPDI.NEGATIVO },
  { texto: 'Filtro Logaritimo', valor: ETipoFiltroPDI.LOGARITIMO },
  { texto: 'Filtro Logaritimo Inverso', valor: ETipoFiltroPDI.LOGARITIMO_INVERSO },
  { texto: 'Filtro Potência', valor: ETipoFiltroPDI.POTENCIA },
  { texto: 'Filtro de Raiz', valor: ETipoFiltroPDI.RAIZ },
  { texto: 'Filtro de Replicação 512x512', valor: ETipoFiltroPDI.AMPLIACAO_REPLICACAO_512X512 },
  { texto: 'Filtro de Replicação 1024x1024', valor: ETipoFiltroPDI.AMPLIACAO_REPLICACAO_1024X1024 },
  { texto: 'Filtro de Bilinear 512x512', valor: ETipoFiltroPDI.AMPLIACAO_BILINEAR_512X512 },
  { texto: 'Filtro de Bilinear 1024x1024', valor: ETipoFiltroPDI.AMPLIACAO_BILINEAR_1024X1024 },
  { texto: 'Filtro Equalização', valor: ETipoFiltroPDI.EQUALIZACAO },
  { texto: 'Espelhamento Horizontal', valor: ETipoFiltroPDI.ESPELHAMENTO_HORIZONTAL },
  { texto: 'Espelhamento Vertical', valor: ETipoFiltroPDI.ESPELHAMENTO_VERTICAL },
  { texto: 'Expansão', valor: ETipoFiltroPDI.EXPANSAO },
  { texto: 'Compressão', valor: ETipoFiltroPDI.COMPRESSAO },
  { texto: 'Somar Imagens', valor: ETipoFiltroPDI.SOMAR_IMAGENS },
  { texto: 'Média', valor: ETipoFiltroPDI.MEDIA },
  { texto: 'Mediana', valor: ETipoFiltroPDI.MEDIANA },
  { texto: 'Moda', valor: ETipoFiltroPDI.MODA },
  { texto: 'Mínimo', valor: ETipoFiltroPDI.MINIMO },
  { texto: 'Máximo', valor: ETipoFiltroPDI.MAXIMO },
  { texto: 'Laplaciano', valor: ETipoFiltroPDI.LAPLACIANO },
  { texto: 'High Boost', valor: ETipoFiltroPDI.HIGH_BOOST },
  { texto: 'Prewitt', valor: ETipoFiltroPDI.PREWITT },
  { texto: 'Sobel', valor: ETipoFiltroPDI.SOBEL }
])
const exibirDialog = defineModel('exibirDialog', {
  default: false
})
const filtroSelecionado = defineModel<{ texto: string; valor: number } | null>(
  'filtroSelecionado',
  {
    default: null
  }
)
const imagem = defineModel<number[][]>('imagem', {
  default: []
})

function onClickFecharDialog() {
  exibirDialog.value = false
}

function onClickAdicionarFiltro() {
  if (filtroSelecionado.value && filtroSelecionado.value.valor == 0) {
    return
  }

  switch (filtroSelecionado.value?.valor) {
    case ETipoFiltroPDI.NEGATIVO:
      filtro.value.negativo.push(new CFiltroNegativo())
      break

    case ETipoFiltroPDI.LOGARITIMO:
      filtro.value.logaritimo.push(new CFiltroLogaritimo())
      break

    case ETipoFiltroPDI.LOGARITIMO_INVERSO:
      filtro.value.logaritimoInverso.push(new CFiltroLogaritimo())
      break

    case ETipoFiltroPDI.POTENCIA:
      filtro.value.potencia.push(new CFiltroPotencia())
      break

    case ETipoFiltroPDI.RAIZ:
      filtro.value.raiz.push(new CFiltroRaiz())
      break

    case ETipoFiltroPDI.AMPLIACAO_REPLICACAO_512X512:
      filtro.value.ampliacaoReplicacao512x512.push(new CFiltroAmpliacao512())
      break

    case ETipoFiltroPDI.AMPLIACAO_REPLICACAO_1024X1024:
      filtro.value.ampliacaoReplicacao1024x1024.push(new CFiltroAmpliacao512())
      break

    case ETipoFiltroPDI.AMPLIACAO_BILINEAR_512X512:
      filtro.value.ampliacaoBilinear512x512.push(new CFiltroAmpliacao512())
      break

    case ETipoFiltroPDI.AMPLIACAO_BILINEAR_1024X1024:
      filtro.value.ampliacaoBilinear1024x1024.push(new CFiltroAmpliacao512())
      break

    case ETipoFiltroPDI.ESPELHAMENTO_HORIZONTAL:
      filtro.value.espelhamentoHorizontal.push(new CFiltroEspelhamentoHorizontal())
      break

    case ETipoFiltroPDI.ESPELHAMENTO_VERTICAL:
      filtro.value.espelhamentoVertical.push(new CFiltroEspelhamentoVertical())
      break

    case ETipoFiltroPDI.EXPANSAO:
      filtro.value.expansao.push(new CFiltroExpansao())
      break

    case ETipoFiltroPDI.COMPRESSAO:
      filtro.value.compressao.push(new CFiltroCompressao())
      break

    case ETipoFiltroPDI.SOMAR_IMAGENS:
      filtro.value.somarImagens.push(new CFiltroSomarImagens())
      break

    case ETipoFiltroPDI.MEDIA:
      filtro.value.media.push(new CFiltroMedia())
      break

    case ETipoFiltroPDI.MEDIANA:
      filtro.value.mediana.push(new CFiltroMedia())
      break

    case ETipoFiltroPDI.MODA:
      filtro.value.moda.push(new CFiltroMedia())
      break

    case ETipoFiltroPDI.MINIMO:
      filtro.value.minimo.push(new CFiltroMedia())
      break

    case ETipoFiltroPDI.MAXIMO:
      filtro.value.maximo.push(new CFiltroMedia())
      break

    case ETipoFiltroPDI.LAPLACIANO:
      filtro.value.laplaciano.push(new CFiltroMedia())
      break

    case ETipoFiltroPDI.HIGH_BOOST:
      filtro.value.highBoost.push(new CFiltroMedia())
      break

    case ETipoFiltroPDI.PREWITT:
      filtro.value.prewitt.push(new CFiltroMedia())
      break

    case ETipoFiltroPDI.SOBEL:
      filtro.value.sobel.push(new CFiltroMedia())
      break
  }
}

function onAplicarFiltros() {
  // if (!isFormValido.value) {
  //   console.log('Formulário inválido')
  //   return
  // }

  let resultado: number[][] = imagem.value
  for (const item of filtro.value.negativo) {
    resultado = item.executar(resultado)
  }

  for (const item of filtro.value.logaritimo) {
    resultado = item.executar(resultado)
  }

  for (const item of filtro.value.logaritimoInverso) {
    resultado = item.executar(resultado)
  }

  for (const item of filtro.value.potencia) {
    resultado = item.executar(resultado)
  }

  for (const item of filtro.value.raiz) {
    resultado = item.executar(resultado)
  }

  for (const item of filtro.value.ampliacaoReplicacao512x512) {
    resultado = item.executar(resultado)
  }

  for (const item of filtro.value.ampliacaoReplicacao1024x1024) {
    resultado = item.executar(resultado)
  }

  for (const item of filtro.value.ampliacaoBilinear512x512) {
    resultado = item.executar(resultado)
  }

  for (const item of filtro.value.ampliacaoBilinear1024x1024) {
    resultado = item.executar(resultado)
  }

  for (const item of filtro.value.espelhamentoHorizontal) {
    resultado = item.executar(resultado)
  }

  for (const item of filtro.value.espelhamentoVertical) {
    resultado = item.executar(resultado)
  }

  for (const item of filtro.value.expansao) {
    resultado = item.executar(resultado)
  }

  for (const item of filtro.value.compressao) {
    resultado = item.executar(resultado)
  }

  for (const item of filtro.value.somarImagens) {
    resultado = item.executar(resultado)
  }

  for (const item of filtro.value.media) {
    resultado = item.executar(resultado)
  }

  for (const item of filtro.value.mediana) {
    resultado = item.executar(resultado)
  }

  for (const item of filtro.value.moda) {
    resultado = item.executar(resultado)
  }

  for (const item of filtro.value.minimo) {
    resultado = item.executar(resultado)
  }

  for (const item of filtro.value.maximo) {
    resultado = item.executar(resultado)
  }

  for (const item of filtro.value.laplaciano) {
    resultado = item.executar(resultado)
  }

  for (const item of filtro.value.highBoost) {
    resultado = item.executar(resultado)
  }

  for (const item of filtro.value.prewitt) {
    resultado = item.executar(resultado)
  }

  for (const item of filtro.value.sobel) {
    resultado = item.executar(resultado)
  }

  // 24 filtros da aba filtros

  emit('onImagemAtualizada', resultado)
  exibirDialog.value = false
}
</script>

<style scoped>
.LStyleConteudoCard {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
</style>

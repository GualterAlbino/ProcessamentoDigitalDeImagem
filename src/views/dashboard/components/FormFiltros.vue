<template>
  <div class="pa-4 text-center">
    <v-row>
      <v-dialog
        :width="700"
        :fullscreen="false"
        v-model="exibirDialog"
        transition="dialog-bottom-transition"
      >
        <v-card>
          <!-- Toolbar fixada no topo do card -->
          <v-toolbar :color="'primary'" :height="$vuetify.display.smAndUp ? 80 : 200">
            <v-row class="text-center">
              <v-col :cols="12" :sm="6">
                <v-autocomplete
                  class="mt-3 ml-3 mr-3"
                  :variant="'solo'"
                  :itemTitle="'texto'"
                  :itemValue="'valor'"
                  :returnObject="true"
                  :items="opcoesFiltros"
                  :label="'Selecionar o filtro'"
                  v-model="filtroSelecionado"
                />
              </v-col>

              <v-col :cols="12" :sm="6">
                <v-btn class="mt-6 ml-5" :variant="'outlined'" @click="onClickAdicionarFiltro">
                  Adicionar Filtro <v-icon>mdi-filter-plus</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-toolbar>

          <!-- Conteúdo do Card -->
          <v-card-text>
            <!-- Conteúdo da lista com rolagem -->
            <div class="LStyleScrollableContent">
              <v-row justify="center">
                <v-col v-if="filtros.length > 0" :cols="12">
                  <VueDraggable v-model="filtros">
                    <div v-for="(filtro, index) in filtros" :key="index">
                      <InputGenerico
                        :index="index"
                        :ordem="index"
                        :titulo="filtro.titulo"
                        v-model:params="filtro.params"
                        :subtitulo="filtro.subtitulo"
                        @onDelete="onDeleteFiltro($event)"
                      />
                    </div>
                  </VueDraggable>
                </v-col>

                <v-col v-else>
                  <div class="d-flex flex-column text-center my-2">
                    <div>
                      <v-icon color="grey" size="120"> mdi-alert </v-icon>
                    </div>

                    <div class="mt-2 mx-2 text-h6" style="color: gray">
                      Nenhum filtro adicionado
                    </div>
                    <div class="mt-0 mx-2 text-body-2" style="color: grey">
                      Adicione um filtro para aplicar na imagem
                    </div>
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-card-text>

          <!-- Rodapé fixo no fundo do card -->
          <v-divider></v-divider>
          <v-card-actions class="LStyleStickyFooter">
            <v-btn color="error" :variant="'elevated'" @click="onClickFecharDialog">
              Cancelar
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" :variant="'elevated'" @click="onAplicarFiltros">Aplicar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
// Vue
import { ref, watch } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
const emit = defineEmits(['onImagemAtualizada'])

// Store
import { useLayoutStore } from '@/stores/LayoutStore'

// Enums
import { ETipoFiltroPDI } from '@/enums/ETipoFiltroPDI'

// Types
import type IFiltroFormFiltro from './types/IFiltroFormFiltro'

// Services
import CFiltroModa from '@/services/CFiltroModa'
import CFiltroRaiz from '@/services/CFiltroRaiz'
import CFiltroMedia from '@/services/CFiltroMedia'
import CFiltroSobel from '@/services/CFiltroSobel'
import CFiltroMaximo from '@/services/CFiltroMaximo'
import CFiltroMinimo from '@/services/CFiltroMinimo'
import CFiltroPrewitt from '@/services/CFiltroPrewitt'
import CFiltroMediana from '@/services/CFiltroMediana'
import CFiltroPotencia from '@/services/CFiltroPotencia'
import CFiltroNegativo from '@/services/CFiltroNegativo'
import CFiltroExpansao from '@/services/CFiltroExpansao'
import CFiltroHighBoost from '@/services/CFiltroHighBoost'
import CFiltroCompressao from '@/services/CFiltroCompressao'
import CFiltroLogaritimo from '@/services/CFiltroLogaritimo'
import CFiltroLaplaciano from '@/services/CFiltroLaplaciano'
import CFiltroEqualizacao from '@/services/CFiltroEqualizacao'
import CFiltroAmpliacao512 from '@/services/CFiltroAmpliacao512'
import CFiltroSomarImagens from '@/services/CFiltroSomarImagens'
import CFiltroLogaritimoInverso from '@/services/CFiltroLogaritimoInverso'
import CFiltroEspelhamentoVertical from '@/services/CFiltroEpelhamentoVertical'
import CFiltroEspelhamentoHorizontal from '@/services/CFiltroEspelhamentoHorizontal'

// Components
import InputGenerico from './InputGenerico.vue'

// Propriedades reativas
const ordem = ref<number>(0)
const filtros = ref<IFiltroFormFiltro[]>([])
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
  { texto: 'Filtro de Expansão', valor: ETipoFiltroPDI.EXPANSAO },
  { texto: 'Filtro de Compressão', valor: ETipoFiltroPDI.COMPRESSAO },
  { texto: 'Somar Imagens', valor: ETipoFiltroPDI.SOMAR_IMAGENS },
  { texto: 'Filtro de Média', valor: ETipoFiltroPDI.MEDIA },
  { texto: 'Filtro de Mediana', valor: ETipoFiltroPDI.MEDIANA },
  { texto: 'Filtro de Moda', valor: ETipoFiltroPDI.MODA },
  { texto: 'Filtro Mínimo', valor: ETipoFiltroPDI.MINIMO },
  { texto: 'Filtro Máximo', valor: ETipoFiltroPDI.MAXIMO },
  { texto: 'Filtro Laplaciano', valor: ETipoFiltroPDI.LAPLACIANO },
  { texto: 'Filtro High Boost', valor: ETipoFiltroPDI.HIGH_BOOST },
  { texto: 'Filtro Prewitt', valor: ETipoFiltroPDI.PREWITT },
  { texto: 'Filtro Sobel', valor: ETipoFiltroPDI.SOBEL }
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

function onDeleteFiltro(pIndex: number) {
  filtros.value.splice(pIndex, 1)
}

function onClickFecharDialog() {
  exibirDialog.value = false
}

function onClickAdicionarFiltro() {
  try {
    if (filtroSelecionado.value && filtroSelecionado.value.valor == 0) {
      return
    }

    let instanciaFiltro: any = {}
    switch (filtroSelecionado.value?.valor) {
      case ETipoFiltroPDI.NEGATIVO:
        instanciaFiltro = new CFiltroNegativo()
        break

      case ETipoFiltroPDI.LOGARITIMO:
        instanciaFiltro = new CFiltroLogaritimo()
        break

      case ETipoFiltroPDI.LOGARITIMO_INVERSO:
        instanciaFiltro = new CFiltroLogaritimoInverso()
        break

      case ETipoFiltroPDI.POTENCIA:
        instanciaFiltro = new CFiltroPotencia()
        break

      case ETipoFiltroPDI.RAIZ:
        instanciaFiltro = new CFiltroRaiz()
        break

      case ETipoFiltroPDI.AMPLIACAO_REPLICACAO_512X512:
        instanciaFiltro = new CFiltroAmpliacao512()
        break

      case ETipoFiltroPDI.AMPLIACAO_REPLICACAO_1024X1024:
        instanciaFiltro = new CFiltroAmpliacao512()
        break

      case ETipoFiltroPDI.AMPLIACAO_BILINEAR_512X512:
        instanciaFiltro = new CFiltroAmpliacao512()
        break

      case ETipoFiltroPDI.AMPLIACAO_BILINEAR_1024X1024:
        instanciaFiltro = new CFiltroAmpliacao512()
        break

      case ETipoFiltroPDI.ESPELHAMENTO_HORIZONTAL:
        instanciaFiltro = new CFiltroEspelhamentoHorizontal()
        break

      case ETipoFiltroPDI.ESPELHAMENTO_VERTICAL:
        instanciaFiltro = new CFiltroEspelhamentoVertical()
        break

      case ETipoFiltroPDI.EXPANSAO:
        instanciaFiltro = new CFiltroExpansao()
        break

      case ETipoFiltroPDI.COMPRESSAO:
        instanciaFiltro = new CFiltroCompressao()
        break

      case ETipoFiltroPDI.SOMAR_IMAGENS:
        instanciaFiltro = new CFiltroSomarImagens()
        break

      case ETipoFiltroPDI.MEDIA:
        instanciaFiltro = new CFiltroMedia()
        break

      case ETipoFiltroPDI.MEDIANA:
        instanciaFiltro = new CFiltroMediana()
        break

      case ETipoFiltroPDI.MODA:
        instanciaFiltro = new CFiltroModa()
        break

      case ETipoFiltroPDI.MINIMO:
        instanciaFiltro = new CFiltroMinimo()
        break

      case ETipoFiltroPDI.MAXIMO:
        instanciaFiltro = new CFiltroMaximo()
        break

      case ETipoFiltroPDI.LAPLACIANO:
        instanciaFiltro = new CFiltroLaplaciano()
        break

      case ETipoFiltroPDI.HIGH_BOOST:
        instanciaFiltro = new CFiltroHighBoost()
        break

      case ETipoFiltroPDI.PREWITT:
        instanciaFiltro = new CFiltroPrewitt()
        break

      case ETipoFiltroPDI.SOBEL:
        instanciaFiltro = new CFiltroSobel()
        break

      case ETipoFiltroPDI.EQUALIZACAO:
        instanciaFiltro = new CFiltroEqualizacao()
        break
    }

    // Remove a propriedade "ordem" do objeto
    delete instanciaFiltro['ordem']

    // Monta o objeto de filtro
    const filtro: IFiltroFormFiltro = {
      ordem: ordem.value++,
      subtitulo: '',
      params: instanciaFiltro,
      tipo: filtroSelecionado.value!.valor,
      titulo: filtroSelecionado.value!.texto
    }

    // Armazena o filtro
    filtros.value.push(filtro)

    // Incrementa a ordem
    ordem.value++
  } catch (error) {
    console.error(error)
    exibirMensagem('Erro ao adicionar filtro! ', error)
  }
}

async function onAplicarFiltros() {
  try {
    if (filtros.value.length === 0) {
      return
    }

    if (imagem.value.length === 0) {
      exibirMensagem('Erro ao aplicar filtros! ', 'Imagem não carregada')
      return
    }

    exibirDialog.value = false
    useLayoutStore().loading.mensagem = 'Aplicando filtros...'

    let resultado: number[][] = imagem.value

    const filtrosOrdenados = filtros.value.sort((a, b) => a.ordem - b.ordem)
    for (const filtro of filtrosOrdenados) {
      resultado = await filtro.params.executar(resultado)
    }

    // 24 filtros da aba filtros

    emit('onImagemAtualizada', resultado)
  } catch (error) {
    console.error(error)
    exibirMensagem('Erro ao aplicar filtros! ', error)
  } finally {
    exibirDialog.value = false
    useLayoutStore().loading.mensagem = ''
  }
}

watch(
  () => imagem.value,
  (newValue) => {
    // Limpa os filtros quando a imagem é alterada
    if (newValue.length === 0) {
      ordem.value = 0
      filtros.value = []
    }
  }
)

function exibirMensagem(pTitulo: string = 'Erro', pErro: string | any) {
  useLayoutStore().messageDialog.show = true
  useLayoutStore().messageDialog.titulo = pTitulo
  useLayoutStore().messageDialog.mensagem = pErro instanceof Error ? pErro.message : pErro
}
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
  min-height: 220px;
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>

<template>
  <div>
    <v-container :fluid="true">
      <v-divider />

      <v-card class="pb-5" :elevation="2">
        <v-row>
          <!-- Título -->
          <v-col :cols="12">
            <v-card-title>
              <div class="d-flex justify-space-between align-center w-100">
                <div>
                  <h3>{{ props.titulo }}</h3>
                  <p v-if="props.subtitulo" class="subheading">{{ props.subtitulo }}</p>
                </div>

                <v-btn
                  color="error"
                  class="ml-auto"
                  :variant="'outlined'"
                  @click="onDeleteItem(props.index)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </v-card-title>
          </v-col>
        </v-row>

        <v-card-subtitle class="mb-3"
          >Ordem: <strong> {{ props.ordem }}</strong></v-card-subtitle
        >

        <!-- Input reativo para os parâmetros -->
        <v-row class="justify-center">
          <v-col
            v-for="(param, index) in params"
            :sm="4"
            :cols="12"
            :key="index"
            class="d-flex justify-center"
          >
            <v-text-field
              :variant="'outlined'"
              v-model="params[index]"
              :label="`Parâmetro: ${index}`"
              @input="onParamChange(index, param)"
            />
          </v-col>
        </v-row>
      </v-card>

      <v-divider />
    </v-container>
  </div>
</template>

<script lang="ts" setup>
// Vue
const emit = defineEmits(['onDelete', 'onParamUpdate'])

// Props do componente
const props = defineProps({
  titulo: { type: String, required: true },
  subtitulo: { type: String, required: false },
  ordem: { type: Number, required: true },
  index: { type: Number, required: true },
  params: { type: Object, required: true }
})

// Função para deletar item
function onDeleteItem(pIndex: number) {
  emit('onDelete', pIndex)
}

// Função chamada quando o parâmetro é alterado
function onParamChange(pIndex: string, pValor: any) {
  console.log('onParamChange', pIndex, pValor)
  emit('onParamUpdate', { index: pIndex, pValor })
}
</script>

<style scoped></style>

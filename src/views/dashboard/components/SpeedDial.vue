<template>
  <div class="TStyleFab">
    <v-row class="mb-4">
      <v-col>
        <v-speed-dial location="left center" transition="fade-transition">
          <template v-slot:activator="{ props: activatorProps }">
            <v-fab
              v-bind="activatorProps"
              size="large"
              :color="'primary'"
              :icon="true"
              v-tooltip="'Histogramas'"
            >
              <v-icon>mdi-chart-histogram</v-icon>
            </v-fab>
          </template>

          <v-btn key="1" :color="'success'" :icon="true" v-tooltip="'Histograma'">
            <v-icon>mdi-chart-bar</v-icon>
          </v-btn>

          <v-btn key="2" :icon="true" :color="'success'" v-tooltip="'Histograma Equalizado'">
            <v-icon>mdi-chart-bar-stacked</v-icon>
          </v-btn>
        </v-speed-dial>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-speed-dial location="left center" transition="fade-transition">
          <template v-slot:activator="{ props: activatorProps }">
            <v-fab
              v-bind="activatorProps"
              size="large"
              :color="'primary'"
              :icon="true"
              v-tooltip="'Rotações'"
            >
              <v-icon>mdi-rotate-3d-variant</v-icon>
            </v-fab>
          </template>

          <v-btn
            key="1"
            :color="'success'"
            :icon="true"
            v-tooltip="'Rotação 90º Sentido Horário'"
            @click="onClickRotacao90Horario()"
          >
            <v-icon>mdi-rotate-right</v-icon>
          </v-btn>

          <v-btn
            key="2"
            :icon="true"
            :color="'success'"
            v-tooltip="'Rotação 90º Sentido Anti-Horário'"
            @click="onClickRotacao90AntiHorario()"
          >
            <v-icon>mdi-rotate-left</v-icon>
          </v-btn>

          <v-btn
            key="3"
            :color="'success'"
            :icon="true"
            v-tooltip="'Rotação 180º'"
            @click="onClickRotacao180()"
          >
            <v-icon>mdi-restore</v-icon>
          </v-btn>
        </v-speed-dial>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
// Vue
const emit = defineEmits([
  'onClickRotacao90Horario',
  'onClickRotacao90AntiHorario',
  'onClickRotacao180'
])

function onClickRotacao180() {
  emit('onClickRotacao180')
}

function onClickRotacao90Horario() {
  emit('onClickRotacao90Horario')
}

function onClickRotacao90AntiHorario() {
  emit('onClickRotacao90AntiHorario')
}
</script>

<style scoped>
.TStyleFab {
  position: fixed;
  right: 70px;
  bottom: 25px;
  z-index: 1000;
  display: inherit !important; /* override v-show display: none */
  transition: all 0.2s;
}
</style>

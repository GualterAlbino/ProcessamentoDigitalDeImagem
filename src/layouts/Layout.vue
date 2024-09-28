<template>
  <v-locale-provider>
    <v-app :class="[]">
      <!-- Header -->

      <Loading />

      <v-main>
        <div class="LStyleLayoutPage">
          <!-- Conteúdo -->

          <RouterView />
        </div>

        <div>
          <!-- <Footer /> -->
        </div>
      </v-main>
    </v-app>
  </v-locale-provider>
</template>

<script setup lang="ts">
// Components
import Loading from '@/components/Loading.vue'
</script>

<style scoped></style>

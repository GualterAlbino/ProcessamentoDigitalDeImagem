<template>
  <v-locale-provider>
    <v-app :class="[]">
      <!-- Header -->

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

<script setup lang="ts"></script>

<style scoped></style>

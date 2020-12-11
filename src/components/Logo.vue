<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
                :src="require('../assets/Logo.svg')"
                class="my-3"
                contain
                height="500"
        ></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        name: 'Logo',
  })
</script>

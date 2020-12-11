<template>
    <v-app>
        <app-header></app-header>
        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script lang="ts">
    import Vue from 'vue';
    import AppHeader from "@/components/header/Index.vue";

    export default Vue.extend({
        name: 'App',
        components: {
            AppHeader
        }
    });
</script>


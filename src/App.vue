<template>
    <v-app>
        <v-app-bar app color="primary" dark>
            <div class="nav">
                <div class="d-flex align-left">
                    <v-img alt="Vuetify Logo"
                           class="shrink mr-2"
                           contain
                           src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
                           transition="scale-transition"
                           width="40"
                    ></v-img>
                    <span v-text="'Yoel & Cohcav Transportation'"></span>
                </div>

                <router-link class="link" to="/">Home</router-link>
                <router-link class="link" to="/works">Works</router-link>
            </div>
        </v-app-bar>

        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        name: 'App'
    });
</script>

<style lang="scss" scoped>
    .nav {
        margin: 0 auto;
        text-align: center;

        .link {
            margin-right: 10px;
            color: #fff;
        }
    }
</style>

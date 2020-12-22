<template>
    <v-app-bar app color="primary" dark>
        <div class="nav">
            <div class="linksWrapper">
                <v-app-bar-nav-icon></v-app-bar-nav-icon>
                <router-link class="link" to="/">ראשי</router-link>
                <router-link class="link" to="/works" v-if="isUserSignIn">עבודות</router-link>
                <router-link class="link" to="/login" v-if="isUserSignIn">התנתק {{user && user.email}}</router-link>
            </div>

            <div class="logoWrapper">
                <img :src="require('../../assets/HeaderLogo.png')"
                     alt="App Logo"
                     class="logo shrink">
            </div>
        </div>
    </v-app-bar>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {namespace} from 'vuex-class';

    const auth = namespace('auth');

    @Component
    export default class Header extends Vue {
        @auth.State
        public user!: boolean;

        constructor() {
            super();
        }

        get isUserSignIn(): boolean {
            return this.user;
        }
    }
</script>

<style lang="scss" scoped>
    .nav {
        width: 100%;
        display: flex;
        flex-flow: row;
        justify-content: space-between;
        align-items: center;

        .linksWrapper {
            display: flex;
            flex-flow: row;
            align-items: center;

            .link {
                background-color: #1976d2;
                margin-right: 25px;
                color: #fff;
                text-decoration: unset;
            }
        }

        .logoWrapper {
            .logo {
                width: 240px;
                max-height: 64px;
            }
        }
    }
</style>

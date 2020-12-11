/* eslint-disable */
import Vue from 'vue'
import firebase from "firebase";
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify';
import Firebase from "@/utils/firebase/Firebase";

Vue.config.productionTip = false;

let app: any;

Firebase.auth.onAuthStateChanged(async (user: firebase.User | null) => {
    if (!app) {
        app = new Vue({
            router,
            store,
            vuetify,
            render: h => h(App)
        });
        app.$store.dispatch('auth/setFirebaseUser', user);
        app.$mount('#app');
    }
});


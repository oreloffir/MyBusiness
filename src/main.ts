/* eslint-disable */
import Vue from 'vue'
import firebase from "firebase";
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify';
import Firebase from "@/utils/firebaseUtil/Firebase";

Vue.config.productionTip = false;

let app: any;

Firebase.auth.onAuthStateChanged((user: firebase.User | null) => {
    if (!app) {
        let app = new Vue({
            router,
            store,
            vuetify,
            render: h => h(App)
        }).$mount('#app');
    }
});


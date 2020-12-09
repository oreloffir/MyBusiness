/* eslint-disable */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Firebase from "@/utils/firebase/Firebase";

Vue.config.productionTip = false;

let app: any;

Firebase.auth.onAuthStateChanged((user: any) => {
    if (!app) {
        let app = new Vue({
            router,
            store,
            vuetify,
            render: h => h(App)
        }).$mount('#app');
    }
});


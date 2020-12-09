import Vue from "vue";
// import axios from 'axios';
import Vuex, {Module as Mod} from 'vuex';
import {Action, Module, Mutation, VuexModule} from 'vuex-module-decorators'
import Firebase from "@/utils/firebase/Firebase";
import router from "@/router";
import UserCredential = firebase.auth.UserCredential;

Vue.use(Vuex);

@Module({namespaced: true})
class Auth extends VuexModule {
    public user?: UserCredential;
    public errors: Array<string> = [];

    // eslint-disable-next-line
    constructor(module: Mod<{}, any>) {
        super(module);
    }

    @Action
    login(data: { email: string; password: string }) {
        console.log("Login");
        console.log(data.email);
        console.log(data.password);
        try {
            Firebase.auth.signInWithEmailAndPassword(data.email, data.password).then(res => {
                this.user = res;
                router.replace({name: 'Works'});
            }).catch(err => {
                this.context.commit('setErrors', [err.message]);
            });
        } catch (err) {
            this.context.commit('setErrors', [err]);
        }
    }

    @Action
    logout() {
        console.log("Logout");
        console.log(this.user);
    }

    @Mutation
    setUser(user: UserCredential) {
        this.user = user;
    }

    @Mutation
    setErrors(errors: Array<string>) {
        this.errors = errors;
    }
}

export default Auth

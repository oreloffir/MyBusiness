import Vue from "vue";
import firebase from "firebase";
import Vuex, {Module as Mod} from 'vuex';
import {Action, Module, Mutation, VuexModule} from 'vuex-module-decorators'
import router from "@/router";
import Firebase from "@/utils/firebaseUtil/Firebase";

Vue.use(Vuex);

@Module({namespaced: true})
class Auth extends VuexModule {
    public user?: firebase.User;
    public errors: Array<string> = [];

    // eslint-disable-next-line
    constructor(module: Mod<{}, any>) {
        super(module);
    }

    @Action
    login(data: { email: string; password: string }) {
        try {
            Firebase.auth.signInWithEmailAndPassword(data.email, data.password).then(res => {
                if (res.user) {
                    this.user = res.user;
                    router.replace({name: 'Works'});
                }
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
    setUser(user: firebase.User) {
        this.user = user;
    }

    @Mutation
    setErrors(errors: Array<string>) {
        this.errors = errors;
    }
}

export default Auth

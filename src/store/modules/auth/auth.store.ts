import Vue from "vue";
import firebase from "firebase";
import Vuex, {Module as Mod} from 'vuex';
import {Action, Module, Mutation, VuexModule} from 'vuex-module-decorators'
import router from "@/router";
import Firebase from "@/utils/firebase/Firebase";

Vue.use(Vuex);

@Module({namespaced: true})
class Auth extends VuexModule {
    public errors: Array<string> = [];
    public user: firebase.User | null;

    // eslint-disable-next-line
    constructor(module: Mod<{}, any>) {
        super(module);
        this.user = Firebase.auth.currentUser;
    }

    @Action
    login(data: { email: string; password: string }) {
        try {
            Firebase.auth.signInWithEmailAndPassword(data.email, data.password).then(res => {
                if (res.user) {
                    this.context.commit('setUser', res.user);
                    router.push({name: 'Works'});
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
        try {
            Firebase.auth.signOut().then((res) => {
                this.context.commit('setUser', res);
            }).catch(err => {
                this.context.commit('setUser', err.user);
                router.replace({name: 'Home'});
            });
        } catch (err) {
            this.context.commit('setErrors', [err]);
        }
    }

    @Action
    setFirebaseUser(user: firebase.User) {
        this.context.commit("setUser", user);
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

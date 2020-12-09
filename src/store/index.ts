import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './modules/auth/auth.store'
import Works from './modules/works/work.store'
import Dashboard from './modules/dashboard/dashboard.store'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    modules: {
        auth: Auth,
        works: Works,
        dashboard: Dashboard
    }
})

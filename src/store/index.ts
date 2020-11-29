import Vue from 'vue'
import Vuex from 'vuex'
import Works from './modules/works/work.store'
import Dashboard from './modules/dashboard/dashboard.store'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    modules: {
        works: Works,
        dashboard: Dashboard
    }
})

import Vue from 'vue'
import Vuex from 'vuex'
import Works from '../store/modules/works/Index'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    works: Works
  }
})

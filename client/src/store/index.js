import Vuex from 'vuex'
import Vue from 'vue'

import google from './modules/google'
import reviews from './modules/reviews'

// Load Vuex
Vue.use(Vuex)

// Create store
export default new Vuex.Store({
    modules: {
        google,
        reviews
    }
})
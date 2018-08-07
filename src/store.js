import Vue from 'vue'
import Vuex from 'vuex'

import Color from './util/Color.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mainGrad: [],
    countdowns: [

    ],
  },
  mutations: {
    generateBackground(state, { gradPool, angle }) {
      state.mainGrad = [...gradPool.takeRandom().colors.map((c) => new Color({ hex: c })), angle];
    },
    initCountdowns(state, { length }) {
      state.countdowns = [...Array(length)].fill(null);
    },
    loadCountDown(state, { indice, id, }) {
      
    },
  },
  actions: {
    generateBackground({ commit }, { gradPool, angle }) {
      commit('generateBackground', { gradPool, angle });
    },
    retrieveCountdownsLength({ commit }) {

    },
    retrieveCountdowns({ commit }, { indices }) {

    },
  },
  getters: {

  },
})
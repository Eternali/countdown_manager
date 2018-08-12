import Vue from 'vue'
import Vuex from 'vuex'

import Color from '@/util/Color.js'
import Countdown from '@/util/Countdown.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mainGrad: [],
    countdowns: [],
    now: new Date(),
  },
  mutations: {
    generateBackground(state, { gradPool, angle }) {
      state.mainGrad = [...gradPool.takeRandom().colors.map((c) => new Color({ hex: c })), angle];
    },
    initCountdowns(state, { length }) {
      state.countdowns = [...Array(length)].fill(null);
    },
    loadCountdown(state, { indice, countdown}) {
      state.countdowns.splice(indice, 1, countdown);
    },
    updateNow(state, current) {
      state.now = current;
    }
  },
  actions: {
    generateBackground({ commit }, { gradPool, angle }) {
      commit('generateBackground', { gradPool, angle });
    },
    retrieveCountdownsLength({ commit }) {
      return new Promise(
        (res, rej) => {
          commit('initCountdowns', { length: 4 });
          res();
        }
      );
    },
    retrieveCountdowns({ commit }, { indices, gradPool }) {
      return new Promise(
        (res, rej) => {
          setTimeout(() => {
          for (let i = 0; i < 4; i++) {
            let when = new Date();
            when.setDate(when.getDate() + i);
            commit('loadCountdown', {
              indice: i,
              countdown: new Countdown({
                name: `Countdown ${i}`,
                gradient: gradPool.takeRandom().colors.map((c) => new Color({ hex: c })),
                when,
              })
            });
          }
          res();
        }, 2000);
        }
      );
    },
    attachNowUpdater({ commit }, dom) {
      dom.setInterval(() => {
        commit('updateNow', new Date());
      }, 1000);
    },
  },
  getters: {
    countdown(state) {
      return ({ indice, id, name }) => {
        if (indice) return state.countdowns[indice];
        else if (id) return state.countdowns.filter((cd) => cd.id === id)[0];
        else if (name) return state.countdowns.filter((cd) => cd.name === name);
      }
    }
  },
})
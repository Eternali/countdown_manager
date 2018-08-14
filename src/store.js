import Vue from 'vue'
import Vuex from 'vuex'

import Color from '@/util/Color.js'
import Countdown from '@/util/Countdown.js';
import Gradient from '@/util/Gradient.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mainGrad: [],
    countdowns: [],
    now: new Date(),
  },
  mutations: {
    generateBackground(state, { gradPool, angle }) {
      state.mainGrad = new Gradient(gradPool.takeRandom().colors.map((c) => new Color({ hex: c })), angle);
    },
    initCountdowns(state, { length }) {
      state.countdowns = [...Array(length)].fill(null);
    },
    loadCountdown(state, { index, countdown}) {
      state.countdowns.splice(index, 1, countdown);
    },
    deleteCountdown(state, index) {
      state.countdowns.splice(index, 1);
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
    retrieveCountdowns({ commit }, { indices, gradPool, angle }) {
      return new Promise(
        (res, rej) => {
          setTimeout(() => {
          for (let i = 0; i < 4; i++) {
            let when = new Date();
            when.setDate(when.getDate() + i);
            commit('loadCountdown', {
              index: i,
              countdown: new Countdown({
                name: `Countdown ${i}`,
                gradient: new Gradient(gradPool.takeRandom().colors.map((c) => new Color({ hex: c })), angle),
                when,
              })
            });
          }
          res();
        }, 2000);
        }
      );
    },
    deleteCountdown({ commit }, index) {
      return new Promise(
        (res, rej) => {
          commit('deleteCountdown', index);
          res();
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
      return ({ index, id, name }) => {
        if (index) return state.countdowns[index];
        else if (id) return state.countdowns.filter((cd) => cd.id === id)[0];
        else if (name) return state.countdowns.filter((cd) => cd.name === name);
      }
    }
  },
})
import Vue from 'vue'
import Vuex from 'vuex'

import Color from '@/util/Color.js'
import Countdown from '@/util/Countdown.js';
import Gradient from '@/util/Gradient.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mainGrad: null,
    activeBg: null,
    now: new Date(),
    countdowns: [],
    focused: null,
    authToken: '',
  },
  mutations: {
    generateBackground(state, { gradPool, angle }) {
      state.mainGrad = new Gradient(gradPool.takeRandom().colors.map((c) => new Color({ hex: c })), angle);
    },
    setActiveBackground(state, gradient) {
      state.activeBg = gradient || state.mainGrad;
    },
    updateNow(state, current) {
      state.now = current;
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
    addeditCountdown(state) {
      let index = state.countdowns.map((cd) => cd.id).indexOf(state.focused.id);
      if (index < 0) {
        state.countdowns.push(state.focused);
      } else {
        state.countdowns.splice(index, 1, state.focused);
      }
    },
    goAddEdit(state, index) { // index of -1 means add, index >= 0 means edit
      state.focused = index >= 0 ? state.countdowns[index] : new Countdown({  });
      if (index >= 0) state.activeBg = state.focused.gradient;
    }
  },
  actions: {
    login({ commit }, { email, hashedPassword }) {

    },
    logout({ commit }) {

    },
    generateBackground({ commit }, { gradPool, angle }) {
      commit('generateBackground', { gradPool, angle });
    },
    goHome({ commit }) {
      commit('setActiveBackground', null);
    },
    attachNowUpdater({ commit }, dom) {
      dom.setInterval(() => {
        commit('updateNow', new Date());
      }, 1000);
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
    addeditCountdown({ commit }) {
      return new Promise(
        (res, rej) => {
          commit('addeditCountdown');
          res();
        }
      );
    },
    goAddEdit({ commit }, { router, index }) { // index of -1 means add, index >= 0 means edit
      router.push('addedit');
      commit('goAddEdit', index);
    },
  },
  getters: {
    countdown(state) {
      return ({ index, id, name }) => {
        if (index) return state.countdowns[index];
        else if (id) return state.countdowns.filter((cd) => cd.id === id)[0];
        else if (name) return state.countdowns.filter((cd) => cd.name === name);
      }
    },
    backgroundAt(state) {
      return (
        x, y,
        { whenEmpty = new Color({ hex: '333333' }), hex = true, reversed = false, gradientOverride }
      ) => {
        let bg = gradientOverride || state.activeBg;
        if (!bg || !('colorAt' in bg)) return whenEmpty;
        let color = bg.colorAt(x, y, reversed);
        return hex ? `#${color.hex}` : color;
      };
    },
  },
})
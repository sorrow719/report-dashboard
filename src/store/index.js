/**
 * Created by avladimirov on 26.01.2018.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import VueSelect from 'vue-select'
import _ from 'lodash'

Vue.use(Vuex)
Vue.component('v-select', VueSelect)

export default new Vuex.Store({
  state: {
    isShowFilter: false,
    currentItem: {},
    functions: ['SF1', 'SF2', 'SF3'],
    params: [],
    indics: [],
    results: [
      {
        id: 1,
        typeComponent: 'Отчет',
        typeTec: '19',
        name: 'Отчет по 1',
        identifier: 'OT_126_4_0120',
        createTime: new Date(),
        functions: ['APP.SF.1', 'APP.SF.2'],
        params: [{
          id: '1',
          name: 'Параметр 1',
          sql: 'select \'1\' one from dual',
          default_value: '-1',
          value: '',
          type: 'list'
        }],
        indicators: [{
          id: '1',
          name: 'Показатель 1',
          sql: 'select \'1\' one from dual',
          default_value: '-1',
          value: '',
          type: 'list',
          relation: ''
        }
        ],
        stats: {
          lastExecTime: '12.123',
          average: '12',
          starts: [{
            id: '123123123123',
            startTime: new Date(),
            execTime: new Date()
          }]
        },
        isActive: false
      }]
  },
  actions: {
    selectItem ({commit}, note) {
      commit('SELECT_ITEM', note)
    },
    saveResult ({commit}, note) {
      commit('SAVE_RESULT', note)
    },
    deleteResult ({commit}, note) {
      commit('DELETE_RESULT', note)
    }
  },
  mutations: {
    SELECT_ITEM (state, item) {
      state.currentItem = item
    },
    SAVE_RESULT (state, item) {
      let idx = _.findIndex(state.results, function (el) {
        return el.id === item.id
      })
      if (idx === -1) {
        state.results.push(item)
      } else {
        Vue.set(state.results, idx, item)
      }
    },
    DELETE_RESULT (state, item) {
      state.results = _.reject(state.results, function (el) { return el.id === item.id })
    }
  },
  getters: {
    currentItem (state) {
      return state.currentItem
    },
    results (state) {
      return state.results
    },
    functions (state) {
      return state.functions
    }
  }
})

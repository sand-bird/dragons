import Vue from 'vue'
import Vuex from 'vuex'
import { saveCharms } from '../utils'

Vue.use(Vuex)

const addTo = (arr, val) => {
  arr.splice(arr.length, 0, val)
}
const removeFrom = (arr, val) => {
  arr.splice(arr.indexOf(val), 1)
}
var hasChanged = false
const setChangeWarning = () => {
  if (!hasChanged) {
    window.onbeforeunload = function() { return true }
    hasChanged = true
  }
}

export default new Vuex.Store({
  state: {
    dragons: {},
    habitats: {},
    dragonIds: [],
    habitatIds: [],
    loaded: false
  },
  getters: {
    charmOffsets: (state) => {
      return state.dragonIds[state.active]
    },
    emptyOffsets: (state) => {
      return state.emptyOffsets[state.active]
    },
    equipSets: (state) => {
      return state.equipSets[state.active]
    }
  },
  mutations: {
    LOAD_DRAGONS (state, dragons) {
      state.dragons = dragons
      console.log("state.loaded: true")
      state.loaded = true
    },
    
    LOAD_OFFSETS (state, offsets) {
      state.charmOffsets = offsets.charmOffsets
      state.emptyOffsets = offsets.emptyOffsets
    },
    
    LOAD_EQUIPSETS (state, equipSets) {
      state.equipSets = equipSets
    },
    
    SET_ACTIVE (state, a) {
      state.active = a
    },
    
    EDIT_DRAGON (state, data) {
      let dragon = state.dragons[data.id]
      dragon[data.key] = data.value
    },

    EDIT_HABITAT (state, data) {
      let habitat = state.habitats[data.id]
      habitat[data.key] = data.value
    },
    
    // accepts an array of ids or a single id
    DELETE_DRAGONS (state, ids) {
      if (!Array.isArray(ids)) ids = [ids]      
      for (let i = 0; i < ids.length; i++) {
        state.dragons[ids[i]] = null
        removeFrom(state.dragonIds, ids[i])
      }
    },
    
    // accepts an array of {id, dragon} objects or a single one
    ADD_DRAGONS (state, dragons) {
      if (!Array.isArray(dragons)) dragons = [dragons]
      for (let i = 0; i < dragons.length; i++) {
        state.dragons[id] = dragons[i]
        addTo(state.charmOffsets[state.active], offset)
      }
    },
    
    SAVE_CHARMS (state) {
      saveCharms(state.file, state.charms)
    },
    
    // used in sorting
    UPDATE_CHARMOFFSETS (state, charmOffsets) {
      state.charmOffsets[state.active] = charmOffsets
    }
  },
  actions: {
    init ({ commit, state }, data) {
      commit('LOAD_CHARMS', data.charms)
      commit('LOAD_OFFSETS', data.offsets)
      commit('LOAD_EQUIPSETS', data.equipSets)
      commit('SET_ACTIVE', data.active)
      setTimeout(() => {
        commit('LOAD_FILE', data.file)
      }, 0)
    },
    
    edit ({commit, state}, data) {
      setChangeWarning()
      setTimeout(() => {
        commit('EDIT_CHARM', data)
      }, 0)
    },
    
    remove ({commit, state}, data) {
      setChangeWarning()
      setTimeout(() => {
        commit('DELETE_CHARMS', data)
      }, 0)
    },
    
    // needs to be synchronous because the 
    // render relies on the add to be finished
    add ({commit, state}, data) {
      setChangeWarning()
      commit('ADD_CHARMS', data)
    },
    
    save ({ commit, state }, data) {
      commit('SAVE_CHARMS')
    },
    
    setActive ({ commit, state }, data) {
      setTimeout(() => {
        commit('SET_ACTIVE', data)
      }, 0)
    }
  }
})

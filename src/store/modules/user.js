const state = {
  user: {
    name: '',
    email: '',
  }
}

// Actions
const actions = {
  updateUser({ commit }, user) {
    commit('setUser', user);
  }
}

// Mutations
const mutations = {
  setUser(state, { name, email }) {
    Object.assign(state.user, { name, email });
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}

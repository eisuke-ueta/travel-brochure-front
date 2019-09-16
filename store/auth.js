import Cookie from 'js-cookie'

export const state = () => ({
  currentUser: null,
  token: null
})

export const mutations = {
  setCurrentUser(state, { currentUser }) {
    state.currentUser = currentUser
  },
  setToken(state, { token }) {
    state.token = token
  }
}

export const actions = {
  async fetchCurrentUser({ commit, dispatch }) {
    const response = await this.$axios.get('auth')
    if (response && response.status === 200) {
      await commit('setCurrentUser', { currentUser: response.data.currentUser })
    } else {
      await dispatch('deleteAuth')
    }
    return response
  },
  async updateToken({ commit }, { token }) {
    await commit('setToken', { token: token })
  },
  async login({ commit, dispatch }, { user }) {
    const response = await this.$axios.post('login', user)
    if (response && response.status === 200) {
      await Cookie.set('token', response.data.token)
      await commit('setToken', { token: response.data.token })
    } else {
      await dispatch('deleteAuth')
    }
    return response
  },
  async logout({ commit, dispatch }) {
    const response = await this.$axios.delete('logout')
    if (response && response.status === 200) {
      await dispatch('deleteAuth')
    }
  },
  signup({ commit }, { form }) {
    return this.$axios.post('signup', { form })
  },
  async completeSignup({ commit, dispatch }, { token }) {
    const response = await this.$axios.post('signup/complete', { token })
    if (response && response.status === 200) {
      await Cookie.set('token', response.data.token)
      await commit('setToken', { token: response.data.token })
    } else {
      await dispatch('deleteAuth')
    }
    return response
  },
  resetPassword({ commit }, { form }) {
    return this.$axios.post('signup/reset_password', { form })
  },
  changePassword({ commit }, { form }) {
    return this.$axios.post('signup/change_password', { form })
  },
  async deleteAuth({ commit }) {
    await Cookie.remove('token')
    await commit('setCurrentUser', { currentUser: null })
    await commit('setToken', { token: null })
  }
}

const FETCH_LIMIT = 10

export const state = () => ({
  user: null,
  users: [],
  recommendUsers: [],
  activeUsers: [],
  condition: {
    offset: 0,
    isFollows: false,
    loadMore: false
  }
})

export const mutations = {
  setCurrentUser(state, { currentUser }) {
    state.currentUser = currentUser
  },
  setUser(state, { user }) {
    state.user = user
  },
  setUsers(state, { users }) {
    state.users = users
  },
  setUsersRanking(state, { recommendUsers, activeUsers }) {
    state.recommendUsers = recommendUsers
    state.activeUsers = activeUsers
  },
  mergeUsers(state, { users }) {
    state.users = state.users.concat(users)
  },
  setCondition(state, { condition }) {
    state.condition = condition
  },
  initUserCondition(state) {
    state.condition = {
      offset: 0,
      isFollows: false,
      loadMore: false
    }
  }
}

export const actions = {
  async fetchUser({ commit }, { id }) {
    const params = { id }
    const response = await this.$axios.get('user', { params })
    if (response && response.status === 200) {
      await commit('setUser', { user: response.data.user })
    }
    return response
  },
  async fetchUsers({ commit, state }, { id }) {
    const params = {
      id: id,
      offset: state.condition.offset,
      limit: FETCH_LIMIT
    }
    const response = state.condition.isFollows
      ? await this.$axios.get('users/follows', { params })
      : await this.$axios.get('users/followers', { params })

    if (response && response.status === 200) {
      state.condition.loadMore
        ? await commit('mergeUsers', { users: response.data.users })
        : await commit('setUsers', { users: response.data.users })
    }
    return response
  },
  async fetchUsersByRanking({ commit }) {
    const response = await this.$axios.get('users/ranking')
    if (response && response.status === 200) {
      await commit('setUsersRanking', {
        recommendUsers: response.data.recommendUsers,
        activeUsers: response.data.activeUsers
      })
    }
    return response
  },
  async updateProfile({ dispatch }, { form }) {
    const formData = new FormData()
    if (form.id) formData.append('form[id]', form.id)
    if (form.name) formData.append('form[name]', form.name)
    if (form.avatar) formData.append('form[avatar]', form.avatar)
    if (form.biography) formData.append('form[biography]', form.biography)
    if (form.avatarImage) formData.append('file', form.avatarImage)
    const response = await this.$axios.post('profile/update', formData)
    return response
  },
  async initUsers({ commit }) {
    await commit('setUsers', { users: [] })
    await commit('initUserCondition')
  },
  async updateUserCondition({ commit, state }, { offset, isFollows, loadMore }) {
    const condition = {
      offset: offset !== undefined ? offset : state.condition.offset,
      isFollows: isFollows !== undefined ? isFollows : state.condition.isFollows,
      loadMore: loadMore !== undefined ? loadMore : state.condition.loadMore
    }
    await commit('setCondition', { condition })
  },
  changePassword({ commit, state }, { form }) {
    return this.$axios.post('profile/change_password', { form })
  },
  changeEmail({ commit, state }, { form }) {
    return this.$axios.post('profile/change_email', { form })
  },
  confirmEmail({ commit, state }, { form }) {
    return this.$axios.post('profile/confirm_email', { form })
  },
  deleteUser({ commit, state }) {
    return this.$axios.delete('profile/delete')
  },
  userFollow({ commit }, { isFollowing, userId }) {
    if (isFollowing) {
      return this.$axios.post('follow', { userId })
    }
    return this.$axios.post('unfollow', { userId })
  }
}

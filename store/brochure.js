const INIT_CONDITION = {
  keyword: '',
  offset: 0,
  limit: 10,
  onlyStar: false,
  userId: '',
  loadMore: false
}

export const state = () => ({
  brochures: [],
  starBrochures: [],
  favoriteBrochures: [],
  brochure: {},
  baseDay: {},
  baseEvent: {},
  condition: INIT_CONDITION
})

export const mutations = {
  setBrochures(state, { brochures }) {
    state.brochures = brochures
  },
  setBrochuresRanking(state, { starBrochures, favoriteBrochures }) {
    state.starBrochures = starBrochures
    state.favoriteBrochures = favoriteBrochures
  },
  mergeBrochures(state, { brochures }) {
    state.brochures = state.brochures.concat(brochures)
  },
  setBrochure(state, { brochure }) {
    state.brochure = brochure
  },
  initBrochure(state) {
    state.brochure = {}
  },
  setCondition(state, { condition }) {
    state.condition = condition
  },
  initBrochureCondition(state) {
    state.condition = INIT_CONDITION
  }
}

export const actions = {
  async fetchBrochures({ commit, state }) {
    const params = {
      keyword: state.condition.keyword,
      offset: state.condition.offset,
      limit: state.condition.limit,
      onlyStar: state.condition.onlyStar,
      userId: state.condition.userId
    }
    const response = await this.$axios.get('brochures', { params })
    if (response && response.status === 200) {
      state.condition.loadMore
        ? await commit('mergeBrochures', { brochures: response.data.brochures })
        : await commit('setBrochures', { brochures: response.data.brochures })
    }
    return response
  },
  async fetchBrochuresByRanking({ commit }) {
    const response = await this.$axios.get('brochures/ranking')
    if (response && response.status === 200) {
      await commit('setBrochuresRanking', {
        starBrochures: response.data.starBrochures,
        favoriteBrochures: response.data.favoriteBrochures
      })
    }
    return response
  },
  async updateBrochureCondition({ commit, state }, { keyword, offset, limit, onlyStar, userId, loadMore }) {
    const condition = {
      keyword: keyword !== undefined ? keyword : state.condition.keyword,
      offset: offset !== undefined ? offset : state.condition.offset,
      limit: limit !== undefined ? limit : state.condition.limit,
      onlyStar: onlyStar !== undefined ? onlyStar : state.condition.onlyStar,
      userId: userId !== undefined ? userId : state.condition.userId,
      loadMore: loadMore !== undefined ? loadMore : state.condition.loadMore
    }
    await commit('setCondition', { condition: condition })
  },
  async initBrochures({ commit }) {
    await commit('setBrochures', { brochures: [] })
    await commit('initBrochureCondition')
  },
  async fetchBrochure({ commit }, { id }) {
    const params = { id }
    const response = await this.$axios.get('brochure', { params })
    if (response.status === 200 && response.data.brochure) {
      commit('setBrochure', { brochure: response.data.brochure })
    }
    return response
  },
  async fetchBrochureByShareId({ commit }, { shareId }) {
    const params = { shareId }
    const response = await this.$axios.get('brochures/share', { params })
    if (response.status === 200 && response.data.brochure) {
      commit('setBrochure', { brochure: response.data.brochure })
    }
    return response
  },
  async updateBrochure({ commit, rootState }, { form }) {
    const response = form.id
      ? await this.$axios.post(`brochure/update`, { form: form })
      : await this.$axios.post(`brochure/create`, { form: form })
    return response
  },
  deleteBrochure({ state, commit }) {
    return this.$axios.post('brochure/delete', { id: state.brochure.id })
  },
  updateBrochureShare({ commit }, { brochure }) {
    return this.$axios.post(`brochure/update`, { form: brochure })
  },
  updateBrochureFavorite({ commit }, { brochure, isFavorited }) {
    if (isFavorited) {
      return this.$axios.post('favorite', { id: brochure.id })
    }
    return this.$axios.post('unfavorite', { id: brochure.id })
  },
  updateBrochureStar({ commit }, { brochure, isStared }) {
    if (isStared) {
      return this.$axios.post('star', { id: brochure.id })
    }
    return this.$axios.post('unstar', { id: brochure.id })
  }
}

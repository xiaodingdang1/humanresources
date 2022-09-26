import { login } from '@/api/login'

export default {
  namespaced: true,
  state: {
    token: null
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    }
  },
  actions: {
    async loginAction({ commit }, loginData) {
      const res = await login(loginData)
      console.log(res)
      // commit('SET_TOKEN', data)
    }
  }
}

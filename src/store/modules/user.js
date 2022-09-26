import { login } from '@/api/login'
import { getUserDetailById, getUserInfo } from '@/api/user'

export default {
  namespaced: true,
  state: {
    token: null,
    userInfo: {} // 定义一个空的对象 不是null 因为后边我要开发userInfo的属性给别人用  userInfo.name
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    // 设置用户信息
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    },
    // 删除用户信息
    reomveUserInfo(state) {
      state.userInfo = {}
    }
  },
  actions: {
    async loginAction({ commit }, loginData) {
      const res = await login(loginData)
      // console.log(res)
      commit('SET_TOKEN', res)
    },
    async getUserInfo({ commit }) {
      const res = await getUserInfo()
      const res1 = await getUserDetailById(res.userId)
      const result = { ...res, ...res1 }
      // console.log(res)
      commit('SET_USER_INFO', result)
      return JSON.parse(JSON.stringify(result))
      // console.log(data)
      // commit('setUserInfo')
    }
  }
}

import { login } from '@/api/login'
import { getUserDetailById, getUserInfo } from '@/api/user'

export default {
  namespaced: true,
  state: {
    token: null,
    userInfo: {}, // 定义一个空的对象 不是null 因为后边我要开发userInfo的属性给别人用  userInfo.name
    hrsaasTime: 0
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
    RMOVE_USER_INFO(state) {
      state.userInfo = {}
    },
    // 清空token
    REMOVE_TOLEN(state) {
      state.token = null
    },
    SET_HRSAAS_TIME(state, hrsaasTime) {
      state.hrsaasTime = hrsaasTime // 属于事件1,属于获取到token的时间
    }
  },
  actions: {
    async loginAction({ commit }, loginData) {
      // 接口
      const res = await login(loginData)
      // console.log(res)
      commit('SET_TOKEN', res)
      commit('SET_HRSAAS_TIME', new Date().getTime())
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
    },
    logout({ commit }) {
      commit('RMOVE_USER_INFO') // 删除用户信息
      commit('REMOVE_TOLEN') // 清空token
    }

  }
}

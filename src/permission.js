import router from '@/router'
import store from '@/store'
const whiteList = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
//   console.log(to)
//   console.log(from)
//   next()
// 1,判断token是否存在
// 1.存在 处于登录状态 是否去往登录页 处于 则去首页 否则放行
// 1.不存在 不处于登录状态 去往页面 是否处于白名单 处于 则放行 否则登录页

  // 路由的前置守卫
  //  首先判断有无token
  if (store.getters.token) {
    //   如果有token 继续判断是不是去登录页
    // debugger

    if (!store.state.user.userInfo.userTd) {
      await store.dispatch('user/getUserInfo')
    }

    if (to.path === '/login') {
      //  表示去的是登录页
      next('/') // 跳到主页
    } else {
      next() // 直接放行
    }
  } else {
    // 如果没有token
    if (whiteList.includes(to.path)) {
      // 如果找到了 表示在白名单里面
      next()
    } else {
      next('/login') // 跳到登录页
    }
  }
})


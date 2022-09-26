import request from '@/utils/request'

export function login(data) {
}

/**
 *  获取用户的基本资料
 *
 * **/
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

/** *
 *
 * 获取用户的基本信息  现在写它 完全是为了显示头像
 * **/
export const getUserDetailById = (id) => {
  return request({
    url: `/sys/user/${id}`,
    method: 'get'
  })
}

export function logout() {
}

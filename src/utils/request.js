// 实现对axios封装

/*eslint-disable*/
import axios from "axios"

// 通过axios 创建 axios 实例
const service = axios.create({
baseURL:process.env. VUE_APP_BASE_API,
 timeout: 5000
})
export default service
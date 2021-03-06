import axios from 'axios'

// 創建 axios 實體
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000 
})

export default service
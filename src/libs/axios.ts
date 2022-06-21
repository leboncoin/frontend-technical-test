import axios from 'axios'

export default function initAxios() {
  axios.defaults.baseURL = process.env.NEXT_API_BASE_URL
  axios.defaults.timeout = 2000 

  axios.interceptors.request.use(request => request, error => {
    return Promise.reject(error)
  })

  axios.interceptors.response.use(response => response, error => {
    return Promise.reject(error)
  })
}
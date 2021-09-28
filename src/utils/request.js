import axios from 'axios'


const service = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 5000
})

// 请求白名单
const whiteUrl = ['/login']

/**
 * 请求拦截器
 */
service.interceptors.request.use(
    config => {
        console.log('请求拦截器', config);
        const url = config.url.replace(config.baseURL, '')
        if(whiteUrl.some(item => item===url)) {
            return config
        }

        /**
         * token
         * config.headers['X-Token'] = token
         */
         return config
        
    },
    error => {
        return Promise.reject(error)
    }
)

/**
 * 响应拦截器
 */
service.interceptors.response.use(
    response => {
        const res = response
        // 这里根据code的值去执行截下来的操作
        if(res.status !== 200) {
            return Promise.reject(new Error(res.message) || 'Error')
        }
        return res.data
    },
    error => {
        return Promise.reject(error)
    }
)
export default service
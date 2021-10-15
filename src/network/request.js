import axios from 'axios'

export function request(config) {
    // 1. 创建axios实例
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:8000/api/w6',
        timeout: 5000
    })

    // 2. axios的拦截器
    // 请求拦截
    instance.interceptors.request.use(config => {
            // config是调用者的配置信息
            console.log("好");
            // 拦截成功后要想执行下一步，就要将config返回出去，否接请求中断
            return config;
        }, err => {
            console.log("不好");
        })
        // 响应拦截
    instance.interceptors.response.use(res => {
        /*res 返回的数据：
           config 请求的配置信息
           data 请求到的数据
           headers 响应有信息
           request 请求信息
           status 状态码
           statusText 状态文本
        */
        console.log("拦截成功");
        //    返回我们需要的数据
        return res.data;
    }, err => {
        console.log("拦截失败");
    })


    // 3. 发送真正的请求
    return instance(config)
}
import axios from 'axios'
import { message } from 'antd'
import { getToken } from '../utils/user-token'

export type ResType={
errno: number// 错误码，必填
data?: ResDataType// 业务数据，可选（用 ? 表示）
msg?: string// 错误信息，可选，用 ? 表示
}
export type ResDataType ={[key: string]: any}
//创建axios实例

// ajax.ts
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,  // 从环境变量读取
  timeout: 5000,
});

//response拦截器 统一处理error 和msg
instance.interceptors.response.use((res)=>{
    // console.log('原始数据:', JSON.stringify(res));
    const resData=(res.data ||{})as ResType
    const {errno,data,msg}=resData
    if(errno===0){
     res.data = data
    //   return res  
 return data as unknown as typeof res;
    }
    message.error(msg)
    return Promise.reject(resData)
})

//request拦截器 统一添加token
instance.interceptors.request.use((config)=>{
    const token=getToken()
    if(token){
        config.headers['Authorization']=`Bearer ${token}`//JWT的固定格式
    }
    return config
},(error)=>{
    return Promise.reject(error)
})

export default instance
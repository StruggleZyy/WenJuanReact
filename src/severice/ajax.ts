import axios from 'axios'
import { message } from 'antd'

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

instance.interceptors.response.use((res)=>{
    // console.log('原始数据:', JSON.stringify(res));
    //console.log('axios实例配置:', instance.defaults);
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



export default instance
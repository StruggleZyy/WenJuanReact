//相当于实际项目中的API接口 src/api

// import axios from 'axios'
import axios, { ResDataType } from '../severice/ajax'

export async function getQuestionServiceApi(id:string):Promise<ResDataType>{
   const url=`/api/question/${id}`
    const data=(await axios.get(url)) as ResDataType
    return data
  
}

export async function CreateQuestionListApi():Promise<ResDataType>{
    const url=`/api/question`
    const data=(await axios.post(url)) as ResDataType
    return data
}
 
export async function getQuestionListApi():Promise<ResDataType>{
    const url=`/api/question`
    const data=(await axios.get(url)) as ResDataType
    return data
}
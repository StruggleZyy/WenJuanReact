//相当于实际项目中的API接口 src/api

// import axios from 'axios'
import axios, { ResDataType } from '../severice/ajax'
type SearchOption = {
  keyword: string
  isStar: boolean
  isDeleted: boolean
  page: number
  pageSize: number
}
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
 


export async function getQuestionListApi(
  opt: Partial<SearchOption> = {}
): Promise<ResDataType> {
  const url = '/api/question'
  const data = (await axios.get(url, { params: opt })) as ResDataType
  return data
}
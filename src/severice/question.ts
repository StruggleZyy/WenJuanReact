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

type UpdateQuestionOption = {
  title: string
  isStar: boolean
  isDeleted: boolean
}

// 获取单个问卷信息
export async function getQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/${id}`
  const data = (await axios.get(url)) as ResDataType
  return data
}


// 更新单个问卷
export async function updateQuestionService(
  id: string,
  opt?: { [key: string]: any }
): Promise<ResDataType> {
  const url = `/api/question/${id}`
  const data = (await axios.patch(url, opt)) as ResDataType
  return data
}

// 创建问卷
export async function CreateQuestionListApi():Promise<ResDataType>{
    const url=`/api/question`
    const data=(await axios.post(url)) as ResDataType
    return data
}
 // 获取问卷列表
export async function getQuestionListApi(
  opt: Partial<SearchOption> = {}
): Promise<ResDataType> {
  const url = '/api/question'
  const data = (await axios.get(url, { params: opt })) as ResDataType
  return data
}

// 复制问卷
export async function DuplicateListApi(id:string):Promise<ResDataType>{
const data=(await axios.post(`/api/question/duplicate/${id}`)) as ResDataType
return data
}
//更新问卷
export async function UpdateQuestionListApi(
  id: string, 
  question: Partial<UpdateQuestionOption>
): Promise<ResDataType> {
    const url = `/api/question/${id}`;
    const data = (await axios.patch(url, question)) as ResDataType;
    return data;
}

// question.ts
export async function DeleteQuestionListApi(ids: string[]): Promise<ResDataType> {
    const url = '/api/question';
    const data = (await axios.delete(url, { data: { ids } })) as ResDataType;
    return data;
}
import { createSlice ,PayloadAction} from '@reduxjs/toolkit'; 
import { ComponentPropsType } from '../../components/QuestionComponents';
import { resetWarned } from 'antd/es/_util/warning';
import { produce } from 'immer';
export type ComponentInfoType={
 fe_id: string // ToD0后面解释
type: string
title: string
props:ComponentPropsType

}

export type ComponentsStateType= {
    selectedId:string;
    componentList:Array<ComponentInfoType>
}

const INIT_STATE:ComponentsStateType={
    selectedId:'',
    //组件列表
    componentList:[]
}

export const componentsSlice = createSlice({
    name:'components',
    initialState:INIT_STATE,
    reducers:{
      //重置所有组件
      resetComponents:(state:ComponentsStateType,action:PayloadAction<ComponentsStateType>)=>{
        return action.payload;
      },
      //设置选中的组件id
      changeSelectedId:produce((draft:ComponentsStateType,action:PayloadAction<string>)=>{
        draft.selectedId=action.payload;
      })
    }
})

export const { resetComponents,changeSelectedId } = componentsSlice.actions;
export default componentsSlice.reducer;

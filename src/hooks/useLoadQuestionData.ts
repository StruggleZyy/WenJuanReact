// 这是一个自定义 React Hook，专门负责加载问卷数据并同步到 Redux 状态。
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { getQuestionService } from '../severice/question';
import { useDispatch } from 'react-redux';
import { resetPageInfo } from '../store/pageInfoReducer';
import { resetComponents } from '../store/componentsReducer';
function useLoadQuestionData() {
    const { id = '' } = useParams();
    const dispatch = useDispatch();
 
   // 使用 ahooks 的 useRequest 发起 Ajax 请求
    const { data,loading,error,run } = useRequest(async(id:string)=>{
        if(!id){
           throw new Error('没有问卷');
        }
       const data = await getQuestionService(id);// 调用后端 API
       return data;
    },{
        manual:true,
    });

    //加载成功后，将问卷数据存储到 redux 中
    useEffect(() => {
      if(!data) return
      const {title='',componentList=[],desc='',js='',css=''} = data;
      //默认选中第一个组件
     let selectedId='';
       if(componentList.length>0){
        selectedId=componentList[0].fe_id;
       }

      dispatch(resetComponents({ selectedId, componentList,copiedComponent:null }));//把componentList 存储到 Redux store中
      dispatch(resetPageInfo({title,desc,js,css}));//把title 存储到 Redux store中
    }, [data]);


    //判断 id 变化，执行 ajax 加载问卷数据
    useEffect(() => {
        run(id);
    }, [id]);
    return {
        run,
        loading,
        data,
        error,
    };
}

export default useLoadQuestionData

// componentList 的初始值是空数组，实际数据来自后端 API，通过 useLoadQuestionData hook 加载并同步到 Redux Store。
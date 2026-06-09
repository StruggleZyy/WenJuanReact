// 这是一个自定义 React Hook，专门负责加载问卷数据并同步到 Redux 状态。
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { getQuestionService } from '../severice/question';
import { useDispatch } from 'react-redux';
import { resetComponents } from '../store/componentsReducer';
function useLoadQuestionData() {
    const { id = '' } = useParams();
    const dispatch = useDispatch();
 
    //使用 useRequest(ajax)加载问卷数据
    const { data,loading,error,run } = useRequest(async(id:string)=>{
        if(!id){
           throw new Error('没有问卷');
        }
       const data = await getQuestionService(id);
       return data;
    },{
        manual:true,
    });

    //加载成功后，将问卷数据存储到 redux 中
    useEffect(() => {
      if(!data) return
      const {title='',componentList=[]} = data;
      dispatch(resetComponents({ componentList }));//把componentList 存储到 Redux store中

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
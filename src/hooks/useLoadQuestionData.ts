import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { getQuestionServiceApi } from '../../src/severice/question';
function useLoadQuestionData() {
    const { id = '' } = useParams();
 

async function load() {
    const res = await getQuestionServiceApi(id as string);
    return res
}

 const {loading,data,error}=useRequest(load)
 return {loading,data,error}
}

export default useLoadQuestionData
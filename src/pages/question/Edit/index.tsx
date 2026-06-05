import React, { FC, useEffect, useState } from 'react';
import { getQuestionServiceApi } from '../../../severice/question';
import { useParams } from 'react-router-dom';
import styles from './edit.module.scss';
import useLoadQuestionData from '../../../hooks/useLoadQuestionData';
const Edit: FC = () => {
    const {loading,data,error}= useLoadQuestionData();


    return (
        <div>
            <h1>编辑问卷</h1>
            {loading ? <div>加载中...</div> : JSON.stringify(data || {})}
        </div>
    )
}

export default Edit;
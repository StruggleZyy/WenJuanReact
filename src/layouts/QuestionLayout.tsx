import React,{FC} from 'react';
import {Outlet} from 'react-router-dom';
import styles from './QuestionLayout.module.scss';
import useLoadUserData from '../hooks/useLoadUserData';
import {Spin} from 'antd';

const QuestionLayout:FC=()=>{
    const {waitingUserData}=useLoadUserData();
    return(
        <div className={styles.container}>
           <div className={styles.left}>
           
           </div>

           <div className={styles.right}>
         {/* 点击编辑 进入编辑问卷没有loading效果： 刷新页面时 会显示loading效果 
         
         *在useLoadQuestionData中 如果没有信息 重新请求数据 ，显示loading效果 如果有信息 则不显示loading效果
         */}
        {waitingUserData ? <div style={{textAlign:'center'}}><Spin /></div> : <Outlet />}
           </div>

          
        </div>
    )
}

export default QuestionLayout
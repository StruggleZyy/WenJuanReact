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
         
        {waitingUserData ? <div style={{textAlign:'center'}}><Spin /></div> : <Outlet />}
           </div>

          
        </div>
    )
}

export default QuestionLayout
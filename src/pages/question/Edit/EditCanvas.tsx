import React, { FC } from 'react';
// // 临时静态展示一下 Title Input 的效果
import QuestionTitle from '../../../components/QuestionComponents/QuestionTitle/Component'
import QuestionInput from '../../../components/QuestionComponents/QuestionInput/Component'
import styles from "./EditCanvas.module.scss";
const EditCanvas: FC = () => {
  return (
    <div className={styles.canvas}>
   <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionTitle />
        </div>
      </div>
      <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionInput />
        </div>
      </div>
    
    </div>
  )
}
export default EditCanvas


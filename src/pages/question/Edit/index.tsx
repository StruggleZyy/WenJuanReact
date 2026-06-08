import React, { FC, useEffect, useState } from "react";
import { getQuestionServiceApi } from "../../../severice/question";
import { useParams } from "react-router-dom";

import useLoadQuestionData from "../../../hooks/useLoadQuestionData";
import styles from "./index.module.scss";
const Edit: FC = () => {
  const { loading, data, error } = useLoadQuestionData();

  return (
    <div className={styles.container}>
      <div>Header</div>
      <div className={styles["content-wrapper"]}>
        <div className={styles.content}>
     
      
            <div className={styles.left}>Left</div>
            <div className={styles.main}>
                <div className={styles["canvas-wrapper"]}>
                    <div style={{height:'1000px'}}>测试画布测试y轴滚动</div>
                </div>
            </div>
            <div className={styles.right}>Right</div>
    
        </div>
      </div>
    </div>
  );
};

export default Edit;
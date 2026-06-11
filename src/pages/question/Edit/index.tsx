import React, { FC, useEffect, useState } from "react";
// import { updateQuestionService } from "../../../severice/question";
// import { useParams } from "react-router-dom";

import useLoadQuestionData from "../../../hooks/useLoadQuestionData";
import { useDispatch } from "react-redux";
import { changeSelectedId } from "../../../store/componentsReducer";
import styles from "./index.module.scss";
import EditCanvas from "./EditCanvas";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import EditHeader from "./EditHeader";
const Edit: FC = () => {
  const { loading, data, error } = useLoadQuestionData();
  const dispatch = useDispatch();

  //当没选中任何组件时，点击画布，清空选中状态 即蓝色边框去除
function ClearSelectedId(){
  dispatch(changeSelectedId(''));
}

  return (
    <div className={styles.container}>
      <div>
        <EditHeader />
      </div>
      <div className={styles["content-wrapper"]}>
        <div className={styles.content}>
     
      
            <div className={styles.left}>
              <LeftPanel />
                       </div>
            <div className={styles.main} onClick={ClearSelectedId}>
                <div className={styles["canvas-wrapper"]}>
                    <div style={{height:'1000px'}}>
                        <EditCanvas ></EditCanvas>
                    </div>
                </div>
            </div>
            <div className={styles.right}>
              <RightPanel />
            </div>
    
        </div>
      </div>
    </div>
  );
};

export default Edit;
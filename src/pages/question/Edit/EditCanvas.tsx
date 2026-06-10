import React, { FC, useEffect } from "react";
// // 临时静态展示一下 Title Input 的效果
// import QuestionTitle from "../../../components/QuestionComponents/QuestionTitle/Component";
// import QuestionInput from "../../../components/QuestionComponents/QuestionInput/Component";
import styles from "./EditCanvas.module.scss";
import useLoadQuestionData from "../../../hooks/useLoadQuestionData";
import { Spin } from "antd";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { ComponentConfigType } from "../../../components/QuestionComponents/index";
import { getComponentConfByType } from "../../../components/QuestionComponents/index";
import { ComponentInfoType,changeSelectedId } from "../../../store/componentsReducer";
import { useDispatch } from "react-redux";
import classNames from 'classnames';
function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo;
  const componentConf = getComponentConfByType(type);
  if (componentConf == null) return null;
  const { Component } = componentConf;  //QuestionTitleConfig||QuestionInputConfig
  return <Component {...props} />;//返回组件实例
}
const EditCanvas: FC = () => {
  const { loading, data, error } = useLoadQuestionData();
  const { componentList,selectedId } = useGetComponentInfo();

  // console.log("componentList", componentList);
  const dispatch = useDispatch();

  function handleClick(event:React.MouseEvent,id:string){
    event.stopPropagation();
    dispatch(changeSelectedId(id));
    
  }


  if (loading) {
    return <Spin></Spin>;
  }

  return (
    <div className={styles.canvas}>
      {componentList.map((item) => {
        const { fe_id } = item;

        const wrapperDefaultClassName = styles["component-wrapper"];
        const selectedClassName = styles.selected;
        const wrapperClassName = classNames(wrapperDefaultClassName, {
          [selectedClassName]: selectedId === fe_id
        });
        return (
          <div key={fe_id} className={wrapperClassName} onClick={(event)=>handleClick(event,fe_id)}>
            <div className={styles.component}>{genComponent(item)}</div>
          </div>
        );
      })}

      {/* <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionTitle />

        </div>
      </div>
      <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionInput />
        </div>
      </div> */}
    </div>
  );
};
export default EditCanvas;
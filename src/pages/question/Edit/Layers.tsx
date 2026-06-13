import React, { FC, useState, ChangeEvent } from "react";
import classNames from "classnames";
import { message, Input, Button, Space } from "antd";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import {
  changeSelectedId,
  changeComponentTitle,
  toggleComponentLocked,
  changeComponentHidden,
  moveComponent,
} from "../../../store/componentsReducer";
// import SortableContainer from '../../../components/DragSortable/SortableContainer'
// import SortableItem from '../../../components/DragSortable/SortableItem'
import styles from "./Layers.module.scss";

const Layers: FC = () => {
  // 从 Redux 获取组件列表和当前选中项
  const { componentList, selectedId } = useGetComponentInfo();
  console.log("componentList", componentList);
  const dispatch = useDispatch();

  // 标记当前正在编辑标题的组件ID
  const [changingTitleId, setChangingTitleId] = useState("");
  // 点击选中组件
  function handleTitleClick(fe_id: string) {
    const curComp = componentList.find((item) => item.fe_id === fe_id);
    if (curComp && curComp.isHidden) {
      message.info("不能选中隐藏的组件");
      return; //选中后不进入编辑
    }
    if (fe_id !== selectedId) {
      dispatch(changeSelectedId(fe_id));
      setChangingTitleId("");
      return;
    }
    setChangingTitleId(fe_id); //再次点击已选中组件 ，进入标题编辑
  }
  // 标题输入修改
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value.trim();
    if (!newTitle || !selectedId) return;
    dispatch(changeComponentTitle({ fe_id: selectedId, title: newTitle }));
  };

  // 切换显示/隐藏
  const changeHidden = (fe_id: string, isHidden: boolean) => {
    dispatch(changeComponentHidden({ fe_id, isHidden }));
  };

  // 切换锁定/解锁
  const changeLocked = (fe_id: string) => {
    dispatch(toggleComponentLocked({ fe_id }));
  };
  return (
    <div className={styles.container}>
      {componentList.map((c) => {
        const { fe_id, title, isHidden, isLocked } = c;
        // 拼接选中样式类名
        const titleClass = classNames(styles.title, {
          [styles.selected]: fe_id === selectedId,
        });
        return (
          <div key={fe_id} className={classNames(styles.wrapper)}>
            <div className={titleClass} onClick={() => handleTitleClick(fe_id)}>
              {" "}
              {/* 编辑状态显示输入框，否则显示文本 */}
              {fe_id === changingTitleId ? (
                <Input
                  value={title}
                  onChange={changeTitle}
                  onPressEnter={() => setChangingTitleId("")}
                  onBlur={() => setChangingTitleId("")}
                  size="small"
                />
              ) : (
                title
              )}
            </div>
            <div className={styles.handler}>
              <Space>
                <Button
                  onClick={() => changeHidden(fe_id, !isHidden)}
                  size="small"
                  shape="circle"
                  icon={isHidden ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                  type={isHidden ? "primary" : "text"}
                  className={isHidden ? styles.btn : ""}
                />
                <Button
                  onClick={() => changeLocked(fe_id)}
                  size="small"
                  shape="circle"
                  icon={<LockOutlined />}
                  type={isLocked ? "primary" : "text"}
                  className={isHidden ? styles.btn : ""}
                />
              </Space>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Layers;

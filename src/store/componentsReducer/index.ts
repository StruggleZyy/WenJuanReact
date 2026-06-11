import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ComponentPropsType } from "../../components/QuestionComponents";
import { resetWarned } from "antd/es/_util/warning";
import { produce } from "immer";
import { getNewSelectedId } from "./utils";
export type ComponentInfoType = {
  fe_id: string; // 前端生成的 id ，服务端 Mongodb 不认这种格式，所以自定义一个 fe_id
  type: string;
  title: string;
  props: ComponentPropsType;
  isHidden?: boolean;
  isLocked?: boolean;
};

export type ComponentsStateType = {
  selectedId: string;
  componentList: Array<ComponentInfoType>;
};

const INIT_STATE: ComponentsStateType = {
  selectedId: "",
  //组件列表
  componentList: [], // 初始为空数组
};

export const componentsSlice = createSlice({
  name: "components",
  initialState: INIT_STATE,
  reducers: {
    //重置所有组件
    resetComponents: (
      state: ComponentsStateType,
      action: PayloadAction<ComponentsStateType>,
    ) => {
      return action.payload;
    },
    //设置选中的组件id
    changeSelectedId: produce(
      (draft: ComponentsStateType, action: PayloadAction<string>) => {
        draft.selectedId = action.payload;
      },
    ),

    // 添加新组件
    addComponent: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<ComponentInfoType>,
      ) => {
        const newComponent = action.payload;

        const { selectedId, componentList } = draft;
        const index = componentList.findIndex((c) => c.fe_id === selectedId);
        if (index < 0) {
          // 未选中任何组件
          draft.componentList.push(newComponent);
        } else {
          // 选中了组件，插入到 index 后面
          draft.componentList.splice(index + 1, 0, newComponent);
        }
        draft.selectedId = newComponent.fe_id;
      },
    ),
    // 修改组件属性
    changeComponentProps: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ fe_id: string; props: ComponentPropsType }>,
      ) => {
        const { fe_id, props } = action.payload;
        const curComp = draft.componentList.find((c) => c.fe_id === fe_id);
        if (curComp) {
          curComp.props = {
            ...curComp.props,
            ...props,
          };
        }
      },
    ),

    // 删除选中的组件
    removeSelectedComponent: produce(
      (draft: ComponentsStateType, _action: PayloadAction) => {
        const { componentList, selectedId: removedId } = draft;
        const index = componentList.findIndex((c) => c.fe_id === removedId);

        // 如果没找到要删除的组件，直接返回
        if (index < 0) return;

        // 删除组件
        componentList.splice(index, 1);

        // 获取新的选中组件ID（调用工具函数）
        draft.selectedId = getNewSelectedId(componentList, removedId);
      },
    ),
    // 隐藏/显示组件
    changeComponentHidden: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ fe_id: string; isHidden: boolean }>,
      ) => {
        const { fe_id, isHidden } = action.payload;
        const { componentList } = draft;

        const curComp = draft.componentList.find((c) => c.fe_id === fe_id);
        // console.log("fe_id", fe_id, "curComp", curComp);
        if (curComp) {
          curComp.isHidden = isHidden;
        }

        // 重新计算 selectedId
        let newSelectedId = "";

        if (isHidden) {
          // 要隐藏
          newSelectedId = getNewSelectedId(componentList, fe_id);
        } else {
          // 要显示
          newSelectedId = fe_id;
        }

        draft.selectedId = newSelectedId;
        //
      },
    ),
    // 锁定/解锁组件（切换状态）
    toggleComponentLocked: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ fe_id: string }>,
      ) => {
        const { fe_id } = action.payload;

        const curComp = draft.componentList.find((c) => c.fe_id === fe_id);
        if (curComp) {
          // 处理 undefined 情况，默认视为 false
          curComp.isLocked = !(curComp.isLocked ?? false);
          console.log("修改后 isLocked:", curComp.isLocked);
        }
      },
    ),
  },
});

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
} = componentsSlice.actions;
export default componentsSlice.reducer;
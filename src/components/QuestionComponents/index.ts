import { FC } from "react";
import QuestionInputConfig, { QuestionInputPropsType } from "./QuestionInput";
import QuestionTitleConfig, { QuestionTitlePropsType } from "./QuestionTitle";

// 所有组件的 props 类型
export type ComponentPropsType =
    | QuestionInputPropsType
    | QuestionTitlePropsType;
// 所有组件的配置
export type ComponentConfigType = {
    title: string;
    type: string;
    Component: FC<ComponentPropsType>; // 组件的类型
    PropComponent: FC<ComponentPropsType>; // 组件的属性组件
    defaultProps: ComponentPropsType;
};
//全部的组件配置的列表
const componentConfigList: ComponentConfigType[] = [
   
    QuestionTitleConfig,
     QuestionInputConfig,
];

// 组件分组
export const componentConfGroup = [
  {
    groupId: 'textGroup',
    groupName: '文本显示',
    components: [QuestionTitleConfig],
  },
  {
    groupId: 'inputGroup',
    groupName: '用户输入',
    components: [QuestionInputConfig],
  },
]
export function getComponentConfByType(type: string) { return componentConfigList.find(c => c.type === type) }

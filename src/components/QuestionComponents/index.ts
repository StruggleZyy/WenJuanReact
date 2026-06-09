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
    defaultProps: ComponentPropsType;
};
//全部的组件配置的列表
const componentConfigList: ComponentConfigType[] = [
    QuestionInputConfig,
    QuestionTitleConfig,
];
export function getComponentConfByType(type: string) { return componentConfigList.find(c => c.type === type) }

import { FC } from "react";
import QuestionInputConfig, { QuestionInputPropsType } from "./QuestionInput";
import QuestionTitleConfig, { QuestionTitlePropsType } from "./QuestionTitle";
import QuestionParagraphConfig, { QuestionParagraphPropsType } from "./QuestionParagraph";
import QuestionRadioConfig, { QuestionRadioPropsType } from "./QuestionRadio";
import QuestionCheckboxConfig, { QuestionCheckboxPropsType } from "./QuestionCheckbox";
// 所有组件的 props 类型
export type ComponentPropsType =
    | QuestionInputPropsType
    | QuestionTitlePropsType
    | QuestionParagraphPropsType
    | QuestionRadioPropsType
    | QuestionCheckboxPropsType;
// 所有组件的配置
export type ComponentConfigType = {
    title: string;
    type: string;
    Component: FC<any>;
    PropComponent: FC<any>;
    defaultProps: ComponentPropsType;
};
//全部的组件配置的列表
const componentConfigList: ComponentConfigType[] = [
   
    QuestionTitleConfig,
     QuestionInputConfig,
     QuestionParagraphConfig,
     QuestionRadioConfig,
     QuestionCheckboxConfig,
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
  {
    groupId: 'paragraphGroup',
    groupName: '段落',
    components: [QuestionParagraphConfig],
  },
  {
    groupId: 'radioGroup',
    groupName: '用户选择',
    components: [QuestionRadioConfig],
  },
    {
    groupId: 'checkboxGroup',
    groupName: '用户多选',
    components: [QuestionCheckboxConfig],
  },

]
export function getComponentConfByType(type: string) { return componentConfigList.find(c => c.type === type) }
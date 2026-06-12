import QuestionCheckbox from './Component';
import PropComponent from './PropComponent';
import { QuestionCheckboxDefaultProps } from './interface';
export * from './interface'
export default {
    title: '多选框',
    type: 'questionCheckbox',//要和后端统一好
    Component: QuestionCheckbox,//画布中使用（中间）的组件
    PropComponent,//属性面板中（右侧）使用的组件
    defaultProps: QuestionCheckboxDefaultProps,
}

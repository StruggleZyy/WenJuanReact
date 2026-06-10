import Component from './Component'
import { QuestionInputDefaultProps } from './interface'
import PropComponent from './PropComponent'
export * from './interface'

export default {
    title: '输入框',
    type: 'questionInput',//要和后端统一好
    Component,//组件
    PropComponent,//属性组件
    defaultProps: QuestionInputDefaultProps,
}
/**
 * @description 问卷 单选

 */

 import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionRadioDefaultProps } from './interface'

// export type { QuestionRadioPropsType } from './interface'
export * from './interface'

// Radio 组件的配置
export default {
  title: '用户选择',
  type: 'questionRadio', // 要和后端统一好
  Component,//组件
  PropComponent,//属性组件
  defaultProps: QuestionRadioDefaultProps,
}
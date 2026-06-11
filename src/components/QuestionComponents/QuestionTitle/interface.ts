export type QuestionTitlePropsType = {
  text?: string
  level?: 1 | 2 | 3 | 4 | 5
  isCenter?: boolean
 isHidden?: boolean
  onChange?: (newProps: QuestionTitlePropsType) => void
  disabled?: boolean
}

// 标题默认属性
export const QuestionTitleDefaultProps: QuestionTitlePropsType = {
  text: '一行标题',
  level: 1,
  isCenter: false,
}

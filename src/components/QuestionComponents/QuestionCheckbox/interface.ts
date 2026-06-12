export type QuestionCheckboxPropsType = {
  title: string;
  isVertical: boolean;
  list?: { value: string; text: string; checked?: boolean }[];
  value: '';
   onChange?: (newProps: QuestionCheckboxPropsType) => void
};
export const QuestionCheckboxDefaultProps: QuestionCheckboxPropsType = {
  title: '用户多选',
  isVertical: false,
  list: [
    { value: 'item1', text: '选项1', checked: true },
    { value: 'item2', text: '选项2', checked: false },
    { value: 'item3', text: '选项3', checked: false },
  ],
  value:'',
};

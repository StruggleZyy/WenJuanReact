export type QuestionRadioPropsType = {
  title?: string;
  isVertical?: boolean;
  options?: { value: string; text: string }[];
  value?: string;
   disabled?: boolean;
   onChange?: (newProps: QuestionRadioPropsType) => void;  
};

export const QuestionRadioDefaultProps: QuestionRadioPropsType = {
 title: '单选标题',
  isVertical: false,
  options: [
    { value: 'item1', text: '选项1' },
    { value: 'item2', text: '选项2' },
    { value: 'item3', text: '选项3' },
  
  ],
    value: '',

}
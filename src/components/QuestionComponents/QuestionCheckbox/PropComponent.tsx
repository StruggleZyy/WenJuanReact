import React,{FC} from 'react';
import { QuestionCheckboxPropsType, QuestionCheckboxDefaultProps } from './interface';

import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';
import type { GetProp } from 'antd';
const QuestionCheckboxPropComponent: FC<QuestionCheckboxPropsType> = (props) => {
  const { title, isVertical, list } = { ...QuestionCheckboxDefaultProps, ...props };
const onChange: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues) => {
  console.log('checked = ', checkedValues);
};
 return (
    <div>
        <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
    {list?.map(item=>{
        return <Checkbox key={item.value} value={item.value}>{item.text}</Checkbox>
    })}
  </Checkbox.Group>
    </div>
 )
}   

export default QuestionCheckboxPropComponent;
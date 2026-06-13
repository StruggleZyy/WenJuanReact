import React, { FC } from 'react';
import { Checkbox, Space } from 'antd';
import { QuestionCheckboxPropsType, QuestionCheckboxDefaultProps } from './interface';

const QuestionCheckbox: FC<QuestionCheckboxPropsType> = (props) => {
  const { title, isVertical, list = [] } = { ...QuestionCheckboxDefaultProps, ...props };

  return (
    <div>
      <div>{title}</div>
      <Checkbox.Group value={list.filter((opt) => opt.checked).map((opt) => opt.value)}>
        {/* ✅ Space 在 Group 内部，直接包裹多个 Checkbox */}
        <Space orientation={isVertical ? 'vertical' : 'horizontal'}>
          {list.map((opt) => (
            <Checkbox key={opt.value} value={opt.value}>
              {opt.text}
            </Checkbox>
          ))}
        </Space>
      </Checkbox.Group>
    </div>
  );
};

export default QuestionCheckbox;
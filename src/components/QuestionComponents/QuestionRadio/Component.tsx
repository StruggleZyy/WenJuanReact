import React, { FC, useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Input, Radio } from 'antd';
import { QuestionRadioPropsType, QuestionRadioDefaultProps } from './interface'


const Component: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const { title, isVertical, options = [], value = '',disabled } = { ...QuestionRadioDefaultProps, ...props }

 return (
    <div>
      <div>{title}</div>
      <Radio.Group
        value={value}
        disabled={disabled}
        style={{
          display: isVertical ? 'block' : 'flex',
          flexDirection: isVertical ? 'column' : 'row',
        }}
      >
       {options.map(opt => (
          <Radio key={opt.value} value={opt.value}>
            {opt.text}
          </Radio>
        ))}
      </Radio.Group>
    </div>
  )
}

export default Component;
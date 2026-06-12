import React, { FC, useEffect } from "react";
import { Form, Radio, Input } from 'antd';
import { QuestionRadioPropsType } from './interface'
const PropComponent: FC<QuestionRadioPropsType> = (props) => {
  const { title, isVertical, options = [], value, onChange } = props
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({
      title,
      isVertical,
      options,
      value,
    })
  }, [title, isVertical, options, value])

  function handleValueChange() {
    if (onChange) {
      // ✅ 调用父组件传递的 onChange（即 changeProps）
      onChange({ ...form.getFieldsValue(), options }) //✅ form.getFieldsValue() 获取表单所有字段的当前值
      console.log('表单内容变化', form.getFieldsValue())
    }
  }

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ title: '单选标题', isVertical: true, value }}
      onValuesChange={handleValueChange}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>


      <Form.Item label="选项" name="value" rules={[{ required: true, message: '请添加选项' }]}>
        <Radio.Group
          options={options.map((item) => ({
            value: item.value,
            label: item.text,
          }))}
        />

      </Form.Item>

    </Form>
  )
}

export default PropComponent
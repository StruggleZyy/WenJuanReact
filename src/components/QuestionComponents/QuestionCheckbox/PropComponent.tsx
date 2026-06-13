import React, { FC } from 'react';
import { Form, Input, Checkbox, Space, Button } from 'antd';
import { nanoid } from 'nanoid';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { QuestionCheckboxPropsType, OptionType } from './interface';


const PropComponent: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
  const { title, isVertical, list = [], onChange, disabled } = props;
  const [form] = Form.useForm();

  function handleValuesChange() {
    if (onChange == null) return;

    const newValues = form.getFieldsValue();
    if (newValues.list) {
      console.log('newValues.list', newValues.list);

      newValues.list = newValues.list.filter((opt: OptionType) => opt.text != null);
    }
    // 1️⃣ 从 newValues 中解构出 list；如果 list 不存在，给一个空数组兜底
    const { list = [] } = newValues;

    // 2️⃣ 遍历每个选项
    list.forEach((opt: OptionType) => {
      // 3️⃣ 如果这个选项已经有 value 了，跳过（不处理）
      if (opt.value) return;

      // 4️⃣ 否则（新添加的选项 value 是空字符串 ''），用 nanoid 生成一个 5 位的随机字符串
      opt.value = nanoid(5);
    });

    // 5️⃣ 把处理好的 newValues（里面每个选项的 value 都有了）回传给父组件
    onChange(newValues);
  }
  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{ title, isVertical, list }}
      disabled={disabled}
      onValuesChange={handleValuesChange}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="选项">
        <Form.List name="list">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    <Form.Item name={[name, 'checked']} valuePropName="checked">
                      <Checkbox />
                    </Form.Item>
                    <Form.Item
                      name={[name, 'text']}
                      rules={[
                        { required: true, message: '请输入选项文字' },
                        {
                          validator: (_, text) => {
                            const { list = [] } = form.getFieldsValue();
                            let num = 0;
                            list.forEach((opt: OptionType) => {
                              if (opt.text === text) num++;
                            });
                            if (num === 1) return Promise.resolve();
                            return Promise.reject(new Error('和其他选项重复了'));
                          },
                        },
                      ]}
                    >
                      <Input placeholder="输入选项文字..." />
                    </Form.Item>

                    {index > 0 && <MinusCircleOutlined onClick={() => remove(name)} />}
                  </Space>
                );
              })}

              <Form.Item>
                <Button
                  type="link"
                  onClick={() => add({ text: '', value: '', checked: false })}
                  icon={<PlusOutlined />}
                  block
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>

      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  );
}

export default PropComponent;

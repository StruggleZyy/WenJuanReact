import React, { FC } from 'react';
import { Space, Table, Typography, Form, Input, Checkbox, Button } from 'antd';
import styles from './register.module.scss';
import { UserAddOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { LOGIN_PATHNAME } from '../router/index';
const { Title } = Typography;



type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
    confirm?: string;
    nickname?: string;
};

const onFinish = (values: FieldType) => {
    console.log('表单数据:', values);
}

const onFinishFailed = (errorInfo: any) => {
    console.log('表单验证失败:', errorInfo);
}

const Register: FC = () => {
     const [form] = Form.useForm();
    return (
        <div className={styles.container}>
            <div  >
                <Space >
                    <Title><UserAddOutlined /></Title>
                    <Title level={2}>注册新用户</Title>
                </Space>
            </div>

            <div>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                      form={form} 
                >
                    <Form.Item<FieldType>
                        label="用户名"
                        name="username"
                        rules={[{ required: true, message: '请输入用户名!' },
                        { min: 4, max: 10, message: '长度必须在4到10个字符之间' },
                        { pattern: /^[a-zA-Z0-9_]+$/, message: '只能包含字母、数字和下划线' }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '请输入密码!' },
                        { min: 6, max: 20, message: '长度必须在6到20个字符之间' }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="确认密码"
                        name="confirm"
                        dependencies={['password']}  // 监听 password 变化
                        rules={[
                            { required: true, message: '请输入确认密码!' },
                            {
                                validator: (rule, value) => {
                                    console.log('确认密码:', rule);
                                    // 获取密码字段的值
                                  const password = form.getFieldValue('password');

                                    if (value !== password) {
                                        return Promise.reject('两次输入的密码不一致！');
                                    }
                                    return Promise.resolve();
                                }
                            }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="昵称"
                        name="nickname"
                        rules={[{ required: true, message: '请输入昵称!' }]}
                    >
                        <Input />
                    </Form.Item>
                  

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                注册
                            </Button>
                            <Link to={LOGIN_PATHNAME}>
                                已有账户？登录
                            </Link>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Register;

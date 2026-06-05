import React, { FC, useEffect } from 'react';
import styles from './login.module.scss';

import { Space, Typography, Form, Input, Checkbox, Button } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { LOGIN_PATHNAME } from '../router/index';

const { Title } = Typography;

type FieldType = {
    username?: string;
    password?: string;
    remember?: boolean;
}

const Login: FC = () => {
    const [form] = Form.useForm();
    
    // 从 localStorage 读取记住密码的状态
    const rememberFromStorage = localStorage.getItem('remember') === 'true';
    const usernameFromStorage = localStorage.getItem('username') || '';
    const passwordFromStorage = localStorage.getItem('password') || '';

    // 组件挂载时设置表单值
    React.useEffect(() => {
        if (rememberFromStorage) {
            form.setFieldsValue({
                username: usernameFromStorage,
                password: passwordFromStorage,
                remember: true
            });
        } else {
            // 不记住密码时，确保表单是空的
            form.setFieldsValue({
                username: '',
                password: '',
                remember: false
            });
        }
    }, []); // 只在挂载时执行一次

    const onFinish = (values: FieldType) => {
        console.log(values);
        if (values.remember) {
            localStorage.setItem('remember', 'true');
            localStorage.setItem('username', values.username || '');
            localStorage.setItem('password', values.password || '');
        } else {
            localStorage.setItem('remember', 'false');
            localStorage.removeItem('username');
            localStorage.removeItem('password');
        }
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log(errorInfo);
    }
    
    return (
        <div className={styles.container}>
            <div>
                <Space>
                    <Title><UserAddOutlined /></Title>
                    <Title level={2}>用户登录</Title>
                </Space>
            </div>

            <div>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input 
                            autoComplete="off"  // 添加这个
                            readOnly={false}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password 
                            autoComplete="new-password"  // 改为 new-password
                        />
                    </Form.Item>

                    <Form.Item 
                        name="remember" 
                        valuePropName="checked" 
                        label={null}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Login;
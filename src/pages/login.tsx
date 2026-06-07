import React, { FC, useEffect } from 'react';
import styles from './login.module.scss';

import { Space, Typography, Form, Input, Checkbox, Button } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { LOGIN_PATHNAME } from '../router/index';
import { useRequest } from 'ahooks';
import { loginService } from '../severice/user';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { setToken } from '../utils/user-token';
import { MANAGE_INDEX_PATHNAME } from '../router/index';

const { Title } = Typography;

type FieldType = {
    username?: string;
    password?: string;
    remember?: boolean;
}


const Login: FC = () => {
    const [form] = Form.useForm();
    const nav = useNavigate();
    const handleLocalData = (values: FieldType) => {
        localStorage.setItem('remember', 'true');
        localStorage.setItem('username', values.username || '');
        localStorage.setItem('password', values.password || '');
    }

    const removeLocalData = () => {
        localStorage.removeItem('remember');
        localStorage.removeItem('username');
        localStorage.removeItem('password');
    }
    const onFinish = (values: FieldType) => {

        loginQuestion(values.username || '', values.password || '');

        if (values.remember) {

            handleLocalData(values);
        } else {

            localStorage.setItem('remember', 'false');
            removeLocalData();
        }
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        message.error("登录失败");
    }



    // 1. 组件挂载时（刷新页面时）从 localStorage 读取记住密码的状态
    // 2. 如果 remember 是 true，则设置表单的 username 和 password 字段值
    // 3. 如果 remember 是 false，则确保表单是空的
    useEffect(() => {
        if (localStorage.getItem('remember') === 'true') {
            form.setFieldsValue({
                username: localStorage.getItem('username'),
                password: localStorage.getItem('password'),
                remember: true,
            })
        }
        else {
            form.setFieldsValue({
                username: '',
                password: '',
                remember: false,
            })
        }
    }, []);

    const { run: loginQuestion } = useRequest(
        async (username, password) => {
            const res = await loginService(username || '', password || '');
            return res;
        },
        {
            manual: true,
            onSuccess: (res) => {
                const { token='' } = res;
                setToken(token);
                message.success("登录成功");
                nav(MANAGE_INDEX_PATHNAME);
            },
        }

    )
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

                    <Form.Item wrapperCol={{ offset: 12, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Login;
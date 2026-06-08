import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { LOGIN_PATHNAME } from '../router';
// import { getUserInfoService } from '../severice/user';
import { useNavigate } from 'react-router-dom';

// import { useRequest } from 'ahooks';
import { message, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
 import { logoutReducer } from '../store/userReducer';
 import { useDispatch } from 'react-redux';
import useGetUserInfo from '../hooks/useGetUserInfo';
const UserInfo: FC = () => {

    //对于已经登录的用户 显示什么？后面再说

    // const { data } = useRequest(getUserInfoService)

    // const { username, nickname } = data || {}

    const {username,nickname}= useGetUserInfo();//从 redux store 中获取用户信息


    const navigate = useNavigate()
    const dispatch = useDispatch();
    const UserInfo = (
        <>
            <span style={{ color: '#cfc2c2' }} >
                <UserOutlined />
                {nickname}
            </span>
            <Button type="link" onClick={logout} >
        退出
      </Button>
        </>
    )

    const Login = <Link to={LOGIN_PATHNAME}>登录</Link>
      function logout(){
        message.success('退出成功')
  
        navigate(LOGIN_PATHNAME)
        localStorage.removeItem('token')
       dispatch(logoutReducer());
      }
    return (
        <div>{username ? UserInfo : Login}</div>
    )

    // eslint-disable-next-line no-unreachable

}

export default UserInfo;

import React,{FC,useState,useEffect} from 'react';
import styles from './Logo.module.scss';
import { Space,Typography } from 'antd';

import { FormOutlined } from '@ant-design/icons';
import { Color } from 'antd/es/color-picker';
import { Link } from 'react-router-dom';
import { HOME_PATHNAME,MANAGE_INDEX_PATHNAME } from '../router/index';
import { useDispatch } from 'react-redux';
import useGetUserInfo from '../hooks/useGetUserInfo';



const {Title} = Typography;
const Logo: FC = () => {
  const {username} = useGetUserInfo();
  const [pathname,setPathname] = useState('/');
  useEffect(()=>{
    setPathname(username ? MANAGE_INDEX_PATHNAME : HOME_PATHNAME);
  },[username])
    return (
      <div className={styles.container}>
     <Link to={pathname}>
         <Space>
       <Title level={1} style={{fontSize: '24px', color: '#f1e8e8'}}> 
        <FormOutlined />
       
       </Title>
        <Title  style={{fontSize: '24px', color: '#f1e8e8'}}>小妍问卷</Title>
       </Space>
     </Link>
      </div>
    )
}
export default Logo;

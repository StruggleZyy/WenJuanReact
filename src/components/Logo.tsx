import React,{FC} from 'react';
import styles from './Logo.module.scss';
import { Space,Typography } from 'antd';

import { FormOutlined } from '@ant-design/icons';
import { Color } from 'antd/es/color-picker';
import { Link } from 'react-router-dom';
const {Title} = Typography;
const Logo: FC = () => {
    return (
      <div className={styles.container}>
     <Link to="/">
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

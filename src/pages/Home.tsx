import React,{FC,useEffect,useState} from 'react';
import 'antd/dist/antd.css';
import { Button,Typography} from 'antd';
import { Link,useNavigate } from 'react-router-dom';
import styles from './Home.module.scss';
// import '../_mock/index'; 
// import axios from 'axios';
import ajax from '../severice/ajax';
import { MANAGE_INDEX_PATHNAME } from '../router/index';
import { ResDataType } from '../severice/ajax';

const {Title,Paragraph} = Typography;
const Home: FC = () => {
    const navigate = useNavigate();

  
// useEffect(() => {
//   fetch('/api/test')
//     .then(res => res.json())
//     .then(data => console.log(data))
//     .catch(err => console.error(err));
// }, []);

// useEffect(() => {
//   axios.get('/api/test')
//     .then(res => res.data)
//     .then(data => console.log(data))
//     .catch(err => console.error(err));
// }, []);

useEffect(() => {
  ajax.get('/api/test')
    .then(res => res.data)
     .then((data) => console.log(data))
     .catch(err => console.error(err));
}, []);
    return (
        <div className={styles.container}>
            <Title level={1}>问卷调查|在线投票</Title>
            <Paragraph>已累计创建问卷 1090 份，发布问卷 100 份，收到答卷 10000 份</Paragraph>
            <Button type="primary" style={{width: '100px',height: '43px'}} onClick={()=>navigate(MANAGE_INDEX_PATHNAME)}>开始使用</Button>
        </div>
    )
}

export default Home;
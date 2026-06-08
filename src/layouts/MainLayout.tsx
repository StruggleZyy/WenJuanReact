import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.scss';
// import 'antd/dist/antd.css';
import UserInfo from '../components/UserInfo';
import useLoadUserData from '../hooks/useLoadUserData';

import {Layout,Spin} from 'antd';
import Logo from '../components/Logo';
const { Header, Footer, Content } = Layout
const MainLayout: FC = () => {
    const {waitingUserData}=useLoadUserData();
    return (
        
            <Layout style={{height:'100vh'}}>
                <Header className={styles.header}> 
                    <div className={styles.left}><Logo /></div>
                    <div className={styles.right}>
                        <UserInfo />
                    </div>
                </Header>
              <Layout className={styles.main}>
                  <Content >
                    {waitingUserData ? <div style={{textAlign:'center'}}><Spin /></div> : <Outlet />}
                    </Content>
              </Layout>
                <Footer className={styles.footer}>  小妍问卷 &copy; 2023 -present. Created by 小妍</Footer>
            </Layout>
   
    )
}

export default MainLayout
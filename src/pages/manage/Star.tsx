import React, { FC } from 'react';
import QuestionCard from '../../components/QuestionCard';
import ListSearch from '../../components/ListSearch';
import styles from './common.module.scss';
import { Typography, Modal, message, Layout, Spin } from 'antd';

import useLoadQuestionListData from '../../hooks/useLoadQuestionListData';

import ListPage from '../../components/ListPage'

type StarType = {
    _id: string
    title: string
    isPublished: boolean
    isStar: boolean
    answerCount: number
    createTime: string
    page: number
    pageSize: number
    total: number
}


const Star: FC = () => {
    const { Title, Text } = Typography;
    const { data: starData, loading: starLoading } = useLoadQuestionListData({ isStar: true });

 
    const { list = [], total = 0 } = starData || {};
    const { Footer } = Layout;
   
    return (
        <>
            <div className={styles.header}>
                <div className={styles.left}>
                    <Title level={1} style={{ margin: 0 }}>收藏问卷</Title>
                </div>
                <div className={styles.right}>
                    <ListSearch />
                </div>
            </div>
            <div className={styles.content}>
                {starLoading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                        <Spin tip="加载中..." />
                    </div>
                ) : list.length === 0 ? (
                    <Text type="secondary">暂无收藏问卷</Text>
                ) : (
                    list.map((item: StarType) => (
                        <div key={item._id}>
                            <QuestionCard
                                id={item._id}
                                title={item.title}
                                isPublished={item.isPublished}
                                isStar={item.isStar}
                                answerCount={item.answerCount}
                                createTime={item.createTime}
                             
                            />
                        </div>
                    ))
                )}
            </div>
            <div className={styles.footer}>
               <ListPage total={total}></ListPage>
            </div>
        </>
    );
};

export default Star;
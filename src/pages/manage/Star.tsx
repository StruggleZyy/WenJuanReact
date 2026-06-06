import React, { FC, useState } from 'react';
import QuestionCard from '../../components/QuestionCard';
import ListSearch from '../../components/ListSearch';
import styles from './common.module.scss';
import { Typography, Modal, message, Layout, Spin } from 'antd';
// import { getQuestionListApi } from '../../severice/question';
import { useRequest } from 'ahooks';
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData';
type StarType = {
    _id: string
    title: string
    isPublished: boolean
    isStar: boolean
    answerCount: number
    createTime: string
}


const Star: FC = () => {
    const { Title, Text } = Typography;

    const { data: starData, loading: starLoading } = useLoadQuestionListData({ isStar: true });
    const { list = [], total = 0 } = starData || {};
    console.log('星标问卷',list);
    
    const { Footer } = Layout;

    // 只显示标星的问卷
    //const starredQuestions = list.filter((item: StarType) => item.isStar);

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
            <div className={styles.footer}>分页</div>
        </>
    );
};

export default Star;
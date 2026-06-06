import React, { FC, useState, useEffect } from 'react';
import QuestionCard from '../../components/QuestionCard';
import ListSearch from '../../components/ListSearch';
import styles from './common.module.scss';
import { useTitle, useRequest } from 'ahooks';
import { Typography, Spin } from 'antd';
import { getQuestionListApi } from '../../severice/question';


const List: FC = () => {
    useTitle('小妍问卷-我的问卷');
    const { data = {}, loading } = useRequest(getQuestionListApi);
    const { list = [], total = 0 } = data || {};
    const { Title, Text } = Typography;
    return (
        <>
            <div className={styles.header}>
                <div className={styles.left} >
                    <Title level={1} style={{ margin: 0 }}>我的问卷</Title>
                </div>
                <div className={styles.right}>
                    <ListSearch />
                </div>
            </div>
            <div className={styles.content}>
                <Spin spinning={loading}>
                    {list.length > 0 && list.map((item: { _id: string; title: string; isPublished: boolean; isStar: boolean; answerCount: number; createTime: string }) => (
                        <div key={item._id}>

                            <QuestionCard id={item._id} title={item.title} isPublished={item.isPublished} isStar={item.isStar} answerCount={item.answerCount} createTime={item.createTime} />
                        </div>
                    ))}

                </Spin>

            </div>
            <div className={styles.footer}>Load More 上滑加载更多...</div>
        </>
    )
}

export default List;
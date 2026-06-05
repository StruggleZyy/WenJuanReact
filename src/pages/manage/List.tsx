import React, { FC, useState, useEffect } from 'react';
import QuestionCard from '../../components/QuestionCard';
import ListSearch from '../../components/ListSearch';
import styles from './common.module.scss';
import { useTitle, useRequest } from 'ahooks';
import { Typography } from 'antd';
import { getQuestionListApi } from '../../severice/question';
import { data } from 'react-router-dom';
// const rawQuestionList = [
//     { _id: 'q1', title: '问卷1', isPublished: true, isStar: true, answerCount: 5, createTime: '2023年08月01日' },
//     { _id: 'q2', title: '问卷2', isPublished: false, isStar: false, answerCount: 0, createTime: '2023年08月02日' },
//     { _id: 'q3', title: '问卷3', isPublished: false, isStar: true, answerCount: 0, createTime: '2023年08月03日' },
//     { _id: 'q4', title: '问卷4', isPublished: true, isStar: false, answerCount: 25, createTime: '2023年08月04日' },
// ]
const List: FC = () => {
    useTitle('小妍问卷-我的问卷');
    const { data = {}, loading } = useRequest(getQuestionListApi);
    const { list = [], total = 0 } = data || {};

    const { Title, Text } = Typography;

    // useEffect(() => {
    //    const getQuestionList = async () => {
    // const res = await getQuestionListApi();
    // // const{list=[],total=0} = res;
    // console.log('生成问卷列表',res);
    // }
    //    getQuestionList();
    // }, [])

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


                {list.length > 0 && list.map((item: { _id: string; title: string; isPublished: boolean; isStar: boolean; answerCount: number; createTime: string }) => (
                    <div key={item._id}>

                        <QuestionCard id={item._id} title={item.title} isPublished={item.isPublished} isStar={item.isStar} answerCount={item.answerCount} createTime={item.createTime} />
                    </div>
                ))}
            </div>
            <div className={styles.footer}>Load More 上滑加载更多...</div>


        </>
    )
}

export default List;

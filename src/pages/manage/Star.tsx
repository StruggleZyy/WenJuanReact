import React, { FC, useState } from 'react';
// import styles from '../../components/QuestionCard.module.scss';

import { Button, Space, Card, Tag, Typography, Modal, message,Layout } from 'antd';
import { EditOutlined, StarOutlined, CopyOutlined, DeleteOutlined, BarChartOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
// import { Footer } from 'antd/es/layout/layout';
import ListSearch from '../../components/ListSearch';
import styles from './common.module.scss';
type StarType = {
    _id: string
    title: string
    isPublished: boolean
    isStar: boolean
    answerCount: number
    createTime: string
}

const rawStarList = [
    { _id: 'q1', title: '问卷1', isPublished: true, isStar: false, answerCount: 5, createTime: '2023年08月01日' },
    { _id: 'q2', title: '问卷2', isPublished: false, isStar: false, answerCount: 0, createTime: '2023年08月02日' },
    { _id: 'q3', title: '问卷3', isPublished: false, isStar: true, answerCount: 0, createTime: '2023年08月03日' },
    { _id: 'q4', title: '问卷4', isPublished: true, isStar: true, answerCount: 25, createTime: '2023年08月04日' },
]

const Star: FC = () => {
    const { Title, Text } = Typography;
    const [StarList, setStarList] = useState<StarType[]>(rawStarList);
    const nav = useNavigate();
const { Footer } = Layout


    // 删除确认
    const handleDelete = (_id: string) => {
        Modal.confirm({
            title: '确认删除吗？',
            okText: '确认',
            okType: 'danger',
            onOk: () => {
                setStarList(prev => prev.filter(item => item._id !== _id));
                message.success('删除成功');
            }
        });
    };

    // 只显示标星的问卷
    const starredQuestions = StarList.filter(item => item.isStar);

    return (
        <div>
            {/* <Title level={2}>收藏问卷</Title> */}

                  <div className={styles.header} style={{ display: 'flex' }}>
                <div className={styles.left} >
                    <Title level={1} style={{ margin: 0 }}>收藏问卷</Title>
                </div>

                <div className={styles.right}>
                    <ListSearch />
                </div>
            </div>
            {starredQuestions.length === 0 ? <Text type="secondary">暂无收藏问卷</Text> : null}
            {starredQuestions.map(item => (
                <Card key={item._id} className={styles.questionCard} hoverable>
                    <div className={styles.top}>
                        <Link to={item.isPublished ? `/question/stat/${item._id}` : `/question/edit/${item._id}`}>
                            <Space>
                                {item.isStar ? <StarOutlined style={{ color: 'red' }} /> : null}
                                <Title level={4} style={{ margin: 0 }}>{item.title}</Title>
                            </Space>
                        </Link>
                        <div className={styles.topRight}>
                            <Space size="middle">
                                <Tag color={item.isPublished ? 'green' : 'default'}>
                                    {item.isPublished ? '已发布' : '未发布'}
                                </Tag>
                                <Text type="secondary">答卷：{item.answerCount}</Text>
                                <Text type="secondary">{item.createTime}</Text>
                            </Space>
                        </div>
                    </div>
                    <div className={styles.bottom}>
                        <Space size="middle">
                            <Button icon={<EditOutlined />} type="text" onClick={() => nav(`/question/edit/${item._id}`)}>编辑问卷</Button>
                            <Button
                                icon={<BarChartOutlined />}
                                type="text"
                                disabled={!item.isPublished}
                                onClick={() => nav(`/question/stat/${item._id}`)}
                            >
                                问卷统计
                            </Button>
                        </Space>
                        <Space size="middle">
                            <Button icon={<StarOutlined />} type="text" >
                                {item.isStar ? '取消标星' : '标星'}
                            </Button>
                            <Button icon={<CopyOutlined />} type="text">复制</Button>
                            <Button icon={<DeleteOutlined />} type="text" danger onClick={() => handleDelete(item._id)}>删除</Button>
                        </Space>
                    </div>
                </Card>
               
            ))}
            <Footer style={{textAlign:'center'}}>分页</Footer>
        </div>
    );
};

export default Star;
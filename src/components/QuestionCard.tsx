import React, { FC, useState } from 'react';
import styles from './QuestionCard.module.scss';

import { Button, Space, Card, Tag, Typography, Modal, message } from 'antd';
import { EditOutlined, StarOutlined, CopyOutlined, DeleteOutlined, BarChartOutlined, StarFilled } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
type QuestionType = {
    _id: string
    title: string
    isPublished: boolean
    isStar: boolean
    answerCount: number
    createTime: string
}


const { Title, Text } = Typography;

const QuestionCard: FC<{ id: string, title: string, isPublished: boolean, isStar: boolean, answerCount: number, createTime: string }> = ({ id, title, isPublished, isStar, answerCount, createTime }) => {
    const nav = useNavigate();
    const [isStarState, setIsStarState] = useState(isStar);

    const handleDelete = () => {
        Modal.confirm({
            title: '确认删除吗？',
            okText: '确认',
            okType: 'danger',
            onOk: () => {
                message.success('删除成功');
            }
        })
    }
    return (
        <Card className={styles.questionCard} hoverable>
            <div className={styles.top}>
                <Link to={isPublished ? `/question/stat/${id}` : `/question/edit/${id}`}>
                    <Space>
                        {isStarState ? <StarOutlined style={{ color: 'red' }} /> : null}
                        <Title level={4} style={{ margin: 0 }}>{title}</Title>
                    </Space>
                </Link>
                <div className={styles.topRight}>
                    <Space size="middle">
                        <Tag color={isPublished ? 'green' : 'default'}>
                            {isPublished ? '已发布' : '未发布'}
                        </Tag>
                        <Text type="secondary">答卷：{answerCount}</Text>
                        <Text type="secondary">{createTime}</Text>
                    </Space>
                </div>
            </div>
            <div className={styles.bottom}>
                <Space size="middle">
                    <Button icon={<EditOutlined />} type="text" onClick={() => nav(`/question/edit/${id}`)}>编辑问卷</Button>
                    <Button
                        icon={<BarChartOutlined />}
                        type="text"
                        disabled={!isPublished}
                        onClick={() => nav(`/question/stat/${id}`)}
                    >
                        问卷统计
                    </Button>
                </Space>
                <Space size="middle">
                    <Button icon={<StarOutlined />} type="text" onClick={() => setIsStarState(!isStarState)}>{isStarState ? '取消标星' : '标星'}</Button>
                    <Button icon={<CopyOutlined />} type="text">复制</Button>
                    <Button icon={<DeleteOutlined />} danger onClick={handleDelete}>确认删除</Button>
                </Space>
            </div>
        </Card>
    )
}



export default QuestionCard;
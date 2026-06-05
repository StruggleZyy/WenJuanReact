import React, { FC, useState, useEffect } from 'react';
import styles from './common.module.scss';
import { Typography, Empty, Table, Tag, Space, Button, Divider, message } from 'antd'
import { useTitle } from 'ahooks';
import Icon, { EditOutlined, StarOutlined, CopyOutlined, DeleteOutlined, BarChartOutlined } from '@ant-design/icons';
import type { Key } from 'react';
import ListSearch from '../../components/ListSearch';
const rawQuestionList = [
    { _id: 'q1', title: '问卷1', isPublished: true, isStar: true, answerCount: 5, createTime: '2023年08月01日' },
    { _id: 'q2', title: '问卷2', isPublished: false, isStar: false, answerCount: 0, createTime: '2023年08月02日' },
    { _id: 'q3', title: '问卷3', isPublished: false, isStar: true, answerCount: 0, createTime: '2023年08月03日' },
    { _id: 'q4', title: '问卷4', isPublished: true, isStar: false, answerCount: 25, createTime: '2023年08月04日' },
]
const { Title, Text } = Typography;

const Trash: FC = () => {
    useTitle('小妍问卷-回收站');
    const [questionList, setQuestionList] = useState(rawQuestionList);
    //记录选中行的ID
    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

    // 记录被删除的问卷（用于恢复）
const [deletedList, setDeletedList] = useState<typeof questionList>([]);
    useEffect(() => {
        // 每次 selectedRowKeys 变化时执行
        console.log('选中状态变了:', selectedRowKeys);
    }, [selectedRowKeys]); // 依赖数组
    //多选配置对象
    const rowSelection = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys: Key[]) => {
            setSelectedRowKeys(newSelectedRowKeys);
        },
    }
    const tableColumns = [
        {
            title: '问卷标题',
            dataIndex: 'title',
            key: 'title',

        },
        {
            title: '是否发布',
            dataIndex: 'isPublished',
            key: 'isPublished',
            // 自定义渲染
            render: (isPublished: boolean) => (
                <Tag color={isPublished ? 'green' : 'default'}>
                    {isPublished ? '已发布' : '未发布'}
                </Tag>
            ),
        },
        {
            title: '是否收藏',
            dataIndex: 'isStar',
            key: 'isStar',
            // 自定义渲染
            render: (isStar: boolean) => (
                isStar ? (
                    <StarOutlined style={{ color: 'red' }} />
                ) : (
                    <Text type="secondary">否</Text>
                )
            ),
        },
        {
            title: '回答数',
            dataIndex: 'answerCount',
            key: 'answerCount',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },
    ];
    const handleDelete = () => {
      const newQuestionList = questionList.filter((item)=>!selectedRowKeys.includes(item._id))
      setQuestionList(newQuestionList)
      message.success('删除成功')
      setSelectedRowKeys([])//删除后清空选中状态
     //下面是为了恢复 的逻辑    
     const recordDeletedData=questionList.filter((item)=>selectedRowKeys.includes(item._id))
   // 2. 记录到 deletedList（保存起来用于恢复）
    setDeletedList(prev => [...prev, ...recordDeletedData]);
    }

const handleRestore = () => {
    // 只恢复不在 questionList 中的数据
    const toRestore = deletedList.filter(deletedItem => 
        !questionList.some(item => item._id === deletedItem._id)
    );
    
    setQuestionList(prev => [...prev, ...toRestore]);
    setDeletedList([]);
    message.success(`已恢复 ${toRestore.length} 份问卷`);
};
    return (
        <div>
            <div className={styles.header} style={{ display: 'flex' }}>
                <div className={styles.left} >
                    <Title level={1} style={{ margin: 0 }}>回收站</Title>
                </div>

                <div className={styles.right}>
                    <ListSearch />
                </div>
            </div>
            <Divider />
            <Space style={{ marginBottom: 16 }}>
                <Button onClick={handleRestore} disabled={deletedList.length === 0}>恢复</Button>
                <Button onClick={handleDelete} danger>永久删除</Button>
            </Space>
            <div className={styles.footer}>
                {questionList.length === 0 && <Empty description="暂无数据" />}

                {questionList.length > 0 ? <Table columns={tableColumns} dataSource={questionList} rowKey={(record) => record._id} pagination={false} rowSelection={rowSelection} /> : <Empty />}

            </div>
        </div>
    )
}

export default Trash;

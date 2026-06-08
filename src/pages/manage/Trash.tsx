import React, { FC, useState, useEffect } from "react";
import styles from "./common.module.scss";
import {
    Typography,
    Empty,
    Table,
    Tag,
    Space,
    Button,
    Divider,
    message,
} from "antd";
import { useTitle } from "ahooks";

import type { Key } from "react";
import ListPage from '../../components/ListPage'
import ListSearch from '../../components/ListSearch'
import type { TableColumnsType, TableProps } from 'antd';
import { Spin } from 'antd';
import { Modal } from 'antd';
import { useRequest } from 'ahooks';
import { getQuestionListApi,DeleteQuestionListApi,updateQuestionService } from '../../severice/question';
import { ExclamationCircleOutlined,StarOutlined } from '@ant-design/icons';
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData';
import { idText } from "typescript";

type DataType = {
    _id: string;
    title: string;
    isPublished: boolean;
    isStar: boolean;
    answerCount: number;
    createTime: string;
    isDeleted: boolean;
    deleteTime: string;
}

const { Title, Text } = Typography;
const { confirm } = Modal;
const Trash: FC = () => {
    useTitle("小妍问卷-回收站");
    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
    const { data = {}, loading, refresh } = useLoadQuestionListData({ isDeleted: true });    
    const { run: deleteQuestion } = useRequest( async (ids: string[]) => await DeleteQuestionListApi(ids),{
        manual: true,  // 手动触发
        // debounceWait:500,//防抖时间
        onSuccess(res: any) {
            message.success("删除成功");
           
        },
    });


    function del() {
        confirm({
            title: "彻底删除该问卷吗？",
            okText: "确认",
            content: "删除后不可恢复",
        
            onOk: () => {
                // 确认删除选中问卷

                deleteQuestion(selectedRowKeys);
                       console.log('删除成功', selectedRowKeys);
                       refresh();
            },
        });
    }


   // 恢复功能
const { run: restoreQuestion } = useRequest( 
    async (ids: string[]) => {
        for (const id of ids) {
            await updateQuestionService(id, { isDeleted: false });  // ✅ 传两个参数
        }
    },
    { manual: true ,onSuccess(res: any) {
        message.success("恢复成功");
        refresh();
    },
    debounceWait:500,
    }
);
function handleRestore() {
    restoreQuestion(selectedRowKeys);
}

    // 多层默认值保护，防止 API 返回异常数据
    const questionList: DataType[] = ((data as any)?.list || []) as DataType[];
    console.log('回收站数据', questionList);
    const total = (data as any)?.total || 0;
    const tableColumns = [
        {
            title: "问卷标题",
            dataIndex: "title",
            key: "title",
            
        },
        {
            title: "是否发布",
            dataIndex: "isPublished",
            key: "isPublished",
            // 自定义渲染
            render: (isPublished: boolean) => (
                <Tag color={isPublished ? "green" : "default"}>
                    {isPublished ? "已发布" : "未发布"}
                </Tag>
            ),
        },
        {
            title: "是否收藏",
            dataIndex: "isStar",
            key: "isStar",
            // 自定义渲染
            render: (isStar: boolean) =>
                isStar ? (
                    <StarOutlined style={{ color: "red" }} />
                ) : (
                    <Text type="secondary">否</Text>
                ),
        },
        {
            title: "回答数",
            dataIndex: "answerCount",
            key: "answerCount",
        },
        {
            title: "创建时间",
            dataIndex: "createTime",
            key: "createTime",
        },
        {
            id:"_id",
            title:"问卷ID",
            dataIndex:"_id",
            key:"_id",
        }
        // {
        //     title: "是否删除",
        //     dataIndex: "isDeleted",
        //     key: "isDeleted",
        //     render: (isDeleted: boolean) => (
        //         <Tag color={isDeleted ? "green" : "default"}>
        //             {isDeleted ? "已删除" : "未删除"}
        //         </Tag>
        //     ),
        // }
    ];

    return (
        <div>
            <div className={styles.header} style={{ display: "flex" }}>
                <div className={styles.left}>
                    <Title level={1} style={{ margin: 0 }}>
                        回收站
                    </Title>
                </div>

                <div className={styles.right}>
                    <ListSearch />
                </div>
            </div>
            <Divider />
            <Space style={{ marginBottom: 16 }}>
                <Button type="primary" disabled={selectedRowKeys.length === 0} onClick={handleRestore}>恢复</Button>
                <Button danger disabled={selectedRowKeys.length === 0} onClick={del}>永久删除</Button>
            </Space>
            <div className={styles.content}>
               
                <Spin spinning={loading} tip="加载中...">
                    {!loading && questionList.length === 0 && <Empty description="暂无数据" />}

                    {questionList.length > 0 && (
                        <Table
                            columns={tableColumns}
                            dataSource={questionList.map((item) => ({
                                ...item,
                                key: item._id,
                            }))}
                            rowKey={(record) => record._id}
                            pagination={false}
                            rowSelection={{
                                type: 'checkbox', onChange: (selectedRowKeys) => {
                                    setSelectedRowKeys(selectedRowKeys as string[]);
                                }
                            }}
                        />
                    )}

                </Spin>

            </div>

             <div className={styles.footer}>
                {!loading  && <ListPage total={total} />}
             </div>
        </div>
    );
};

export default Trash;
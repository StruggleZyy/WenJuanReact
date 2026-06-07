import React, { FC, useState, useEffect } from "react";
import styles from "./QuestionCard.module.scss";

import { Button, Space, Card, Tag, Typography, Modal, message } from "antd";
import {
    EditOutlined,
    StarOutlined,
    CopyOutlined,
    DeleteOutlined,
    BarChartOutlined,
    StarFilled,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { click } from "@testing-library/user-event/dist/click";
import { DuplicateListApi } from "../severice/question";
import { useRequest } from "ahooks";
import { UpdateQuestionListApi } from "../severice/question";

type QuestionType = {
    _id: string;
    title: string;
    isPublished: boolean;
    isStar: boolean;
    answerCount: number;
    createTime: string;
};

const { Title, Text } = Typography;

const QuestionCard: FC<{
    id: string;
    title: string;
    isPublished: boolean;
    isStar: boolean;
    answerCount: number;
    createTime: string;

}> = ({ id, title, isPublished, isStar, answerCount, createTime }) => {
    const nav = useNavigate();
    const [isStarState, setIsStarState] = useState(isStar);


    //   const handleDuplicate  = async () => {
    //     console.log("旧 ID:", id);
    //     const res = await DuplicateListApi(id);
    //     console.log("新 ID:", res.id);
    //     nav(`/question/edit/${res.id}`);
    //     message.success("复制成功");
    //   };

    const { loading: duplicateLoading, run: duplicate } = useRequest(
        async () => await DuplicateListApi(id),
        {
            manual: true,  // 手动触发
            onSuccess(res: any) {
                console.log("新 ID:", res.id);
                nav(`/question/edit/${res.id}`);
                message.success("复制成功");
            },
        }

    );

    // 删除
    const [isDeleteState, setIsDeleteState] = useState(false);
    const handleDuplicate = () => {
        console.log("旧 ID:", id);
        duplicate();  // 调用 run 函数
    };

    const { run: deleteQuestion } = useRequest(
        async () => await UpdateQuestionListApi(id, { isDeleted: true }),
        {
            manual: true,  // 手动触发
            onSuccess(res: any) {
                message.success("删除成功");
            },
        }
    );

    const handleDelete = () => {
        Modal.confirm({
            title: "确认删除吗？",
            okText: "确认",
            okType: "danger",
            onOk: () => {
                setIsDeleteState(true); // ✅ 标记为已删除
                deleteQuestion(); // 调用删除 API
            },
        });
    };

    //3. 如果已删除，组件不渲染（返回 null）
    if (isDeleteState) {
        return null;
    }
    return (
        <Card className={styles.questionCard} hoverable>
            <div className={styles.top}>
                <Link
                    to={isPublished ? `/question/stat/${id}` : `/question/edit/${id}`}
                >
                    <Space>
                        {isStarState ? <StarOutlined style={{ color: "red" }} /> : null}
                        <Title level={4} style={{ margin: 0 }}>
                            {title}
                        </Title>
                        {id}
                    </Space>
                </Link>
                <div className={styles.topRight}>
                    <Space size="middle">
                        <Tag color={isPublished ? "green" : "default"}>
                            {isPublished ? "已发布" : "未发布"}
                        </Tag>
                        <Text type="secondary">答卷：{answerCount}</Text>
                        <Text type="secondary">{createTime}</Text>
                    </Space>
                </div>
            </div>
            <div className={styles.bottom}>
                <Space size="middle">
                    <Button
                        icon={<EditOutlined />}
                        type="text"
                        onClick={() => nav(`/question/edit/${id}`)}
                    >
                        编辑问卷
                    </Button>
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
                    <Button
                        icon={<StarOutlined />}
                        type="text"
                        onClick={() => setIsStarState(!isStarState)}
                    >
                        {isStarState ? "取消标星" : "标星"}
                    </Button>
                    <Button
                        icon={<CopyOutlined />}
                        onClick={handleDuplicate}
                        type="text"
                    >
                        复制
                    </Button>
                    <Button icon={<DeleteOutlined />} danger onClick={handleDelete}>
                        确认删除
                    </Button>
                </Space>
            </div>
        </Card>
    );
};

export default QuestionCard;

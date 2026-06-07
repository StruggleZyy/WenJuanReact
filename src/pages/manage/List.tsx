import React, { FC, useState, useEffect, useRef } from "react";
import QuestionCard from "../../components/QuestionCard";
import ListSearch from "../../components/ListSearch";
import styles from "./common.module.scss";
import { useTitle, useRequest, useDebounceFn } from "ahooks";
import { Typography, Spin } from "antd";
import { getQuestionListApi } from "../../severice/question";
import { useSearchParams } from "react-router-dom";
import { LIST_SEARCH_PARAM_KEY, LIST_PAGE_SIZE } from '../../constant'

const List: FC = () => {
    useTitle("小妍问卷-我的问卷");
    const [page, setPage] = useState(1);
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);

    const [searchParams, setSearchParams] = useSearchParams();
    const { run: load, loading } = useRequest(
        async () => {
            const data = await getQuestionListApi({
                keyword: searchParams.get(LIST_SEARCH_PARAM_KEY) || "",
                page,
                pageSize: LIST_PAGE_SIZE,
            });
            return data;

        }, {
            manual: true, onSuccess(result) {
                const { list: l = [], total = 0 } = result
                setList(list.concat(l));//累计
                setTotal(total);
                setPage(page + 1);
            }
    }
    );

    const { Title, Text } = Typography;

    const haveMoreData = total > list.length;
    const containerRef = useRef<HTMLDivElement>(null);
    const { run: tryLoaMore } = useDebounceFn(
        () => {
            const elem = containerRef.current;
            if (!elem) {
                return;
            }
            const demRect = elem.getBoundingClientRect();
            if (demRect == null) return
            const { bottom } = demRect;
            if (bottom <= document.documentElement.clientHeight) {
                console.log("tryLoadMore...")
                load();
            }


        },
        { wait: 1000 },
    );

// function handleDuplicateList(newId: string) {

//     setNewId(newId);
//     console.log('接收子组件的数据',newId);
//      setList([]);   // 清空旧列表
//     setPage(1);    // 重置页码为1
//     load();        // 重新加载
// }
    //1.当页面加载 或者url参数（keyword）变化时，触发加载
    useEffect(() => {
        tryLoaMore();
    }, [searchParams]);

    //2.当滚动到页面底部时，触发加载更多
    useEffect(() => {
        if (haveMoreData) {
            window.addEventListener("scroll", tryLoaMore);
        }
        return () => {
            window.removeEventListener("scroll", tryLoaMore);
        };
    }, [searchParams, haveMoreData]);
    return (
        <>
            <div className={styles.header}>
                <div className={styles.left}>
                    <Title level={1} style={{ margin: 0 }}>
                        我的问卷
                    </Title>
                </div>
                <div className={styles.right}>
                    <ListSearch />
                </div>
            </div>
            <div className={styles.content} >
                <Spin spinning={loading}>
                    {list.length > 0 &&
                        list.map(
                            (item: {
                                _id: string;
                                title: string;
                                isPublished: boolean;
                                isStar: boolean;
                                answerCount: number;
                                createTime: string;
                            }) => (
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
                            ),
                        )}
                </Spin>
            </div>
            <div className={styles.footer} ref={containerRef}>Load More 上滑加载更多...</div>
        </>
    );
};

export default List;

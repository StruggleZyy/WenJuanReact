// 封装分页组件
import React, { FC, useState, useEffect } from 'react';
import { Pagination } from 'antd';
import type { PaginationProps } from 'antd';
import { useSearchParams,useNavigate,useLocation } from 'react-router-dom'
import useLoadQuestionListData from '../../src/hooks/useLoadQuestionListData';
import {   LIST_PAGE_SIZE,
    LIST_PAGE_PARAM_KEY,
    LIST_PAGE_SIZE_PARAM_KEY,} from '../constant/index';//默认的pageSize
type PropsType={
    total:number
  
}

const ListPage: FC<PropsType> = (props:PropsType) => {
    const {total}=props
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE);

    //从 url 参数中找到 page pagesize ，并且同步到 Pagination 组件中
    const [searchParams] = useSearchParams();
  
    useEffect(() => {
        const page = searchParams.get(LIST_PAGE_PARAM_KEY);
        const pageSize = searchParams.get(LIST_PAGE_SIZE_PARAM_KEY);
        if (page) {
            setCurrent(Number(page));
        }
        if (pageSize) {
            setPageSize(Number(pageSize));
        }
    }, [searchParams])
    //当page pageSize 变化时，更新 url 参数
    const nav=useNavigate();

    const {pathname}=useLocation();
    // console.log('pathname',pathname);
    function handlePageChange(page:number,pageSize:number){
        searchParams.set(LIST_PAGE_PARAM_KEY,page.toString());
        searchParams.set(LIST_PAGE_SIZE_PARAM_KEY,pageSize.toString());

       nav({
        pathname,
        search:searchParams.toString()
       })
       
    }
    return (
        <Pagination total={total} current={current} pageSize={pageSize} onChange={handlePageChange} />
    )
}

export default ListPage;
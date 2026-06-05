import react, { FC, ChangeEvent } from 'react'
import { Input } from 'antd'
import { useState, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PARAM_KEY } from '../constant/index'

const { Search } = Input;

const ListSearch: FC = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [searchResult, setSearchResult] = useState<any>('');

    const handeleChage = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchResult(e.target.value);
        console.log('输入内容:', e.target.value);
    }

    const onSearch = (value: string) => {
        setSearchResult(value);
        // 将搜索参数添加到 URL 中
        navigate({
            pathname,
            search: `${LIST_SEARCH_PARAM_KEY}=${value}`,
        });
    }

    const [searchParams] = useSearchParams();
    useEffect(() => {
        const searchValue = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';
        setSearchResult(searchValue);
    }, [searchParams]);
    return (
        <Search placeholder="请输入搜索内容" style={{ width: 180 }} onSearch={onSearch} onChange={handeleChage} allowClear={true} />
    )
}
export default ListSearch

import React, { FC } from 'react';  // React 应优先导入
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { MANAGE_INDEX_PATHNAME } from '../router';
const NotFound: FC = () => {
    const navigate = useNavigate();
    return (
        <div style={{textAlign: 'center'}}>
            <Result 
            status="404" 
            title="404 Not Found" 
            subTitle="抱歉，您访问的页面不存在"
            extra={<Button type="primary" onClick={() => navigate(MANAGE_INDEX_PATHNAME)}>返回首页</Button>}    
        />
       
        </div>
    );
};

export default NotFound;
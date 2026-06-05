import React, { FC, useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import styles from './MangeLayout.module.scss';
import 'antd/dist/antd.css';
import { Button, Space, Divider } from 'antd';
import { PlusOutlined, SettingOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons';
import { CreateQuestionListApi } from '../severice/question';
import useLoadQuestionData from '../hooks/useLoadQuestionData';
import { useRequest } from 'ahooks';
import { message } from 'antd';

const ManageLayout: FC = () => {
    const nav = useNavigate();
    const { pathname } = useLocation();
   
    const { loading, data, error, run } = useRequest(CreateQuestionListApi, {
        manual: true,
        onSuccess: (res) => {
            const { id } = res.data || {};
            if(id){
                nav(`/question/edit/${id}`);
                message.success('创建问卷成功');
            }
        
        },
    });
    // const [loading, setLoading] = useState(false);
    // async function handelCreateQuestion() {
    //     setLoading(true);
    //     const res = await CreateQuestionListApi();

    //     console.log('创建问卷res', res);
    //     const { id } = res.data || {};
    //     if (id) {

    //         nav(`/question/edit/${id}`);
    //         message.success('创建问卷成功');
    //     }
    //     setLoading(false);
    // }
    // 重构为下面的



    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <Space direction='vertical'>
                    <Button type='primary' size='large' icon={<PlusOutlined />} onClick={() => run()} disabled={loading}>
                        创建问卷
                    </Button>
                    <Divider style={{ borderTop: 'transparent' }} />
                    <Button type={pathname.startsWith('/manage/list') ? 'default' : 'text'} size='large' onClick={() => nav('/manage/list')} icon={<BarsOutlined />}>
                        我的问卷
                    </Button>
                    <Divider style={{ borderTop: 'transparent' }} />
                    <Button type={pathname.startsWith('/manage/star') ? 'default' : 'text'} size='large' onClick={() => nav('/manage/star')} icon={<StarOutlined />}>
                        收藏问卷
                    </Button>
                    <Divider style={{ borderTop: 'transparent' }} />
                    <Button type={pathname.startsWith('/manage/trash') ? 'default' : 'text'} size='large' onClick={() => nav('/manage/trash')} icon={<DeleteOutlined />}>
                        回收站
                    </Button>
                </Space>
            </div>
            <div className={styles.right}>
                右
                <Outlet />
            </div>


        </div>
    )
}

export default ManageLayout
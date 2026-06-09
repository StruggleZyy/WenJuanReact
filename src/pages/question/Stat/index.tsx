import React,{FC} from 'react';

import useLoadQuestionData from '../../../hooks/useLoadQuestionData';
const Stat: FC = () => {
    const {loading,error}= useLoadQuestionData();

    return (
        <div>
            <h1>问卷统计</h1>
            {/* {loading ? <div>加载中...</div> : <div>{JSON.stringify(data || {})} </div>} */}
        </div>
    )
}

export default Stat;

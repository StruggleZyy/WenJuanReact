import React,{FC} from 'react'

import { componentConfGroup } from "../../../components/QuestionComponents/index";
import { Typography } from 'antd';
import {ComponentConfigType} from "../../../components/QuestionComponents/index";
import styles from "./ComponentLib.module.scss";

    const { Title } = Typography
    function getComponent(c:ComponentConfigType){
        const { title,type,Component } = c;
        return (
            <div className={styles.wrapper}>
                <div className={styles.component}>
                    <Component  />
                </div>
            </div>
        )
    }
const ComponentLib: FC = () => {
  return (
    <div>
        {componentConfGroup.map((item,index) => {
       
            const { groupId, groupName, components } = item;
            console.log('components',components);
            return (
                <div key={groupId}>
                    <Title level={3} style={{fontSize:16,marginTop:index>0?'20px':0,color:'#741c1c'}}>{groupName}</Title>
                      {
                        
                      }
          <div>{components.map(c=> getComponent(c))}</div>
                </div>
            );
        })}
    </div>
  )
}

export default ComponentLib
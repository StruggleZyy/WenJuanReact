import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { componentConfGroup } from "../../../components/QuestionComponents/index";
import { Typography } from "antd";
import { ComponentConfigType } from "../../../components/QuestionComponents/index";
import { addComponent} from "../../../store/componentsReducer";

import styles from "./ComponentLib.module.scss";

import { nanoid } from "nanoid";
const { Title } = Typography;

function ComponentItem(c: ComponentConfigType) {
    const { title, type, Component, defaultProps } = c;
    const dispatch = useDispatch();
    function handleClick(event: React.MouseEvent) {

        dispatch(addComponent({
            fe_id: nanoid(),
            title,
            type,
            props: { ...defaultProps }, // 创建 defaultProps 的浅拷贝，避免引用共享
        }));
    };
    
    return (
        <div key={type} className={styles.wrapper}>
            <div className={styles.component} onClick={handleClick}>
                <Component />
            </div>
        </div>
    );
}
const ComponentLib: FC = () => {

    return (
        <div>
            {componentConfGroup.map((item, index) => {
                const { groupId, groupName, components } = item;
                // console.log("components", components);
                return (
                    <div key={groupId}>
                        <Title
                            level={3}
                            style={{
                                fontSize: 16,
                                marginTop: index > 0 ? "20px" : 0,
                                color: "#741c1c",
                            }}
                        >
                            {groupName}
                        </Title>
                        { }
                        <div>{components.map((c) => ComponentItem(c))}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default ComponentLib;
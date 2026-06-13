import React, { FC } from 'react'
import { Tabs } from 'antd'
import { useState, useEffect } from 'react'
// import { TAB_KEYS } from '@/constants'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import ComponentProp from './ComponentProp'
import PageSetting from './PageSetting'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'

// TS 枚举
enum TAB_KEYS {
  PROP_KEY = 'prop',
  SETTING_KEY = 'setting',
}
const RightPanel: FC = () => {
const { selectedId } = useGetComponentInfo()

const [activeKey, setActiveKey] = useState(TAB_KEYS.PROP_KEY)

useEffect(() => {
   if(selectedId) setActiveKey(TAB_KEYS.PROP_KEY)//如果选中了组件 就在属性tabs
   else setActiveKey(TAB_KEYS.SETTING_KEY)//如果没有选中组件 就在页面设置tabs
}, [selectedId])

  const tabsItems = [
    {
      key: TAB_KEYS.PROP_KEY,
     
           label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
   children: <ComponentProp />,
    },
    {
  key: TAB_KEYS.SETTING_KEY,
  
           label: (
        <span>
          <SettingOutlined />
          页面设置
        </span>
      ),
     children: <PageSetting />,
    },
  ]

  return (
    <Tabs items={tabsItems} activeKey={activeKey}></Tabs>
  )
}

export default RightPanel

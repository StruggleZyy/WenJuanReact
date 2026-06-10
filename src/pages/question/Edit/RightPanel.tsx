import React, { FC } from 'react'
import { Tabs } from 'antd'
import { useState, useEffect } from 'react'
// import { TAB_KEYS } from '@/constants'
// import useGetComponentInfo from '@/hooks/useGetComponentInfo'
import ComponentProp from './ComponentProp'
import PageSetting from './PageSetting'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'

const RightPanel: FC = () => {
//   const [activeKey, setActiveKey] = useState(TAB_KEYS.PROP_KEY)
//   const { selectedId } = useGetComponentInfo()

//   useEffect(() => {
//     if (selectedId) setActiveKey(TAB_KEYS.PROP_KEY)
//     else setActiveKey(TAB_KEYS.SETTING_KEY)
//   }, [selectedId])
  
  const tabsItems = [
    {
    //   key: TAB_KEYS.PROP_KEY,
      key: 'prop',
           label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
   children: <ComponentProp />,
    },
    {
    //   key: TAB_KEYS.SETTING_KEY,
      key: 'setting',
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
    <Tabs items={tabsItems} defaultActiveKey="prop"></Tabs>
  )
}

export default RightPanel

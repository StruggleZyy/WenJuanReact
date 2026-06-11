import React, { FC, useState, ChangeEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button, Typography, Space, Input, message } from 'antd'
import { LeftOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons'
import { useRequest, useKeyPress, useDebounceEffect } from 'ahooks'
import EditToolbar from './EditToolbar'
import styles from './EditHeader.module.scss'

const { Title } = Typography

const EditHeader: FC = () => {
  const nav = useNavigate()

//   const { title } = useGetPageInfo()
  const dispatch = useDispatch()

   return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            {/* <TitleElem /> */}
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolbar />
        </div>
        <div className={styles.right}>
          <Space>
            <Button type="primary" icon={<EditOutlined />}>保存</Button>
            {/* <SaveButton />
            <PublishButton /> */}
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
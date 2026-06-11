import React, { FC } from 'react'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType, ComponentPropsType } from '../../../components/QuestionComponents'
import { changeComponentProps } from '../../../store/componentsReducer'
import { useDispatch } from 'react-redux'


const NoProp: FC = () => {
   
  return <div style={{ textAlign: 'center' }}>未选中组件</div>
}

const ComponentProp: FC = () => {
         const dispatch = useDispatch()
  const { selectedComponent } = useGetComponentInfo()
  if (!selectedComponent) return <NoProp />

  const { type, props = {},isLocked,isHidden  } = selectedComponent
  const componentConf = getComponentConfByType(type)
  if (!componentConf) return <NoProp />


  // ✅ 渲染子组件 PropComponent
  const { PropComponent } = componentConf

  // ✅ 定义回调函数，传递给子组件
  function ChangeProps(newProps: ComponentPropsType) {

    console.log('newProps', newProps)
    if (selectedComponent == null) return
    const { fe_id } = selectedComponent
    dispatch(changeComponentProps({ fe_id, props: newProps }))
  }

  // ✅ PropComponent 是 ComponentProp 的子组件
  return <PropComponent {...props} onChange={ChangeProps} disabled={isLocked||isHidden} />
}
export default ComponentProp
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import componentsReducer,{ComponentsStateType} from './componentsReducer';
import { UserStateType } from './userReducer';
import pageInfoReducer,{PageInfoType} from './pageInfoReducer';

export type StateType={
    user:UserStateType, //user 模块的状态
    components:ComponentsStateType, //components 模块的状态
}
export default configureStore({
    
  reducer: {
    //分模块
    user:userReducer,  // user 模块由 userReducer 管理
    //问卷的后续再添加
    components:componentsReducer,// components 模块由 componentsReducer 管理
    pageInfo: pageInfoReducer,// pageInfo 模块由 pageInfoReducer 管理
  },
});



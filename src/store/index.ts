import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import { UserStateType } from './userReducer';
export type StateType={
    user:UserStateType,
}
export default configureStore({
    
  reducer: {
    //分模块
    user:userReducer,
    //问卷的后续再添加
  },
});



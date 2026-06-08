import { createSlice ,PayloadAction} from '@reduxjs/toolkit'; 

export type UserStateType={
    username:string,
    nickname:string,

}

const INIT_STATE:UserStateType={
    username:'',
    nickname:'',
}
const userSlice = createSlice({
    name:'user',
    initialState:INIT_STATE,
    reducers:{
       loginReducer:(state:UserStateType,action:PayloadAction<UserStateType>)=>{
        // state.username = action.payload.username;
        // state.nickname = action.payload.nickname;
        return action.payload;
       },
       logoutReducer:()=>{
        return INIT_STATE;
       }
    }
})

export const { loginReducer,logoutReducer } = userSlice.actions;

export default userSlice.reducer;
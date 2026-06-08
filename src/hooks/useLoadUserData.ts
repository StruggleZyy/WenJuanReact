import { useState, useEffect } from "react";
import { getUserInfoService } from "../severice/user";
import { useGetState, useRequest } from "ahooks";
import { useDispatch } from "react-redux";
import useGetUserInfo from "./useGetUserInfo";
import { loginReducer } from "../store/userReducer";

function useLoadUserData() {
  const [waitingUserData, setWaitingUserData] = useState(true);
  const dispatch = useDispatch();
  const { run, data } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess: (res) => {
      const { username, nickname } = res || {};
      dispatch(loginReducer({ username, nickname }));
    },
    onFinally() {
      setWaitingUserData(false);
    },
  });

  const { username } = useGetUserInfo();
  useEffect(() => {
    if (username) {
      setWaitingUserData(false); //如果 redux store 已经存在用户信息，就不用重新加载了
      return;
    }
    run(); //如果没有用户信息，就调用接口加载用户信息
  },[]);
  return { waitingUserData };
}

export default useLoadUserData;

import { useSelector } from "react-redux";
import { StateType } from "../store/index";
function useGetComponentInfo() {
  const components = useSelector((state: StateType) => state.components);
  const { componentList = [], selectedId = "" } = components;
  //获取选中的组件
  const selectedComponent = componentList.find((c) => c.fe_id === selectedId);
  return { componentList, selectedId, selectedComponent };
}

export default useGetComponentInfo;
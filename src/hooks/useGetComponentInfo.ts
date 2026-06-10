import { useSelector } from 'react-redux';
import { StateType } from '../store/index';
function useGetComponentInfo(){
    const components = useSelector((state:StateType)=>state.components);
    const {componentList=[],selectedId=''} = components;
    return {componentList,selectedId};
}   

export default useGetComponentInfo;
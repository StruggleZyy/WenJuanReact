import { useSelector } from 'react-redux';
import { StateType } from '../store/index';
function useGetComponentInfo(){
    const components = useSelector((state:StateType)=>state.components);
    const {componentList=[]} = components;
    return {componentList};
}   

export default useGetComponentInfo;
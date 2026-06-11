import { ComponentInfoType, ComponentsStateType } from "./index";

/**
 * 删除/隐藏组件后，获取新的选中组件ID
 * @param componentList - 组件列表
 * @param removedId - 被删除/隐藏组件的 fe_id
 * @returns 新的选中组件ID，如果列表为空返回空字符串
 */
export const getNewSelectedId = (
  componentList: ComponentInfoType[],
  removedId: string
): string => {
  const visibleComponentList = componentList.filter(c => !c.isHidden);
  // 如果列表为空，返回空字符串
  if (visibleComponentList.length === 0) {
    return "";
  }

  // 找到被删除/隐藏组件在可见列表中的索引
  const removedIndex = visibleComponentList.findIndex(c => c.fe_id === removedId);

  // 如果没找到，选中第一个可见组件
  if (removedIndex < 0) {
    return visibleComponentList[0].fe_id;
  }

  // 如果删除的不是最后一条，选中当前位置的新元素（下一条）
  // 如果删除的是最后一条，选中前一条
  const newSelectedIndex = removedIndex < visibleComponentList.length - 1 
    ? removedIndex 
    : removedIndex - 1;

  return visibleComponentList[newSelectedIndex].fe_id;
};

/**
 * 插入新组件
 * @param draft state draft
 * @param newComponent 新组件
 */
export function insertNewComponent(draft: ComponentsStateType, newComponent: ComponentInfoType) {
  const { selectedId, componentList } = draft
  const index = componentList.findIndex(c => c.fe_id === selectedId)

  if (index < 0) {
    // 未选中任何组件
    draft.componentList.push(newComponent)
  } else {
    // 选中了组件，插入到 index 后面
    draft.componentList.splice(index + 1, 0, newComponent)
  }

  draft.selectedId = newComponent.fe_id
}

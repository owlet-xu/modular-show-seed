/**
 * 递归获取树形组件数据
 * @param childList 树形结构数据集合
 * @param parentId  当前节点的parentID值
 * 注意：resStructureId是对应的ID   parentId是对应parentID
 */
export const setTreeData = (childList: any, parentId: string) => {
  const currentNodeChild: any = [];
  // tslint:disable-next-line
  for (let i in childList) {
    if (childList[i].ParentId.toString() === parentId) {
      const currentNode: any = new Object();
      currentNode.id = childList[i].Id;
      currentNode.nodeId = childList[i].NodeId;
      currentNode.label = childList[i].NodeName;
      const temp1: any = [];
      childList.forEach((e: any) => {
        if (e.ParentId.toString() !== parentId) {
          temp1.push(e);
        }
      });
      currentNode.children = setTreeData(temp1, currentNode.id);
      currentNodeChild.push(currentNode);
    }
  }
  return currentNodeChild;
};

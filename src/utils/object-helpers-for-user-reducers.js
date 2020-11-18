export const updateObjectInArray = (items, itemId, objPropName, newObjProps) => {
    return items.map(u => {
        if (u[objPropName] === itemId) {
            return { ...u, ...newObjProps }      //we want change only following status, nothing more by clicking on button follow, un follow
        }
        return u;
    })
}
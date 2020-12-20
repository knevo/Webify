import { getRandomId } from '../services/utils';

export function isLegalPlacement(compsMap, parentId, cmpData) {
    const parentRole = compsMap[parentId].role,
        childRole = cmpData.role;

    if (!parentId || _isChildless(parentRole)) return false;

    const unAllowedRootChildren = ['text', 'img', 'button', 'input'];

    if ((parentRole === '_root' && unAllowedRootChildren.includes(childRole))) return false;
    return true;
}

export function cmpRemove(cmpMap, cmpId) {
    const cmp = cmpMap[cmpId];
    if (!_isChildless(cmp.role)) {
        cmp.children.forEach(child => {
            cmpRemove(cmpMap, child.cmpId);
        });
    }
    delete cmpMap[cmpId];
}

export function replaceParents(cmps, oldParentId, newParentId, cmp, targetId, diff) {
    const currentParentChildren = cmps[oldParentId]
        .children.filter(child => child.cmpId !== cmp._id);

    cmps[oldParentId] = {
        ...cmps[oldParentId],
        children: currentParentChildren
    };
    cmps[newParentId] = {
        ...cmps[newParentId],
        children: setCmpDropPos(cmps[newParentId].children, targetId, { cmpId: cmp._id }, diff)
    };

    return cmps;
}

export function addRecursiveCmps(cmpData, cmpsMap) {
    if (!Array.isArray(cmpData.children)) return { ...cmpData };
    let newCmp = { ...cmpData, _id: 'el-' + getRandomId(4) };

    cmpsMap[newCmp._id] = newCmp;
    newCmp.children = newCmp.children.map(child => {
        return typeof child !== 'object' ? child :
            (child.role ? addRecursiveCmps(child, cmpsMap) :
                addRecursiveCmps(cmpsMap[child.cmpId], cmpsMap)); // no role ? then has cmpId - for cloning
    })
    return { cmpId: newCmp._id };
}

function _isChildless(cmpRole) {
    const childlessCmpsRoles = ['text', 'img', 'button', 'video', 'map', 'input'];
    if (childlessCmpsRoles.includes(cmpRole)) return true;
    return false;
}

export function setCmpDropPos(parentCmpChildren, targetId, newCmpId, diff) {
    parentCmpChildren = parentCmpChildren.slice();
    if (targetId === '_rootElement' || (!diff && !targetId)) diff = 1

    if (targetId) {
        const targetIdx = parentCmpChildren.findIndex(childCmp => childCmp.cmpId === targetId)
        if (targetIdx !== -1) {
            if (diff === -1 && targetIdx === 0) diff = 0
            parentCmpChildren.splice(targetIdx + diff, 0, newCmpId)
            return parentCmpChildren;
        }
    }
    diff === 1 ? parentCmpChildren.push(newCmpId) : parentCmpChildren.unshift(newCmpId);
    return parentCmpChildren;
}

export function addToHistory(state) {
    const { cmps, selectedCmpId, history } = state;
    let newHistory = history.slice();

    if (newHistory.length === 15) newHistory.shift();
    newHistory.push({ cmps: { ...cmps }, selectedCmpId });

    return newHistory;
}

export function verifyNewIdMethod(draft) {

    let draftCopy = JSON.parse(JSON.stringify(draft));
    let cmps = draftCopy.cmps;

    cmps['_rootElement'].children = cmps['_rootElement'].children.map(child => {
        if (typeof child === 'object' && child.cmpId) {
            if (!child.cmpId.includes('el-')) {
                child.cmpId = 'el-' + child.cmpId;
            }
        }
        return child;
    });

    for (let cmpId in cmps) {

        if (cmpId === '_rootElement') continue;


        let newId = cmpId;

        if (!newId.includes('el-')) {
            newId = 'el-' + newId;
        }

        cmps[newId] = { ...cmps[cmpId], _id: newId };

        if (Array.isArray(cmps[newId].children)) {
            cmps[newId].children = cmps[newId].children.map(child => {
                if (typeof child === 'object') {
                    if (child.cmpId && !child.cmpId.includes('el-')) {
                        child.cmpId = 'el-' + child.cmpId;
                    } else if (child.role) {
                        delete child.inheritIntellegenceFrom;
                        delete child.prefs['data-id'];
                    }
                }
                return child;
            });
        }
        delete cmps[newId].prefs['data-id'];
        delete cmps[newId].inheritIntellegenceFrom;

        if (!cmpId.includes('el-')) {
            delete cmps[cmpId];
        }
    }

    return draftCopy;
}
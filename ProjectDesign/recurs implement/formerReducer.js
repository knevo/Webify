let initialState = {
    prototypeId: null, // { type: 'public', _id: 'klewarklahwelk' }, or { type: 'custom' }
    rootElement: null,
    cmps: null
};

export default function draftReducer(state = initialState, action = {}) {

    switch (action.type) {
        case 'DRAFT_SET': {
            const { rootElement, cmps } = action.draft;
            return { rootElement, cmps, prototypeId: action.draft._id };
        }

        case 'CMP_UPDATE': {
            const { currentParentIdx, targetParentIdx, cmpInfo } = action; // expects cmpInfo = {idx: [index in cmps based on map], data: {[cmp model obj]}}
            let cmps = state.cmps.slice();
            if (currentParentIdx !== targetParentIdx) cmps = replaceParents(cmps, currentParentIdx, targetParentIdx, cmpInfo);
            cmps[cmpInfo.idx] = { ...cmpInfo.data };
            return { ...state, cmps };
        }

        case 'CMP_ADD': {
            const { targetParentIdx, cmpData } = action; // expects cmpData = {[cmp model obj]}
            let cmps = state.cmps.slice(),
                newCmp = { ...cmpData, _id: getRandomId() }; // returns cmp with _id
            cmps[targetParentIdx].children = [...cmps[targetParentIdx].children, { cmpId: newCmp._id }];
            cmps.push(newCmp);
            return { ...state, cmps };
        }

        case 'CMP_REMOVE': {
            const { currParentIdx, cmpInfo } = action; // expects cmpInfo = {idx: [index in cmps based on map], data: {[cmp model obj]}}
            if (!cmpInfo.data.isDeleteable) return state;

            let cmps = state.cmps.slice(),
                currentParent = { ...cmps[currParentIdx] };

            currentParent.children = currentParent.children.filter(child => child.cmpId !== cmpInfo.data._id);
            cmps.splice(cmpInfo.idx, 1);

            return { ...state, cmps };
        }

        default:
            return state;

    }
}


function replaceParents(componentsList, currParentIdx, targetParentIdx, currentComponent) {
    let currentParent = { ...componentsList[currParentIdx] };
    let targetParent = { ...componentsList[targetParentIdx] };

    currentParent.children = currentParent.children.filter(child => child.cmpId !== currentComponent.data._id);
    targetParent.children = [...targetParent.children, { cmpId: currentComponent.data._id }];

    componentsList.splice(currParentIdx, 1, currentParent);
    componentsList.splice(targetParentIdx, 1, targetParent);

    return componentsList;
}

function getRandomId() {
    var length = 5;
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}
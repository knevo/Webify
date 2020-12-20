import {
    addRecursiveCmps, replaceParents, isLegalPlacement,
    cmpRemove, setCmpDropPos, addToHistory, verifyNewIdMethod
} from '../services/editorReducerService';

export default function draftReducer(state = {}, action = {}) {
    switch (action.type) {
        case 'DRAFT_SET': {
            let draft = action.draft.cmps ? verifyNewIdMethod(action.draft) : action.draft;

            return {
                ...draft,
                type: action.draftType,
                selectedCmpId: '_rootElement',
                openPanel: 'add',
                linkCmpId: null,
                history: []
            };
        }

        case 'SETTINGS_UPDATE': {
            return {
                ...state,
                settings: { ...action.settings }
            };
        }

        case 'CMP_SELECT': {
            const { selectedCmpId, switchPanel } = action,
                editOnSelectCmpRoles = ['text', 'img'];
            if (!selectedCmpId) return state;
            const cmpRole = state.cmps[selectedCmpId].role;

            if (editOnSelectCmpRoles.includes(cmpRole)) return { ...state, selectedCmpId, openPanel: switchPanel ? 'edit' : state.openPanel };

            return { ...state, selectedCmpId, openPanel: switchPanel ? 'add' : state.openPanel }
        }

        case 'CMP_EDIT': {
            const { selectedCmpId, openPanel } = action;
            if (!selectedCmpId) return { ...state, openPanel }
            return { ...state, selectedCmpId, openPanel: 'edit' }
        }

        case 'CMP_UPDATE': {
            const history = addToHistory(state);

            let { parentId, targetParentId, cmpData, targetId, diff } = action;

            if (!cmpData || !cmpData._id) return state;

            const cmps = { ...state.cmps };

            if (parentId !== targetParentId || targetId) replaceParents(cmps, parentId, targetParentId, cmpData, targetId, diff);

            cmps[cmpData._id] = { ...cmpData };
            return { ...state, cmps, history };
        }

        case 'CMP_ADD': {
            const history = addToHistory(state);
            let { parentCmpId, cmpData, targetId, diff } = action;

            if (!cmpData) return state;
            parentCmpId = parentCmpId ? parentCmpId : state.selectedCmpId;

            if (!isLegalPlacement(state.cmps, parentCmpId, cmpData))
                throw new Error('You need to drop this element inside a section')

            const cmps = { ...state.cmps };
            const newCmp = addRecursiveCmps(cmpData, cmps);
            cmps[parentCmpId] = { ...cmps[parentCmpId] };
            cmps[parentCmpId].children = setCmpDropPos(cmps[parentCmpId].children, targetId, newCmp, diff);
            return { ...state, cmps, selectedCmpId: parentCmpId, history };
        }


        case 'CMP_REMOVE': {
            const history = addToHistory(state);
            const { parentCmpId, cmpId } = action;

            if (!cmpId || !parentCmpId || cmpId === '_rootElement') return state;

            let cmps = { ...state.cmps };
            cmps[parentCmpId] = { ...cmps[parentCmpId] };
            cmps[parentCmpId].children = cmps[parentCmpId].children.filter(child => child.cmpId !== cmpId);
            cmpRemove(cmps, cmpId);

            return { ...state, cmps, selectedCmpId: parentCmpId, history };
        }

        case 'CMP_MOVE': {
            const history = addToHistory(state);
            const { parentCmpId, cmpId, diff } = action;
            if (!cmpId || !parentCmpId || cmpId === '_rootElement') return state;

            const cmps = { ...state.cmps };

            cmps[parentCmpId] = { ...cmps[parentCmpId] };

            const cmpIdx = cmps[parentCmpId].children.findIndex(child => child.cmpId === cmpId),
                parentCmpChildren = cmps[parentCmpId].children.slice();

            if (cmpIdx === 0 && diff === -1) return state;
            if (cmps[parentCmpId]._id === '_rootElement') {
                if (cmpIdx === cmps._rootElement.children.length - 1 && diff === 1) return state;
            } else {
                if (cmpIdx === parentCmpChildren.length - 1 && diff === 1) return state;
            }

            const cmpRef = parentCmpChildren[cmpIdx];
            parentCmpChildren.splice(cmpIdx, 1, parentCmpChildren[cmpIdx + diff]);
            parentCmpChildren.splice(cmpIdx + diff, 1, cmpRef);

            cmps[parentCmpId].children = parentCmpChildren;

            return { ...state, cmps, selectedCmpId: parentCmpId, history };
        }

        case 'LINK_CMPID_SET': {
            let { linkCmpId } = action;

            if (!linkCmpId) return state;

            return { ...state, linkCmpId, openPanel: 'sitemap' };
        }

        case 'LINK_CMPID_UNSET': {
            return { ...state, linkCmpId: null };
        }

        case 'CMP_NAME_CHANGE': {
            const history = addToHistory(state);
            let { cmpName } = action;

            if (!cmpName) return state;

            const cmps = { ...state.cmps };
            cmps[state.selectedCmpId] = { ...cmps[state.selectedCmpId], cmpName };
            return { ...state, cmps, history };
        }

        case 'CMP_ANCHOR_PLACE': {
            const history = addToHistory(state);
            let { anchoredCmpId } = action;


            if (!anchoredCmpId || !state.linkCmpId) return state;
            const cmps = { ...state.cmps };

            const linkCmp = cmps[state.linkCmpId];
            const linkedCmp = {
                ...linkCmp,
                htmlTagName: 'a',
                prefs: { ...linkCmp.prefs, href: '#' + anchoredCmpId }
            };

            cmps[state.linkCmpId] = linkedCmp;
            return { ...state, cmps, selectedCmpId: state.linkCmpId, openPanel: 'edit', linkCmpId: null, history };
        }

        case 'GO_BACK_IN_HISTORY': {
            if (!state.history.length) return state;
            const currentHistory = state.history.slice();
            const lastState = currentHistory.pop();
            return { ...state, ...lastState, history: currentHistory };
        }

        default:
            return state;
    }
}
import wapService from '../services/wapService';
import templateService from '../services/templateService';
import draftCreator from '../services/draftCreator';

import { _displayNotificationBox } from './GenericActions';

const _updateSettings = settings => ({ type: 'SETTINGS_UPDATE', settings });
const _addCmp = (parentCmpId, cmpData, targetId, diff) => ({ type: 'CMP_ADD', parentCmpId, cmpData, targetId, diff });
const _updateCmp = (cmpData, parentId, targetParentId, targetId, diff) =>
    ({ type: 'CMP_UPDATE', cmpData, parentId, targetParentId, targetId, diff });
const _removeCmp = (parentCmpId, cmpId) => ({ type: 'CMP_REMOVE', parentCmpId, cmpId });
const _selectCmp = (selectedCmpId, switchPanel) => ({ type: 'CMP_SELECT', selectedCmpId, switchPanel });
const _cmpToEdit = (selectedCmpId, openPanel) => ({ type: 'CMP_EDIT', selectedCmpId, openPanel });
const _setLinkCmpId = (linkCmpId) => ({ type: 'LINK_CMPID_SET', linkCmpId });
const _unSetLinkCmpId = () => ({ type: 'LINK_CMPID_UNSET' });
const _placeLinkAnchor = (anchoredCmpId) => ({ type: 'CMP_ANCHOR_PLACE', anchoredCmpId });
const _moveCmp = (parentCmpId, cmpId, diff) => ({ type: 'CMP_MOVE', parentCmpId, cmpId, diff });
const _setDraft = (draft, draftType) => ({ type: 'DRAFT_SET', draft, draftType });
const _historyBack = () => ({ type: 'GO_BACK_IN_HISTORY' });

export function updateSettings(settings) {
    return _updateSettings(settings);
}

export function saveTemplate(draft) {
    return _saveDraft(draft, 'template');
}

export function publishWap(draft) {
    return _saveDraft(draft, 'wap');
}

export function setDraft(draft, draftType) {
    return dispatch => dispatch(_setDraft(draft, draftType));
}

export function resetDraft() {
    return dispatch => dispatch(_setDraft({}));
}

export function selectCmp(selectedCmpId, switchPanel = true) {
    return dispatch => dispatch(_selectCmp(selectedCmpId, switchPanel));
}

export function cmpToEdit(selectedCmpId, openPanel) {
    return dispatch => dispatch(_cmpToEdit(selectedCmpId, openPanel));
}

export function setLinkCmpId(linkCmpId) {
    return dispatch => dispatch(_setLinkCmpId(linkCmpId));
}
export function unSetLinkCmpId() {
    return dispatch => dispatch(_unSetLinkCmpId());
}

export function placeLinkAnchor(anchoredCmpId) {
    return dispatch => dispatch(_placeLinkAnchor(anchoredCmpId));
}

export function loadDraft(id, draftType = 'template') {
    return async dispatch => {
        let draft;
        if (id) {
            try {
                draft = draftType === 'wap' ?
                    await wapService.getById(id) :
                    await templateService.getById(id);
            } catch (err) {
                let draftName = draftType === 'wap' ? 'Website' : 'Template';
                dispatch(_displayNotificationBox({ type: 'failure', message: 'Failed to load ' + draftName }));
            }
        }
        if (!draft) draft = draftCreator();
        dispatch(_setDraft(draft, draftType));
    }
}

export function moveCmp(parentCmpId, cmpId, diff) {
    return async dispatch => {
        try {
            dispatch(_moveCmp(parentCmpId, cmpId, diff));
        } catch (err) {
            dispatch(_displayNotificationBox({ type: 'failure', message: 'Failed to move element' }));
        }
    }
}

export function addCmp(targetParentId, cmp, targetId, diff) {
    return async dispatch => {
        try {
            dispatch(_addCmp(targetParentId, cmp, targetId, diff));
        } catch (err) {
            dispatch(_displayNotificationBox({ type: 'failure', message: err.message }));
        }
    }
}

export function updateCmp(cmpData, parentId, targetParentId, targetId, diff) {
    return async (dispatch) => {
        try {
            dispatch(_updateCmp(cmpData, parentId, targetParentId, targetId, diff));
        } catch (err) {
            dispatch(_displayNotificationBox({ type: 'failure', message: 'Failed to update element' }));
        }
    };
}

export function updateCmpText(newText, cmp) {
    return async (dispatch) => {
        try {
            const updatedCmp = { ...cmp, children: [newText] };
            dispatch(_updateCmp(updatedCmp));
        } catch (err) {
            dispatch(_displayNotificationBox({ type: 'failure', message: 'Failed to update text' }));
        }
    };
}

export function removeCmp(parentCmpId, cmpId) {
    return async dispatch => {
        try {
            dispatch(_removeCmp(parentCmpId, cmpId));
        } catch (err) {
            console.log(err)
            dispatch(_displayNotificationBox({ type: 'failure', message: 'Failed to delete element' }));
        }
    }
}

export function historyBack() {
    return async dispatch => {
        try {
            dispatch(_historyBack());
        } catch (err) {
            dispatch(_displayNotificationBox({ type: 'failure', message: 'Failed to undo' }));
        }
    }
}

function _saveDraft(draft, draftType) {
    return async dispatch => {
        try {

            let draftToSave = {
                cmps: draft.cmps,
                settings: { ...draft.settings }
            }

            if (draft.type === draftType) {
                draftToSave._id = draft._id;
            }
            let newDraftData;

            if (draftType === 'wap') newDraftData = await wapService.save(draftToSave);
            else if (draftType === 'template') newDraftData = await templateService.save(draftToSave);
            else throw new Error('Failed');

            dispatch(_setDraft(newDraftData, draftType));
            return newDraftData;

        } catch (err) {
            let draftName = draftType === 'wap' ? 'Website' : 'Template';
            dispatch(_displayNotificationBox({ type: 'failure', message: 'Failed to save ' + draftName }));
            throw err;
        }
    }
}
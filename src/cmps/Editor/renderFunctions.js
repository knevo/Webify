import React from 'react';
import { getRandomId } from '../../services/utils'
export function addLoaderToImg(cmpData) {
    return {
        ...cmpData,
        prefs: {
            ...cmpData.prefs,
            src: '/images/loader.gif'
        }
    };
}

export function wrapChildlessElements(cmpData, onUpdateInnerText) {
    if (cmpData.role === 'text') {
        cmpData.children = [{
            htmlTagName: 'span',
            role: 'text',
            prefs: {
                contentEditable: true,
                suppressContentEditableWarning: true,
                onBlur: onUpdateInnerText,
                onClick: (ev) => ev.stopPropagation(),
                draggable: false,
                onDragStart: (ev) => ev.preventDefault()
            },
            children: [...cmpData.children]
        }]
    }
}

export function addEditorFunctionality(cmpData, { onSelectCmp, onDrop, allowDrop, onDragLeave, dragStart }, selectedCmpId) {

    let properties = {
        onClick: onSelectCmp
    };

    if (selectedCmpId === cmpData._id) properties['data-selected'] = 'true';

    if (cmpData.role !== 'text' && cmpData.prefs.style &&
        cmpData.prefs.style.flexDirection) {
        properties['data-orientation'] = cmpData.prefs.style.flexDirection;
    }

    if (cmpData.role === 'form') {
        properties.onSubmit = (ev) => ev.preventDefault();
    }

    if (cmpData.role === '_root') {
        properties.onDrop = onDrop;
        properties.onDragOver = allowDrop;
        properties.onDragLeave = onDragLeave;
        properties['data-orientation'] = 'column';
    } else {
        properties.draggable = true;
        properties.onDragStart = dragStart;
    }

    cmpData.prefs = {
        ...cmpData.prefs,
        ...properties
    }
}

export function renderSingleCmp(cmpData) {
    return React.createElement(
        cmpData.htmlTagName,
        {
            key: getRandomId(),
            ...cmpData.prefs,
        },
        cmpData.children
    );
}
export function isMyChild(elTarget, cmpId) {
    let elNewParent = elTarget,
        newParentId = elTarget.id;

    while (newParentId !== '_rootElement') {
        if (cmpId === newParentId) return true
        elNewParent = elNewParent.parentNode;
        newParentId = elNewParent.id;
    }
    return false
}
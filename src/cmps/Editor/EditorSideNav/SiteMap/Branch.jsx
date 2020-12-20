import React from 'react';
import { connect } from 'react-redux';
import { useState } from 'react';
import { selectCmp, cmpToEdit, placeLinkAnchor } from '../../../../actions/EditorActions';

function Branch(props) {
    const { cmp, children, selectedCmpId, linkCmpId } = props;

    const isExpandable = children && children.length ? true : false;
    const [isExpanded, toggleExpansion] = useState(cmp.role === '_root');

    const scrollToElement = () => {
        if (cmp._id === '_rootElement') return;

        const webContainer = document.querySelector('.web-site-container');
        let elSelectedElement = document.querySelector(`#${cmp._id}`);

        if (elSelectedElement) {
            while (elSelectedElement.parentNode.dataset.role !== '_root') {
                elSelectedElement = elSelectedElement.parentNode;
            }
            webContainer.scrollTo(0, elSelectedElement.offsetTop);
        }
    }

    const selectElement = () => {
        props.selectCmp(cmp._id, false);
        if (isExpandable) toggleExpansion(!isExpanded);
        scrollToElement();
    }

    const editCmp = (ev) => {
        ev.stopPropagation();
        props.cmpToEdit(cmp._id, 'edit');
    }

    const onLinkCmp = (ev) => {
        ev.stopPropagation();
        props.placeLinkAnchor(cmp._id);
    }

    let branchClassNames = (isExpanded ? ' expanded' : '') + (selectedCmpId === cmp._id ? ' active' : '');

    return (
        <li className={isExpandable ? 'expandable' : ''}>

            <span className={'cmpName' + branchClassNames} onClick={selectElement}>
                {cmp.role === '_root' ? 'Root Element' : cmp.cmpName || 'Element'}
                {linkCmpId && <button className='sitemap-anchor-btn' onClick={onLinkCmp}><i className="fas fa-anchor"></i></button>}
                <button className='sitemap-edit-btn' onClick={editCmp}><i className="fas fa-pencil-alt"></i></button>
            </span>

            {isExpandable && isExpanded &&
                <ul className='sitemap-list clean-list'>
                    {children}
                </ul>
            }
        </li>)
}

const mapStateToProps = (state) => ({
    selectedCmpId: state.draft.selectedCmpId,
    linkCmpId: state.draft.linkCmpId
});
const mapDispatchToProps = { selectCmp, cmpToEdit, placeLinkAnchor };
export default connect(mapStateToProps, mapDispatchToProps)(Branch);
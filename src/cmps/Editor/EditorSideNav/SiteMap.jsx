import React from 'react';
import { connect } from 'react-redux';
import Branch from './SiteMap/Branch';
import { unSetLinkCmpId } from '../../../actions/EditorActions';

class SiteMapTree extends React.Component {

    // state = {
    //     expanded: {},
    //     searchEnded: false
    // }

    // bubbleExpansionUp = (childId, parentId) => {
    //     const selectedCmpId = this.props.draft.selectedCmpId;
    //     if (childId === selectedCmpId || this.state.expanded[childId]) {
    //         this.setState(prevState => ({ expanded: { ...prevState.expanded, [childId]: true } }))
    //     }
    //     if (parentId === '_rootElement') this.setState({ searchEnded: true });
    // }
    // let newBranch = this.createBranch(child.cmpId);
    // if (!this.state.searchEnded) this.bubbleExpansionUp(child.cmpId, cmpId);
    // return newBranch;

    createBranch = (cmpId) => {
        const cmp = this.props.draft.cmps[cmpId];
        return (
            <Branch cmp={cmp} key={cmpId}>
                {Array.isArray(cmp.children) && typeof cmp.children[0] === 'object' && cmp.children[0].cmpId ?
                    cmp.children.map(child => this.createBranch(child.cmpId)) : undefined}
            </Branch>);
    }

    render() {
        return (
            <React.Fragment>
                {this.props.draft.linkCmpId &&
                    <h3 className='anchor-sitemap-title'>
                        Place the Anchor on desired target element
                    <button onClick={this.props.unSetLinkCmpId}>Dismiss</button>
                    </h3>}
                <ul className='sitemap-list clean-list main-list'>
                    {this.createBranch('_rootElement')}
                </ul>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({ draft: state.draft });
const mapDispatchToProps = {
    unSetLinkCmpId
};
export default connect(mapStateToProps, mapDispatchToProps)(SiteMapTree);
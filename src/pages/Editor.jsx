import React from 'react';
import { connect } from 'react-redux';

import { resetDraft, loadDraft } from '../actions/EditorActions';

import EditorSideNav from '../cmps/Editor/EditorSideNav.jsx';
import WebsiteContainer from '../cmps/Editor/WebsiteContainer.jsx';
import EditorExpander from '../cmps/Editor/EditorExpander.jsx';
import Loader from '../cmps/Loader';

class Editor extends React.Component {
    loadDraft = async () => {
        const { id, type } = this.props.match.params;
        this.props.loadDraft(id, type);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) this.loadDraft();
    }

    componentDidMount() {
        this.loadDraft();
    }

    componentWillUnmount() {
        this.props.resetDraft();
    }

    render() {
        if (!this.props.draft.cmps) return <Loader />;
        return (
            <React.Fragment>
                <div className="editor flex">
                    <EditorSideNav history={this.props.history} />
                    <WebsiteContainer />
                    <EditorExpander />
                </div>
                <div className='editor-mobile-message flex auto-center'>Editor is available only on desktop and tablet</div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => (
    {
        draft: state.draft
    }
);
const mapDispatchToProps = { resetDraft, loadDraft };
export default connect(mapStateToProps, mapDispatchToProps)(Editor);
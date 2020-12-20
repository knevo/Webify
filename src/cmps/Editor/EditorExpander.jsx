import React from 'react';
import { connect } from 'react-redux';

import { toggleEditorExpansion, toggleExpanderDragged } from '../../actions/GenericActions';

class EditorExpander extends React.Component {

    state = {
        buttonStyle: {
        }
    }

    handleDragStart = (ev) => {
        const elExpander = ev.target;
        ev.dataTransfer.setData("text", "expander")
        this.props.toggleExpanderDragged()
        var dragPrev = elExpander.cloneNode(true);
        dragPrev.style.display = "none";
        ev.dataTransfer.setDragImage(dragPrev, 0, 0);
    }

    handleDrag = (ev) => {
        ev.preventDefault()
        const elExpander = ev.target;
        const { clientX, clientY } = ev,
            { clientWidth, clientHeight } = document.body

        if (clientX <= 0 || clientY <= 0 ||
            clientX >= clientWidth - elExpander.offsetWidth / 2 ||
            clientY >= clientHeight - elExpander.offsetHeight / 2) return;


        let offsetY = clientY - elExpander.offsetHeight / 2 + 'px',
            offsetX = clientX - elExpander.offsetWidth / 2 + 'px';
        this.setState({ buttonStyle: { left: offsetX, top: offsetY } });
    }

    render() {
        return (
            <button style={ this.state.buttonStyle }
                onDragStart={ this.handleDragStart } onDrag={ this.handleDrag } draggable
                onClick={ () => this.props.toggleEditorExpansion() } className="editor-expander">
                { this.props.isEditorExpanded ? <i className="fas fa-compress"></i> : <i className="fas fa-expand"></i> }
            </button>);
    }
}

const mapStateToProps = (state) => ({ isEditorExpanded: state.modal.isEditorExpanded });
const mapDispatchToProps = { toggleEditorExpansion, toggleExpanderDragged };
export default connect(mapStateToProps, mapDispatchToProps)(EditorExpander);

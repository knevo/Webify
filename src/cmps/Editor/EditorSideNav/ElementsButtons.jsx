import React, { useState } from 'react';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function ElementButtons(props) {
    const [isSectionsOpen, toggleSections] = useState(true);
    const [isElementsOpen, toggleElements] = useState(false);
    // const [currentOpenPanel, togglePanel] = useState('sections');
    const { addCmp, dragCmp } = props;
    return (
        <React.Fragment>
            {/* <ExpansionPanel expanded={currentOpenPanel === 'sections'} onChange={() => togglePanel('sections')}> */}
            <ExpansionPanel expanded={isSectionsOpen} onChange={() => toggleSections(!isSectionsOpen)}>
                <ExpansionPanelSummary className='editor-section-title' expandIcon={<ExpandMoreIcon />}>
                    Sections
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div className="editor-btn-container">
                        <button onClick={addCmp} draggable="true" onDragStart={dragCmp} data-cmptype='GenericSection'><i className="fas fa-grip-horizontal"></i>Horizontal Section</button>
                        <button onClick={addCmp} draggable="true" onDragStart={dragCmp} data-cmptype='VerticalSection'><i className="fas fa-grip-vertical"></i>Vertical Section</button>
                        <button onClick={addCmp} draggable="true" onDragStart={dragCmp} data-cmptype='Navbar'><i className="rect"></i>Navigation Bar</button>
                        <button onClick={addCmp} draggable="true" onDragStart={dragCmp} data-cmptype='Header'><i className="rect"></i>Header</button>
                        <button onClick={addCmp} draggable="true" onDragStart={dragCmp} data-cmptype='Cards'><i className="fas fa-border-all"></i>Cards</button>
                        <button onClick={addCmp} draggable="true" onDragStart={dragCmp} data-cmptype='Footer'><i className="rect"></i>Footer</button>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>

            {/* <ExpansionPanel expanded={currentOpenPanel === 'elements'} onChange={() => togglePanel('elements')}> */}
            <ExpansionPanel expanded={isElementsOpen} onChange={() => toggleElements(!isElementsOpen)}>
                <ExpansionPanelSummary className='editor-section-title' expandIcon={<ExpandMoreIcon />}>
                    Regular Elements
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div className="editor-btn-container">
                        <button onClick={addCmp} draggable="true" onDragStart={dragCmp} data-cmptype='GenericText'><i className="fas fa-font"></i>Text</button>
                        <button onClick={addCmp} draggable="true" onDragStart={dragCmp} data-cmptype='Img'><i className="far fa-image"></i>Image</button>
                        <button onClick={addCmp} draggable="true" onDragStart={dragCmp} data-cmptype='Button'><i className="fas fa-mouse"></i>Button</button>
                        <button onClick={addCmp} draggable="true" onDragStart={dragCmp} data-cmptype='Card'><i className="fas fa-square"></i>Card</button>
                        <button onClick={addCmp} draggable="true" onDragStart={dragCmp} data-cmptype='Youtube'><i className="fab fa-youtube"></i>Youtube Video</button>
                        <button onClick={addCmp} draggable="true" onDragStart={dragCmp} data-cmptype='gMap'><i className="fas fa-map-marked-alt"></i>Map</button>
                        <button onClick={addCmp} draggable="true" onDragStart={dragCmp} data-cmptype='ContactForm'><i className="far fa-envelope"></i>Form</button>

                        {/* <button onClick={addCmp} draggable="true" onDragStart={dragCmp} data-cmptype=''><i className="fab fa-soundcloud"></i>SoundCloud</button> */}
                        <button onClick={addCmp} draggable="true" onDragStart={dragCmp} data-cmptype='SocialButtons'><i className="fas fa-share-alt"></i>Social Buttons</button>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </React.Fragment>)
}

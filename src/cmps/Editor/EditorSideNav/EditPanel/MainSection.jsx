import React from 'react';
import { Button, Select, MenuItem, ButtonGroup, Tooltip, Switch } from '@material-ui/core';

import helpers from './helpers';
import DraftSettingsUpdate from './Partials/DraftSettingsUpdate';
import TextStyle from './Partials/TextStyle';
import MediaSourceChange from './Partials/MediaSourceChange';

export default class MainSection extends React.Component {

    handleFlexChange = (ev) => {
        const { handleStyleChange, cmp } = this.props;

        const direction = cmp.prefs.style.flexDirection,
            field = ev.target.name,
            value = ev.target.value;

        const isVertical = field === 'top' || field === 'middle' || field === 'bottom';

        let attribute = direction === 'column' ?
            (isVertical ? 'justifyContent' : 'alignItems') :
            (isVertical ? 'alignItems' : 'justifyContent');

        handleStyleChange(attribute, value)
    }

    isAlignActive = (alignment) => {
        return helpers.isAlignmentActive(alignment, this.props.cmp);
    }


    render() {
        const { handleStyleChange, cmp, onUploadImg, toggleLoader,
            updateCmpLink, updateInnerTxt, updateMediaSrc } = this.props;
        const { isAlignActive, handleFlexChange } = this;

        const cmpRole = cmp.role,
            cmpStyle = cmp.prefs.style;
        return (
            <React.Fragment>
                { cmpRole === '_root' && <DraftSettingsUpdate toggleLoader={ toggleLoader } /> }

                { cmpRole === 'input' && <div className="input-group">
                    <label htmlFor="">Placeholder</label>
                    <input type="text" value={ cmp.children[0].prefs.placeholder }
                        onChange={ (ev) => handleStyleChange('placeholder', ev.target.value) } />
                </div> }

                { (helpers.isTextCmp(cmpRole)) &&
                    <TextStyle updateCmpLink={ updateCmpLink } handleStyleChange={ handleStyleChange }
                        updateInnerTxt={ updateInnerTxt } cmp={ cmp } /> }

                { helpers.isMediaCmp(cmpRole) &&
                    <MediaSourceChange onUploadImg={ onUploadImg } cmp={ cmp } updateMediaSrc={ updateMediaSrc } /> }

                { (helpers.isSectionCmp(cmpRole)) &&
                    <div className='input-group'>
                        <label>Orientation</label>
                        <Select value={ cmpStyle.flexDirection || 'row' } name='flexDirection'
                            onChange={ handleStyleChange }>
                            <MenuItem value={ 'row' }>Horizontal</MenuItem>
                            <MenuItem value={ 'column' }>Vertical</MenuItem>
                        </Select>
                    </div> }

                { helpers.isSectionCmp(cmpRole) &&
                    <React.Fragment>
                        <ButtonGroup size='small' className='input-wrapper'>
                            <Button className={ isAlignActive('top') } onClick={ handleFlexChange } name='top' value='flex-start'>Top</Button>
                            <Button className={ isAlignActive('middle') } onClick={ handleFlexChange } name='middle' value='center'>Middle</Button>
                            <Button className={ isAlignActive('bottom') } onClick={ handleFlexChange } name='bottom' value='flex-end'>Bottom</Button>
                        </ButtonGroup>
                        <ButtonGroup size='small' className='input-wrapper'>
                            <Button className={ isAlignActive('left') } onClick={ handleFlexChange } name='left' value='flex-start'><i className='fas fa-align-left'></i></Button>
                            <Button className={ isAlignActive('center') } onClick={ handleFlexChange } name='center' value='center'><i className='fas fa-align-center'></i></Button>
                            <Button className={ isAlignActive('right') } onClick={ handleFlexChange } name='right' value='flex-end'><i className='fas fa-align-right'></i></Button>
                        </ButtonGroup>

                        <div className='input-group'>

                            <label>
                                Stretch { cmpStyle.flexDirection === 'column' ? 'Horizontally' : 'Vertically' }
                                <Tooltip title={ 'Stretching all the elements inside perpendicular to the orientation' }
                                    placement="bottom" arrow><i className="fas fa-question-circle"></i></Tooltip>
                            </label>
                            <div className='auto-switch-container'>
                                <Switch checked={ isAlignActive('stretch') ? true : false }
                                    onChange={ handleStyleChange } name='alignItems' value='stretch' />
                            </div>
                        </div>

                        <div className='input-group'>
                            <label>
                                Spacing
                                <Tooltip title='Adds spacing between the elements automatically' placement="bottom" arrow>
                                    <i className="fas fa-question-circle"></i>
                                </Tooltip>
                            </label>
                            <div className='auto-switch-container'>
                                <label>Auto</label>
                                <Switch checked={ isAlignActive('space-between') ? true : false }
                                    onChange={ handleStyleChange } name='justifyContent' value='space-between' />
                            </div>
                        </div>
                    </React.Fragment> }
            </React.Fragment>
        )
    }
}

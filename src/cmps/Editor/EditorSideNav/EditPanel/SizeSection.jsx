import React from 'react';
import { Select, MenuItem, Switch, Tooltip } from '@material-ui/core';

import helpers, { initialValuesMap } from './helpers';
import SliderInput from './Partials/SliderInput';


export default class SizeSection extends React.Component {

    setFlexGrow = () => {
        const { handleStyleChange } = this.props;
        const { maxWidth, flexGrow } = this.props.cmp.prefs.style;

        let newFlexGrow = !flexGrow || flexGrow === '0' ? '1' : '0';

        this.props.handleStyleChange('flexGrow', newFlexGrow);
        if (this.parentFlexDir === 'row' && maxWidth && maxWidth !== 'initial' && newFlexGrow === '0') handleStyleChange('maxWidth', 'initial');
    }

    toggleSizeView = (ev) => {
        const { name, checked } = ev.target;
        const { handleStyleChange } = this.props;
        const { flexGrow } = this.props.cmp.prefs.style;

        let newValue = checked ? 'initial' : '1';
        handleStyleChange(name, newValue);

        if (name === 'maxWidth' && this.parentFlexDir === 'row' &&
            newValue !== 'initial' && flexGrow === '0') handleStyleChange('flexGrow', '1');
    }

    get isWidthShown() {
        const { style } = this.props.cmp.prefs;
        if (style.maxWidth === 'initial' || !style.maxWidth ||
            (this.parentFlexDir === 'row' && style.flexGrow === '0')) return false;
        return true;
    }

    get isHeightShown() {
        const { style } = this.props.cmp.prefs;
        if (style.minHeight === 'initial' || !style.minHeight) return false;
        return true;
    }

    get disabledStretchInfo() {
        return this.isParentRoot ? 'this property is disabled when element is nested directly inside the root element.' : '';
    }

    get parentElementDataset() {
        const elCurrCmp = document.querySelector(`#${this.props.cmp._id}`);
        return elCurrCmp ? elCurrCmp.parentNode.dataset : null;
    }

    get parentFlexDir() {
        return this.parentElementDataset ? this.parentElementDataset.orientation : undefined;
    }

    get isParentRoot() {
        return this.parentElementDataset ? this.parentElementDataset.role === '_root' : undefined;
    }

    render() {
        const { handleStyleChange, handleDatasetChange, cmp } = this.props;

        const cmpRole = cmp.role,
            cmpStyle = cmp.prefs.style;

        return (
            <React.Fragment>
                <div className='input-group'>
                    <label>Width</label>
                    <div className='auto-switch-container'>
                        <label>Auto</label>
                        <Switch checked={!this.isWidthShown} name='maxWidth' onChange={this.toggleSizeView} />
                    </div>
                </div>

                {this.isWidthShown &&
                    <SliderInput field='maxWidth' selectedCmpId={cmp._id}
                        initialValue={cmpStyle.maxWidth || initialValuesMap.sizing} handleChange={handleStyleChange} />
                }

                {(cmpRole !== '_root') &&
                    <React.Fragment>
                        <div className='input-group'>
                            <label>Height</label>
                            <div className='auto-switch-container'>
                                <label>Auto</label>
                                <Switch checked={!this.isHeightShown} name='minHeight' onChange={this.toggleSizeView} />
                            </div>
                        </div>
                        {this.isHeightShown &&
                            <SliderInput field='minHeight' selectedCmpId={cmp._id}
                                initialValue={cmpStyle.minHeight || initialValuesMap.sizing} handleChange={handleStyleChange} />
                        }

                        <div className='input-group'>
                            <label>
                                Stretch {this.parentFlexDir === 'column' ? 'Vertically' : 'Horizontally'}
                                <Tooltip title={'Stretching the element according to it\'s parent orientation' + this.disabledStretchInfo}
                                    placement="bottom" arrow><i className="fas fa-question-circle"></i></Tooltip>
                            </label>
                            <Switch checked={(!cmpStyle.flexGrow || cmpStyle.flexGrow === '0') ? false : true}
                                onChange={this.setFlexGrow} value='flexGrow' color='primary' disabled={this.isParentRoot} />
                        </div>

                        {helpers.isMediaCmp(cmpRole) &&
                            <div className='input-group'>
                                <label>Aspect Ratio</label>
                                <Select value={cmp.prefs['data-aspect'] || 'normal'} name='aspect'
                                    onChange={handleDatasetChange}>
                                    <MenuItem value={'normal'}>Normal</MenuItem>
                                    <MenuItem value={'16-9'}>16:9</MenuItem>
                                    <MenuItem value={'square'}>1:1</MenuItem>
                                    <MenuItem value={'4-3'}>4:3</MenuItem>
                                </Select>
                            </div>}
                    </React.Fragment>}
            </React.Fragment>
        )
    }
}

import React from 'react';
import { Select, MenuItem } from '@material-ui/core';

import helpers, { initialValuesMap } from './helpers';
import ColorPicker from './Partials/ColorPicker';
import SliderInput from './Partials/SliderInput';
import MediaSourceChange from './Partials/MediaSourceChange';

export default class LayoutSection extends React.Component {

    render() {
        const { handleStyleChange, cmp, onUploadImg, updateMediaSrc } = this.props;

        const cmpRole = cmp.role,
            cmpStyle = cmp.prefs.style;

        return (
            <React.Fragment>
                {cmpRole === '_root' &&
                    <React.Fragment>
                        <div className='input-group'>
                            <label>Direction</label>
                            <Select value={cmpStyle.direction || 'ltr'} name='direction'
                                onChange={handleStyleChange}>
                                <MenuItem value={'ltr'}>Left to Right</MenuItem>
                                <MenuItem value={'rtl'}>Right to Left</MenuItem>
                            </Select>
                        </div>
                    </React.Fragment>}

                <ColorPicker name='backgroundColor' color={cmpStyle.backgroundColor} icon='fas fa-fill-drip'
                    selectedCmpId={cmp._id} onColorChange={handleStyleChange} />

                {helpers.isSectionCmp(cmpRole) &&
                    <MediaSourceChange onUploadImg={onUploadImg} cmp={cmp} updateMediaSrc={updateMediaSrc} />}

                <div className='input-group'>
                    <SliderInput field='padding' label='Spacing' selectedCmpId={cmp._id}
                        initialValue={cmpStyle.padding || initialValuesMap.spacing}
                        handleChange={handleStyleChange} />
                </div>

                {(cmpRole !== '_root') &&
                    <div className='input-group'>
                        <SliderInput field='margin' label='Margin' selectedCmpId={cmp._id}
                            initialValue={cmpStyle.margin || initialValuesMap.spacing}
                            handleChange={handleStyleChange} />
                    </div>}

                {(helpers.isSectionCmp(cmpRole) || helpers.isMediaCmp(cmpRole)) &&
                    <div className='input-group'>
                        <SliderInput field='borderRadius' selectedCmpId={cmp._id} label='Radius'
                            initialValue={cmpStyle.borderRadius || initialValuesMap.spacing}
                            handleChange={handleStyleChange} />
                    </div>}
            </React.Fragment>
        )
    }
}

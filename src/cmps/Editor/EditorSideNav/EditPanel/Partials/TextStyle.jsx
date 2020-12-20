import React from 'react';
import { connect } from 'react-redux';

import { Select, MenuItem, Tooltip, Button } from '@material-ui/core';
import ColorPicker from './ColorPicker';
import SliderInput from './SliderInput';
import { setLinkCmpId } from '../../../../../actions/EditorActions';

function TextStyle(props) {
    const fontsList = ['Helvetica', 'OpenSans', 'Cursive', 'Courgette', 'Roboto', 'Caveat', 'Solway',
        'Pacifio', 'Lobster', 'Dancing Script', 'Nunito', 'Railway', 'Futura Light']

    const defaultValueMap = {
        fontWeight: 'normal',
        textAlign: 'left',
        alignItems: 'flex-start',
        fontFamily: 'OpenSans'
    }
    const { cmps } = props.draft,
        { href } = props.cmp.prefs,
        regex = /^#(el-[\w]{4,6})$/;

    const isHrefAnchor = href && regex.test(href);
    const linkTargetCmpName = isHrefAnchor ? cmps[href.match(regex)[1]].cmpName : '';
    const linkPlaceholder = isHrefAnchor ? 'Links to Anchor at: ' + linkTargetCmpName : 'Enter Link';


    const cmpStyle = props.cmp.prefs.style;
    return (
        <React.Fragment>
            <div className='input-wrapper'>
                <textarea value={props.cmp.children[0]}
                    rows={3} placeholder="Enter Text" onChange={props.updateInnerTxt} />
                <div className='link-text-input-group'>
                    <textarea value={isHrefAnchor ? '' : props.cmp.prefs.href}
                        rows='1' placeholder={linkPlaceholder} onChange={props.updateCmpLink} />

                    <Button variant='contained' color='primary' component='span' title='Place Anchor'
                        onClick={() => props.setLinkCmpId(props.cmp._id)}>
                        <i className="fas fa-anchor"></i>
                    </Button>
                </div>
            </div>

            <ColorPicker selectedCmpId={props.cmp._id} name='color' color={cmpStyle.color} icon='fas fa-font'
                onColorChange={props.handleStyleChange} />

            <div className='input-group'>
                <label>Align</label>
                <Select value={cmpStyle.textAlign || defaultValueMap.textAlign} name='textAlign'
                    onChange={props.handleStyleChange}>
                    <MenuItem value={'left'}>Left</MenuItem>
                    <MenuItem value={'center'}>Center</MenuItem>
                    <MenuItem value={'right'}>Right</MenuItem>
                </Select>
            </div>

            <div className='input-group'>
                <label>Vertical Align</label>
                <Select value={cmpStyle.alignItems || defaultValueMap.alignItems} name='alignItems'
                    onChange={props.handleStyleChange}>
                    <MenuItem value={'flex-start'}>Top</MenuItem>
                    <MenuItem value={'center'}>Middle</MenuItem>
                    <MenuItem value={'flex-end'}>Bottom</MenuItem>
                </Select>
            </div>

            <div className='input-group'>
                <SliderInput field='fontSize' label='Text Size' initialValue={cmpStyle.fontSize}
                    handleChange={props.handleStyleChange} />
            </div>

            <div className='input-group'>
                <SliderInput field='letterSpacing' label='Letter Spacing' initialValue={cmpStyle.letterSpacing}
                    handleChange={props.handleStyleChange} />
            </div>

            <div className='input-group'>
                <label style={{ padding: '6px 0 7px' }}>Font   <Tooltip title="change font type" placement="bottom" arrow>
                    <i className="fas fa-question-circle"></i></Tooltip></label>
                <Select value={cmpStyle.fontFamily || defaultValueMap.fontFamily} name='fontFamily'
                    onChange={props.handleStyleChange}>
                    {fontsList.map((font, i) => <MenuItem style={{ fontFamily: font }} key={i} value={font}>{font}</MenuItem>)}
                </Select>
            </div>

            <div className='input-group'>
                <label style={{ padding: '6px 0 7px' }}>Font Weight   <Tooltip title="change font boldness"
                    placement="bottom" arrow>
                    <i className="fas fa-question-circle"></i></Tooltip></label>
                <Select value={cmpStyle.fontWeight || defaultValueMap.fontWeight} name='fontWeight'
                    onChange={props.handleStyleChange}>
                    <MenuItem value={'normal'}>Normal</MenuItem>
                    <MenuItem value={'bold'}>Bold</MenuItem>
                </Select>
            </div>
        </React.Fragment>

    )
}

const mapStateToProps = (state) => ({ draft: state.draft });
const mapDispatchToProps = { setLinkCmpId };
export default connect(mapStateToProps, mapDispatchToProps)(TextStyle);

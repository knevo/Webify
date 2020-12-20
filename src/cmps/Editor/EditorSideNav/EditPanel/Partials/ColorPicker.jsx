import React, { Component } from 'react';
import { ChromePicker } from 'react-color';
import { Button } from '@material-ui/core';

export default class ColorPicker extends Component {
    state = {
        color: '',
        showColorPicker: false
    }
    componentDidUpdate(prevProps) {
        if (prevProps.selectedCmpId !== this.props.selectedCmpId) {
            this.setState({ showColorPicker: false })
        }
    }

    toggleColorPicker = () => {
        this.setState(prevState => ({ showColorPicker: !prevState.showColorPicker }))
    }

    handleColorChange = (color) => {
        const { r, g, b, a } = color.rgb;
        this.props.onColorChange(this.props.name, `rgba(${r},${g},${b},${a})`);
    }

    render() {
        const { showColorPicker } = this.state;
        return (
            <div className='flex space-between colorpick-container input-group'>
                <label>{this.props.name === 'color' ? 'Color' : 'Background Color'}</label>
                <Button variant="contained" style={{ backgroundColor: this.props.color }}
                    title={this.props.name} onClick={this.toggleColorPicker}>
                    <i className={this.props.icon}></i>
                </Button>
                {showColorPicker &&
                    <React.Fragment>
                        <div className='colorpicker-cover' onClick={this.toggleColorPicker} />
                        <ChromePicker color={this.props.color} onChange={this.handleColorChange} />
                    </React.Fragment>}
            </div>
        )
    }
}

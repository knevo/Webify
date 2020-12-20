import React, { Component } from 'react'
import { Slider, FormGroup, Tooltip } from '@material-ui/core';
import DetailedInput from './DetailedInput';

const rangeValueMap = {
    max: {
        low: 100,
        medium: 500,
        high: 1500
    },
    min: {
        low: 0,
        medium: 5,
        high: 50
    }
}

export default class SliderInput extends Component {
    state = {
        isDetailsOpen: false
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedCmpId !== this.props.selectedCmpId) {
            this.setState({ isDetailsOpen: false })
        }
    }

    joinAttribute = (value) => {
        if (!this.isSplitAttr(this.props.field)) return value
        return `${value}px ${value}px ${value}px ${value}px`
    }

    formatValue = (value = '0') => {
        let newAttrArray = value.split(' ')
        if (newAttrArray.length !== 4) {
            return this.joinAttribute(parseInt(value, 10)).split(' ')
        }
        return newAttrArray
    }

    handleAttributeChange = (i, value) => {
        let newAttrArray = this.formatValue(this.props.initialValue)
        newAttrArray[i] = `${value}px`
        this.props.handleChange(this.props.field, newAttrArray.join(' '))
    }

    getRangeValues(field) {
        let maxInput, minInput = rangeValueMap.min.low;
        const { min, max } = rangeValueMap
        switch (field) {
            case 'fontSize':
                minInput = min.medium
                break;
            case 'borderRadius':
                minInput = min.low
                break;
            case 'letterSpacing':
                maxInput = max.low
                break;
            case 'padding':
            case 'margin':
                maxInput = max.medium
                break;
            case 'maxWidth':
            case 'minHeight':
                maxInput = max.high
                minInput = 1;
                break;
            default:
                maxInput = max.high
                minInput = min.low
                break;
        }
        return { maxInput, minInput }
    }

    toggleDetails = () => {
        this.setState(prevState => ({ isDetailsOpen: !prevState.isDetailsOpen }))
    }

    isSplitAttr(attr) {
        switch (attr) {
            case 'padding': return true
            case 'margin': return true
            case 'borderRadius': return true
            default: return false;
        }
    }

    get tooltip() {
        switch (this.props.field) {
            case 'padding': return 'Spacing of the element from the inside'
            case 'margin': return 'Spacing of the element from the outside'
            case 'borderRadius': return 'Rounded corners radius'
            case 'letterSpacing': return 'Spacing between the letters'
            case 'fontSize': return 'Text size'
            default: return 'customize'
        }
    }

    render() {
        const sides = ['Top', 'Right', 'Bottom', 'Left']
        const { field, initialValue, label } = this.props;
        const { maxInput, minInput } = this.getRangeValues(field);
        return (
            <React.Fragment>
                {label &&
                    <label>
                        {label}  <Tooltip title={this.tooltip} placement='bottom' arrow>
                            <i className='fas fa-question-circle'></i></Tooltip>
                    </label>}
                <div className='flex range-container'>
                    <Slider min={minInput} max={maxInput} value={parseInt(initialValue, 10) || 0}
                        onChange={(ev, newValue) => this.props.handleChange(field, this.joinAttribute(newValue))}
                        valueLabelDisplay='auto' disabled={this.props.disabled} />
                    {this.isSplitAttr(field) && <i onClick={this.toggleDetails}
                        className={'detail-toggle fas fa-caret-square-down' + (this.state.isDetailsOpen ? ' open' : '')} />}
                </div>

                {this.isSplitAttr(field) &&
                    <div className={'detailed-range' + (this.state.isDetailsOpen ? ' open' : '')}>
                        <FormGroup className='detail-form' row>
                            {this.formatValue(initialValue).map((value, i) =>
                                <DetailedInput key={i} label={sides[i]} field={field + sides[i]} initialValue={value}
                                    handleChange={(ev) => this.handleAttributeChange(i, ev.target.value)} />)}
                        </FormGroup>
                    </div>}
            </React.Fragment>);
    }

}

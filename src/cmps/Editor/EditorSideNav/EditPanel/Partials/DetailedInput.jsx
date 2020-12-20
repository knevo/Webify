import React from 'react'
import { FormControl, InputLabel, Input } from '@material-ui/core';

export default function SliderInput(props) {
    return (
        <FormControl size='small'>
            <InputLabel htmlFor={`${props.field}`} >{props.label}</InputLabel>
            <Input id={`${props.field}`} type='number' onChange={props.handleChange} inputProps={{ min: "0" }}
                value={parseInt(props.initialValue || 0, 10)} />
        </FormControl>
    );
}

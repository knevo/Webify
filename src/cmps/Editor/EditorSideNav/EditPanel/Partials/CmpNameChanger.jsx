import React, { useEffect, useState } from 'react';

export default function CmpNameChanger(props) {
    let [cmpName, changeCmpName] = useState(props.cmp.cmpName);

    useEffect(() => {
        changeCmpName(props.cmp.cmpName);
    }, [props.cmp._id, props.cmp.cmpName])

    return (
        <input type="text" value={cmpName} id="cmpNameInput"
            onChange={(ev) => changeCmpName(ev.target.value)}
            onBlur={() => props.handleCmpNameChange(cmpName)} />
    )
}
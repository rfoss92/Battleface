import React, { useState } from "react";
import _uniqueId from 'lodash/uniqueId';

export default function Input(props) {
    const {id, ages, setAges, setToDelete } = props;
    const [age, setAge] = useState();

    function validateLength(e) {
        let value = e.target.value;
        const maxLength = e.target.maxLength;
        if (value.length > maxLength) value = value.slice(0, maxLength);
        setAge(value);
        setAges([...ages, value]);
    }
    
    function validateKeyPress(e) {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    }

    function handleRemove(e) {
        e.preventDefault();
        setToDelete(e)
        setAges(ages.filter(prevAge => {
            return prevAge !== age;
        }));
    }

    return (<div key={id}>
        <input name="age" type="number" pattern="[0-9]" autoFocus maxLength="3" min="18"
            onKeyPress={(e) => validateKeyPress(e)}
            onInput={(e) => validateLength(e)}
        />
        { id != 'prefix-0' &&
            <button id={id} className="remove-person" onClick={e => handleRemove(e)}>Remove</button>
        }
    </div>);
}
import React from 'react';
import InputMask from 'react-input-mask';

const onlyNumbers = (str) => str.replace(/[^0-9]/g, '');

const MaskedInput = ({ mask, value, onChange, name, label, placeholder, nomeClasse }) => {
    function handleChange(event) {
        onChange({
            ...event,
            target: {
                ...event.target,
                name,
                value: onlyNumbers(event.target.value),
            }
        })
    }

    return (<InputMask className={"form-control"} mask={mask} value={value}
                onChange={handleChange}
                placeholder={placeholder}
            />
    );
}

export default MaskedInput;
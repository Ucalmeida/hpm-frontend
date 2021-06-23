import React, {Component} from 'react';
import InputMask from 'react-input-mask';

const CpfFormatado = () => {
    return <InputMask mask="999.999.999-99"
    type="text"
    className="form-control"
    placeholder="CPF"
    />
}

export default CpfFormatado;

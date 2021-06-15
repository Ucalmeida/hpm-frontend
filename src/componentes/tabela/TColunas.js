import React from 'react';
import PropTypes from 'prop-types';

const TColunas = props => {
    return (
        <thead>
            <th>
                {
                    props.colunas.map((coluna) => {
                        <td id={coluna.id}>coluna.texto</td>
                })
                }
            </th>
        </thead>
    );
};

TColunas.propTypes = {
    colunas: PropTypes.array
};

export default TColunas;
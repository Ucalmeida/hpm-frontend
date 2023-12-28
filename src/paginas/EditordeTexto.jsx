import React from 'react';
import PropTypes from 'prop-types';
import {Card, EditorTexto, Pagina} from "../componentes";

const EditordeTexto = props => {
    return (
        <Pagina titulo={"Editor de Texto"}>
            <Card>
                <EditorTexto>
                    teste
                </EditorTexto>
            </Card>
        </Pagina>
    );
};

export default EditordeTexto;
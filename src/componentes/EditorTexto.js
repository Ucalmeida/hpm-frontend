import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import {Editor} from '@tinymce/tinymce-react';
import {Botao} from "./index";
import {ExibirMensagem, xfetch} from "../util";
import {HttpVerbo, MSG} from "../util/Constantes";

function EditorTexto(props) {
    const editorRef = useRef(null);

    let listaCids = [];
    listaCids = localStorage.getItem("arrayCids");

    let consultaSelecionada = {
        idConsulta: '',
        idStatus: '',
        relato: '',
        CIDs: []
    }

    const handleBtnFinalizarConsulta = async (consultaId, statusId, cidsId) => {
        consultaSelecionada.idConsulta = consultaId;
        consultaSelecionada.idStatus = statusId;
        consultaSelecionada.CIDs = cidsId;
        if (editorRef.current) {
            consultaSelecionada.relato = editorRef.current.getContent();
        }
        console.log("Lista:", consultaSelecionada);
        await xfetch('/hpm/consulta/alterar-status', consultaSelecionada, HttpVerbo.POST)
            .then(json => {
                if(typeof json !== 'undefined' ? json.status === "OK" : false) {
                    ExibirMensagem('Consulta Salva Com Sucesso!', MSG.SUCESSO)
                }
            })
        window.close();
    }

    return (
        <>
            <Editor
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue="<p>Insira aqui o texto.</p>"
                init={{
                    height: 400,
                    menubar: props.menuBara,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
            <br />
            <Botao cor={props.corDoBotao} icone={props.icone} onClick={() => handleBtnFinalizarConsulta(props.idConsulta, Number("7"), props.cids)}>{props.nome}</Botao>
        </>
    )
};

EditorTexto.defaultProps = {
    menuBara : true
}
EditorTexto.propTypes = {
    menuBara : PropTypes.bool,
    corDoBotao: PropTypes.string,
    icone: PropTypes.string,
    nome: PropTypes.string,
    idConsulta: PropTypes.string,
    cids: PropTypes.array,
    funcao: PropTypes.func,
};

export {EditorTexto};
import { Editor } from '@tinymce/tinymce-react';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';

function EditorTexto(props) {
    const editorRef = useRef(null);

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
        </>
    )
};

EditorTexto.defaultProps = {
    menuBara : true
}
EditorTexto.propTypes = {
    menuBara : PropTypes.bool
};

export { EditorTexto };


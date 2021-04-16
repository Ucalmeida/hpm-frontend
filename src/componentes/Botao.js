import React from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Icone from "./Icone";

const icones = {
    facebook: 'fab fa-facebook',
    google: 'fab fa-google',
    googlePlus: 'fab fa-google-plus',
    salvar: 'far fa-save',
    imprimir: 'fas fa-print',
    pesquisar: 'fas fa-search',
    erro: 'far fa-times-circle',
    ok: 'far fa-check-circle'
};


const Botao = ({cor, tamanho, icone, carregando, disabled, className, onClick, children, ...props}) => {
        let iconeTemplate;
        let spinnerTemplate;
        let classe;

        const getTamanho = () => {
            switch (tamanho) {
                case 1:
                    return " btn-xs";
                case 2:
                    return " btn-sm";
                case 4:
                    return " btn-lg";
                case 5:
                    return " btn-xl";
                default: return "";
            }
        }
        if (icone && icones[icone]) {
            iconeTemplate = <Icone icone={icone}/>
                // <i className={`${icones[icone]} mr-2`} />;
        }

        if (carregando) {
            spinnerTemplate = (
                <Spinner
                    className="ml-2"
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
            );
        }
        if (className) classe = className; else classe = "";
    return(
        <Button
            {...props}
            variant={cor}
            className={classe+getTamanho()+" m-1"}
            disabled={carregando || disabled}
            onClick={onClick}
        >
            {iconeTemplate}
            {children}
            {spinnerTemplate}
        </Button>
    )
    };
export default Botao;


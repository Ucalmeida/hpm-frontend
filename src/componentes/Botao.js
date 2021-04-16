import React from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Icone from "./Icone";

const Botao = ({cor, tamanho, icone, carregando, disabled, className, onClick, children, ...otherProps}) => {
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
            {...otherProps}
            variant={cor}
            className={classe+getTamanho()+" m-1"}
            disabled={carregando || disabled}
            onClick={onClick}
        >
            {icone ? <Icone icone={icone} /> : ''}
            {children}
            {spinnerTemplate}
        </Button>
    )
    };
export default Botao;


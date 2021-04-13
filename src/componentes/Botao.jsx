import React from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

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

export default class Botao extends React.Component {

    render() {
        let iconeTemplate;
        let spinnerTemplate;


        const getTamanho = () => {
            switch (this.props.tamanho) {
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

        if (this.props.icone && icones[this.props.icone]) {
            iconeTemplate = <i className={`${icones[this.props.icone]} mr-2`} />;
        }

        if (this.props.isLoading) {
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
        return(
          <Button
              {...this.props}
              variant={this.props.cor}
              className={this.props.className+getTamanho()+" m-1"}
              disabled={this.props.isLoading || this.props.disabled}
          >
              {iconeTemplate}
              {this.props.children}
              {spinnerTemplate}
          </Button>
        );
    };
};



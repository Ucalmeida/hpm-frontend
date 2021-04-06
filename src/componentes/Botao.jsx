import React from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const icons = {
    facebook: 'fab fa-facebook',
    google: 'fab fa-google',
    googlePlus: 'fab fa-google-plus'
};

export default class Botao extends React.Component {
    constructor() {
        super();
    }

    render() {
        let tamanho;
        switch (this.props.tamanho) {
            case 1:
                tamanho = "btn-xs";
                break;
            case 2:
                tamanho = "btn-sm";
                break;
            case 4:
                tamanho = "btn-lg";
                break;
            case 5:
                tamanho = "btn-xl";
                break;
            default: tamanho = "";
        }


        return(
          <Button
              {...this.props}
              variant={this.props.cor}
              className={tamanho}
          >
              {this.props.children}
          </Button>
        );
    };
};




const AppButton = ({
    children,
    isLoading,
    icon,
    funcao,
    theme = 'primary',
    disabled,
    ...otherProps
}) => {
    let spinnerTemplate;
    let iconTemplate;

    if (isLoading) {
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

    if (icon && icons[icon]) {
        iconTemplate = <i className={`${icons[icon]} mr-2`} />;
    }

    return (
        // eslint-disable-next-line react/button-has-type
        <Button
            {...otherProps}
            variant={theme}
            disabled={isLoading || disabled}

        >
            {iconTemplate}
            {children}
            {spinnerTemplate}
        </Button>
    );
};
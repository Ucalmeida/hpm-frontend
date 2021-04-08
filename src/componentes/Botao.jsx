import React from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const icons = {
    facebook: 'fab fa-facebook',
    google: 'fab fa-google',
    googlePlus: 'fab fa-google-plus'
};

export default class Botao extends React.Component {

    render() {
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


        return(
          <Button
              {...this.props}
              variant={this.props.cor}
              className={this.props.className+getTamanho()+" m-1"}
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
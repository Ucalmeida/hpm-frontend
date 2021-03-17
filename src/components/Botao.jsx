import React from 'react';
import Botao from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const icons = {
    facebook: 'fab fa-facebook',
    google: 'fab fa-google',
    googlePlus: 'fab fa-google-plus'
};

const AppBotao = ({
    children,
    isLoading,
    icon,
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
        <Botao
            {...otherProps}
            variant={theme}
            disabled={isLoading || disabled}
        >
            {iconTemplate}
            {children}
            {spinnerTemplate}
        </Botao>
    );
};

export default AppBotao;

import React from "react";
import Pagina from "../componentes/pagina/Pagina";
import Accordion from "../componentes/Accordion";
import Card from "../componentes/Card";
import Botao from "../componentes/Botao";

export default class Principal extends React.Component {

    render() {
        let titulo = "Portal HPM";
        if (titulo != null) {
            titulo = titulo + " | " + titulo
        }
        document.getElementById('root').classList.remove('login-page');
        document.getElementById('root').classList.add('hold-transition','sidebar-mini','layout-fixed');
        window.document.title = titulo;
        return (
            <Pagina titulo="Bem Vindo">
                Página Prinipal
                <Accordion titulo="Teste" >
                    teste accordion
                </Accordion>
                <Card titulo="teste Card">
                    Tesde de Card
                </Card>
                <Botao cor="primary"> Teste de Botão</Botao>
            </Pagina>
        );
    }
};
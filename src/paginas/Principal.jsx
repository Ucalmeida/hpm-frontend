import React from "react";
import Pagina from "../componentes/pagina/Pagina";
import Accordion from "../componentes/Accordion";
import Card from "../componentes/Card";
import Botao from "../componentes/Botao";
import {Button, Tab, Tabs} from "react-bootstrap";
import {exibirMensagem} from "../util/Util";

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
            <Pagina titulo="Bem Vindo" subTitulo="Sub Titulo">
                <Accordion titulo="Teste" >
                    teste accordion
                </Accordion>
                <Card className="gradient-primary">teste
                    Tesde de Card <a href="#"><i className="fas fa-plus"> </i>Novo</a>
                </Card>
                <Card>

                <Tabs>
                    <Tab title="Aba1" eventKey="aba1">
                        adasdsasadd
                    </Tab>
                    <Tab title="Aba2" eventKey="aba2">
                        çlgkopdfg jpodfgjpdfgogj dfopgdf
                    </Tab>
                    <Tab title="Aba3" eventKey="aba3">
                        opgk podfgjiofdgf´g jdf´pgj ipdfg iosp´fj ´sps
                    </Tab>
                </Tabs>
                    <Botao onClick={() => exibirMensagem('titulo','corpo da mensagem')}>Bootbox</Botao>
                    <Button onClick={() => exibirMensagem('titulo','corpo da mensagem')}>Bootbox</Button>
                </Card>

            </Pagina>
        );
    }
};
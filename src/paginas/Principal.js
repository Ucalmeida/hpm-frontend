import React, {useState} from "react";
import Pagina from "../componentes/pagina/Pagina";
import Accordion from "../componentes/Accordion";
import Card from "../componentes/Card";
import Botao from "../componentes/Botao";
import {Tab, Tabs} from "react-bootstrap";
import {ExibirMensagem} from "../util/Util";

import Autocompletar from "../componentes/Autocompletar";
import Icone from "../componentes/Icone";
import {Tipo} from "../util/Constantes";

function Principal () {

    // render() {
        let titulo = "Portal HPM";
        if (titulo != null) {
            titulo = titulo + " | " + titulo
        }
        document.getElementById('root').classList.remove('login-page');
        document.getElementById('root').classList.add('hold-transition','sidebar-mini','layout-fixed');
        window.document.title = titulo;
        const retorno = (valor) => {
            console.log(valor)
        }


    let dispararMsg = () => {
          return ExibirMensagem("info","teste");
    }
        return (

            <Pagina titulo="Bem Vindo" subTitulo="Sub Titulo">
                <div className="col-12">
                    <Autocompletar name="pessoa" url="/hpm/pessoa/porNome/" retorno={retorno}/>

                </div>

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
                    <Botao icone={Tipo.ICONE.IMPRIMIR} onClick={dispararMsg}>teste</Botao>
                    <Botao icone={'fas fa-file-pdf'}>nada</Botao>
                    <Icone icone={Tipo.ICONE.ERRO} cor={Tipo.COR_TEXTO.PERIGO} id={"teste"}/>
                </Card>
            </Pagina>
        );
    // }
};

export default Principal;
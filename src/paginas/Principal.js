import React, {useState} from "react";
import Pagina from "../componentes/pagina/Pagina";
import Accordion from "../componentes/Accordion";
import Card from "../componentes/Card";
import {Tab, Tabs} from "react-bootstrap";
import {ExibirMensagem} from "../util/Util";

import Autocompletar from "../componentes/Autocompletar";
import {Tipo} from "../util/Constantes";
import {Botao} from "../componentes";

function Principal () {

    // render() {
        let titulo = "Portal HPM";
        if (titulo != null) {
            titulo = titulo + " | " + titulo
        }
        window.document.title = titulo;
        const retorno = (valor) => {
            console.log(valor)
        }

        const objetoTeste = {
            id: '69',
            nome: 'Adalgiza',
            dados: 'Sexagenária de 64 anos',
            texto: 'Muitas comobirdades e sarnagatcha',
    }

    let dispararMsg = () => {
          return ExibirMensagem("Mensagem do popup", Tipo.MSG.SUCESSO, objetoTeste,'TItulo bootbox',Tipo.ICONE.PESQUISAR);
    }
        return (

            <Pagina titulo="Bem Vindo" subTitulo="Sub Titulo">
                <div className="col-12">
                    <Autocompletar name="pessoa" url="/hpm/pessoa/porNome/" retorno={() => {}}/>

                </div>

                <Accordion titulo="Teste" >
                    teste accordion
                </Accordion>
                <Card className="gradient-primary">
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
                    <Botao  icone={'fas fa-arrow-left'} onClick={dispararMsg} cor={Tipo.COR_BOTAO.PERIGO}>teste</Botao>
                    <Botao icone={'fas fa-file-pdf'}>nada</Botao>
                </Card>
            </Pagina>
        );
    // }
};

export default Principal;
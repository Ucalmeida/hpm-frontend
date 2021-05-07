import React, {useState} from "react";
import {Tab, Tabs} from "react-bootstrap";
import {
    Accordion,
    Autocompletar,
    Botao,
    BotaoAlterar,
    BotaoEnviar,
    BotaoExcluir, BotaoImprimir, BotaoPesquisar, BotaoSalvar,
    Card,
    Icone,
    Pagina
} from "../componentes";
import {ExibirMensagem} from "../util";
import {BOTAO, ICONE, MSG} from "../util/Constantes";

function Principal () {

    // render() {

        const objetoTeste = {
            id: '69',
            nome: 'Adalgiza',
            dados: 'Sexagenária de 64 anos',
            texto: 'Muitas comobirdades e sarnagatcha',
    }

    let dispararMsg = () => {
          return ExibirMensagem("Mensagem do popup", MSG.SUCESSO, objetoTeste,'TItulo bootbox',ICONE.PESQUISAR);
    }
        return (

            <Pagina titulo="Bem Vindo" subTitulo="Sub Titulo">
                <div className="col-12">
                    <Autocompletar name="pessoa" url="/hpm/pessoa/porNome" retorno={() => {}}/>

                    <div className="col-12">
                        <Autocompletar name="pessoa" url="/hpm/pessoa/porNome/" retorno={() => {}}/>

                    </div>
                    <div className={"col-6"}>
                        <Card titulo={"Botões"}>
                            <BotaoAlterar onClick={dispararMsg} />
                            <BotaoEnviar onClick={dispararMsg} />
                            <BotaoExcluir onClick={dispararMsg} />
                            <BotaoImprimir onClick={dispararMsg} />
                            <BotaoPesquisar onClick={dispararMsg} />
                            <BotaoSalvar onClick={dispararMsg} />
                        </Card>
                    </div>
                    <div className={"col-6"}>
                        <Accordion titulo="Accordion" botaoFechar botaoMax>
                            teste accordion
                        </Accordion>
                    </div>
                </div>

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
                </Card>
            </Pagina>
        );
    // }
};

export default Principal;
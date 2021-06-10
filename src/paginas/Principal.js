import React from "react";
import {Tab, Tabs} from "react-bootstrap";
import {
    Accordion,
    Autocompletar,
    Botao,
    BotaoAlterar,
    BotaoEnviar,
    BotaoExcluir, BotaoImprimir, BotaoPesquisar, BotaoSalvar,
    Card, Icone,
    Pagina
} from "../componentes";
import {ExibirMensagem} from "../util";
import {BOTAO, ICONE, MSG, TEXTO} from "../util/Constantes";

export default function Principal () {

        const objetoTeste = {
            id: '69',
            nome: 'Adalgiza',
            dados: 'Sexagenária de 64 anos',
            texto: 'Muitas comobirdades e sarnagatcha',
    }

    const dispararMsg = () => {
          return ExibirMensagem("Mensagem do popup", MSG.SUCESSO, objetoTeste,'TItulo bootbox',ICONE.PESQUISAR);
    }
    return (

        <Pagina titulo="Bem Vindo" subTitulo="Sub Titulo">
            <div className="row">
                <div className="col-6">
                    <Card titulo={"Auto completar"}>
                        <Autocompletar name="pessoa" url="/hpm/pessoa/porNome/" retorno={() => {}}/>
                    </Card>
                </div>
                <div className={"col-6"}>
                    <Card titulo={"Botões"} botaoFechar>
                        <BotaoAlterar onClick={dispararMsg} />
                        <BotaoEnviar onClick={dispararMsg} />
                        <BotaoExcluir onClick={dispararMsg} />
                        <BotaoImprimir onClick={dispararMsg} />
                        <BotaoPesquisar onClick={dispararMsg} />
                        <BotaoSalvar onClick={dispararMsg} />
                        <Botao onClick={dispararMsg} icone={ICONE.PDF} tamanho={BOTAO.TAMANHO.GRANDE} cor={BOTAO.COR.INFO}>Custom</Botao>
                    </Card>
                </div>
                <div className={"col-6"}>
                    <Accordion titulo="Accordion" botaoFechar botaoMax>
                        Conteúdo
                    </Accordion>
                </div>
                <div className={"col-6"}>
                    <Card titulo="Ícones" className={"tese"}>
                        <Icone icone={ICONE.OK} cor={TEXTO.COR.SUCESSO} />
                        <Icone icone={ICONE.CANCELAR} cor={TEXTO.COR.PERIGO} />
                        <Icone icone={ICONE.LIMPAR} />
                        <Icone icone={ICONE.EXCLUIR} cor={TEXTO.COR.PERIGO} />
                        <Icone icone={ICONE.ENVIAR} cor={TEXTO.COR.PRIMARIO} />
                        <Icone icone={ICONE.IMPRIMIR} cor={TEXTO.COR.PRIMARIO} />
                        <Icone icone={ICONE.VOLTAR} cor={TEXTO.COR.SECUNDARIO} />
                        <Icone icone={ICONE.ALTERAR} cor={TEXTO.COR.ALERTA} />
                        <Icone icone={ICONE.SALVAR} cor={TEXTO.COR.SUCESSO} />
                        <Icone icone={"fas fa-bomb"} />
                        <Icone icone={"fas fa-user"} />
                        <Icone icone={"fas fa-user-cog"} />
                    </Card>
                </div>
                <div className={"col-6"}>

                    <Card titulo="Componentes genéricos">
                        <Tabs>
                            <Tab title="CadastrarNome" eventKey="aba1">
                                <p className='mt-1'>
                                    <small>Componente para cadastro de tabelas que so tem nome como campo preenchivel</small>
                                </p>
                                <mark>
                                    {"<CadastrarNome label='' labelListagem='' url='' urlListagem='' />"}
                                </mark>
                            </Tab>
                        </Tabs>
                    </Card>
                </div>
                <div className={"col-6"}>
                </div>
                <div className={"col-6"}>
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
};
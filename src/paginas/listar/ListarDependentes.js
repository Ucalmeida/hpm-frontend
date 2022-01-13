import {
    Autocompletar,
    Autocomplete, Botao,
    BotaoImprimir,
    BotaoPesquisar,
    Card,
    Pagina,
    Select,
    Tabela
} from "../../componentes";
import React, {useEffect, useState, ReactDOM} from "react";
import {HttpVerbo, MSG} from "../../util/Constantes";
import {ExibirMensagem, xfetch} from "../../util";
import {element} from "prop-types";

export default function ListarDependentes() {
    const [objeto, setObjeto] = useState({
        idDependente: null,
        idPessoa: null,
        idTipoDependencia: null,
        pessoaDependentes: []
    })

    const [list, setList] = useState({
        dependentes: []
    })



    function limparCampoId(id){
        document.getElementById(id).value = null;
    }

    let url = ''

    if(objeto.idDependente !== null && objeto.idPessoa === null && objeto.idTipoDependencia === null){
        url = '/hpm/dependente/dep/' + objeto.idDependente + '/opcoes'
    }

    if(objeto.idDependente === null && objeto.idPessoa !== null && objeto.idTipoDependencia === null){
        url = '/hpm/dependente/tit/' + objeto.idPessoa + '/opcoes'
    }

    if(objeto.idDependente === null && objeto.idPessoa === null && objeto.idTipoDependencia !== null){
        url = '/hpm/dependente/tipoDependencia/' + objeto.idTipoDependencia + '/opcoes'
    }

    if(objeto.idDependente === null && objeto.idPessoa !== null && objeto.idTipoDependencia !== null){
        url = '/hpm/dependente/titular/tipoDependencia/' + objeto.idPessoa + '/' + objeto.idTipoDependencia + '/opcoes'
    }




     let valor = ''
     let selecao = ''
    var opcaoTxt = ''
    const listarDependentes = () => {
        xfetch(url, {objeto}, HttpVerbo.GET)
            .then(res => res.json())
            .then(lista => {
                setList({...list, dependentes: lista.resultado});

                if(lista.status === "OK") {
                    if(objeto.idDependente !== null  && objeto.idPessoa === null && objeto.idTipoDependencia === null){
                        limparCampoId("iddepAuto")
                        limparCampoId('iddep')
                        objeto.idDependente = null
                    }
                    if(objeto.idDependente === null && objeto.idPessoa !== null && objeto.idTipoDependencia === null){
                        console.log(objeto.idDependente)
                        limparCampoId('idtitAuto')
                        limparCampoId('idtit')
                        objeto.idPessoa = null
                    }

                    if(objeto.idDependente === null && objeto.idPessoa === null && objeto.idTipoDependencia !== null){
                        limparCampoId('iddepAuto')
                        limparCampoId('iddep')
                        selecao = document.getElementById('idTipoDependencia')
                    }
                }else{
                    limparCampoId('iddepAuto')
                    limparCampoId('idtitAuto')
                    ExibirMensagem('Não existem resultados para essa pesquisa!', MSG.ERRO)
                }
            })
    }

    const colunas = [
        {text: "Nome do Dependente"},
        {text: "CPF do Dependente"},
        {text: "Nome do Titular"},
        {text: "CPF do Titular"}
    ]

    const dados = () => {
        console.log(list.dependentes)
        return (
            typeof list.dependentes != 'undefined' ? list.dependentes.map((dependente, indice) => {
                    return ({
                        'nome_do_dependente': dependente.texto,
                        'cpf_do_dependente': dependente.texto2,
                        'nome_do_titular': dependente.texto3,
                        'cpf_do_titular': dependente.texto4
                    })
                }
            ) : ''
        )
    }

    const selecionarDependente = (e) => {
        let idDep = document.getElementById('iddep').value;
        setObjeto({...objeto, idDependente: idDep});
    }

    const selecionarTitular = (e) => {
        let idTit = document.getElementById('idtit').value;
        setObjeto({...objeto, idPessoa: idTit});
    }

    const handleTipoDependencia = (e) => {
        const idTipoDependencia = e.value;
        setObjeto({...objeto, idTipoDependencia: idTipoDependencia});
    }

    return (
        <Pagina titulo="Listar Dependentes">

            <div id="form" className={"row"}>
                <Card titulo="Listar">

                    <Autocompletar
                        name="dep"
                        url="/hpm/pessoa/"
                        label="Por Dependente:"
                        placeholder="Nome ou CPF aqui"
                        tamanho={6}
                        retorno={selecionarDependente}
                    />

                    <Autocompletar
                        name="tit"
                        url="/hpm/pessoa/"
                        label="Por Titular:"
                        placeholder="Nome ou CPF aqui"
                        tamanho={6}
                        retorno={selecionarTitular}
                    />

                    <label>Por Tipo de Dependência</label>

                    <Select
                        url={"/hpm/tipo/opcoes/30"}
                        nome={"idTipoDependencia"}
                        funcao={handleTipoDependencia}
                    />

                    <div className="col-lg-4 mt-4 mb-4">
                        <BotaoImprimir onClick={listarDependentes}>Listar</BotaoImprimir>
                    </div>

                </Card>
            </div>

            <div id="tab" className={"row"}>
                <Card titulo="Lista de dependentes">
                    <Tabela colunas={colunas} dados={dados()}/>
                </Card>
            </div>
        </Pagina>
    );

}
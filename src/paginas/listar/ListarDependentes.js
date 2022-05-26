import {
    Autocompletar,
    Card,
    Pagina,
    Tabela
} from "../../componentes";
import React, {useState} from "react";
import {HttpVerbo, MSG} from "../../util/Constantes";
import {ExibirMensagem, xfetch} from "../../util";

export default function ListarDependentes() {
    const [objeto, setObjeto] = useState({
        idPessoa: null
    })

    const [list, setList] = useState({
        dependentes: []
    })

    function limparCampoId(id){
        document.getElementById(id).value = "";
    }

    const colunas = [
        {text: "Nome do Dependente"},
        {text: "CPF do Dependente"},
        {text: "Nome do Titular"},
        {text: "CPF do Titular"},
        {text: "Tipo de Dependência"}
    ]

    const dados = () => {
        return (
            typeof list.dependentes != 'undefined' ? list.dependentes.map((dependente, indice) => {
                    return ({
                        'nome_do_dependente': dependente.texto,
                        'cpf_do_dependente': dependente.texto2,
                        'nome_do_titular': dependente.texto3,
                        'cpf_do_titular': dependente.texto4,
                        'tipo_de_dependencia': dependente.texto5
                    })
                }
            ) : ''
        )
    }

    const listarDependentes = () => {
        xfetch('/hpm/dependente/tit/' + objeto.idPessoa + '/opcoes',{}, HttpVerbo.GET)
            .then(res => res.json())
            .then(lista => {
                if(lista.status == 'OK'){
                    setList({...list, dependentes: lista.resultado})
                }else{
                    setList({...list, dependentes: []})
                    ExibirMensagem('Não existem resultados para essa pesquisa!', MSG.ALERTA)
                 //   limparCampoId('idpessoaAuto')
                }
            })
    }

    const selecionarPessoa = (e) => {
        objeto.idPessoa = e
        listarDependentes()
    }

    return (
        <Pagina titulo="Listar Dependentes">

            <div id="form" className={"row"}>
                <Card titulo="Listar">
                    <div>
                        <Autocompletar
                            name="pessoa"
                            url="/hpm/pessoa/"
                            label="Nome ou CPF:"
                            placeholder="Nome ou CPF aqui"
                            tamanho={6}
                            retorno={selecionarPessoa}

                        />
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
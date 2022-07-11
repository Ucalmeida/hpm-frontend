import {
    Autocompletar,
    Card,
    Pagina,
    Tabela
} from "../../componentes";
import React, {useEffect, useState} from "react";
import {HttpVerbo, MSG} from "../../util/Constantes";
import {ExibirMensagem, xfetch} from "../../util";
import {tab} from "@testing-library/user-event/dist/tab";

export default function ListarDependentes() {
    const [objeto, setObjeto] = useState({
        idPessoa: null
    })

    let [result, setResult] = useState({
        prm: ''
    })

    const [list, setList] = useState({
        dependentes: []
    })

    const colunas = [
        {text: "Nome do Dependente"},
        {text: "CPF do Dependente"},
        {text: "Nome do Titular"},
        {text: "CPF do Titular"},
        {text: "Tipo de Dependência"}
    ]

    let dados = () => {
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

    useEffect(() => {
        setList({...list,dependentes: []})
    }, [result.prm])

    const listarDependentes = () => {
                xfetch('/hpm/dependente/tit/' + objeto.idPessoa + '/opcoes',{}, HttpVerbo.GET)
                    .then(res => res.json())
                    .then(lista => {
                        if(lista.status == 'OK' && result.prm > 0){
                            setList({...list, dependentes: lista.resultado})
                        }
                        if(lista.status == 'SEM_RESULTADOS' && result.prm > 0){
                            setList({...list, dependentes: []})
                            ExibirMensagem('Não existem resultados para essa pesquisa!', MSG.ALERTA)
                        }
                    })
     }

    const selecionarPessoa = (e) => {
         objeto.idPessoa = e
         listarDependentes()
    }

    const minhaFuncao = (parametro) =>{
         setResult({...result, prm: parametro})
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
                            changeResultado={minhaFuncao}
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
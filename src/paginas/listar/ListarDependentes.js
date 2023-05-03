import {Autocompletar, Card, Pagina, Tabela} from "../../componentes";
import React, {useEffect, useState} from "react";
import {HttpVerbo} from "../../util/Constantes";
import {xfetch} from "../../util";
import { temPermissao } from '../../util/Util';

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

    const selecionarPessoa = (idpessoa) => {
        objeto.idPessoa = idpessoa;
        listarDependentes();
    }

    const minhaFuncao = (parametro) => {
        setResult({...result, prm: parametro});
    }

    const colunas = [
        {text: "Nome do Dependente"},
        {text: "CPF do Dependente"},
        {text: "Nome do Titular"},
        {text: "CPF do Titular"},
        {text: "Tipo de Dependência"}
    ]

    let dados = () => {
        return (
            typeof list.dependentes !== 'undefined' ? list.dependentes.map((dependente, indice) => {
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
        xfetch('/hpm/dependente/tit/' + objeto.idPessoa + '/opcoes', {}, HttpVerbo.GET)
            .then(res => res.json())
            .then(lista => {
                if (typeof lista.status !== "undefined" ? lista.status === 'OK' : false) {
                    setList({...list, dependentes: lista.resultado})
                }
            })
    }

    useEffect(() => {
        setList({...list, dependentes: []})
    }, [result.prm])

    if (temPermissao("/listar/listarDependentes")) {
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
                        <Tabela colunas={colunas} dados={dados()} pageSize={5} />
                    </Card>
                </div>
            </Pagina>
        );
    }
}
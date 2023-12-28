import {Card, Pagina, Select, Tabela} from "../../componentes";
import React, {useState} from "react";
import {HttpVerbo, MSG} from "../../util/Constantes";
import {ExibirMensagem, xfetch} from "../../util";

export default function ListarProfissionaisSaude() {
    const objeto = {};

    const [lista, setLista] = useState({
        medicos: []
    })

    const handleEspecialidade = (e) => {
        objeto.idEspecialidade = e.value;
        listarProfissionalPorEspecialidade();
    }

    const listarProfissionalPorEspecialidade = () => {
        xfetch('/hpm/profissionalSaude/' + objeto.idEspecialidade + '/opcoes', {objeto}, HttpVerbo.GET)
            .then(res => res.json())
            .then(lista => {
                setLista({...lista, medicos: lista.resultado})
                if (lista.resultado.length === 0) {
                    ExibirMensagem("Sem Resultados. Escolha outra especialidade.", MSG.ERRO);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    const colunas = [
        {text: "Nome"},
        {text: "Celular"},
        {text: "Email"},
        {text: "Conselho"}
    ]

    const dados = () => {
        if(typeof(lista.medicos) !== "undefined") {
            return(
                lista.medicos.map((medico, indice) => {
                    let conselhos = [
                        medico.conselho != null ? medico.conselho : '',
                        medico.coren != null ? medico.coren : '',
                        medico.crefito != null ? medico.crefito : '',
                        medico.conter != null ? medico.conter : ''
                    ];
                    return({
                        'nome': medico.texto,
                        'celular': medico.celular,
                        'email': medico.email,
                        'conselho': conselhos[0] + "\n" +
                                    conselhos[1] + "\n" +
                                    conselhos[2] + "\n" +
                                    conselhos[3]
                    })
                })
            )
        }
    }

    return(
        <Pagina titulo="Listar Médicos">
            <div className={"row"}>
                <div className={"col-lg-12"}>
                    <Card titulo="Listar">
                        <div className={"row"}>
                            <div className={"col-lg-12"}>
                                <label>Selecionar Especialidade</label>
                                <Select
                                    url={"/hpm/especialidade/opcoes"}
                                    nome={"idEspecialidade"}
                                    funcao={handleEspecialidade}
                                />
                            </div>
                        </div>
                    </Card>
                    <Card titulo="Lista de médicos por especialidade">
                        <Tabela colunas={colunas} dados={dados()} pageSize={5} />
                    </Card>
                </div>
            </div>
        </Pagina>
    );
}
import {Card, Pagina, Select, Tabela} from "../../componentes";
import React, {useState, useEffect} from "react";
import {HttpVerbo} from "../../util/Constantes";
import {xfetch} from "../../util";

export default function ListarProfissionaisSaude() {
    const [objeto, setObjeto] = useState({
        profissionais: []
    });

    const [lista, setLista] = useState({
        medicos: []
    })

    const handleEspecialidade = (e) => {
        const idEspecialidade = e.value;
        setObjeto({...objeto, idEspecialidade: idEspecialidade});
    }

    useEffect(() => {
        if(typeof(objeto.idEspecialidade) !== undefined) {
            listarProfissionalPorEspecialidade();
        }
        console.log("UseEffect", objeto)
    }, [objeto])

    const listarProfissionalPorEspecialidade = () => {
        console.log("Objeto", objeto);
        xfetch('/hpm/profissionalSaude/' + objeto.idEspecialidade + '/opcoes', {objeto}, HttpVerbo.GET)
            .then(res => res.json())
            .then(lista => {
                setLista({...lista, medicos: lista.resultado})
                console.log("Lista", lista);
            })
    }

    const colunas = [
        {text: "ID"},
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
                    console.log("Conselhos", conselhos);
                    console.log("Indice", indice);
                    return({
                        'id': medico.valor,
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
                        <Tabela colunas={colunas} dados={dados()} />
                    </Card>
                </div>
            </div>
        </Pagina>
    );
}
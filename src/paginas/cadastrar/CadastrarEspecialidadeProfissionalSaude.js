import React, {useEffect, useState} from "react";
import {Autocomplete} from "../../componentes/form";
import {Card, Pagina, Tabela} from "../../componentes";
import {xfetch} from "../../util";
import {HttpVerbo} from "../../util/Constantes";

export default function CadastrarEspecialidadeProfissionalSaude() {
    const [objeto, setObjeto] = useState({});

    const [lista, setLista] = useState({
        especialidades: []
    })

    const handleSelecionarPessoa = (e) => {
        const idPessoa = e.value;
        setObjeto({...objeto, idPessoa: idPessoa})
    }

    useEffect(() => {
        if(typeof(objeto.idEspecialidade) !== undefined) {
            listarEspecialidadePorProfissional();
        }
        console.log("UseEffect", objeto)
    }, [objeto])

    const listarEspecialidadePorProfissional = () => {
        console.log("Objeto", objeto);
        xfetch('/hpm/profissionalSaude/' + objeto.idPessoa + '/opcoes', {objeto}, HttpVerbo.GET)
            .then(res => res.json())
            .then(lista => {
                setLista({...lista, especialidades: lista.resultado})
            })
    }

    const colunas = [
        {text: "Especialidade"}
    ]

    const dados = () => {
        if(typeof(lista.especialidades) !== "undefined") {
            return(
                lista.especialidades.map((especialidade, indice) => {
                    return({
                        'especialidade': especialidade.texto
                    })
                })
            )
        }
    }

    return(
        <Pagina titulo="Cadastrar Especialidade Profissional de Saúde">
            <div className={"row"}>
                <div className="col-lg-12">
                    <Card titulo="Cadastrar">
                        <Autocomplete
                            tamanho="6"
                            url="/hpm/pessoa/"



                            name="idPessoa"
                            label="Digite os Dados:"
                            placeholder="Digite os dados aqui"
                            onSelect={handleSelecionarPessoa} />
                    </Card>
                    <Card titulo="Lista de especialidades por profissional de saúde">
                        <Tabela colunas={colunas} dados={dados()} />
                    </Card>
                </div>
            </div>
        </Pagina>
    );
}
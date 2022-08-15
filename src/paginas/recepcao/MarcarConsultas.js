import React, {useEffect, useState} from "react";
import {Select} from "../../componentes/form";
import {xfetch} from "../../util";
import {BOTAO, HttpVerbo} from "../../util/Constantes";
import {Botao, Card, Pagina, Tabela} from "../../componentes";

export default function MarcarConsultas() {
    const objeto = {};

    const [lista, setLista] = useState({
        medicos: []
    });

    const handleEspecialidade = (e) => {
        objeto.idEspecialidade = e.value;
        console.log('idEspecialidade:', objeto.idEspecialidade);
        console.log(localStorage.getItem('login'));
        console.log(localStorage.getItem('usuario'));
        listarPacientesPorEspecialidade();
    }

    const listarPacientesPorEspecialidade = () => {
        xfetch('/hpm/consultorioBloco/' + objeto.idEspecialidade + '/opcoes', {}, HttpVerbo.GET)
            .then(res => res.json())
            .then(lista => {
                setLista({...lista, medicos: lista.resultado})
            })
    };

    const colunas =[
        {text: "Nome"},
        {text: "Início"},
        {text: "Término"},
        {text: "Vagas"},
        {text: "Ações"}
    ]

    const dados = () => {
        if(typeof(lista.medicos) !== "undefined") {
            return(
                lista.medicos.map((medico) => {
                    return({
                        'nome': medico.texto,
                        'inicio': medico.texto2,
                        'termino': medico.texto3,
                        'vagas': medico.texto4,
                        'acoes': <div>
                            <Botao cor={BOTAO.COR.PRIMARIO}>Ver Pacientes</Botao>
                            <Botao cor={BOTAO.COR.ALERTA}>Urgência</Botao>
                        </div>
                    })
                })
            )
        }
    }
// onClick={handleBtnConfirmar.bind(consulta.id)} value={consulta.id}
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
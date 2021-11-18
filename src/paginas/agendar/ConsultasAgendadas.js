import {Card, Pagina, Tabela} from "../../componentes";
import React, {useEffect, useState} from "react";
import {xfetch} from "../../util";
import {HttpVerbo} from "../../util/Constantes";
// import {SuiteResult as consultasAgendadas} from "jest-jasmine2/build/jasmine/Suite";

export default function ConsultasAgendadas() {

    const [objeto, setObjeto] = useState(
        {
            // idPessoa: null,
            // idConsultorioBloco: null,
            // idProfissional: null,
            // idEspecialidade: null,
            // profissionais: [],
            // consultoriosBloco: [],
            pessoas:[]
        }
    )

    // const [lista, setLista] = useState({
    //     consultasAgendadas: []
    // });

    useEffect(() => {
        xfetch('/hpm/pessoa/pessoaLogada', {}, HttpVerbo.GET)
            .then(response => response.json())
            .then(pessoas => setObjeto({...objeto, pessoas: pessoas.resultado}))
    },[])

    console.log(objeto);

    // const colunas = [
    //     {text: "Paciente"},
    //     {text: "Data-Hora" },
    //     {text: "Especialidade"},
    //     {text: "Médico" },
    //     {text: "Piso"},
    //     {text: "Sala"},
    //     {text: "Ações" },
    //
    // ]
    //
    // const dados = () => {
    //     return(
    //         lista.consultasAgendadas.map((consulta) => {
    //             return({
    //                 'id': consultasAgendadas.valor,
    //                 'paciente': consultasAgendadas.nmPaciente,
    //                 'data__hora': consultasAgendadas.dtHora,
    //                 'especialidade': consultasAgendadas.nmEspecialidade,
    //                 'medico': consultasAgendadas.nmMedico,
    //                 'piso': consultasAgendadas.piso,
    //                 'sala': consultasAgendadas.sala
    //                 // 'acoes': btn1 + btn2
    //             })
    //         })
    //     )
    // }

    return(
        <Pagina titulo={"Consultas Agendadas"}>
            <div className="row">
                <div className={"col-lg-12"}>
                    <Card titulo={"Ver Consultas Agendadas"}>
                        <h1>
                            Consultas Virão aqui. Lembrar que deve aparecer as consultas agendadas
                            do Titular e seus Dependentes
                        </h1>
                        {/*
                            Na tabela Consulta, pela pessoa Logada
                            vai pegar o id de Consultório, caso o Status seja 5(Agendado)
                            Na tabela Consultório vai obter a Data e a Hora de início e término da consulta
                            a especialidade, o Profissional de saúde, a Sala e o Piso
                            o Status(Se Ativo) E coloca como opções as ações(Impressão ou Cancelamento)
                            No caso de Cancelamento, modificar o Status na tabela Consulta para Cancelada
                        */}

                        {/*<Card titulo="Consultas agendadas">*/}
                        {/*    <Tabela colunas={colunas} dados={dados()} />*/}
                        {/*</Card>*/}
                    </Card>
                </div>
            </div>
        </Pagina>
    );
}
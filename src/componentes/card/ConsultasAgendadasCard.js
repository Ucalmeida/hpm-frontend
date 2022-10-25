import React, {useEffect, useState} from "react";
import {Botao, Card, Tabela} from "../index";
import {ExibirMensagem, xfetch} from "../../util";
import {BOTAO, HttpVerbo, MSG} from "../../util/Constantes";

export default function ConsultasAgendadasCard() {
    const [apagar, setApagar] = useState(false);

    const idPessoa = localStorage.getItem('id');

    const [lista, setLista] = useState({
        consultas: [
            {
                id: "",
                nmPaciente: "",
                cpfPaciente: "",
                dtHora: "",
                nmEspecialidade: "",
                nmMedico: "",
                sala: "",
                piso: "",
                status: "",
                acoes: ""
            }
        ]
    })

    let consultaSelecionada = {
        idConsulta: '',
        idStatus: ''
    }

    function handleBtnImprimir(consulta) {
        localStorage.setItem('pacienteConsulta', consulta.id);
        localStorage.setItem('nmPaciente', consulta.nmPaciente);
        localStorage.setItem('cpfPaciente', consulta.cpfPaciente);
        localStorage.setItem('nmCelular', consulta.nmCelular);
        localStorage.setItem('dtHora', consulta.dtHora);
        localStorage.setItem('nmEspecialidade', consulta.nmEspecialidade);
        localStorage.setItem('nmMedico', consulta.nmMedico);
        localStorage.setItem('sala', consulta.sala);
        localStorage.setItem('piso', consulta.piso);
        localStorage.setItem('nmStatus', consulta.nmStatus);
        window.open("/agendar/consultasAgendadasImprimir");
    }

    const handleBtnCancelar = async (consultaId, statusId) => {
        consultaSelecionada.idConsulta = consultaId;
        consultaSelecionada.idStatus = statusId;
        await xfetch('/hpm/consulta/alterar-status', consultaSelecionada, HttpVerbo.POST)
            .then( json =>{
                    if(json.status === "OK"){
                        ExibirMensagem('Consulta Alterada Com Sucesso!', MSG.SUCESSO)
                    }else{
                        ExibirMensagem(json.message, MSG.ERRO)
                    }
                }
            )
        setApagar(!apagar);
    }

    useEffect(() => {
        xfetch('/hpm/consulta/agendadas/' + idPessoa, {}, HttpVerbo.GET)
            .then(response => response.json())
            .then(lista => setLista({...lista, consultas: lista.resultado}))
    }, [apagar])

    const colunas = [
        {text: "Paciente"},
        {text: "CPF do Paciente"},
        {text: "Data - Hora"},
        {text: "Especialidade"},
        {text: "Médico"},
        {text: "Sala"},
        {text: "Piso"},
        {text: "Status"},
        {text: "Ações"}
    ]

    const dados = () => {
        return(
            lista.consultas.map((consulta) => {
                return({
                    'paciente': consulta.nmPaciente,
                    'cpf_do_paciente': consulta.cpfPaciente,
                    'data__hora': consulta.dtHora,
                    'especialidade': consulta.nmEspecialidade,
                    'medico': consulta.nmMedico,
                    'sala': consulta.sala,
                    'piso': consulta.piso,
                    'status': consulta.nmStatus,
                    'acoes': <div>
                        <Botao onClick={() => handleBtnImprimir(consulta)}>Imprimir</Botao>
                        <Botao cor={BOTAO.COR.ALERTA} onClick={() => handleBtnCancelar(consulta.id, Number("8"))} value={consulta.id}>Cancelar</Botao>
                    </div>
                })
            })
        )
    }

    return(
        <Card titulo="Consultas Agendadas">
            <Tabela colunas={colunas} dados={dados()} />
        </Card>
    );
}
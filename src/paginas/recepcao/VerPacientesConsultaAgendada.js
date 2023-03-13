import {Botao, Card, Pagina, Tabela} from "../../componentes";
import {BOTAO, HttpVerbo, MSG} from "../../util/Constantes";
import React, {useEffect, useState} from "react";
import {ExibirMensagem, xfetch} from "../../util";

export default function VerPacientesConsultaAgendada() {
    const [apagar, setApagar] = useState(false);

    const [lista, setLista] = useState({
        pacientes: []
    });

    const consultaAgendada = {
        idConsultorioBloco: localStorage.getItem('consultorioBloco')
    }

    let consultaSelecionada = {
        idConsulta: '',
        idStatus: ''
    }

    const handleBtnImprimir = async (paciente) => {
        localStorage.setItem('pacienteConsulta', paciente.id);
        localStorage.setItem('nmPaciente', paciente.nmPaciente);
        localStorage.setItem('cpfPaciente', paciente.cpfPaciente);
        localStorage.setItem('nmCelular', paciente.nmCelular);
        localStorage.setItem('dtHora', paciente.dtHora);
        localStorage.setItem('nmEspecialidade', paciente.nmEspecialidade);
        localStorage.setItem('nmMedico', paciente.nmMedico);
        localStorage.setItem('sala', paciente.sala);
        localStorage.setItem('piso', paciente.piso);
        localStorage.setItem('nmStatus', paciente.nmStatus);
        window.open("/agendar/consultasAgendadasImprimir");
    }

    const handleBtnCancelar = async (pacienteId, statusId, pacienteStatusId) => {
        consultaSelecionada.idConsulta = pacienteId;
        consultaSelecionada.idStatus = statusId;
        if (pacienteStatusId === statusId) {
            ExibirMensagem('Consulta já foi Cancelada!', MSG.ALERTA);
        } else {
            await xfetch('/hpm/consulta/alterar-status', consultaSelecionada, HttpVerbo.POST)
                .then( json =>{
                        if(typeof json !== "undefined" ? json.status === "OK" : false){
                            ExibirMensagem('Consulta Alterada Com Sucesso!', MSG.SUCESSO);
                        }
                    }
                )
            setApagar(!apagar);
        }
    }

    useEffect(() => {
        xfetch('/hpm/consulta/' + consultaAgendada.idConsultorioBloco + '/opcoes', {}, HttpVerbo.GET)
            .then(res => res.json())
            .then(json => {
                    setLista({...lista, pacientes: json.resultado})
                }
            )
    }, [apagar])


    const colunas =[
        {text: "Nome"},
        {text: "Telefone"},
        {text: "Atendimento"},
        {text: "Ações"}
    ]

    const dados = () => {
        if(typeof(lista.pacientes) !== "undefined") {
            return(
                lista.pacientes.map((paciente) => {
                    return({
                        'nome': paciente.nmPaciente,
                        'telefone': paciente.nmCelular,
                        'atendimento': paciente.nmStatus,
                        'acoes': <div>
                            <Botao onClick={() => handleBtnImprimir(paciente)}>Imprimir</Botao>
                            <Botao cor={BOTAO.COR.ALERTA} onClick={() => handleBtnCancelar(paciente.id, Number("8"), paciente.idStatus)} value={paciente.id}>Cancelar</Botao>
                        </div>
                    })
                })
            )
        }
    }

    return(
        <Pagina titulo="Listar Pacientes por Médico">
            <div className={"row"}>
                <div className={"col-lg-12"}>
                    <Card>
                        <div className={"info-box"}>
                            <div className="info-box-content">
                                <span className="info-box-text" _msthash="2400268"
                                      _msttexthash="134784">Especialidade</span>
                                <span className="info-box-number" _msthash="2400424"
                                      _msttexthash="28353">{localStorage.getItem("nmEspecialidade")}</span>
                            </div>
                            <div className="info-box-content">
                                <span className="info-box-text" _msthash="2400268"
                                      _msttexthash="134784">Médico</span>
                                <span className="info-box-number" _msthash="2400424"
                                      _msttexthash="28353">{localStorage.getItem("nmMedico")}</span>
                            </div>
                            <div className="info-box-content">
                                <span className="info-box-text" _msthash="2400268"
                                      _msttexthash="134784">Data - Hora</span>
                                <span className="info-box-number" _msthash="2400424"
                                      _msttexthash="28353">{localStorage.getItem("dtHora")}</span>
                            </div>
                        </div>
                    </Card>
                    <Card titulo="Lista de pacientes por médico">
                        <Tabela colunas={colunas} dados={dados()} pageSize={5} />
                    </Card>
                </div>
            </div>
        </Pagina>
    );
}
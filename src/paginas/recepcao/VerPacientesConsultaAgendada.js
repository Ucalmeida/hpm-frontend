import {Botao, Card, Pagina, Tabela} from "../../componentes";
import {BOTAO, HttpVerbo} from "../../util/Constantes";
import React, {useEffect, useState} from "react";
import {xfetch} from "../../util";

export default function VerPacientesConsultaAgendada() {
    const [lista, setLista] = useState({
        pacientes: []
    });

    const consultaAgendada = {
        idConsultorioBloco: localStorage.getItem('consultorioBloco')
    }

    const handleBtnConfirmar = async (consultorioBlocoId) => {
        // window.open("/agendar/consultasAgendadasImprimir");
        alert('Passou!!');
        console.log('Lista1:', lista);
    }

    const handleBtnUrgencia = async (consultorioBlocoId) => {
        alert("Urgente!!!");
        console.log("Lista2:", lista);
    }

    useEffect(() => {
        xfetch('/hpm/consulta/' + consultaAgendada.idConsultorioBloco + '/opcoes', {}, HttpVerbo.GET)
            .then(res => res.json())
            .then(json => {
                    setLista({...lista, pacientes: json.resultado})
                }
            )
    }, [])

    console.log("O que vem na lista:", lista);

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
                            <Botao cor={BOTAO.COR.INFO} onClick={() => handleBtnConfirmar(paciente.valor)} value={paciente.valor}>Ver Pacientes</Botao>
                            <Botao cor={BOTAO.COR.ALERTA} onClick={() => handleBtnUrgencia(paciente.valor)} value={paciente.valor}>Urgência</Botao>
                        </div>
                    })
                })
            )
        }
    }

    return(
        <Pagina titulo="Listar Pacientes">
            <div className={"row"}>
                <div className={"col-lg-12"}>
                    <Card titulo="Lista de pacientes por médico">
                        <Tabela colunas={colunas} dados={dados()} />
                    </Card>
                </div>
            </div>
        </Pagina>
    );
}
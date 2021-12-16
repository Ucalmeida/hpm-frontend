import { useEffect, useState } from "react";
import { Pagina, Card, Select, Botao, Tabela } from "../../componentes";
import { xfetch } from "../../util";
import { BOTAO, HttpVerbo } from "../../util/Constantes";

export default function ConsultasAgendadas() {
    
    const handleBtnImprimir = () => {
        alert('Conteúdo Impresso');
    }

    const handleBtnCancelar = () => {
        alert('Consulta Cancelada');
    }

    const acoes = <div>
                        <Botao cor={BOTAO.COR.PRIMARIO} onClick={handleBtnImprimir}>Imprimir</Botao>
                        <Botao cor={BOTAO.COR.ALERTA} onClick={handleBtnCancelar}>Cancelar</Botao>
                    </div>;

    const idPessoa = localStorage.getItem('id');

    const [lista, setLista] = useState({
        consultas: [
            {
                nmPaciente: "",
                cpfPaciente: "",
                dtHora: "",
                nmEspecialidade: "",
                nmMedico: "",
                sala: "",
                piso: "",
                status: "",
                acoes: acoes
            }
        ]
    })

    useEffect(() => {
        xfetch('/hpm/consulta/agendadas/' + idPessoa, {}, HttpVerbo.GET)
            .then(response => response.json())
            .then(lista => setLista({...lista, consultas: lista.resultado}))
    }, [])

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
                        'id': consulta.valor,
                        'paciente': consulta.nmPaciente,
                        'cpf_do_paciente': consulta.cpfPaciente,
                        'data__hora': consulta.dtHora,
                        'especialidade': consulta.nmEspecialidade,
                        'medico': consulta.nmMedico,
                        'sala': consulta.sala,
                        'piso': consulta.piso,
                        'status': consulta.nmStatus,
                        'acoes': acoes
                    })
                })
            )
    }

    return(
        <Pagina titulo="Consultas Agendadas">
            <div className="row">
                <div className="col-lg-12">
                    <Card titulo="Consultas Agendadas">
                        <Tabela colunas={colunas} dados={dados()} />
                    </Card>
                </div>
            </div>
        </Pagina>
    );
}
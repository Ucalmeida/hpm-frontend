import {BotaoImprimir, Card, Pagina} from "../../componentes";
import React, {Fragment, useRef} from "react";
import logoHPM from "../../img/brasoes/brasao_hpm.png";
import {Link} from "react-router-dom";
import ReactToPrint, {useReactToPrint} from "react-to-print";

const ConsultasAgendadasImprimir = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const consultaAgendada = {
        idConsulta: localStorage.getItem('pacienteConsulta'),
        nmPaciente: localStorage.getItem('nmPaciente'),
        cpfPaciente: localStorage.getItem('cpfPaciente'),
        nmCelular: localStorage.getItem('nmCelular'),
        dtHora: localStorage.getItem('dtHora'),
        nmEspecialidade: localStorage.getItem('nmEspecialidade'),
        nmMedico: localStorage.getItem('nmMedico'),
        sala: localStorage.getItem('sala'),
        piso: localStorage.getItem('piso'),
        status: localStorage.getItem('nmStatus')
    }
    return (
        <Pagina titulo="Imprimir Consultas Agendadas">
            <div className="row">
                <div className="col-lg-12">
                        <Card titulo="Imprimir Consultas Agendadas">
                            <ReactToPrint ref={componentRef}>
                                <div>
                                    <div className="login-logo">
                                        <Link to="/">
                                            <img src={logoHPM}  alt={"Brasão"}/>
                                        </Link>
                                    </div>
                                    <h4 style={{textAlign: 'center'}}><b>HOSPITAL DA POLÍCIA MILITAR DO ESTADO DE SERGIPE<br />
                                        SISTEMA DE AGENDAMENTO DE CONSULTA MÉDICA <br />
                                        COMPROVANTE DE AGENDAMENTO</b></h4><br />
                                    <h6 style={{marginLeft: '1.5em'}}>Paciente: {consultaAgendada.nmPaciente}</h6>
                                    <h6 style={{marginLeft: '1.5em'}}>Telefone: {consultaAgendada.nmCelular}</h6>
                                    <h6 style={{marginLeft: '1.5em'}}>Consultório: {consultaAgendada.sala} + {consultaAgendada.piso}</h6>
                                    <h6 style={{marginLeft: '1.5em'}}>Especialidade: {consultaAgendada.nmEspecialidade}</h6>
                                    <h6 style={{marginLeft: '1.5em'}}>Médico: {consultaAgendada.nmMedico}</h6>
                                    <h6 style={{marginLeft: '1.5em'}}>Data e Horário: {consultaAgendada.dtHora}</h6>
                                    <h6 style={{marginLeft: '1.5em'}}>Observações:<br />
                                        - Em caso de desistência, a consulta deve ser cancelada com pelo menos 48 horas de antecedência</h6>
                                    <br/>
                                    <br/>
                                </div>
                            </ReactToPrint>
                            <div align={"center"}>
                                <BotaoImprimir onClick={handlePrint} />
                            </div>
                        </Card>
                </div>
            </div>
        </Pagina>
    );
}

export default ConsultasAgendadasImprimir;
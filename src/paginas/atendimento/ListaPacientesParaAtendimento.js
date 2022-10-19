import React, {useEffect, useState} from "react";
import {Botao, Card, Pagina, Select, Tabela} from "../../componentes";
import {ExibirMensagem, xfetch} from "../../util";
import {BOTAO, HttpVerbo, MSG} from "../../util/Constantes";

export default function ListaPacientesParaAtendimento() {
    const [apagar, setApagar] = useState(false);

    const [objeto, setObjeto] = useState({
        idPessoa: localStorage.getItem('id'),
        especialidades: []
    });

    const [consultorio, setConsultorio] = useState({
        "idConsultorioBloco": null,
        "idStatus": parseInt("6")
    });

    let consultaSelecionada = {
        idConsulta: '',
        idStatus: ''
    }

    function handleBtnIniciarAtendimento(consulta) {
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
        window.open("/atendimento/pacienteEmAtendimento");
    }

    const handleBtnCancelar = async (consultaId, statusId) => {
        consultaSelecionada.idConsulta = consultaId;
        consultaSelecionada.idStatus = statusId;
        await xfetch('/hpm/consulta/alterar-status', consultaSelecionada, HttpVerbo.PUT)
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

    const selecionarConsultorioBloco = (e) => {
        consultorio.idConsultorioBloco = parseInt(e.target.value);
        listarPacientesParaAtendimentoPorData();
    }

    const selecionarEspecialidade = (e) => {
        objeto.idEspecialidade = e.value;
        listarDatasPorEspecialidadeProfissionalSaude();
    }

    const listarDatasPorEspecialidadeProfissionalSaude = () => {
        setObjeto({...objeto, consultoriosBloco: []})
        xfetch('/hpm/consultorioBloco/' + objeto.idEspecialidade + '/' + objeto.idPessoa + '/opcoes', {}, HttpVerbo.GET)
            .then(res => res.json())
            .then(json => {
                    setObjeto({...objeto, consultoriosBloco: json.resultado})
                }
            )
    }

    const listarPacientesParaAtendimentoPorData = () => {
        xfetch('/hpm/consulta/pesquisar/consultorio-status', consultorio, HttpVerbo.POST)
            .then(response => {
                    if (response.status === "OK"){
                        setObjeto({...objeto, consultas: response.resultado})
                    } else{
                        setObjeto({...objeto, consultas: []})
                        ExibirMensagem("Não existe resultados para essa pesquisa!", MSG.ALERTA)
                    }
                }
            )
            .catch(error => console.log(error))
    }

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
            typeof objeto.consultas !== 'undefined' ? objeto.consultas.map((consulta) => {
                return ({
                    'paciente': consulta.nmPaciente,
                    'cpf_do_paciente': consulta.cpfPaciente,
                    'data__hora': consulta.dtHora,
                    'especialidade': consulta.nmEspecialidade,
                    'medico': consulta.nmMedico,
                    'sala': consulta.sala,
                    'piso': consulta.piso,
                    'status': consulta.nmStatus,
                    'acoes': <div>
                        <Botao cor={BOTAO.COR.SUCESSO} onClick={() => handleBtnIniciarAtendimento(consulta)}>Iniciar Atendimento</Botao>
                        <Botao cor={BOTAO.COR.ALERTA} onClick={() => handleBtnCancelar(consulta.id, Number("8"))}
                               value={consulta.id}>Cancelar</Botao>
                    </div>
                })
            }) : ''
        )
    }

    let consultaBloco = objeto.consultoriosBloco;

    return(
        <Pagina titulo="Consultas Agendadas">
            <div className="row">
                <div className="col-lg-12">
                    <Card>
                        <div className={"row"}>
                            <div className={"col-lg-4"}>
                                <label>Selecionar Especialidade</label>
                                <Select
                                    url={"/hpm/especialidade/" + objeto.idPessoa + "/opcoes"}
                                    nome={"idEspecialidade"}
                                    funcao={selecionarEspecialidade}
                                />
                            </div>
                            <div className="col-lg-4">
                                <label>Data - Hora</label>
                                <br/>
                                <select
                                    className="form-control"
                                    name="idConsultorioBloco"
                                    value={objeto.idConsultorioBloco}
                                    onChange={selecionarConsultorioBloco}>
                                    <option hidden>Selecione...</option>
                                    {typeof(consultaBloco) !== 'undefined' ? consultaBloco.map((v, k) => {
                                        return <option className="flex-fill" value={v.valor} key={k}> {v.texto}</option>
                                    }) : ''}
                                </select>
                            </div>
                        </div>
                    </Card>
                    <Card titulo="Pacientes Confirmados">
                        <Tabela colunas={colunas} dados={dados()} />
                    </Card>
                </div>
            </div>
        </Pagina>
    );
}
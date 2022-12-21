import React, {useEffect, useState} from "react";
import {Botao, Card, Input, Pagina, Select, Tabela} from "../../componentes";
import {ExibirMensagem, xfetch} from "../../util";
import {BOTAO, HttpVerbo, MSG} from "../../util/Constantes";

export default function ListaPacientesParaAtendimento() {
    const [apagar, setApagar] = useState(false);

    const [objeto, setObjeto] = useState({
        idPessoa: localStorage.getItem('id'),
        especialidades: [],
        consultoriosBloco: []
    });

    const [consultorio, setConsultorio] = useState({
        idConsultorioBloco: null,
        idStatus: Number("6")
    });

    const [consultorioBloco, setConsultorioBloco] = useState({
        idEspecialidade: null,
        data: ""
    });

    let consultaSelecionada = {
        idConsulta: '',
        idStatus: ''
    }

    const handleDtBloco = (e) => {
        consultorioBloco.data = e.target.value;
        listarDatasPorEspecialidadeProfissionalSaude();
    }

    console.log("Bloco:", consultorioBloco);

    function handleBtnIniciarAtendimento(consulta) {
        consultaSelecionada.idConsulta = consulta.id;
        consultaSelecionada.idStatus = Number("20");
        localStorage.setItem('pacienteConsulta', consulta.id);
        localStorage.setItem("idPessoa", consulta.idPessoa);
        localStorage.setItem('nmPaciente', consulta.nmPaciente);
        localStorage.setItem('cpfPaciente', consulta.cpfPaciente);
        localStorage.setItem('nmCelular', consulta.nmCelular);
        localStorage.setItem('dtNascimento', consulta.dtNascimento);
        localStorage.setItem('altura', consulta.altura);
        localStorage.setItem('peso', consulta.peso);
        localStorage.setItem('dtHora', consulta.dtHora);
        localStorage.setItem('nmEspecialidade', consulta.nmEspecialidade);
        localStorage.setItem('nmMedico', consulta.nmMedico);
        localStorage.setItem('sala', consulta.sala);
        localStorage.setItem('piso', consulta.piso);
        localStorage.setItem('nmStatus', consulta.nmStatus);
        localStorage.setItem('idStatus', consulta.idStatus);
        localStorage.setItem("relato", consulta.relato);
        console.log("ConsultaSelecionada:", consultaSelecionada);
        xfetch('/hpm/consulta/alterar-status', consultaSelecionada, HttpVerbo.POST)
            .then(json => {})
        window.open("/atendimento/pacienteEmAtendimento");
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

    const selecionarEspecialidade = (e) => {
        consultorioBloco.idEspecialidade = e.value;
        listarDatasPorEspecialidadeProfissionalSaude();
    }

    const listarDatasPorEspecialidadeProfissionalSaude = () => {
        console.log("Aqui!!", consultorioBloco);
        setObjeto({...objeto, consultoriosBloco: []})
        xfetch('/hpm/consultorioBloco/data/especialidade/opcoes', consultorioBloco, HttpVerbo.POST)
            .then(json => {
                    setObjeto({...objeto, consultoriosBloco: json.resultado});
                    objeto.consultoriosBloco = json.resultado;
                }
            )
        listaDeConsultorios();
    }

    const listaDeConsultorios = () => {
        objeto.consultoriosBloco.map((bloco) => {
            consultorio.idConsultorioBloco = bloco.valor;
            console.log("idBloco", bloco.valor);
            listarPacientesParaAtendimentoPorData();
        });
        console.log("Objeto", objeto);
    }

    console.log("Blocos de Consultorio:", objeto.consultoriosBloco);

    const listarPacientesParaAtendimentoPorData = () => {
        console.log("Consultorio", consultorio);
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
                console.log("Exemplo:", consulta);
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
                            <div className="col-lg-6">
                                <Input
                                    type="datetime-local"
                                    value={consultorioBloco.data}
                                    onChange={handleDtBloco}
                                    name="dataBloco"
                                    label="Data"
                                    placeholder="Data e hora"/>
                            </div>
                            <div className={"col-lg-6"}>
                                <label>Selecionar Especialidade</label>
                                <Select
                                    url={"/hpm/especialidade/" + objeto.idPessoa + "/opcoes"}
                                    nome={"idEspecialidade"}
                                    funcao={selecionarEspecialidade}
                                />
                            </div>
                            {/*<div className="col-lg-4">*/}
                            {/*    <label>Data - Hora</label>*/}
                            {/*    <br/>*/}
                            {/*    <select*/}
                            {/*        className="form-control"*/}
                            {/*        name="idConsultorioBloco"*/}
                            {/*        value={objeto.idConsultorioBloco}*/}
                            {/*        onChange={selecionarConsultorioBloco}>*/}
                            {/*        <option hidden>Selecione...</option>*/}
                            {/*        {typeof(consultaBloco) !== 'undefined' ? consultaBloco.map((v, k) => {*/}
                            {/*            return <option className="flex-fill" value={v.valor} key={k}> {v.texto}</option>*/}
                            {/*        }) : ''}*/}
                            {/*    </select>*/}
                            {/*</div>*/}
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
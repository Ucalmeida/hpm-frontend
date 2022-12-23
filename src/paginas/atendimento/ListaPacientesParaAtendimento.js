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

    let idConsultorioBlocos = [];

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
        setObjeto({...objeto, consultoriosBloco: []})
        console.log("Consultorio Bloco", consultorioBloco);
        if (consultorioBloco.data !== "") {
            xfetch('/hpm/consultorioBloco/data/especialidade/opcoes', consultorioBloco, HttpVerbo.POST)
                .then(json => {
                        if (typeof json !== "undefined" ? json.status === "OK" : false) {
                            setObjeto({...objeto, consultoriosBloco: json.resultado});
                        }
                    }
                )
                .catch(error => console.log(error))
            listaDeConsultorios();
        }
    }

    const listaDeConsultorios = () => {
        idConsultorioBlocos = [];
        objeto.consultoriosBloco.map((bloco, index) => {
            idConsultorioBlocos[index] = (Number(bloco.valor));
        });
        objeto.consultoriosBloco = [];
        objeto.consultas = [];
        listarPacientesParaAtendimentoPorData();
    }

    const listarPacientesParaAtendimentoPorData = () => {
        if (idConsultorioBlocos.length > 0) {
            xfetch('/hpm/consulta/consultorios/opcoes', {idConsultorioBlocos}, HttpVerbo.POST)
                .then(response => {
                        if (typeof response !== "undefined" ? response.status === "OK" : false) {
                            setObjeto({...objeto, consultas: response.resultado});
                        }
                    }
                )
                .catch(error => console.log(error))
        }
    }

    let consultas = objeto.consultas;

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
            typeof consultas !== 'undefined' ? consultas.map((consulta) => {
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
            }) : "")
    }

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
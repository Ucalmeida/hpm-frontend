import React, { useState } from "react";
import { Botao, Card, Input, Pagina, Select, Tabela } from "../../componentes";
import { ExibirMensagem, xfetch } from "../../util";
import { BOTAO, HttpVerbo, MSG } from "../../util/Constantes";

export default function ListaPacientesParaAtendimento() {
    const [apagar, setApagar] = useState(false);

    const [objeto, setObjeto] = useState({
        idPessoa: localStorage.getItem('id')
    });

    const [atendimentos] = useState({
        dataConsulta: null,
        idEspecialidade: null,
        idProfissionalSaude: Number(localStorage.getItem('id'))
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
        let dataHora = e.target.value + "T00:00";
        setConsultorioBloco({...consultorioBloco, data: dataHora});
        atendimentos.dataConsulta = dataHora;
        listarPacientesParaAtendimentoPorData();
    }
    
    const selecionarEspecialidade = (e) => {
        setConsultorioBloco({...consultorioBloco, idEspecialidade: e.value});
        atendimentos.idEspecialidade = e.value;
        listarPacientesParaAtendimentoPorData();
    }

    function handleBtnIniciarAtendimento(consulta) {
        consultaSelecionada.idConsulta = consulta.id;
        consultaSelecionada.idStatus = Number("20");
        localStorage.setItem('pacienteConsulta', consulta.id);
        localStorage.setItem("idPessoa", consulta.idPessoa);
        localStorage.setItem('nmPaciente', consulta.nmPaciente);
        localStorage.setItem('cpfPaciente', consulta.cpfPaciente);
        localStorage.setItem('nmCelular', consulta.nmCelular);
        localStorage.setItem('nmInstituicao', consulta.nmInstituicao);
        localStorage.setItem('nmSangue', consulta.nmSangue);
        localStorage.setItem('sexo', consulta.sexo);
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

    const listarPacientesParaAtendimentoPorData = () => {
        console.log("Dentro de ListarPacientesParaAtendimentoPorData");
        console.log("Tamanho:", idConsultorioBlocos.length);
        console.log("idConsultorioBloco maior que Zero");

        xfetch('/hpm/consulta/pesquisar-atendimentos', atendimentos, HttpVerbo.POST)
        .then(response => {
                    console.log("Atendimentos:", atendimentos);
                    if (typeof response !== "undefined" ? response.status === "OK" : false) {
                        setObjeto({...objeto, consultas: response.resultado});
                    }
                }
            )
            .catch(error => console.log(error))
    }

    console.log("Consultas", objeto.consultas);

    if (atendimentos.dataConsulta !== null) {
        localStorage.setItem('data', atendimentos.dataConsulta);
    }

    if (atendimentos.dataConsulta === null && localStorage.getItem('data') !== null) {
        atendimentos.dataConsulta = localStorage.getItem('data');
        listarPacientesParaAtendimentoPorData();
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
                let desabilitado = false;
                let textoBotao = "Iniciar Atendimento";
                if(consulta.nmStatus === "Agendada") {
                    desabilitado = true;
                    textoBotao = "Aguardando confirmação";
                }
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
                        <Botao disabled={desabilitado} cor={BOTAO.COR.SUCESSO} onClick={() => handleBtnIniciarAtendimento(consulta)}>{textoBotao}</Botao>
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
                                    type="date"
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
                    <Card titulo="Paciente Confirmado">
                        {   
                            (objeto.consultas !== undefined) ? 
                                <Tabela colunas={colunas} dados={dados()} pageSize={5} /> 
                                : "Nenhum Resultado Encontrado..."
                        }
                    </Card>
                </div>
            </div>
        </Pagina>
    );
}
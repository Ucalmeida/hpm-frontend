import React, {useEffect, useState} from "react";
import {Botao, Card, Pagina, Select, Tabela} from "../../componentes";
import {ExibirMensagem, xfetch} from "../../util";
import {BOTAO, HttpVerbo, MSG} from "../../util/Constantes";

export default function ListaPacientesParaAtendimento() {
    const [apagar, setApagar] = useState(false);

    const idPessoa = localStorage.getItem('id');

    const [objeto, setObjeto] = useState({
        idPessoa: localStorage.getItem('id'),
        idEspecialidade: '',
        especialidades: []
    });

    const [lista, setLista] = useState({
        consultas: [
            {
                id: "",
                nmPaciente: "",
                cpfPaciente: "",
                dtHora: "",
                nmEspecialidade: "",
                nmMedico: "",
                idMedico: "",
                sala: "",
                piso: "",
                status: "",
                acoes: ""
            }
        ]
    })

    function handleBtnImprimir(consulta) {
        localStorage.setItem('pacienteConsulta', consulta.id);
        localStorage.setItem('nmPaciente', consulta.nmPaciente);
        localStorage.setItem('cpfPaciente', consulta.cpfPaciente);
        localStorage.setItem('nmCelular', consulta.nmCelular);
        localStorage.setItem('dtHora', consulta.dtHora);
        localStorage.setItem('nmEspecialidade', consulta.nmEspecialidade);
        localStorage.setItem('nmMedico', consulta.nmMedico);
        // localStorage.setItem('idMedico', consulta.idMedico);
        localStorage.setItem('sala', consulta.sala);
        localStorage.setItem('piso', consulta.piso);
        localStorage.setItem('nmStatus', consulta.nmStatus);
        // window.open("/agendar/consultasAgendadasImprimir");
    }

    const handleBtnCancelar = async (e) => {
        await xfetch('/hpm/consulta/alterar/' + e.target.value, {}, HttpVerbo.PUT)
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
        objeto.idConsultorioBloco = e.target.value;
        listarPacientesParaAtendimentoPorData();
    }

    const selecionarEspecialidade = (e) => {
        setObjeto({...objeto, idEspecialidade: e.value});
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
        let consultorioBloco = objeto.idConsultorioBloco;
        xfetch('/hpm/consulta/' + consultorioBloco + '/opcoes', {}, HttpVerbo.GET)
            .then(response => response.json())
            .then(json => {
                    setObjeto({...objeto, consultas: json.resultado})
                }
            )
    }

    console.log("Especialidade:", objeto.idEspecialidade);
    console.log("Pessoa:", objeto.idPessoa);

    const colunas = [
        {text: "ID"},
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
                console.log(consulta);
                if (consulta.idMedico === idPessoa) {
                    return ({
                        'id': consulta.id,
                        'paciente': consulta.nmPaciente,
                        'cpf_do_paciente': consulta.cpfPaciente,
                        'data__hora': consulta.dtHora,
                        'especialidade': consulta.nmEspecialidade,
                        'medico': consulta.nmMedico,
                        'sala': consulta.sala,
                        'piso': consulta.piso,
                        'status': consulta.nmStatus,
                        'acoes': <div>
                            <Botao cor={BOTAO.COR.SUCESSO} onClick={() => handleBtnImprimir(consulta)}>Atender</Botao>
                            <Botao cor={BOTAO.COR.ALERTA} onClick={handleBtnCancelar.bind(consulta.id)}
                                   value={consulta.id}>Cancelar</Botao>
                        </div>
                    })
                } else {
                    return ({
                        'id': "",
                        'paciente': "",
                        'cpf_do_paciente': "",
                        'data__hora': "",
                        'especialidade': "",
                        'medico': "",
                        'sala': "",
                        'piso': "",
                        'status': "",
                        'acoes': ""
                    })
                }
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
import React, {useEffect, useState} from "react";
import {Select} from "../../componentes/form";
import {ExibirMensagem, xfetch} from "../../util";
import {BOTAO, HttpVerbo, MSG} from "../../util/Constantes";
import {Botao, Card, Pagina, Tabela} from "../../componentes";

export default function ListarPacientes() {
    const [objeto, setObjeto] = useState({});

    let statusConsulta = '';

    const handleBtnConfirmar = async (e) => {
        await xfetch('/hpm/consulta/alterarConfirmacao/' + e.target.value, {}, HttpVerbo.PUT)
            .then( json =>{
                    if(json.status){
                        ExibirMensagem('Consulta Alterada!', MSG.SUCESSO, '', '', '', '', listarPacientesPorData())
                    }else{
                        ExibirMensagem(json.message, MSG.ERRO)
                    }
                }
            )
    }

    const handleBtnCancelar = async (e) => {
        await xfetch('/hpm/consulta/alterar/' + e.target.value, {}, HttpVerbo.PUT)
            .then( json =>{
                    if(json.status === "OK"){
                        ExibirMensagem('Consulta Cancelada!', MSG.SUCESSO, '', '', '', '', listarPacientesPorData())
                    }else{
                        ExibirMensagem(json.message, MSG.ERRO)
                    }
                }
            )
    }

    const selecionarEspecialidade = (e) => {
        setObjeto({...objeto, idEspecialidade: e.value});
    }

    const selecionarProfissionalSaude = (e) => {
        objeto.idProfissionalSaude = e.target.value;
        listarDatasPorEspecialidadeProfissionalSaude();
    }

    const selecionarConsultorioBloco = (e) => {
        objeto.idConsultorioBloco = e.target.value;
        listarPacientesPorData();
    }

    const listarProfissionalPorEspecialidade = () => {
        if(typeof objeto.idEspecialidade !== 'undefined') {
            xfetch('/hpm/profissionalSaude/' + objeto.idEspecialidade + '/opcoes',{}, HttpVerbo.GET)
                .then(res => res.json())
                .then(json => {
                        setObjeto({...objeto, profissionais: json.resultado});
                    }
                )
        }
    }

    const listarDatasPorEspecialidadeProfissionalSaude = () => {
        setObjeto({...objeto, consultoriosBloco: []})
        xfetch('/hpm/consultorioBloco/' + objeto.idEspecialidade + '/' + objeto.idProfissionalSaude + '/opcoes', {}, HttpVerbo.GET)
            .then(res => res.json())
            .then(json => {
                    setObjeto({...objeto, consultoriosBloco: json.resultado})
                }
            )
    }

    const listarPacientesPorData = () => {
        let dataConsulta = objeto.idConsultorioBloco;
        xfetch('/hpm/consulta/' + dataConsulta + '/opcoes', {}, HttpVerbo.GET)
            .then(response => response.json())
            .then(json => {
                    setObjeto({...objeto, consultas: json.resultado})
                }
            )
    }

    useEffect( () => {
        listarProfissionalPorEspecialidade();
    }, [objeto.idEspecialidade]);

    const colunas = [
        {text: "Paciente"},
        {text: "Telefone"},
        {text: "Atendimento" },
        {text: "Ordem"},
        {text: "Ações" }
    ]

    const dados = () => {
        return(
            typeof objeto.consultas !== 'undefined' ? objeto.consultas.map((consulta, indice) => {
                return ({
                    'id': consulta.id,
                    'paciente': consulta.nmPaciente,
                    'telefone': consulta.nmCelular,
                    'atendimento': consulta.nmStatus,
                    'acoes': <div>
                                <Botao cor={BOTAO.COR.PRIMARIO} onClick={handleBtnConfirmar.bind(consulta.id)} value={consulta.id}>Confirmar</Botao>
                                <Botao cor={BOTAO.COR.ALERTA} onClick={handleBtnCancelar.bind(consulta.id)} value={consulta.id}>Cancelar</Botao>
                             </div>
                })
            }) : ''
        )
    }

    let consultaBloco = objeto.consultoriosBloco;

    return (
        <Pagina titulo={"Listar Pacientes"}>
            <div className={"row"}>
                <div className={"col-lg-12"}>
                    <Card titulo="Especialidade Médico">
                        <div className={"row"}>
                            <div className={"col-lg-4"}>
                                <label>Selecionar Especialidade</label>
                                <Select
                                    url={"/hpm/especialidade/opcoes"}
                                    nome={"idEspecialidade"}
                                    funcao={selecionarEspecialidade}
                                />
                            </div>
                            <div className={"col-lg-4"}>
                                <label>Profissional</label>
                                <select
                                    className="form-control"
                                    onChange={selecionarProfissionalSaude}
                                    name="idProfissionalSaude">
                                    <option hidden>Selecione...</option>
                                    {(typeof objeto.profissionais !== 'undefined') ? objeto.profissionais.map((v, k) => {
                                        return <option className="flex-fill" value={v.valor} key={k}> {v.texto}</option>
                                    }) : ''}
                                </select>
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
                    <Card titulo="Lista de Pacientes">
                        <Tabela colunas={colunas} dados={dados()} />
                    </Card>
                </div>
            </div>
        </Pagina>
    );
}
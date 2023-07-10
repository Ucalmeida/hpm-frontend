import React, { useState } from 'react';
import {Autocompletar, Botao, Card, Input, Pagina, Select, Tabela} from '../../componentes';
import { xfetch } from '../../util';
import {BOTAO, HttpVerbo, ICONE} from '../../util/Constantes';
import ModalFormVerHistoricoPaciente from "../../componentes/modal/ModalFormVerHistoricoPaciente";

export default function ListaHistoricosPacientes() {
    const [objeto, setObjeto] = useState(
        {
            dataConsulta: "",
            idEspecialidade: null,
            idPessoa: null,
            idProfissionalSaude: Number(localStorage.getItem('id'))
        }
    );

    const [lista, setLista] = useState({
        consultas: []
    });

    const [consultorioBloco, setConsultorioBloco] = useState({
        idEspecialidade: null,
        data: ""
    });

    const handleDtBloco = (e) => {
        const today = new Date();
        if (Date.parse(today) >= Date.parse(e.target.value)) {
            setConsultorioBloco({...consultorioBloco, data: e.target.value});
            objeto.dataConsulta = e.target.value;
        }
    }
    
    const selecionarEspecialidade = (e) => {
        setConsultorioBloco({...consultorioBloco, idEspecialidade: e.value});
        objeto.idEspecialidade = e.value;
        listarPacientesParaAtendimentoPorData();
    }

    let idpessoa = "";

    const selecionarPessoa = (e) => {
        idpessoa = document.getElementById('idpessoa').value;
        localStorage.setItem("idPessoa", idpessoa);
        setObjeto({...objeto, idPessoa: idpessoa});
    }

    const listarPacientesParaAtendimentoPorData = () => {
        xfetch('/hpm/consulta/pesquisar-atendimentos', objeto, HttpVerbo.POST)
            .then(response => {
                    if (typeof response !== "undefined" ? response.status === "OK" : false) {
                        console.log("🚀 ~ file: ListaHistoricosPacientes.js:52 ~ listarPacientesParaAtendimentoPorData ~ response.resultado:", response.resultado)
                        setLista({...lista, consultas: response.resultado});
                    }
                })
                .catch(error => console.log(error))
    }
            
    console.log("Objeto", objeto);
    console.log("Lista", lista);

    const colunas = [
        {text: "Paciente"},
        {text: "CPF"},
        {text: "Celular"},
        {text: "Data - Hora"},
        {text: "Status"},
        {text: "Ações"}
    ]

    const dados = () => {
        return(
            typeof lista.consultas !== 'undefined' ? lista.consultas.map((consulta) => {
                return ({
                    'paciente': consulta.nmPaciente,
                    'cpf': consulta.cpfPaciente,
                    'celular': consulta.nmCelular,
                    'data__hora': consulta.dtHora,
                    'status': consulta.nmStatus,
                    'acoes': <div>
                                <ModalFormVerHistoricoPaciente
                                    cor={BOTAO.COR.PRIMARIO}
                                    icone={ICONE.EYE}
                                    nome={'Ver'}
                                    value={consulta.id}
                                    titulo={'Histórico do Paciente'}
                                    nomePaciente={consulta.nmPaciente}
                                    cpfPaciente={consulta.cpfPaciente}
                                    idPessoa={Number(consulta.idPessoa)}
                                />
                            </div>
                })
            }) : "")
    }
            
    return (
        <Pagina titulo={"Histórico"}>
            <div className="row">
                <div className="col-lg-12">
                    <Card titulo="Consultar">
                        <div className="row">
                            <input type="hidden" name="idPessoa"/>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <Autocompletar
                                    name="pessoa"
                                    url="/hpm/pessoa/"
                                    label="Digite os Dados:"
                                    placeholder="Nome ou CPF aqui"
                                    tamanho={6}
                                    retorno={selecionarPessoa} />
                            </div>
                            <div className="col-lg-3">
                                <Input
                                    type="datetime-local"
                                    value={consultorioBloco.data}
                                    onChange={handleDtBloco}
                                    name="dataBloco"
                                    label="Data"
                                    placeholder="Data e hora"/>
                            </div>
                            <div className={"col-lg-3"}>
                                <label>Selecionar Especialidade</label>
                                <Select
                                    url={"/hpm/especialidade/" + objeto.idProfissionalSaude + "/opcoes"}
                                    nome={"idEspecialidade"}
                                    funcao={selecionarEspecialidade}
                                />
                            </div>
                        </div>
                    </Card>
                    <Card titulo="Histórico de Atendimentos">
                        <Tabela colunas={colunas} dados={dados()} pageSize={5} />
                    </Card>
                </div>
            </div>
        </Pagina>
    )
}
import React, {useEffect, useState} from "react";
import {
    BotaoSalvar,
    Card,
    Pagina,
    Select,
    Autocompletar, Tabela
} from "../../componentes";
import {ExibirMensagem, xfetch} from "../../util";
import {HttpVerbo, MSG} from "../../util/Constantes";
import * as $ from "jquery";
import {number} from "prop-types";
import { Autocomplete } from '../../componentes/form/Autocomplete';


export default function Consulta() {
    const [objeto, setObjeto] = useState(
        {
            idPessoa: null,
            idEspecialidade: null,
            idProfissional: null,
            idConsultorioBloco: null,
            profissionais: [],
            exibePessoaPorNome : false,
            exibePessoaPorCpf : false,
            exibePesquisaPaciente: 0,
            consultoriosBloco: [],
        }
    )

    const [lista, setLista] = useState({
            consultas: []
    })

    let selecionarEspecialidade = (e) => {
        objeto.idEspecialidade = e.value
        listarProfissionalPorEspecialidade()
    }

    let selecionarProfissionalSaude = (e) => {
        e.preventDefault()
        objeto.idProfissional = e.target.value
        listarConsultorioBlocoPorEspecialidadeProfissionalSaude()
    }

    const selecionarConsultorioBloco = (e) => {
        e.preventDefault()
        setObjeto({...objeto, idConsultorioBloco: e.target.value})
    }

   function selecionarPessoa(idPessoa) {
    setObjeto({...objeto, idPessoa: idPessoa})
    }

    let listarProfissionalPorEspecialidade = () => {
        setObjeto({...objeto, profissionais: []})
        xfetch('/hpm/profissionalSaude/' + objeto.idEspecialidade + '/opcoes',{}, HttpVerbo.GET)
            .then(res => res.json())
            .then(json => {
                    setObjeto({...objeto, profissionais: json.resultado})
                }
            )
    }

    let listarConsultorioBlocoPorEspecialidadeProfissionalSaude = () => {
        setObjeto({...objeto, consultoriosBloco: []})
        xfetch('/hpm/consultorioBloco/' + objeto.idEspecialidade + '/' + objeto.idProfissional + '/opcoes', {}, HttpVerbo.GET)
            .then(res => res.json())
            .then(json => {
                setObjeto({...objeto, consultoriosBloco: json.resultado})
                }
            )
    }

    useEffect(() => {
        xfetch('/hpm/consulta/opcoes', {}, HttpVerbo.GET)
            .then(response => response.json())
            .then(lista => setLista({...lista, consultas: lista.resultado}))
    },[])


    let enviar = (e) => {
        xfetch('/hpm/consulta/cadastrar', objeto, HttpVerbo.POST)
            .then( json =>{
                    if(json.status === "OK"){
                        ExibirMensagem('Consulta Cadastrada Com Sucesso!', MSG.SUCESSO)
                        window.location.reload();
                    }else{
                        ExibirMensagem(json.message, MSG.ERRO)
                    }

                }
            )
    }

    const colunas = [
        {text: "Data - Hora"},
        { text: "Piso" },
        {text: "Sala"},
       { text: "CPF do Paciente" },
        {text: "Paciente"},
        {text: "Especialidade"},
        { text: "Médico" },

    ]

    const dados = () => {
        return(
        lista.consultas.map((consulta) => {
            return({
                        'id': consulta.valor,
                        'data__hora': consulta.dtHora,
                        'piso': consulta.piso,
                        'sala': consulta.sala,
                        'cpf_do_paciente': consulta.cpfPaciente,
                        'paciente': consulta.nmPaciente,
                        'especialidade': consulta.nmEspecialidade,
                        'medico': consulta.nmMedico
                    })
                })
            )
    }


    let prof = objeto.profissionais
    let consultaBloco = objeto.consultoriosBloco
    return(
        <Pagina titulo="Cadastrar Consulta">
            <div className="row">
                <div className="col-lg-12">
                    <Card titulo="Cadastrar">

                        <div className="row">
                            <div className="col-lg-4">
                                <label>Especialidade</label>
                                <Select
                                    funcao={selecionarEspecialidade}
                                    nome="idEspecialidade"
                                    url={"/hpm/especialidade/opcoes"}
                                />
                            </div>

                            <div className="col-lg-4">
                                <label>Profissional</label>
                                <br/>
                                <select
                                    className="form-control"
                                    name="idProfissional"
                                    value={objeto.idProfissional}
                                    onChange={selecionarProfissionalSaude}>
                                    <option hidden>Selecione...</option>
                                    {prof.map((v, k) => {
                                        return <option className="flex-fill" value={v.valor} key={k}> {v.texto}</option>
                                    })}
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
                                    {consultaBloco.map((v, k) => {
                                        return <option className="flex-fill" value={v.valor} key={k}> {v.texto}</option>
                                    })}
                                </select>
                            </div>
                        </div>

                        <br/>
                        <div className="row">
                            <div className="col-lg-8">
                                <Autocomplete url="/hpm/pessoa/" label="Nome ou CPF do paciente:" placeholder="Nome ou CPF do paciente" onSelect={selecionarPessoa} />
                            </div>

                            <div className="col-lg-12 text-lg-right mt-4 mb-4">
                                <BotaoSalvar onClick={enviar} />
                            </div>
                        </div>
                    </Card>
                    <Card titulo="Consultas cadastradas para hoje">
                        <Tabela colunas={colunas} dados={dados()} />
                    </Card>
                </div>
            </div>
        </Pagina>
        )
}
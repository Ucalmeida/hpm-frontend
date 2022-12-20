import React, {useEffect, useState} from "react";
import {BotaoSalvar, Card, Input, Pagina, Select} from "../../componentes";
import {ExibirMensagem, xfetch} from "../../util";
import {HttpVerbo, MSG} from "../../util/Constantes";
import ConsultoriosBlocoCard from "../../componentes/card/ConsultoriosBlocoCard";

export default function ConsultorioBloco(){
    const [apagar, setApagar] = useState(false);

    const [objeto, setObjeto] = useState(
        {
            dataInicio : null,
            dataTermino: null,
            idEscala: null,
            idEspecialidade: null,
            idProfissionalSaude: null,
            idSala: null,
            qtdConsultas: null,
            qtdEmergencias: null
        }
    )

    const [profissionais, setProfissionais] = useState({});

    const [escala, setEscala] = useState({});

    const [status, setStatus] = useState({
        listaStatus: []
    });

    const escalaObjeto = 31;

    const handleDtHrInicio = (e) => {
        setObjeto({...objeto, dataInicio: e.target.value});
    }

    const handleDtHrTermino = (e) => {
        setObjeto({...objeto, dataTermino: e.target.value});
    }

    const handleQtdConsulta = (e) => {
        e.preventDefault()
        setObjeto({...objeto, qtdConsultas: Number(e.target.value)})
    }

    const handleQtdEmergencia = (e) => {
        e.preventDefault()
        setObjeto({...objeto, qtdEmergencias: Number(e.target.value)})
    }

    const handleStatus = (e) => {
        const statusId = e.target.value;
        status.idStatus = Number(statusId);
        listarEscalaPorStatus();
    }

    const listarEscalaPorStatus = (e) => {
        xfetch('/hpm/escala/' + status.idStatus + '/opcoes',{}, HttpVerbo.GET)
            .then(res => res.json())
            .then(json => {
                    setEscala({...escala, escalas: json.resultado});
                }
            )
    }

    const selecionarEscala = (e) => {
        objeto.idEscala = Number(e.target.value);
        console.log("Escala", objeto);
    }

    const selecionarEspecialidade = (e) => {
        objeto.idEspecialidade = Number(e.value)
        listarProfissionalPorEspecialidade();
    }

    const selecionarProfissionalSaude = (e) => {
        objeto.idProfissionalSaude = Number(e.target.value);
    }

    const selecionarSala = (e) => {
        objeto.idSala = e.value;
    }

    const listarProfissionalPorEspecialidade = () => {
        xfetch('/hpm/profissionalSaude/' + objeto.idEspecialidade + '/opcoes',{}, HttpVerbo.GET)
            .then(res => res.json())
            .then(json => {
                    setProfissionais({...profissionais, profissionais: json.resultado});
                }
            )
    }

    const enviar = (e) => {
        xfetch('/hpm/consultorioBloco/cadastrar', objeto, HttpVerbo.POST)
            .then( json =>{
                    if (typeof json !== "undefined" ? json.status === "OK" : false) {
                        ExibirMensagem('Consultorio Bloco Cadastrado Com Sucesso!', MSG.SUCESSO);
                    }
                }
            )
        setApagar(!apagar);
    }

    useEffect(() => {
        xfetch('/hpm/status/' + escalaObjeto, {}, HttpVerbo.GET)
            .then( res => res.json())
            .then(status => setStatus({...status, listaStatus: status.resultado}))
    }, [])

    const selectEspecialista =  objeto.idEspecialidade ? <div className="col-lg-6">
        <label>Profissional</label>
        <select
            className="form-control"
            onChange={selecionarProfissionalSaude}
            name="idProfissionalSaude">
            <option hidden>Selecione...</option>
            {typeof profissionais.profissionais !== "undefined" ? profissionais.profissionais.map((v, k) => {
                return <option className="flex-fill" value={v.valor} key={k}> {v.texto}</option>
            }) : ''}
        </select>
    </div> : ''

    return(
        <Pagina titulo="Cadastrar ConsultorioBloco">
            <div className="row">
                <div className="col-lg-12">
                    <Card titulo="Cadastrar">
                        <div className="row">
                            <div className="col-lg-3">
                                <label>Tipo Escala</label>
                                <select
                                    className="form-control"
                                    name="idStatus"
                                    value={status.idStatus}
                                    onChange={handleStatus}>
                                    <option hidden>Selecione...</option>
                                    {status.listaStatus.map((v, k) => {
                                        if (v.id !== 15) {
                                            return <option className="flex-fill" value={v.id} key={k}> {v.nome}</option>
                                        }
                                    })}
                                </select>
                            </div>
                            <div className="col-lg-3">
                                <label>Escala</label>
                                <select
                                    className="form-control"
                                    onChange={selecionarEscala}
                                    nome="idEscala">
                                    <option hidden>Selecione...</option>
                                    {typeof escala.escalas !== "undefined" ? escala.escalas.map((v, k) => {
                                        return <option className="flex-fill" value={v.valor} key={k}> {v.nome}</option>
                                    }) : ''}
                                </select>
                            </div>
                            <div className="col-lg-6">
                                <label>Especialidade</label>
                                <Select
                                    funcao={selecionarEspecialidade}
                                    nome="idEspecialidade"
                                    url={"/hpm/especialidade/opcoes"} />
                            </div>
                            {selectEspecialista}
                            <div className="col-lg-6">
                                <label>Prédio - Piso - Sala</label>
                                <Select
                                    funcao={selecionarSala}
                                    nome="idSala"
                                    url={"/hpm/sala/opcoes"} />
                            </div>
                            <div className="col-lg-3">
                                <Input
                                    type="datetime-local"
                                    value={objeto.dataInicio}
                                    onChange={handleDtHrInicio}
                                    name="dataInicio"
                                    label="Data e hora início"
                                    placeholder="Data e hora"/>
                            </div>
                            <div className="col-lg-3">
                                <Input
                                    type="datetime-local"
                                    value={objeto.dataTermino}
                                    onChange={handleDtHrTermino}
                                    name="dataTermino"
                                    label="Data e hora término"
                                    placeholder="Data e hora"/>
                            </div>
                            <div className="col-lg-3">
                                <Input
                                    type="text"
                                    onChange={handleQtdConsulta}
                                    value={objeto.qtdConsultas}
                                    name="qtdConsultas"
                                    label="Quantidade de Consultas"
                                    placeholder="Qtd consultas"/>
                            </div>
                            <div className="col-lg-3">
                                <Input
                                    type="text"
                                    onChange={handleQtdEmergencia}
                                    value={objeto.qtdEmergencias}
                                    name="qtdEmergencias"
                                    label="Quantidade de Encaixes"
                                    placeholder="Qtd emergencias"/>
                            </div>
                        </div>
                        <div className="col-lg-15 text-lg-right mt-4 mb-4">
                            <BotaoSalvar onClick={enviar} />
                        </div>
                    </Card>
                    <ConsultoriosBlocoCard idEspecialidade={Number(objeto.idEspecialidade)} apagarBloco={apagar}/>
                </div>
            </div>
        </Pagina>
    )
}
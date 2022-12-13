import React, { useState, useEffect } from "react";
import { BotaoSalvar, Card, Input, Pagina, Select } from "../../componentes";
import { ExibirMensagem, xfetch } from "../../util";
import { HttpVerbo, MSG } from "../../util/Constantes";

export default function CadastrarEscala() {

    const [objeto, setObjeto] = useState({
        nome: '',
        dataInicio: null,
        dataTermino: null,
        idStatus: null
    });

    const [nomeEscala, setNomeEscala] = useState({
        mes: '',
        ano: ''
    });

    const [status, setStatus] = useState({
        listaStatus: []
    });

    let escalaObjeto = 31;

    const handleDtHrInicio = (e) => {
        let dt = e.target.value;
        setObjeto({...objeto, dataInicio: dt});
    }

    const handleDtHrTermino = (e) => {
       let dt = e.target.value;
       setObjeto({...objeto, dataTermino: dt});
    }
    
    const handleChange = (e) => {
        objeto.nome = nomeEscala.mes + " - " + nomeEscala.ano;
        console.log("Objeto:", objeto);
        console.log("NomeEscala:", nomeEscala);
    }

    const handleMes = (e) => {
        nomeEscala.mes = e.target.value;
        handleChange();
    }

    const handleAno = (e) => {
        nomeEscala.ano = e.target.value;
        handleChange();
    }

    const handleStatus = (e) => {
        const status = e.target.value;
        setObjeto({...objeto, idStatus : status});
    }

    const enviar = (e) => {
        console.log("Objeto", objeto);
        xfetch('/hpm/escala/cadastrar', objeto, HttpVerbo.POST)
            .then( json =>{
                    if (typeof json !== "undefined" ? json.status === "OK" : null) {
                        ExibirMensagem('Escala Cadastrada Com Sucesso!', MSG.SUCESSO);
                    }
                }
            )
    }

    useEffect(() => {
        xfetch('/hpm/status/' + escalaObjeto, {}, HttpVerbo.GET)
        .then( res => res.json())
        .then(status => setStatus({...status, listaStatus: status.resultado}))
    }, [])
    
    return(
        <Pagina titulo="Cadastrar Escala">
            <div className="row">
                <div className="col-lg-12">
                    <Card titulo="Cadastrar">
                        <div className={"row"}>
                            <div className="col-lg-6">
                                <label>Mês</label>
                                <select className={"form-control col-lg-12"} name="mes" onChange={handleMes}>
                                    <option>Selecione...</option>
                                    <option value={"Janeiro"}>Janeiro</option>
                                    <option value={"Fevereiro"}>Fevereiro</option>
                                </select>
                            </div>
                            <div className={"col-lg-6"}>
                                <label>Ano</label>
                                <select className={"form-control col-lg-12"} name="ano" onChange={handleAno}>
                                    <option>Selecione...</option>
                                    <option value={"2022"}>2022</option>
                                    <option value={"2023"}>2023</option>
                                </select>
                            </div>
                            <div className="col-lg-6">
                                <Input
                                    type="datetime-local"
                                    value={objeto.dataInicio}
                                    onChange={handleDtHrInicio}
                                    name="dataInicio"
                                    step="1"
                                    label="Data e hora início"
                                    placeholder="Data e hora"/>
                            </div>
                            <div className="col-lg-6">
                                <Input
                                    type="datetime-local"
                                    value={objeto.dataTermino}
                                    onChange={handleDtHrTermino}
                                    name="dataTermino"
                                    step="1"
                                    label="Data e hora término"
                                    placeholder="Data e hora"/>
                            </div>
                            <div className="col-lg-2">
                                <label>Tipo Escala</label>
                                <select
                                    className="form-control"
                                    name="idStatus"
                                    value={objeto.idStatus}
                                    onChange={handleStatus}>
                                    <option hidden>Selecione...</option>
                                    {status.listaStatus.map((v, k) => {
                                        return <option className="flex-fill" value={v.id} key={k}> {v.nome}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-15 text-lg-right mt-4 mb-4">
                            <BotaoSalvar onClick={enviar} />
                        </div>
                    </Card>
                </div>
            </div>
        </Pagina>
    );
}
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

    const [status, setStatus] = useState({
        listaStatus: []
    });

    let escalaObjeto = 31;

    const meses = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
    ];

    const handleDtHrInicio = (e) => {
        let dt = e.target.value;
        setObjeto({...objeto, dataInicio: dt});
    }

    const handleDtHrTermino = (e) => {
       let dt = e.target.value;
       setObjeto({...objeto, dataTermino: dt});
    }
    
    const handleChange = (e) => {
        const myDate = e.target.value;
        let [ano, mes] = myDate.split("-");
        mes = meses[mes - 1];
        objeto.nome = mes + " - " + ano;
    }

    const handleStatus = (e) => {
        const status = e.target.value;
        setObjeto({...objeto, idStatus : status});
    }

    const enviar = (e) => {
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
                            <div className={"col-lg-6"}>
                                <Input
                                    id={"date-input"}
                                    type="Month"
                                    onChange={handleChange}
                                    name="nome"
                                    label="Nome da Escala"/>
                            </div>
                            <div className="col-lg-6">
                                <Input
                                    type="datetime-local"
                                    value={objeto.dataInicio}
                                    onChange={handleDtHrInicio}
                                    name="dataInicio"
                                    label="Data e hora início"
                                    placeholder="Data e hora"/>
                            </div>
                            <div className="col-lg-6">
                                <Input
                                    type="datetime-local"
                                    value={objeto.dataTermino}
                                    onChange={handleDtHrTermino}
                                    name="dataTermino"
                                    label="Data e hora término"
                                    placeholder="Data e hora"/>
                            </div>
                            <div className="col-lg-6">
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
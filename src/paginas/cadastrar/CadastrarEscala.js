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

    const handleDtHrInicio = (e) => {
        let dt = e.target.value;
        setObjeto({...objeto, dataInicio: dt});
    }

    const handleDtHrTermino = (e) => {
       let dt = e.target.value;
       setObjeto({...objeto, dataTermino: dt});
    }
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setObjeto({...objeto, [name]: value});
    }

    const handleStatus = (e) => {
        const status = e.target.value;
        setObjeto({...objeto, idStatus : status});
    }

    const enviar = (e) => {
        console.log("Objeto", objeto);
        xfetch('/hpm/escala/cadastrar', objeto, HttpVerbo.POST)
            .then( json =>{
                    if(json.status === "OK"){
                        ExibirMensagem('Escala Cadastrada Com Sucesso!', MSG.SUCESSO)
                    }else{
                        ExibirMensagem(json.message, MSG.ERRO)
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
                        <div className="col-lg-6">
                            <Input
                                type="text"
                                value={objeto.nome}
                                onChange={handleChange}
                                name="nome"
                                label="Nome"
                                placeholder="Nome" required/>
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
                        <div className="col-lg-15 text-lg-right mt-4 mb-4">
                            <BotaoSalvar onClick={enviar} />
                        </div>
                    </Card>
                </div>
            </div>
        </Pagina>
    );
}
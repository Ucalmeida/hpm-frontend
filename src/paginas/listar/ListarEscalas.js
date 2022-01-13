import {Botao, Card, Pagina, Select, Tabela} from "../../componentes";
import React, {useState, useEffect} from "react";
import {BOTAO, HttpVerbo} from "../../util/Constantes";
import {xfetch} from "../../util";

export default function ListarEscalas() {
    const [escala, setEscala] = useState({
        escalas: []
    });

    const [status, setStatus] = useState({
        listaStatus: []
    });

    const handleBtnImprimir = () => {
        alert('Conteúdo Impresso');
    }

    const handleBtnCancelar = () => {
        alert('Conteúdo Cancelado');
    }

    let escalaObjeto = 31;

    const handleStatus = (e) => {
        escala.status = e.target.value;
        listarEscalasPorStatus();
    }

    const listarEscalasPorStatus = () => {
        console.log("Status:", escala.status);
        xfetch('/hpm/escala/' + escala.status + '/opcoes', {}, HttpVerbo.GET)
            .then(res => res.json())
            .then(escala => setEscala({...escala, escalas: escala.resultado}))
    }

    useEffect(() => {
        xfetch('/hpm/status/' + escalaObjeto, {}, HttpVerbo.GET)
            .then( res => res.json())
            .then(status => setStatus({...status, listaStatus: status.resultado}))
    }, [])

    const colunas = [
        {text: "ID"},
        {text: "Nome"},
        {text: "Data Início"},
        {text: "Data Término"},
        {text: "Situação"},
        {text: "Ações"}
    ]

    const dados = () => {
        if(typeof(escala.escalas) !== "undefined") {
            return(
                escala.escalas.map((escala) => {
                    console.log("Escala: " + escala.nome + " - Data Início: " + escala.dtInicio + " | Data Término: " + escala.dtTermino + " | " + escala.status);
                    return({
                        'id': escala.valor,
                        'nome': escala.nome,
                        'data_inicio': escala.dtInicio,
                        'data_termino': escala.dtTermino,
                        'situacao': escala.status,
                        'acoes': <div>
                                    <Botao cor={BOTAO.COR.PRIMARIO} onClick={handleBtnImprimir}>Imprimir</Botao>
                                    <Botao cor={BOTAO.COR.ALERTA} onClick={handleBtnCancelar}>Cancelar</Botao>
                                    {/*<Botao cor={BOTAO.COR.ALERTA} onClick={handleBtnCancelar.bind(consulta.id)} value={consulta.id}>Cancelar</Botao>*/}
                                </div>
                    })
                })
            )
        }
    }

    return(
        <Pagina titulo="Listar Escalas">
            <div className={"row"}>
                <div className={"col-lg-12"}>
                    <Card titulo="Listar">
                        <div className={"row"}>
                            <div className="col-lg-12">
                                <label>Status Escala</label>
                                <select
                                    className="form-control"
                                    name="idStatus"
                                    onChange={handleStatus}>
                                    <option hidden>Selecione...</option>
                                    {status.listaStatus.map((v, k) => {
                                        return <option className="flex-fill" value={v.id} key={k}> {v.nome}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                    </Card>
                    <Card titulo="Lista de Escalas">
                        <Tabela colunas={colunas} dados={dados()} />
                    </Card>
                </div>
            </div>
        </Pagina>
    );
}
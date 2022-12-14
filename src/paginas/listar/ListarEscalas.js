import {Botao, Card, Pagina, Select, Tabela} from "../../componentes";
import React, {useState, useEffect} from "react";
import {BOTAO, HttpVerbo, MSG} from "../../util/Constantes";
import {ExibirMensagem, xfetch} from "../../util";

export default function ListarEscalas() {
    const [objeto, setObjeto] = useState({});

    const [escala, setEscala] = useState({
        escalas: []
    });

    const [status, setStatus] = useState({
        listaStatus: []
    });

    const handleAlterarEscala = (escala) => {
        xfetch('/hpm/escala/alterar/' + escala.valor, objeto, HttpVerbo.PUT)
            .then( json => {
                    if (typeof json !== "undefined" ? json.status === "OK" : false) {
                        ExibirMensagem("Escala " + msg, MSG.SUCESSO, '', '', '', '', listarEscalasPorStatus());
                    }
                }
            )
            .catch(error => ExibirMensagem(error, MSG.ERRO))
    }
    const handleBtnAlterarStatus = (escala, statusId) => {
        objeto.nome = escala.nome;
        objeto.dataInicio = escala.dataInicio;
        objeto.dataTermino = escala.dataTermino;
        objeto.idStatus = statusId;
        handleAlterarEscala(escala);
    }
    const handleBtnExcluir = (escalaId) => {
        xfetch('/hpm/escala/excluir/' + escalaId, objeto, HttpVerbo.PUT)
            .then( json => {
                    if (typeof json !== "undefined" ? json.status === "OK" : false) {
                        ExibirMensagem("Escala Excluída!", MSG.SUCESSO, '', '', '', '', listarEscalasPorStatus());
                    }
                }
            )
    }

    let escalaObjeto = 31;
    let msg = "";

    const handleStatus = (e) => {
        localStorage.setItem("idStatus", e.target.value);
        listarEscalasPorStatus();
    }

    const listarEscalasPorStatus = () => {
        xfetch('/hpm/escala/' + localStorage.getItem("idStatus") + '/opcoes', {}, HttpVerbo.GET)
            .then(res => res.json())
            .then(escala => setEscala({...escala, escalas: escala.resultado}))
    }

    useEffect(() => {
        xfetch('/hpm/status/' + escalaObjeto, {}, HttpVerbo.GET)
            .then( res => res.json())
            .then(status => setStatus({...status, listaStatus: status.resultado}))
    }, [])

    const colunas = [
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
                    let statusId = "";
                    let btnAlteracaoStatus = "";
                    if (escala.idStatus === 13) {
                        statusId = 14;
                        msg = "Inativada!";
                        btnAlteracaoStatus = <div id={"btnAlteracao"}>
                            <Botao cor={BOTAO.COR.PRIMARIO} onClick={() => handleBtnAlterarStatus(escala, statusId)} value={escala.valor}>Inativar</Botao>
                        </div>;
                    }
                    if (escala.idStatus === 14) {
                        statusId = 15;
                        msg = "Finalizada!";
                        btnAlteracaoStatus = <div id={"btnAlteracao"}>
                            <Botao cor={BOTAO.COR.ALERTA} onClick={() => handleBtnAlterarStatus(escala, statusId)} value={escala.valor}>Finalizar</Botao>
                        </div>;
                    }
                    if (escala.idStatus === 15) {
                        btnAlteracaoStatus = "";
                    }
                    return({
                        'nome': escala.nome,
                        'data_inicio': escala.dtInicio,
                        'data_termino': escala.dtTermino,
                        'situacao': escala.status,
                        'acoes':<div className={"row"}>
                                    {btnAlteracaoStatus}
                                    <div>
                                        <Botao cor={BOTAO.COR.PERIGO} onClick={() => handleBtnExcluir(escala.valor)} value={escala.valor} icone={""}>Excluir</Botao>
                                    </div>
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
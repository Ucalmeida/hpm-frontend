import React, {useState} from "react";
import {Botao, BotaoSalvar, Card, Input, Pagina, Select, Spinner, Tabela} from "../../componentes";
import {ExibirMensagem, xfetch} from "../../util";
import {BOTAO, HttpVerbo, MSG} from "../../util/Constantes";

export default function Status(){
    const [objeto, setObjeto] = useState(
        {
            nome: "",
            idObjeto: null,
            status: [],
            carregandoStatus: false,
            carregandoCadastrar: false
        }
    )

    let selecionarObjeto = (e) => {
        objeto.idObjeto = e.value
        listarStatusPorObjeto();
    }

    const listarStatusPorObjeto = () => {
        setObjeto({...objeto, carregandoStatus: true, status: []})
        xfetch('/hpm/status/' + objeto.idObjeto,{}, HttpVerbo.GET)
            .then(res => res.json())
            .then(json => {
                    setObjeto({...objeto, status: json.resultado, carregandoStatus: false})
                }
            )
    }

    let handleChange = (e) => {
        e.preventDefault()
        setObjeto({...objeto, [e.target.name]: e.target.value})
    }

    const handleBtnExcluir = async (e) => {
        await xfetch('/hpm/status/excluir/' + e.target.value, {}, HttpVerbo.PUT)
            .then(json => {
                    if (typeof json !== "undefined" ? json.status === "OK" : false) {
                        ExibirMensagem('Status Excluído com Sucesso!', MSG.SUCESSO)
                    } else {
                        ExibirMensagem(json.message, MSG.ERRO)
                    }
                }
            )
        listarStatusPorObjeto();
    }

    const enviar = (e) => {
        e.preventDefault()
        setObjeto({...objeto, carregandoCadastrar: true})
        xfetch('/hpm/status/cadastrar', objeto, HttpVerbo.POST)
            .then(json => {
                    if(json.status === "OK"){
                        ExibirMensagem('Status Cadastrado Com Sucesso!', MSG.SUCESSO);
                        setObjeto({ idObjeto: '', status: []});
                        listarStatusPorObjeto();
                    }else{
                        ExibirMensagem(json.message, MSG.ERRO);
                    }
                    setObjeto({...objeto, carregandoCadastrar: false});
                }
            )
    }

    const colunas = [
        {text: "Nome" },
        {text: "Ações"}
    ]

    const dados = () => {
        return(
            objeto.status.map((st) => {
                console.log("Piso:", st);
                return({
                    key: st.id,
                    'nome': st.nome,
                    'acoes': <div>
                        <Botao cor={BOTAO.COR.PERIGO} onClick={handleBtnExcluir.bind(st.id)} value={st.id}>Excluir</Botao>
                    </div>
                })
            })
        )
    }

    let spinner = objeto.carregandoStatus ? <Spinner/> : ''
    let spinnerCadastrar = objeto.carregandoCadastrar ? <Spinner/> : ''
    return(
        <Pagina titulo="Cadastrar Status">
            <div className="row animated--fade-in">
                <div className="col-lg-12">
                    <Card titulo="Cadastrar">
                        <div className="col-lg-12">
                            {spinnerCadastrar}
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <label>Objeto</label>
                                <Select
                                    funcao={selecionarObjeto}
                                    nome="idObjeto"
                                    url={"/hpm/objeto/naoExcluidas"} />
                            </div>
                            <div className="col-lg-6">
                                <Input
                                    type="text"
                                    label="Status"
                                    value={objeto.nome}
                                    onChange = {handleChange}
                                    name="nome"
                                    placeholder="Status"/>
                            </div>
                        </div>
                        <div className="align-items-end col-12">
                            <BotaoSalvar onClick={enviar} />
                        </div>
                    </Card>
                </div>
                <div className="col-lg-12">
                    <Card titulo="Status cadastrados no objeto selecionado">
                        <Tabela colunas={colunas} dados={dados()} pageSize={5} />
                        {spinner}
                    </Card>
                </div>
            </div>
        </Pagina>
    )
}

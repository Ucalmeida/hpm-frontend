import React, {useEffect, useState} from "react";
import {Botao, BotaoSalvar, Card, Input, Pagina, Spinner, Tabela} from "../../componentes";
import {ExibirMensagem, xfetch} from "../../util";
import {BOTAO, HttpVerbo, MSG} from "../../util/Constantes";

export default function Exame() {
    const [objeto, setObjeto] = useState(
        {
            nome: '',
            descricao: '',
            exames: [],
            carregandoExames: false,
            carregandoCadastrar: false
        }
    )

    const handleChange = (e) => {
        e.preventDefault()
        setObjeto({...objeto, [e.target.name]: e.target.value})
    }

    const handleBtnExcluir = async (e) => {
        console.log("ID:", e.target.value);
        await xfetch('/hpm/exame/excluir/' + e.target.value, {}, HttpVerbo.PUT)
            .then(json => {
                    if (typeof json !== "undefined" ? json.status === "OK" : false) {
                        ExibirMensagem('Exame Excluído com Sucesso!', MSG.SUCESSO)
                    } else {
                        ExibirMensagem(json.message, MSG.ERRO)
                    }
                }
            )
        listarExames();
    }

    useEffect(() => {
        listarExames();
    }, [])

    const listarExames = () => {
        setObjeto({...objeto,  carregandoExames: true})
        xfetch('/hpm/exame/naoExcluidas', {}, HttpVerbo.GET)
            .then(res => res.json())
            .then(json => {
                setObjeto({...objeto, exames: json.resultado, carregandoExames: false})
            })
    }

    const enviar = (e) => {
        e.preventDefault()
        setObjeto({...objeto, carregandoCadastrar: true})
        xfetch('/hpm/exame/cadastrar', objeto, HttpVerbo.POST)
            .then(json => {
                    if(json.status === "OK"){
                        ExibirMensagem('Exame Cadastrado Com Sucesso!', MSG.SUCESSO)
                        setObjeto({...objeto, nome: '', descricao: '', exames: []})
                        listarExames()
                    }else{
                        ExibirMensagem(json.message, MSG.ERRO)
                    }
                    setObjeto({...objeto, carregandoCadastrar: false})
                }
            )
    }

    const colunas = [
        {text: "Nome" },
        {text: "Descrição" },
        {text: "Ações"}
    ]

    const dados = () => {
        return(
            objeto.exames.map((exame) => {
                return({
                    key: exame.valor,
                    'nome': exame.texto,
                    'descricao': exame.texto2,
                    'acoes': <div>
                        <Botao cor={BOTAO.COR.PERIGO} onClick={handleBtnExcluir.bind(exame.valor)} value={exame.valor}>Excluir</Botao>
                    </div>
                })
            })
        )
    }


    let spinner = objeto.carregandoExames ? <Spinner/> : ''
    let spinnerCadastrar = objeto.carregandoCadastrar ? <Spinner/> : ''
    return(
        <Pagina titulo="Cadastrar Exame">
            <div className="row animated--fade-in">
                <div className="col-lg-12">
                    <Card titulo="Cadastrar">
                        <div className="col-lg-12">
                            {spinnerCadastrar}
                        </div>

                        <div className="row">
                            <div className="col-lg-12">
                                <Input
                                    type="text"
                                    label="Exame"
                                    value={objeto.nome}
                                    onChange = {handleChange}
                                    name="nome"
                                    placeholder="Exame"/>
                            </div>
                            <div className="col-lg-12">
                                <label>Descrição</label>
                                <textarea
                                    className={"form-control"}
                                    rows={"2"}
                                    value={objeto.descricao}
                                    onChange={handleChange}
                                    name="descricao"
                                    placeholder= "Descrição"
                                />
                            </div>
                        </div>

                        <div className="align-items-end col-12">
                            <br />
                            <BotaoSalvar onClick={enviar} />
                        </div>

                    </Card>
                </div>
                <div className="col-lg-12">
                    <Card titulo="Exames cadastrados">
                        <Tabela colunas={colunas} dados={dados()} pageSize={5} />
                        {spinner}
                    </Card>
                </div>
            </div>
        </Pagina>
    )
};
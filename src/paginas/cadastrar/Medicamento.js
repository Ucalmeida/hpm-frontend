import React, {useEffect, useState} from "react";
import {Botao, BotaoSalvar, Card, Input, Pagina, Spinner, Tabela} from "../../componentes";
import {ExibirMensagem, xfetch} from "../../util";
import {BOTAO, HttpVerbo, MSG} from "../../util/Constantes";

export default function Medicamento() {
    const [objeto, setObjeto] = useState(
        {
            nome: "",
            descricao: "",
            medicamentos: [],
            carregandoMedicamentos: false,
            carregandoCadastrar: false
        }
    )

    const handleChange = (e) => {
        e.preventDefault()
        setObjeto({...objeto, [e.target.name]: e.target.value})
    }

    const handleBtnExcluir = async (e) => {
        await xfetch('/hpm/medicamento/excluir/' + e.target.value, {}, HttpVerbo.PUT)
            .then(json => {
                    if (typeof json !== "undefined" ? json.status === "OK" : false) {
                        ExibirMensagem('Medicamento Excluído com Sucesso!', MSG.SUCESSO)
                    } else {
                        ExibirMensagem(json.message, MSG.ERRO)
                    }
                }
            )
        listarMedicamentos();
    }

    useEffect(() =>{
        listarMedicamentos();
    }, [])

    const listarMedicamentos = () => {
        setObjeto({...objeto,medicamentos: [], carregandoMedicamentos: true})
        xfetch('/hpm/medicamento/naoExcluidas', {}, HttpVerbo.GET)
            .then(res => res.json())
            .then(json => {
                setObjeto({...objeto, medicamentos: json.resultado, carregandoMedicamentos: false})
            })
    }

    const enviar = (e) => {
        e.preventDefault()
        setObjeto({...objeto, carregandoCadastrar: true})
        xfetch('/hpm/medicamento/cadastrar', objeto, HttpVerbo.POST)
            .then(json => {
                    if(json.status === "OK"){
                        ExibirMensagem('Medicamento Cadastrado Com Sucesso!', MSG.SUCESSO);
                        setObjeto({...objeto, nome: '', descricao: '', medicamentos: []});
                        listarMedicamentos();
                    }else{
                        ExibirMensagem(json.message, MSG.ERRO);
                    }
                    setObjeto({...objeto, carregandoCadastrar: false});
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
            objeto.medicamentos.map((medicamento) => {
                return({
                    key: medicamento.valor,
                    'nome': medicamento.texto,
                    'descricao': medicamento.texto2,
                    'acoes': <div>
                        <Botao cor={BOTAO.COR.PERIGO} onClick={handleBtnExcluir.bind(medicamento.valor)} value={medicamento.valor}>Excluir</Botao>
                    </div>
                })
            })
        )
    }

    let spinner = objeto.carregandoMedicamentos ? <Spinner/> : ''
    let spinnerCadastrar = objeto.carregandoCadastrar ? <Spinner/> : ''
    let medicamentos = objeto.medicamentos;
    return(

        <Pagina titulo="Cadastrar Medicamento">

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
                                    label="Medicamento"
                                    value={objeto.nome}
                                    onChange = {handleChange}
                                    name="nome"
                                    placeholder="Medicamento"/>
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
                    <Card titulo="Medicamentos cadastrados">
                        <Tabela colunas={colunas} dados={dados()} pageSize={5} />
                        {spinner}
                    </Card>
                </div>

            </div>
        </Pagina>
    )
}

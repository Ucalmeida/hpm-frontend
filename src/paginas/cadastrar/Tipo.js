import React, {useState} from "react";
import {Botao, BotaoSalvar, Card, Input, Pagina, Select, Spinner, Tabela} from "../../componentes";
import {ExibirMensagem, xfetch} from "../../util";
import {BOTAO, HttpVerbo, MSG} from "../../util/Constantes";

export default function Tipo(){
    const [objeto, setObjeto] = useState(
        {
            nome: "",
            idObjeto: null,
            tipos: [],
            carregandoTipos: false,
            carregandoCadastrar: false
        }
    )

    const selecionarObjeto = (e) => {
       objeto.idObjeto = e.value
       listarTiposPorObjeto();
    }

    const handleChange = (e) => {
        e.preventDefault()
       setObjeto({...objeto, nome: e.target.value})
    }

    const handleBtnExcluir = async (e) => {
        await xfetch('/hpm/tipo/excluir/' + e.target.value, {}, HttpVerbo.PUT)
            .then(json => {
                    if (typeof json !== "undefined" ? json.status === "OK" : false) {
                        ExibirMensagem('Tipo Excluído com Sucesso!', MSG.SUCESSO)
                    } else {
                        ExibirMensagem(json.message, MSG.ERRO)
                    }
                }
            )
        listarTiposPorObjeto();
    }

    const listarTiposPorObjeto = () => {
        setObjeto({...objeto, carregandoTipos: true, tipos: []})
        xfetch('/hpm/tipo/' + objeto.idObjeto,{}, HttpVerbo.GET)
            .then(res => res.json())
            .then(json => {
                    setObjeto({...objeto, tipos: json.resultado, carregandoTipos: false})
            }
        )
    }

    const enviar = (e) => {
        e.preventDefault()
       setObjeto({...objeto, carregandoCadastrar: true})
        xfetch('/hpm/tipo/cadastrar', objeto, HttpVerbo.POST)
           .then(json => {
               if(json.status === "OK"){
                   ExibirMensagem('Tipo Cadastrado Com Sucesso!', MSG.SUCESSO)
                   setObjeto({ idObjeto: '', tipos: []})
                   listarTiposPorObjeto()
               }else{
                   ExibirMensagem(json.message, MSG.ERRO)
               }
               setObjeto({...objeto, carregandoCadastrar: false})
           }
       )
    }

    const colunas = [
        {text: "Nome" },
        {text: "Ações"}
    ]

    const dados = () => {
        return(
            objeto.tipos.map((tipo) => {
                console.log("Piso:", tipo);
                return({
                    key: tipo.id,
                    'nome': tipo.nome,
                    'acoes': <div>
                        <Botao cor={BOTAO.COR.PERIGO} onClick={handleBtnExcluir.bind(tipo.id)} value={tipo.id}>Excluir</Botao>
                    </div>
                })
            })
        )
    }

    let spinner = objeto.carregandoTipos ? <Spinner/> : ''
    let spinnerCadastrar = objeto.carregandoCadastrar ? <Spinner/> : ''
    return(
        <Pagina titulo="Cadastrar Tipo">
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
                                    url={"/hpm/objeto/opcoes"} />
                            </div>
                            <div className="col-lg-6">

                                <Input
                                    type="text"
                                    label="Tipo"
                                    value={objeto.nome}
                                    onChange = {handleChange}
                                    name="nome"
                                    placeholder="Tipo"/>
                            </div>
                        </div>

                        <div className="align-items-end col-12">
                            <BotaoSalvar onClick={enviar} />
                        </div>

                    </Card>
                </div>
                <div className="col-lg-12">
                    <Card titulo="Tipos no objeto selecionado">
                        <Tabela colunas={colunas} dados={dados()} />
                        {spinner}
                    </Card>
                </div>
            </div>
        </Pagina>
    );
}
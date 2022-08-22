import React, {useState} from "react";
import {Botao, BotaoSalvar, Card, Input, Pagina, Select, Spinner, Tabela} from "../../componentes";
import {ExibirMensagem, xfetch} from "../../util";
import {BOTAO, HttpVerbo, MSG} from "../../util/Constantes";


export default function Piso(){
    const [objeto, setObjeto] = useState(
        {
            nome : '',
            idPredio : null,
            pisos : [],
            carregandoPisos : false,
            carregandoCadastrar : false
        }
    )

    const selecionarPredio = (e) => {
        objeto.idPredio = e.value;
        listarPisosPorPredio();
    }

    const listarPisosPorPredio = () => {
        setObjeto({...objeto, carregandoPisos: true, pisos: []})
        xfetch('/hpm/piso/' + objeto.idPredio,{}, HttpVerbo.GET)
            .then(res => res.json())
            .then(json => {
                    setObjeto({...objeto, pisos: json.resultado, carregandoPisos: false})
                }
            )
    }

    const handleChange = (e) => {
        e.preventDefault()
        setObjeto({...objeto, [e.target.name]: e.target.value})
    }

    const handleBtnExcluir = async (e) => {
        await xfetch('/hpm/piso/excluir/' + e.target.value, {}, HttpVerbo.PUT)
            .then(json => {
                    if (typeof json !== "undefined" ? json.status === "OK" : false) {
                        ExibirMensagem('Piso Excluído com Sucesso!', MSG.SUCESSO)
                    } else {
                        ExibirMensagem(json.message, MSG.ERRO)
                    }
                }
            )
        listarPisosPorPredio();
    }

    const enviar = (e) => {
        e.preventDefault()
        setObjeto({...objeto, carregandoCadastrar: true})
        xfetch('/hpm/piso/cadastrar', objeto, HttpVerbo.POST)
            .then( json =>{
                if(json.status === "OK"){
                    ExibirMensagem('Piso Cadastrado Com Sucesso!', MSG.SUCESSO)
                    setObjeto({ idPredio: '', pisos: []})
                    listarPisosPorPredio();
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
            objeto.pisos.map((piso) => {
                console.log("Piso:", piso);
                return({
                    key: piso.id,
                    'nome': piso.nome,
                    'acoes': <div>
                        <Botao cor={BOTAO.COR.PERIGO} onClick={handleBtnExcluir.bind(piso.id)} value={piso.id}>Excluir</Botao>
                    </div>
                })
            })
        )
    }

    let spinner = objeto.carregandoPisos ? <Spinner/> : ''
    let spinnerCadastrar = objeto.carregandoCadastrar ? <Spinner/> : ''
    return(
        <Pagina titulo = "Cadastrar Piso">
            <div className="row animated--fade-in">
                <div className="col-lg-12">
                    <Card titulo="Cadastrar">
                        {spinnerCadastrar}
                        <div className="row">
                            <div className="col-lg-6">
                                <label>Prédio</label>
                                <Select
                                    funcao={selecionarPredio}
                                    nome="idPredio"
                                    url={"/hpm/predio/opcoes"} />
                            </div>
                            <div className="col-lg-6">
                                <Input
                                    type="text"
                                    label="Piso"
                                    value={objeto.nome}
                                    onChange = {handleChange}
                                    name="nome"
                                    placeholder="Piso"/>
                            </div>
                        </div>
                        <div className="align-items-end col-12">
                            <BotaoSalvar onClick={enviar} />
                        </div>
                    </Card>
                </div>
                <div className="col-lg-12">
                    <Card titulo="Pisos cadastrados no prédio selecionado">
                        <Tabela colunas={colunas} dados={dados()} />
                        {spinner}
                    </Card>
                </div>
            </div>
        </Pagina>
    )
}

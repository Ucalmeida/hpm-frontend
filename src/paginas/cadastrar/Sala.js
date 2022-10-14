import React, {useState} from "react";
import {Botao, BotaoSalvar, Card, Icone, Input, Pagina, Select, Spinner, Tabela} from "../../componentes";
import {ExibirMensagem, xfetch} from "../../util";
import {BOTAO, HttpVerbo, ICONE, MSG, TEXTO} from "../../util/Constantes";

export default function Sala() {
    const [objeto , setObjeto] = useState(
        {
            nome: '',
            idPiso:'',
            salas: [],
            carregandoSalas: false,
            carregandoCadastrar: false
        }
    )

    let selecionarPiso = (e) => {
        objeto.idPiso = e.value
        listarSalasPorPiso()
    }

    const listarSalasPorPiso = () => {
        setObjeto({...objeto, carregandoSalas: true, salas: []})
        xfetch('/hpm/sala/' + objeto.idPiso,{}, HttpVerbo.GET)
            .then(res => res.json())
            .then(json => {
                    setObjeto({...objeto, salas: json.resultado,carregandoSalas: false});
                }
            )
    }

    const handleChange = (e) => {
        e.preventDefault()
        setObjeto({...objeto, [e.target.name]: e.target.value})
    }

    const handleBtnExcluir = async (e) => {
        await xfetch('/hpm/sala/excluir/' + e.target.value, {}, HttpVerbo.PUT)
            .then(json => {
                    if (typeof json !== "undefined" ? json.status === "OK" : false) {
                        ExibirMensagem('Sala Excluída com Sucesso!', MSG.SUCESSO)
                    } else {
                        ExibirMensagem(json.message, MSG.ERRO)
                    }
                }
            )
        listarSalasPorPiso();
    }

    const enviar = (e) => {
        e.preventDefault()
        setObjeto({...objeto, carregandoCadastrar: true})
        xfetch('/hpm/sala/cadastrar', objeto, HttpVerbo.POST)
            .then(json => {
                    if(json.status === "OK"){
                        ExibirMensagem('Sala Cadastrada Com Sucesso!', MSG.SUCESSO)
                        setObjeto({ idPiso: '', salas: []})
                        listarSalasPorPiso()
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
            objeto.salas.map((sala) => {
                return({
                    key: sala.id,
                    'nome': sala.nome,
                    'acoes': <div>
                        <Botao cor={BOTAO.COR.PERIGO} onClick={handleBtnExcluir.bind(sala.id)} value={sala.id}>Excluir</Botao>
                    </div>
                })
            })
        )
    }

    let spinner = objeto.carregandoSalas ? <Spinner/> : ''
    let spinnerCadastrar = objeto.carregandoCadastrar ? <Spinner/> : ''

    return(
        <Pagina titulo = "Cadastrar Sala">
            <div className="row animated--fade-in">
                <div className="col-lg-12">
                    <Card titulo="Cadastrar">
                        <div className="col-lg-12">
                            {spinnerCadastrar}
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <label>Prédio - Piso</label>
                                <Select
                                    funcao={selecionarPiso}
                                    nome="idPiso"
                                    url={"/hpm/piso/opcoes"} />
                            </div>
                            <div className="col-lg-6">
                                <Input
                                    type="text"
                                    label="Sala"
                                    value={objeto.nome}
                                    onChange = {handleChange}
                                    name="nome"
                                    placeholder="Sala"/>
                            </div>
                        </div>
                        <div className="align-items-end col-12">
                            <BotaoSalvar onClick={enviar} />
                        </div>
                    </Card>
                </div>
                <div className="col-lg-12">
                    <Card titulo="Salas cadastradas no piso selecionado">
                        <Tabela colunas={colunas} dados={dados()} />
                        {spinner}
                    </Card>
                </div>
            </div>
        </Pagina>
    )
}
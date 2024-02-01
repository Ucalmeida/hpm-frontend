import React, {useEffect, useState} from 'react'
import {BOTAO, HttpVerbo, MSG} from "../../util/Constantes";
import {ExibirMensagem, xfetch} from "../../util";
import {Botao, BotaoSalvar, Card, Input, Pagina, Spinner, Tabela} from "../../componentes";


export default function Especialidade() {
    const [objeto, setObjeto] = useState({
        nome: '',
        carregando: false,
        especialidades: [{
            id: '',
            nmNome: ''
        }]
    });

    const handleChange = (e) => {
        e.preventDefault()
        setObjeto({...objeto, [e.target.name]: e.target.value});
    }

    const handleBtnExcluir = async (e) => {
        console.log("ID:", e.target.value);
        await xfetch('/hpm/especialidade/excluir/' + e.target.value, {}, HttpVerbo.PUT)
            .then(json => {
                    if (typeof json !== "undefined" ? json.status === "OK" : false) {
                        ExibirMensagem('Especialidade Excluída com Sucesso!', MSG.SUCESSO)
                    } else {
                        ExibirMensagem(json.message, MSG.ERRO)
                    }
                }
            )
        carregarEspecialidades();
    }

    useEffect(() => {
        carregarEspecialidades();
    },[])

    const carregarEspecialidades = () => {
        setObjeto({...objeto, carregando: true});
        xfetch('/hpm/especialidade/naoExcluidas', {}, HttpVerbo.GET)
            .then(res => res.json())
            .then(json => {
                    setObjeto({...objeto, especialidades: json.resultado, carregando: false})
                }
            )
    }

    const enviar = (e) => {
        e.preventDefault()
        setObjeto({...objeto, nome: e.target.value});
        xfetch('/hpm/especialidade/cadastrar', objeto, HttpVerbo.POST)
            .then(json => {
                if (json.status === "OK") {
                    ExibirMensagem('Especialidade cadastrada', MSG.SUCESSO );
                    setObjeto({...objeto, nome: e.target.value});
                    carregarEspecialidades();
                } else {
                    ExibirMensagem(json.message, MSG.ERRO)
                }
            }
        )
    }

    const colunas = [
        {text: "Nome" },
        {text: "Ações"}
    ]

    const dados = () => {
        return(
            objeto.especialidades.map((especialidade) => {
                return({
                    key: especialidade.valor,
                    'nome': especialidade.texto,
                    'acoes': <div>
                        <Botao cor={BOTAO.COR.PERIGO} onClick={handleBtnExcluir.bind(especialidade.valor)} value={especialidade.valor}>Excluir</Botao>
                    </div>
                })
            })
        )
    }

    let spinner = '';
    if (objeto.carregando) {
        spinner = <Spinner />
    };

    return (
        <Pagina titulo="Cadastrar Especialidade">
            <div className="row animated--fade-in">
                <div className="col-lg-12">
                    <Card titulo="Cadastrar">
                        <Input
                            type="text"
                            onChange={handleChange}
                            value={objeto.nome}
                            name="nome"
                            label="Especialidade"
                            placeholder="Especialidade" required/>

                        <div className="align-items-end col-8">
                            <BotaoSalvar onClick={enviar}/>
                        </div>
                    </Card>
                </div>
                <div className="col-lg-12">
                    <Card titulo="Especialidades cadastradas">
                        <Tabela colunas={colunas} dados={dados()} pageSize={5} />
                        {spinner}
                    </Card>
                </div>
            </div>
        </Pagina>
    );
}
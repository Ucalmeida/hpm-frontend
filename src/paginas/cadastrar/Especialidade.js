import React from 'react'
import {HttpVerbo, MSG} from "../../util/Constantes";
import {ExibirMensagem, xfetch} from "../../util";
import {Botao, BotaoSalvar, Card, Input, Pagina, Spinner, Tabela} from "../../componentes";


export default class Especialidade extends React.Component {
    constructor() {
        super();
        this.state = {
            nome: '',
            carregando: false,
            especialidades: []
        }
    }

    componentDidMount() {
        this.carregarEspecialidades();
    }

    carregarEspecialidades = () => {
        this.setState({carregando: true})
        xfetch('/hpm/especialidade/opcoes', {}, HttpVerbo.GET)
            .then(res => res.json())
            .then(json => {
                    this.setState({especialidades: json.resultado, carregando: false})
                }
            )
    }

    enviar = (e) => {
        e.preventDefault()
        let objeto = {nome: this.state.nome}
        xfetch('/hpm/especialidade/cadastrar', objeto, HttpVerbo.POST)
            .then(json => {
                if (json.status === "OK") {
                    ExibirMensagem('Especialidade cadastrada', MSG.SUCESSO )
                    this.setState({nome: ''})
                    this.carregarEspecialidades()
                } else {
                    ExibirMensagem(json.message, MSG.ERRO)
                }
            }
        )
    }

    handleChange = (e) => {
        e.preventDefault()
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        const {nome, especialidades, carregando} = this.state
        let spinner = '';
        if (carregando) {
            spinner = <Spinner />
        };

        return (
            <Pagina titulo="Cadastrar Especialidade">
                <div className="row animated--fade-in">
                    <div className="col-lg-12">
                        <Card titulo="Cadastrar">
                            <Input
                                type="text"
                                onChange={this.handleChange}
                                value={nome}
                                name="nome"
                                label="Especialidade"
                                placeholder="Especialidade" required/>

                            <div className="align-items-end col-8">
                                <BotaoSalvar onClick={this.enviar}/>
                            </div>
                        </Card>
                    </div>
                    <div className="col-lg-12">
                        <Card titulo="Especialidades cadastradas">
                            {spinner}
                                {/*<Tabela colunas={colunas} dados={dados()} />*/}
                            <ul className={"list-unstyled"} style={{columns: 3}}>
                                {especialidades.map((v, k) => {
                                    return <li className="flex-fill" key={k}> {v.texto}</li>
                                })}
                            </ul>
                            {/*<ul className={"list-unstyled"} style={{columns: 3}}>*/}
                            {/*    {especialidades.map((v, k) => {*/}
                            {/*        return <li ><Botao className="flex-fill" key={k}> {v.texto}</Botao></li>*/}
                            {/*    })}*/}
                            {/*</ul>*/}
                        </Card>
                    </div>
                </div>
            </Pagina>
        );
    }
}
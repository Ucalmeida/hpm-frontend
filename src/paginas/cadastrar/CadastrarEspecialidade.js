import React from 'react'
import Pagina from "../../componentes/pagina/Pagina";
import Card from "../../componentes/Card";
import {ExibirMensagem, xfetch} from "../../util/Util";
import Input from "../../componentes/form/Input";
import Spinner from "../../componentes/Spinner";
import {HttpVerbo, Tipo} from "../../util/Constantes";
import {Botao, BotaoSalvar} from "../../componentes/Botao";


export default class CadastrarEspecialidade extends React.Component {
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
        let lista = this.state.especialidades
        xfetch('/hpm/especialidade/cadastrar', objeto, HttpVerbo.POST)
            .then(json => {
                console.log(json)
                if (json.status === "OK") {
                    ExibirMensagem('Especialidade cadastrada', Tipo.MSG.SUCESSO )
                    this.setState({nome: ''})
                    this.carregarEspecialidades()
                } else {
                    ExibirMensagem(json.message, Tipo.MSG.ERRO)
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
            <Pagina titulo="Especialidades">
                <div className="row animated--fade-in">
                    <div className="col-lg-4">
                        <Card>
                            <Input
                                type="text"
                                onChange={this.handleChange}
                                value={nome}
                                name="nome"
                                label="Especialidade"
                                placeholder="Especialidade"/>

                            <div className="align-items-end col-12">
                                <BotaoSalvar onClick={this.enviar}/>
                            </div>
                        </Card>
                    </div>
                    <div className="col-lg-8">
                        <Card titulo="Especialidades cadastradas">
                            {spinner}
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
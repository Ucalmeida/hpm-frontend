import React from 'react'
import {xfetch} from "../../util/Util";
import {HttpVerbo, MSG} from "../../util/Constantes";
import {ExibirMensagem} from "../../util";
import {BotaoSalvar, Card, Input, Pagina, Spinner} from "../../componentes";


export class CadastrarSangue extends React.Component {
    constructor() {
        super();
        this.state = {
            nome: '',
            carregando: false,
            objetos: []
        }
    }

    carregarLista = () => {
        this.setState({carregando: true})
        xfetch('/hpm/sangue/opcoes', {}, HttpVerbo.GET)
            .then(resultado => resultado.json())
            .then(json => this.setState({objetos: json.resultado, carregando: false}))
            .catch(e => this.setState({carregando: false}))
    }

    enviar = (e) => {
        e.preventDefault()
        let objeto = {nome: this.state.nome}

        xfetch('/hpm/sangue', objeto, HttpVerbo.POST)
            .then(json => {
                if (json.status === "OK") {
                    ExibirMensagem('Sangue cadastrado',MSG.SUCESSO)
                    this.carregarLista()
                } else {
                    ExibirMensagem(json.message, MSG.ERRO)
                }
            })
    }

    handleChange = (e) => {
        e.preventDefault()
        this.setState({[e.target.name]: e.target.value})
    }

    componentDidMount() {
        this.carregarLista()
    }

    render() {
        const {nome, carregando, objetos} = this.state
        let spinner = '';
        if (carregando) {
            spinner = <Spinner></Spinner>
        };
        return (
            <Pagina titulo="Cadastrar Sangue">
                <div className="row animated--fade-in">
                    <div className="col-lg-4">
                        <Card titulo= "Cadastrar">
                            <Input
                                type="text"
                                onChange={this.handleChange}
                                value={nome}
                                name="nome"
                                label="Tipo Sangue"
                                placeholder="Tipo Sangue"/>

                            <div className="align-items-end col-12">
                                <BotaoSalvar onClick={this.enviar}/>
                            </div>
                        </Card>
                    </div>
                    <div className="col-lg-8">
                        <Card titulo="Sangue cadastrados">
                            {spinner}
                            <ul className={"list-unstyled"}>
                                {objetos.map((v, k) => {
                                    return <li key={k}> {v.texto}</li>
                                })}
                            </ul>
                        </Card>
                    </div>
                </div>
            </Pagina>
        );
    }
}
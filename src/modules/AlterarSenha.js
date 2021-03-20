import React from 'react'
import Pagina from './main/Pagina'
import Input from "../components/Input";


export default class AlterarSenha extends React.Component {
    constructor() {
        super();
        this.state = {
            senha: '',
            nova: '',
            renova: ''
        }
    }

    handleChange = (e) => {
        e.preventDefault();
        let valor = e.target.value
        this.setState({[e.target.name]: valor})

    }

    validaSenha(valor) {
        return false;
    }

    enviar = (e) => {
        e.preventDefault()
        const {senha, nova, renova} = this.state
        if (nova !== renova) {
            window.alert("Novas senhas inválidas")
            return
        }

        //TODO fazer chamada para o backend
        // xfetch('/alterarSenha', {}, HttpVerbo.POST)



    }

    render() {
        const {senha, nova, renova} = this.state
        return (
            <Pagina>
                <div className="col-4 offset-5">
                    <Input
                        type="password"
                        onChange={this.handleChange}
                        value={senha}
                        name="senha"
                        label="Senha atual"
                        placeholder="Senha antual"/>

                    <Input
                        type="password"
                        onChange={this.handleChange}
                        value={nova}
                        name="nova"
                        label="Nova senha"
                        placeholder="Nova senha"
                        legenda="Ex. Dsfoma123"/>

                    <Input
                        type="password"
                        onChange={this.handleChange}
                        value={renova}
                        name="renova"
                        label="Repita nova senha"
                        placeholder="Repita a nova"/>
                    <div className="align-items-end col-12">
                        <button className="btn btn-success pull-right" onClick={this.enviar}> Alterar </button>
                    </div>
                </div>
            </Pagina>
        );
    }
}
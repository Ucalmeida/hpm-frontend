import React from 'react'
import Pagina from '../componentes/pagina/Pagina'
import Input from "../componentes/form/Input";
import Card from "../componentes/Card";
import {Botao} from "../componentes/Botao";
import {Tipo} from "../util/Constantes";
import {ExibirMensagem} from "../util/Util";

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
            ExibirMensagem("Novas senhas inválidas", Tipo.MSG.ERRO)
            return
        }

        //TODO fazer chamada para o backend
        // xfetch('/alterarSenha', {}, HttpVerbo.POST)

    }

    render() {
        const {senha, nova, renova} = this.state
        return (
            <Pagina titulo={"Alterar Senha"}>
                   <div className="row">
                       <div className="col-lg-4"></div>
                       <div className="col-lg-4">
                        <Card>
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
                               <Botao onClick={this.enviar} icone={Tipo.ICONE.ALTERAR}> Alterar </Botao>
                           </div>
                       </Card>
                       </div>
                       <div className="col-lg-4"></div>
                   </div>
            </Pagina>
        );
    }
}
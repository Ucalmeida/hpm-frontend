import React from 'react'
import {ExibirMensagem, xfetch} from "../util";
import {BotaoSalvar, Card, Input, Pagina} from "../componentes";
import {HttpVerbo, MSG} from "../util/Constantes";

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
        const {senha, nova, renova} = this.state;
        if (senha === '') {
            ExibirMensagem("Senha não pode estar vazia", MSG.ERRO)
            return;
        }
        if (nova !== renova) {
            ExibirMensagem("Novas senhas inválidas", MSG.ERRO)
            return;
        }

        //TODO fazer chamada para o backend
        xfetch('/hpm/redefinir/senha', this.state, HttpVerbo.POST)
            .then(json => {
                if (json.status === 'OK') {
                    ExibirMensagem('Senha alterada com sucesso!');
                }
                else {
                    ExibirMensagem(json.json(), MSG.ERRO);
                }
            })

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
                           <div className="align-items-end text-center col-12">
                               <BotaoSalvar onClick={this.enviar}> Alterar </BotaoSalvar>
                           </div>
                       </Card>
                       </div>
                       <div className="col-lg-4"></div>
                   </div>
            </Pagina>
        );
    }
}
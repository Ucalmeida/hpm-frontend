import React from 'react'
import {ExibirMensagem, xfetch} from "../util";
import PaginaSemLogin from "../componentes/pagina/PaginaSemLogin";
import {Botao, Input} from "../componentes";
import {HttpVerbo, ICONE, MSG} from "../util/Constantes";

export default class RecuperarSenha extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cpf: '',
            novaSenha: '',
            repeteNovaSenha:'',
             hash: ''
        }
    }

    handleChange = (e) =>{
        e.preventDefault();
        let valor = e.target.value
        this.setState({[e.target.name]: valor})
    }

    enviar = (e) => {
        e.preventDefault();
        const {novaSenha,repeteNovaSenha, cpf} = this.state;
        if(cpf === ""){
            ExibirMensagem("Insira um CPF",MSG.ERRO )
            return
        }
        if(novaSenha !== repeteNovaSenha){
            ExibirMensagem("Novas senhas inválidas" ,MSG.ERRO)
            return
        }

        if(novaSenha === ""){
            ExibirMensagem("Insira uma Senha",MSG.ERRO)
            return;
        }
        if(repeteNovaSenha === ""){
            ExibirMensagem("Repita a nova senha",MSG.ERRO)
            return;
        }

        let objeto = {
            cpf: cpf,
            novaSenha: novaSenha,
            repeteNovaSenha: repeteNovaSenha,
            hash:  this.props.match.params.hash
        }

        xfetch('/hpm/redefinir/recuperarMinhaSenha', objeto, HttpVerbo.POST)
            .then(json =>{
                if(json.status === 'OK'){
                    ExibirMensagem(`Senha Recuperada com Sucesso!`)
                    this.setState({cpf: ''})
                    this.setState({novaSenha: ''})
                    this.setState({repeteNovaSenha: ''})
                }
                if(json.status === 500){
                    ExibirMensagem(json.message,MSG.ERRO)
                }
            })
            .catch( e => ExibirMensagem('Um erro foi identificado - '+ e, MSG.ERRO))

    }

    render(){
        const {cpf,novaSenha,repeteNovaSenha,hash} = this.state
        return(
            <PaginaSemLogin titulo={"Recuperação de Senha"}>
                <div className="row">
                    <div className="col-12">

                        <input
                        type="hidden"
                        name="hash"
                        value={hash}
                        />

                        <Input
                            type="text"
                            onChange={this.handleChange}
                            value={cpf}
                            name="cpf"
                            label="Insira abaixo seu CPF"
                            placeholder="CPF"
                        />

                        <Input
                            type="password"
                            onChange={this.handleChange}
                            value={novaSenha}
                            name="novaSenha"
                            label="Insira sua nova senha"
                            placeholder="Nova Senha"
                            legenda="Ex. Dsfoma123"
                        />

                        <Input
                            type="password"
                            onChange={this.handleChange}
                            value={repeteNovaSenha}
                            name="repeteNovaSenha"
                            label="Repita Nova Senha"
                            placeholder="Repita a Nova Senha"
                        />

                        <div className="text-center col-12">
                            <Botao onClick={this.enviar} icone={ICONE.ENVIAR}> Salvar Senha </Botao>
                        </div>

                     </div>
                </div>
            </PaginaSemLogin>
        );
    }
}
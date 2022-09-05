import React, {useState} from 'react'
import {ExibirMensagem, xfetch} from "../util";
import {BotaoSalvar, Card, Input, Pagina} from "../componentes";
import {HttpVerbo, MSG} from "../util/Constantes";

export default function AlterarSenha() {
    const [senha, setSenha] = useState({
        login: localStorage.getItem('login'),
        senhaAtual: '',
        novaSenha: '',
        reNovaSenha: ''
    });

    const handleChange = (e) => {
        e.preventDefault();
        setSenha({...senha, [e.target.name]: e.target.value})
    }

    const enviar = (e) => {
        e.preventDefault()

        let senhaAtual = senha.senhaAtual
        let novaSenha = senha.novaSenha
        let reNovaSenha = senha.reNovaSenha

        if(senhaAtual === '' && novaSenha === '' && reNovaSenha === ''){
            ExibirMensagem("Informe os dados solicitados",MSG.ERRO)
        }else if(senhaAtual !== '' && novaSenha === '' && reNovaSenha === ''){
            ExibirMensagem("Informe e repita uma nova senha",MSG.ERRO)
        }else if(senhaAtual !== '' && novaSenha !== '' && reNovaSenha === ''){
            ExibirMensagem("Repita a nova senha",MSG.ERRO)
        }else if(senhaAtual !== '' && novaSenha === '' && reNovaSenha !== ''){
            ExibirMensagem("Informe uma nova senha",MSG.ERRO)
        }else if(senhaAtual === '' && novaSenha !== '' && reNovaSenha !== ''){
            ExibirMensagem("Informe a senha atual",MSG.ERRO)
        }else if(senhaAtual === '' && novaSenha === '' && reNovaSenha !== ''){
            ExibirMensagem("Informe a senha atual e uma nova senha",MSG.ERRO)
        }else if(senhaAtual === '' && novaSenha !== '' && reNovaSenha === ''){
            ExibirMensagem("Informe a senha atual e repita a nova senha",MSG.ERRO)
        }else if(novaSenha !== reNovaSenha){
            ExibirMensagem("Novas senhas incorretas/diferentes",MSG.ERRO)
        }else if(senhaAtual === novaSenha){
            ExibirMensagem("A nova senha deve ser diferente da senha atual",MSG.ERRO)
        }else {
            xfetch('/hpm/redefinir/senha', senha, HttpVerbo.POST)
                .then(json => {
                    console.log('Json recebido: ', json)
                    if (typeof json !== "undefined" && json.resultado === 'true'){
                         ExibirMensagem('Senha alterada com sucesso!');
                    }
                })
        }
    }

    return (
        <Pagina titulo={"Alterar Senha"}>
               <div className="row">
                   <div className="col-lg-4"></div>
                   <div className="col-lg-4">
                    <Card>
                       <Input
                         type="password"
                         onChange={handleChange}
                         value={senha.senhaAtual}
                         name="senhaAtual"
                         label="Senha atual"
                         placeholder="Senha atual"/>

                       <Input
                         type="password"
                         onChange={handleChange}
                         value={senha.novaSenha}
                         name="novaSenha"
                         label="Nova senha"
                         placeholder="Nova senha"
                         legenda="Ex. Dsfoma123"/>

                       <Input
                         type="password"
                         onChange={handleChange}
                         value={senha.reNovaSenha}
                         name="reNovaSenha"
                         label="Repita nova senha"
                         placeholder="Repita a nova senha"/>
                       <div className="align-items-end text-center col-12">
                           <BotaoSalvar onClick={enviar}> Alterar </BotaoSalvar>
                       </div>
                   </Card>
                   </div>
                   <div className="col-lg-4"></div>
               </div>
        </Pagina>
    );
}
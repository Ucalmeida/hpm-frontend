import React, {useState} from 'react'
import {ExibirMensagem, xfetch} from "../util";
import {BotaoSalvar, Card, Input, Pagina} from "../componentes";
import {HttpVerbo, MSG} from "../util/Constantes";

export default function AlterarSenha() {
    const [senha, setSenha] = useState({
        senhaAtual: '',
        novaSenha: '',
        reNovaSenha: '',
        confirmar: null
    });

    const handleChange = (e) => {
        e.preventDefault();
        // let valor = e.target.value
        setSenha({...senha, [e.target.name]: e.target.value})
        console.log("Senhas atualizando:", senha);
    }

    // validaSenha(valor) {
    //     return false;
    // }

    const enviar = (e) => {
        e.preventDefault()
        console.log("Senha:", senha);
        if (senha.senhaAtual === '') {
            ExibirMensagem("Senha não pode estar vazia", MSG.ERRO)
            return;
        }
        if (senha.novaSenha !== senha.reNovaSenha) {
            ExibirMensagem("Novas senhas inválidas", MSG.ERRO)
            return;
        }

        if (senha.senhaAtual !== senha.novaSenha) {
            setSenha({...senha, confirmar: true});
        }

        //TODO fazer chamada para o backend
        xfetch('/hpm/redefinir/senha', {}, HttpVerbo.POST)
            .then(resp => resp.json())
            .then(json => {
                if (json.status === 'OK') {
                    ExibirMensagem('Senha alterada com sucesso!');
                }
                else {
                    ExibirMensagem(json.json(), MSG.ERRO);
                }
            })

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
                         placeholder="Senha antual"/>

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
                         placeholder="Repita a nova"/>
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
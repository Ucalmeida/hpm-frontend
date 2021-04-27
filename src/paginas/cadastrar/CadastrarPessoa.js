import React, {useEffect, useState} from "react";
import {HttpVerbo, Tipo} from "../../util/Constantes";
import {BotaoSalvar, Card, Input, Pagina, Select} from "../../componentes";
import {ExibirMensagem, xfetch} from "../../util";

export function CadastrarPessoa() {
    const [objeto, setObjeto] = useState(
        {
            blPolicialMilitar: false,
            blPolicialCivil: false,
            blBombeiroMilitar: false,
            blFuncionario: false,
            blAtivo: true
        }
    );

    const pessoa = {
        nome: null,
        nomeSocial: null,
        cpf: null,
        login: null,
        celular: null,
        telefone: null,
        email: null,
        dataNascimento: null,
        blAcessaSistema: null,
        blVivo: null,
        idInstituicaoConvenio: null,
        idSangue: null,
        sexo: null
    }

    const enviar = async () => {

        console.log(objeto);

        await xfetch('/hpm/pessoa/cadastrar', objeto, HttpVerbo.POST)
            .then(json => {
                if (json.status === "OK") {
                    ExibirMensagem('Pessoa cadastrada',Tipo.MSG.SUCESSO)
                    window.location.reload();
                    // this.carregarLista()
                } else {
                    ExibirMensagem(json.message, Tipo.MSG.ERRO)
                }
            })
    }

    const handleChange = (e) => {
        e.preventDefault();

        if(e.target.value === 'Sim') {
            setObjeto({...objeto, [e.target.name]: true});
        } else if(e.target.value === 'Não') {
            setObjeto({...objeto, [e.target.name]: false});
        } else {
            setObjeto({...objeto, [e.target.name]: e.target.value});
        }
    }

    return(
        <Pagina>
            <div className="form-group row">
                <div className="col-lg-12"></div>
                <div className="col-lg-12">
                    <Card>
                        <Input
                            type="text"
                            value={pessoa.nome}
                            onChange={handleChange}
                            name="nome"
                            label="Nome"
                            placeholder="Nome"/>
                        <Input
                            type="text"
                            value={pessoa.nomeSocial}
                            onChange={handleChange}
                            name="nomeSocial"
                            label="Nome Social"
                            placeholder="Nome Social"/>
                        <Input
                            type="text"
                            value={pessoa.cpf}
                            onChange={handleChange}
                            name="cpf"
                            label="CPF"
                            placeholder="CPF"/>
                        <Input
                            type="text"
                            value={pessoa.login}
                            onChange={handleChange}
                            name="login"
                            label="Login"
                            placeholder="Login"/>
                        <Input
                            type="text"
                            value={pessoa.celular}
                            onChange={handleChange}
                            name="celular"
                            label="Celular"
                            placeholder="Celular"/>
                        <Input
                            type="text"
                            value={pessoa.telefone}
                            onChange={handleChange}
                            name="telefone"
                            label="Telefone"
                            placeholder="Telefone"/>
                        <Input
                            type="text"
                            value={pessoa.email}
                            onChange={handleChange}
                            name="email"
                            label="Email"
                            placeholder="Email"/>
                        <Input
                            type="date"
                            value={pessoa.dataNascimento}
                            onChange={handleChange}
                            name="dataNascimento"
                            label="Data de Nascimento"
                            placeholder="Nascimento"/>
                        <div className="form-group">
                            <label>Acessa Sistema</label>
                            <select className={"form-control col-lg-12"} name="blAcessaSistema" onChange={handleChange}>
                                <option></option>
                                <option value={pessoa.blAcessaSistema}>Sim</option>
                                <option value={pessoa.blAcessaSistema}>Não</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Vivo</label>
                            <select className={"form-control col-lg-12"} name="blVivo" onChange={handleChange}>
                                <option></option>
                                <option value={pessoa.blVivo}>Sim</option>
                                <option value={pessoa.blVivo}>Não</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Instituição</label>
                            <Select
                                funcao={handleChange}
                                valorAttr={pessoa.idInstituicaoConvenio}
                                nome={"idInstituicaoConvenio"}
                                url={"/hpm/instituicao/opcoes"}/>
                        </div>
                        <div className="form-group">
                            <label>Tipo Sanguíneo</label>
                            <Select
                                funcao={handleChange}
                                valorAttr={pessoa.idSangue}
                                nome={"idSangue"}
                                url={"/hpm/sangue/opcoes"} />
                        </div>
                        <div className="form-group">
                            <label>Sexo</label>
                            <Select
                                funcao={handleChange}
                                valorAttr={pessoa.sexo}
                                nome={"sexo"}
                                url={"/hpm/sexo/opcoes"}/>
                        </div>
                        <div className="align-items-end col-4">
                            <BotaoSalvar onClick={enviar} />
                        </div>
                    </Card>
                </div>
            </div>
        </Pagina>
    );
}
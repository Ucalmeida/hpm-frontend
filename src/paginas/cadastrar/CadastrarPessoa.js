import React, {useEffect, useState} from "react";
import Pagina from "../../componentes/pagina/Pagina";
import Select from "../../componentes/form/Select";
import {ExibirMensagem, xfetch} from "../../util/Util";
import {HttpVerbo, Tipo} from "../../util/Constantes";
import Card from "../../componentes/Card";
import Input from "../../componentes/form/Input";
import {BotaoSalvar} from "../../componentes/Botao";

export default function CadastrarPessoa() {
    const [objeto, setObjeto] = useState([]);

    const pessoa = {
        nome: null,
        nomeSocial: null,
        cpf: null,
        login: null,
        celular: null,
        telefone: null,
        email: null,
        dataNascimento: null,
        blPolicialMilitar: false,
        blPolicialCivil: false,
        blBombeiroMilitar: false,
        blFuncionario: false,
        blAcessaSistema: true,
        blAtivo: true,
        blVivo: null,
        idInstituicaoConvenio: null,
        idSangue: null,
        sexo: null,
        profissionalSaudeCmd: null
    }

    const enviar = async () => {
        console.log(objeto);
        await xfetch('/hpm/pessoa/cadastrar', objeto, HttpVerbo.POST)
            .then(json => {
                if (json.status === "OK") {
                    ExibirMensagem('Pessoa cadastrada',Tipo.MSG.SUCESSO)
                    // this.carregarLista()
                } else {
                    ExibirMensagem(json.message, Tipo.MSG.ERRO)
                }
            })
    }

    // useEffect(() => {
    //     enviar();
    // }, [])

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
                        {/*<div className="form-group col-lg-6">*/}
                        {/*    <label>Policial Militar</label>*/}
                        {/*    <select className={"form-group col-lg-6"} onChange={handleChange}>*/}
                        {/*        <option></option>*/}
                        {/*        <option value={pessoa.blPolicialMilitar} name="blPolicialMilitar" >Sim</option>*/}
                        {/*        <option value={pessoa.blPolicialMilitar} name="blPolicialMilitar">Não</option>*/}
                        {/*    </select>*/}
                        {/*</div>*/}
                        {/*<div className="form-group col-lg-6">*/}
                        {/*    <label>Bombeiro Militar</label>*/}
                        {/*    <select className={"form-group col-lg-6"} onChange={handleChange}>*/}
                        {/*        <option></option>*/}
                        {/*        <option value={pessoa.blBombeiroMilitar} name="sim">Sim</option>*/}
                        {/*        <option value={pessoa.blBombeiroMilitar} name="nao">Não</option>*/}
                        {/*    </select>*/}
                        {/*</div>*/}
                        {/*<div className="form-group col-lg-2">*/}
                        {/*    <label>Policial Civil</label>*/}
                        {/*    <select className={"form-group col-lg-6"} onChange={handleChange}>*/}
                        {/*        <option></option>*/}
                        {/*        <option value={pessoa.blPolicialCivil} name="sim">Sim</option>*/}
                        {/*        <option value={pessoa.blPolicialCivil} name="nao">Não</option>*/}
                        {/*    </select>*/}
                        {/*</div>*/}
                        {/*<div className="form-group col-lg-2">*/}
                        {/*    <label>Funcionário</label>*/}
                        {/*    <select className={"form-group col-lg-6"} onChange={handleChange}>*/}
                        {/*        <option></option>*/}
                        {/*        <option value={pessoa.blFuncionario} name="sim">Sim</option>*/}
                        {/*        <option value={pessoa.blFuncionario} name="nao">Não</option>*/}
                        {/*    </select>*/}
                        {/*</div>*/}
                        <div className="form-group col-lg-2">
                            <label>Acessa Sistema</label>
                            <select className={"form-group col-lg-6"} onChange={handleChange}>
                                <option></option>
                                <option value={pessoa.blAcessaSistema} name="blAcessaSistema">Sim</option>
                                <option value={pessoa.blAcessaSistema} name="blAcessaSistema">Não</option>
                            </select>
                        </div>
                        {/*<div className="form-group col-lg-2">*/}
                        {/*    <label>Ativo</label>*/}
                        {/*    <select className={"form-group col-lg-6"} onChange={handleChange}>*/}
                        {/*        <option></option>*/}
                        {/*        <option value={pessoa.blAtivo} name="sim">Sim</option>*/}
                        {/*        <option value={pessoa.blAtivo} name="nao">Não</option>*/}
                        {/*    </select>*/}
                        {/*</div>*/}
                        <div className="form-group col-lg-2">
                            <label>Vivo</label>
                            <select className={"form-group col-lg-6"} onChange={handleChange}>
                                <option></option>
                                <option value={pessoa.blVivo} name="blVivo">Sim</option>
                                <option value={pessoa.blVivo} name="blVivo">Não</option>
                            </select>
                        </div>
                        <div className="form-group col-lg-6">
                            <label>Instituição</label>
                            <Select
                                className={"form-group col-lg-6"} funcao={handleChange}
                                valorAttr={pessoa.idInstituicaoConvenio}
                                nome={"idInstituicaoConvenio"}
                                url={"/hpm/instituicao/opcoes"}/>
                        </div>
                        <div className="form-group col-lg-6">
                            <label>Tipo Sanguíneo</label>
                            <Select
                                className={"form-group col-lg-6"} funcao={handleChange}
                                valorAttr={pessoa.idSangue}
                                nome={"idSangue"}
                                url={"/hpm/sangue/opcoes"} />
                        </div>
                        <div className="form-group col-lg-6">
                            <label>Sexo</label>
                            <Select
                                className={"form-group col-lg-6"} funcao={handleChange}
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
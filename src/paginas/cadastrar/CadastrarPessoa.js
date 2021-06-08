import React, {useEffect, useState} from "react";
import {HttpVerbo, MSG} from "../../util/Constantes";
import {BotaoSalvar, Card, Input, Pagina, Select} from "../../componentes";
import {ExibirMensagem, xfetch} from "../../util";
import MaskedInput from "../../componentes/form/MaskedInput";

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
                    ExibirMensagem('Pessoa cadastrada',MSG.SUCESSO)
                    window.location.reload();
                    // this.carregarLista()
                } else {
                    ExibirMensagem(json.message, MSG.ERRO)
                }
            })
    }

    const handleInstituicao = (e) => {
        const idInstituicaoConvenio = e.value;
        setObjeto({...objeto, idInstituicaoConvenio : idInstituicaoConvenio});
    }

    const handleSangue = (e) => {
        const idSangue = e.value;
        setObjeto({...objeto, idSangue : idSangue});
    }

    const handleSexo = (e) => {
        const sexo = e.value;
        setObjeto({...objeto, sexo : sexo});
    }

    const handleChange = (e) => {
        if (!e.target) {
            setObjeto({...objeto, [e.name]: e.value});
        } else if(e.target.value === 'Sim') {
            setObjeto({...objeto, [e.target.name]: true});
        } else if(e.target.value === 'Não') {
            setObjeto({...objeto, [e.target.name]: false});
        } else if(e.target.name === 'nome' || e.target.name === 'nomeSocial') {
            setObjeto({...objeto, [e.target.name]: e.target.value.toUpperCase()});
        } else if(e.target.name === 'email') {
            setObjeto({...objeto, [e.target.name]: e.target.value.toLowerCase()});
        } else {
            setObjeto({...objeto, [e.target.name]: e.target.value});
        }
    }

    console.log(objeto);

    return(
        <Pagina titulo="Cadastrar Pessoa">
            <div className="row">
                <div className="col-lg-12"></div>
                <div className="col-lg-12">
                    <Card>
                        <div className="row">
                            <div className="col-lg-6">
                                <Input
                                    type="text"
                                    value={pessoa.nome}
                                    onChange={handleChange}
                                    name="nome"
                                    label="Nome"
                                    placeholder="Nome"/>
                            </div>
                            <div className="col-lg-3">
                                <Input
                                    type="text"
                                    value={pessoa.nomeSocial}
                                    onChange={handleChange}
                                    name="nomeSocial"
                                    label="Nome Social"
                                    placeholder="Nome Social"/>
                            </div>
                            <MaskedInput
                                mask={"999.999.999-99"}
                                type="text"
                                value={pessoa.cpf}
                                onChange={handleChange}
                                name="cpf"
                                label="CPF"
                                placeholder={"CPF"}
                                nomeClasse={"col-lg-3"}/>
                            <div className="col-lg-3">
                                <Input
                                    type="text"
                                    value={pessoa.login}
                                    onChange={handleChange}
                                    name="login"
                                    label="Login"
                                    placeholder="Login"/>
                            </div>
                            <MaskedInput
                                mask={"(99)99999-9999"}
                                type="text"
                                value={pessoa.celular}
                                onChange={handleChange}
                                name="celular"
                                label="Celular"
                                placeholder={"Celular"}
                                nomeClasse={"col-lg-2"}/>
                            <div className="col-lg-2">
                                <Input
                                    type="text"
                                    value={pessoa.telefone}
                                    onChange={handleChange}
                                    name="telefone"
                                    label="Telefone"
                                    placeholder="Telefone"/>
                            </div>
                            <div className="col-lg-3">
                                <Input
                                    type="text"
                                    value={pessoa.email}
                                    onChange={handleChange}
                                    name="email"
                                    label="Email"
                                    placeholder="Email"/>
                            </div>
                            <div className="col-lg-2">
                                <Input
                                    type="date"
                                    value={pessoa.dataNascimento}
                                    onChange={handleChange}
                                    name="dataNascimento"
                                    label="Data de Nascimento"
                                    placeholder="Nascimento"/>
                            </div>
                            <div className="col-lg-2">
                                <label>Acessa Sistema</label>
                                <select className={"form-control col-lg-12"} name="blAcessaSistema" onChange={handleChange}>
                                    <option></option>
                                    <option value={pessoa.blAcessaSistema}>Sim</option>
                                    <option value={pessoa.blAcessaSistema}>Não</option>
                                </select>
                            </div>
                            <div className="col-lg-2">
                                <label>Vivo</label>
                                <select className={"form-control col-lg-12"} name="blVivo" onChange={handleChange}>
                                    <option></option>
                                    <option value={pessoa.blVivo}>Sim</option>
                                    <option value={pessoa.blVivo}>Não</option>
                                </select>
                            </div>
                            <Select
                                funcao={handleInstituicao}
                                nome={"idInstituicaoConvenio"}
                                url={"/hpm/instituicao/opcoes"}
                                label={"Instituição"}
                                nomeClasse={"col-lg-3"}/>
                            <Select
                                funcao={handleSangue}
                                nome={"idSangue"}
                                url={"/hpm/sangue/opcoes"}
                                label={"Tipo Sanguíneo"}
                                nomeClasse={"col-lg-2"}/>
                            <Select
                                funcao={handleSexo}
                                nome={"sexo"}
                                url={"/hpm/sexo/opcoes"}
                                label={"Sexo"}
                                nomeClasse={"col-lg-3"}/>
                        </div>
                        <div className="col-lg-15 text-lg-right mt-4 mb-4">
                            <BotaoSalvar onClick={enviar} />
                        </div>
                    </Card>
                </div>
            </div>
        </Pagina>
    );
}
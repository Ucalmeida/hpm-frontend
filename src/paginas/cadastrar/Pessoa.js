import React, {useEffect, useState} from "react";
import {HttpVerbo, MSG} from "../../util/Constantes";
import {BotaoSalvar, Card, Input, Pagina, Select} from "../../componentes";
import {ExibirMensagem, xfetch} from "../../util";
import MaskedInput from "../../componentes/form/MaskedInput";
import { UseVisibilityToggler } from '../../hooks/UseVisibilityToggler';

export default function Pessoa() {
    const [objeto, setObjeto] = useState(
        {
            blPolicialMilitar: false,
            blPolicialCivil: false,
            blBombeiroMilitar: false,
            blFuncionario: false,
            blAtivo: true
        }
    );

    const [psf, setPsf] = useState({
        especialidades: [],
        nmRegistroConselho: null,
        nmCoren: null,
        nmCrefito: null,
        nmConter: null
    });

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
        sexo: null,
        profissionalSaudeCmd: {
            psf
        }
    }

    const enviar = async () => {

        await xfetch('/hpm/pessoa/cadastrar', objeto, HttpVerbo.POST)
            .then(json => {
                if (json.status === "OK") {
                    ExibirMensagem('Pessoa cadastrada', MSG.SUCESSO);
                } else {
                    if (json.errors !== undefined) {
                        ExibirMensagem(json.errors[0].defaultMessage, MSG.ERRO);
                    } else {
                        ExibirMensagem(json.message, MSG.ERRO);
                    }
                }
            })
            .catch(err => ExibirMensagem(err.message, MSG.ERRO))
        window.location.reload();
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

    const handleEspecialidade = (e) => {
        const especialidades = e.map((item) => { return item.value });
        setPsf({...psf, especialidades : especialidades});
    }

    useEffect( () => {
        setObjeto({...objeto, profissionalSaudeCmd : {
            especialidades : psf.especialidades,
            nmRegistroConselho : psf.nmRegistroConselho,
            nmCoren: psf.nmCoren,
            nmCrefito: psf.nmCrefito,
            nmConter: psf.nmConter
        }});
    }, [psf]);

    const handleChange = (e) => {
        const {name, value} = e.target;

        if (!e.target) {
            setObjeto({...objeto, [name]: value});
        } else if(value === 'Sim') {
            setObjeto({...objeto, [name]: true});
        } else if(value === 'Não') {
            setObjeto({...objeto, [name]: false});
        } else if(name === 'nome' || name === 'nomeSocial') {
            setObjeto({...objeto, [name]: value.toUpperCase()});
        } else if(name === 'email') {
            setObjeto({...objeto, [name]: value.toLowerCase()});
        } else if(name === 'nmRegistroConselho' || name === 'nmCoren' || name === 'nmCrefito' || name === 'nmConter') {
            setPsf({...psf, [name] : value.toUpperCase()});
        } else {
            setObjeto({...objeto, [name]: value});
        }
    }

    const [ConselhoComponent, togglerConselhoVisibility] = UseVisibilityToggler(
        <div className="col-lg-8">
            <Input
                type="text"
                value={psf.nmRegistroConselho}
                onChange={handleChange}
                name="nmRegistroConselho"
                placeholder="Registro"/>
        </div>, false
    );
    
    const [CorenComponent, togglerCorenVisibility] = UseVisibilityToggler(
        <div className="col-lg-8">
            <Input
                type="text"
                value={psf.nmCoren}
                onChange={handleChange}
                name="nmCoren"
                placeholder="Coren"/>
        </div>, false
    );
    
    const [CrefitoComponent, togglerCrefitoVisibility] = UseVisibilityToggler(
        <div className="col-lg-8">
            <Input
                type="text"
                value={psf.nmCrefito}
                onChange={handleChange}
                name="nmCrefito"
                placeholder="Crefito"/>
        </div>, false
    );
    
    const [ConterComponent, togglerConterVisibility] = UseVisibilityToggler(
        <div className="col-lg-8">
            <Input
                type="text"
                value={psf.nmConter}
                onChange={handleChange}
                name="nmConter"
                placeholder="Conter"/>
        </div>, false
    );

    const [CardComponent, togglerCardVisibility] = UseVisibilityToggler(
        <Card titulo="Profissional de Saúde">
            <div className="row form-group">
                <div className="col-lg-12">
                    <Select
                        placeholder={"Especialidades"}
                        funcao={handleEspecialidade}
                        nome={"especialidades"}
                        multiplo={true}
                        url={"/hpm/especialidade/opcoes"}/>
                </div>
                <br/>
                <br/>
                <div className="form-check col-lg-3">
                    <input
                        id="conselhoCheck"
                        type="checkbox"
                        onClick={togglerConselhoVisibility}
                        name="conselho"/>
                    <label className="form-check-label" for="conselhoCheck">Registro do Conselho</label>
                    {ConselhoComponent}
                </div>
                <div className="col-lg-3">
                    <input
                        id="corenCheck"
                        type="checkbox"
                        onClick={togglerCorenVisibility}
                        name="coren"/>
                    <label className="form-check-label" for="corenCheck">Registro do Coren</label>
                {CorenComponent}
                </div>
                <div className="col-lg-3">
                    <input
                        id="crefitoCheck"
                        type="checkbox"
                        onClick={togglerCrefitoVisibility}
                        name="crefito"/>
                    <label className="form-check-label" for="crefitoCheck">Registro do Crefito</label>
                {CrefitoComponent}
                </div>
                <div className="col-lg-3">
                    <input
                        id="conterCheck"
                        type="checkbox"
                        onClick={togglerConterVisibility}
                        name="conter"/>
                    <label className="form-check-label" for="conterCheck">Registro do Conter</label>
                {ConterComponent}
                </div>
            </div>
        </Card>, false
    );

    return(
        <Pagina titulo="Cadastrar Pessoa">
            <div className="row">
                <div className="col-lg-12"></div>
                <div className="col-lg-12">
                    <Card titulo="Cadastrar">
                        <div className="row">
                            <div className="col-lg-6">
                                <Input
                                    type="text"
                                    value={pessoa.nome}
                                    onChange={handleChange}
                                    name="nome"
                                    label="Nome"
                                    placeholder="Nome" required/>
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
                            <div className="col-lg-3">
                                <label>CPF</label>
                                <MaskedInput
                                    mask={"999.999.999-99"}
                                    type="text"
                                    value={pessoa.cpf}
                                    onChange={handleChange}
                                    name="cpf"
                                    placeholder={"CPF"}/>
                            </div>
                            <div className="col-lg-3">
                                <Input
                                    type="text"
                                    value={pessoa.login}
                                    onChange={handleChange}
                                    name="login"
                                    label="Login"
                                    placeholder="Login"/>
                            </div>
                            <div className="col-lg-2">
                                <label>Celular</label>
                                <MaskedInput
                                    mask={"(99)99999-9999"}
                                    type="text"
                                    value={pessoa.celular}
                                    onChange={handleChange}
                                    name="celular"
                                    placeholder={"Celular"}/>
                            </div>
                            <div className="col-lg-2">
                                <label>Telefone</label>
                                <MaskedInput
                                    mask={"(99)9999-9999"}
                                    type="text"
                                    value={pessoa.telefone}
                                    onChange={handleChange}
                                    name="telefone"
                                    placeholder={"Telefone"}/>
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
                            <div className="col-lg-1">
                                <label>Vivo</label>
                                <select className={"form-control col-lg-12"} name="blVivo" onChange={handleChange}>
                                    <option></option>
                                    <option value={pessoa.blVivo}>Sim</option>
                                    <option value={pessoa.blVivo}>Não</option>
                                </select>
                            </div>
                            <div className="col-lg-2">
                                <label>Instituição</label>
                                <Select
                                    placeholder={"Instituição"}
                                    funcao={handleInstituicao}
                                    nome={"idInstituicaoConvenio"}
                                    url={"/hpm/instituicao/opcoes"}/>
                            </div>
                            <div className="col-lg-2">
                                <label>Tipo Sanguíneo</label>
                                <Select
                                    placeholder={"Tipo Sanguíneo"}
                                    funcao={handleSangue}
                                    nome={"idSangue"}
                                    url={"/hpm/sangue/opcoes"}/>
                            </div>
                            <div className="col-lg-2">
                                <label>Sexo</label>
                                <Select
                                    placeholder={"Sexo"}
                                    funcao={handleSexo}
                                    nome={"sexo"}
                                    url={"/hpm/sexo/opcoes"}/>
                            </div>
                            <div className="col-lg-3">
                                <label>É Profissional de Saúde? </label>
                                <input
                                    type="checkbox"
                                    onClick={togglerCardVisibility}
                                    name="psf"/>
                            </div>
                        </div>
                        <br/>
                        {CardComponent}
                        <div className="col-lg-15 text-lg-right mt-4 mb-4">
                            <BotaoSalvar onClick={enviar} />
                        </div>
                    </Card>
                </div>
            </div>
        </Pagina>
    );
}
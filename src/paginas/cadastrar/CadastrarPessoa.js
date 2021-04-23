import React, {useEffect, useState} from "react";
import Pagina from "../../componentes/pagina/Pagina";
import Select from "../../componentes/form/Select";
import {ExibirMensagem, xfetch} from "../../util/Util";
import {HttpVerbo, Tipo} from "../../util/Constantes";
import Card from "../../componentes/Card";
import Input from "../../componentes/form/Input";
import {BotaoSalvar} from "../../componentes/Botao";

function CadastrarPessoa() {
    const [nome, setNome] = useState();
    const [nomeSocial, setNomeSocial] = useState();
    const [pessoaCpf, setPessoaCpf] = useState();
    const [celular, setCelular] = useState();
    const [telefone, setTelefone] = useState();
    const [email, setEmail] = useState();
    const [nascimento, setNascimento] = useState();
    const [epolicial, setEpolicial] = useState();
    const [npolicial, setNpolicial] = useState();
    const [ebombeiro, setEbombeiro] = useState();
    const [nbombeiro, setNbombeiro] = useState();
    const [objeto, setObjeto] = useState([]);

    const enviar = async () => {
        await xfetch('/hpm/pessoa/cadastrar', objeto, HttpVerbo.POST)
            .then(json => {
                if (json.statusText === "OK") {
                    ExibirMensagem('Pessoa cadastrada',Tipo.MSG.SUCESSO)
                    this.carregarLista()
                } else {
                    ExibirMensagem(json.message, Tipo.MSG.ERRO)
                }
            })
    }

    useEffect(() => {
        enviar();
    }, [])

    const handleChange = (e) => {
        e.preventDefault();
        setObjeto(
            [
                    setNome(nome),
                    setNomeSocial(nomeSocial),
                    setPessoaCpf(pessoaCpf),
                    setCelular(celular),
                    setTelefone(telefone),
                    setEmail(email),
                    setNascimento(nascimento),
                    setEpolicial(epolicial),
                    setNpolicial(npolicial),
                    setEbombeiro(ebombeiro),
                    setNbombeiro(nbombeiro),
            ] );
    }

    return(
        <Pagina>
            <div className="form-group row">
                <div className="col-lg-12"></div>
                <div className="col-lg-12">
                    <Card>
                        <Input
                            type="text"
                            value={nome}
                            onChange={handleChange}
                            name="nome"
                            label="Nome"
                            placeholder="Nome"/>
                        <Input
                            type="text"
                            value={nomeSocial}
                            onChange={handleChange}
                            name="nomeSocial"
                            label="Nome Social"
                            placeholder="Nome Social"/>
                        <Input
                            type="text"
                            value={pessoaCpf}
                            onChange={handleChange}
                            name="pessoaCpf"
                            label="CPF"
                            placeholder="CPF"/>
                        <Input
                            type="text"
                            value={celular}
                            onChange={handleChange}
                            name="celular"
                            label="Celular"
                            placeholder="Celular"/>
                        <Input
                            type="text"
                            value={telefone}
                            onChange={handleChange}
                            name="telefone"
                            label="Telefone"
                            placeholder="Telefone"/>
                        <Input
                            type="text"
                            value={email}
                            onChange={handleChange}
                            name="email"
                            label="Email"
                            placeholder="Email"/>
                        <Input
                            type="text"
                            value={nascimento}
                            onChange={handleChange}
                            name="nascimento"
                            label="Data de Nascimento"
                            placeholder="Nascimento"/>
                        <div className="form-group col-lg-6">
                            <label>Policial Militar</label>
                            <select className={"form-group col-lg-6"} onChange={handleChange}>
                                <option></option>
                                <option value={epolicial}>Sim</option>
                                <option value={npolicial}>Não</option>
                            </select>
                        </div>
                        <div className="form-group col-lg-6">
                            <label>Bombeiro Militar</label>
                            <select className={"form-group col-lg-6"} onChange={handleChange}>
                                <option></option>
                                <option value={ebombeiro}>Sim</option>
                                <option value={nbombeiro}>Não</option>
                            </select>
                        </div>
                        {/*<div className="form-group col-lg-2">*/}
                        {/*    <label>Policial Civil</label>*/}
                        {/*    <Select className={"form-group col-lg-4"} name={"pessoa.policialCivil"} />*/}
                        {/*</div>*/}
                        {/*<div className="form-group col-lg-2">*/}
                        {/*    <label>Funcionário</label>*/}
                        {/*    <Select className={"form-group col-lg-4"} name={"pessoa.funcionario"} />*/}
                        {/*</div>*/}
                        {/*<div className="form-group col-lg-2">*/}
                        {/*    <label>Acessa Sistema</label>*/}
                        {/*    <Select className={"form-group col-lg-4"} name={"pessoa.acessoSistema"} />*/}
                        {/*</div>*/}
                        {/*<div className="form-group col-lg-2">*/}
                        {/*    <label>Ativo</label>*/}
                        {/*    <Select className={"form-group col-lg-4"} name={"pessoa.ativo"} />*/}
                        {/*</div>*/}
                        {/*<div className="form-group col-lg-2">*/}
                        {/*    <label>Vivo</label>*/}
                        {/*    <Select className={"form-group col-lg-4"} name={"pessoa.vivo"} />*/}
                        {/*</div>*/}
                        <div className="form-group col-lg-6">
                            <label>Instituição</label>
                            <Select className={"form-group col-lg-6"} name={"instituicao.id"} url={"/hpm/instituicao/opcoes"}/>
                        </div>
                        <div className="form-group col-lg-6">
                            <label>Tipo Sanguíneo</label>
                            <Select className={"form-group col-lg-6"} name={"sangue.id"} url={"/hpm/sangue/opcoes"} />
                        </div>
                        <div className="form-group col-lg-6">
                            <label>Sexo</label>
                            <Select className={"form-group col-lg-6"} name={"sexo.id"} url={"/hpm/sexo/opcoes"}/>
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

export default CadastrarPessoa;
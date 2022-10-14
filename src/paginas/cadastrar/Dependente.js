import React, {useState} from "react";
import {
    Autocompletar,
    Autocomplete,
    Botao,
    BotaoPesquisar,
    BotaoSalvar,
    Card,
    Input,
    Pagina,
    Select
} from "../../componentes";
import {ExibirMensagem, xfetch} from "../../util";
import {HttpVerbo, MSG} from "../../util/Constantes";
import MaskedInput from "../../componentes/form/MaskedInput";
import {object} from "prop-types";

export default function Dependente(){
    const [objeto, setObjeto] = useState(
        {
            titular: [],
            idPessoa: null
        }
    )

    const [pessoa, setPessoa] = useState(
        {
            idPessoa: null,
            nome: null,
            nomeSocial:null,
            cpf:null,
            login:null,
            celular:null,
            telefone:null,
            email:null,
            dataNascimento:null,
            idSangue: null,
            sexo: null,
            idInstituicaoConvenio: null,
            blAcessaSistema: null,
            blVivo: null,
            idTipoDependencia: null
        }
    )

    const [dependencia, setDependencia] = useState(
        {
            idTitular:null,
            cpfDependente:null,
            idTipoDependencia:null
        }
    )

    function salvarDependencia(){
        xfetch('/hpm/pessoaDependente/cadastrar', dependencia, HttpVerbo.POST)
    }

    function selecionarPessoa(idPessoa){
        setObjeto({...objeto, idPessoa: idPessoa})
    }

    function verificarVinculo(){
        console.log(objeto);
        xfetch('/hpm/pessoa/porId/'+objeto.idPessoa, {}, HttpVerbo.GET)
            .then(res => res.json())
            .then(json =>{
                if(json.status === 'OK'){
                    objeto.titular = json.resultado
                    console.log("id da inst: " + objeto.titular.instituicaoConvenio)
                     if(objeto.titular.instituicaoConvenio !== null){
                        pessoa.idInstituicaoConvenio = objeto.titular.instituicaoConvenio.id
                     }
                    dependencia.idTitular = json.resultado.id
                    pessoa.idPessoa = json.resultado.id
                    console.log('@@@@: ' + objeto.titular.instituicaoConvenio)
                    selecionarPessoa();
                }else{
                    ExibirMensagem(json.message, MSG.ERRO)
                }
                }
            )
    }

    function cadastrarDependente(){
        xfetch('/hpm/dependente/cadastrar', pessoa, HttpVerbo.POST)
            .then(json => {
                if (json.status === "OK"){
                    ExibirMensagem('Dependente cadastrado(a) com sucesso!', MSG.SUCESSO);
                    dependencia.cpfDependente = pessoa.cpf
                    dependencia.idTipoDependencia = pessoa.idTipoDependencia
                    salvarDependencia()
                }else{
                    ExibirMensagem(json.message, MSG.ERRO);
                }
            })
    }



    const handleChangeAcessaSistema = (e) => {
        if(e.target.value === "Sim"){
            setPessoa({...pessoa, blAcessaSistema: true})
        }else{
            setPessoa({...pessoa, blAcessaSistema: false})
        }
    }

    const handleChangeVivo = (e) => {
        if(e.target.value === "Sim"){
            setPessoa({...pessoa, blVivo: true})
        }else{
            setPessoa({...pessoa, blVivo: false})
        }
    }

    const handleChangeNome = (e) => {
        setPessoa({...pessoa,nome: e.target.value})
    }

    const handleChangeNomeSocial = (e) => {
        setPessoa({...pessoa, nomeSocial: e.target.value})
    }

    const handleChangeCpf = (e) => {
        setPessoa({...pessoa, cpf: e.target.value})
    }

    const handleChangeLogin = (e) => {
        setPessoa({...pessoa,login: e.target.value})
    }

    const handleChangeCelular = (e) => {
        setPessoa({...pessoa,celular: e.target.value})
    }

    const handleChangeTelefone = (e) => {
        setPessoa({...pessoa,telefone: e.target.value})
    }

    const handleChangeEmail = (e) => {
        setPessoa({...pessoa,email: e.target.value})
    }

    const handleChangeDtNascimento = (e) => {
        setPessoa({...pessoa, dataNascimento: e.target.value})
    }

    const handleSangue = (e) => {
        const idSangue = e.value;
      setPessoa({...pessoa,idSangue: idSangue})
    }

    const handleSexo = (e) => {
        setPessoa({...pessoa,sexo: e.value})
    }
    const handleDependencia = (e) => {
        setPessoa({...pessoa,idTipoDependencia: e.value})
    }



    let cadastraDependente = '';
    if(objeto.titular.blPolicialMilitar === undefined || objeto.titular.blBombeiroMilitar === undefined||objeto.titular.blPolicialCivil === undefined){
        cadastraDependente = ''
    } else if(objeto.titular.blPolicialMilitar || objeto.titular.blBombeiroMilitar || objeto.titular.blPolicialCivil){
        cadastraDependente = 'ERRO!!! Cadastro de dependentes indisponível devido o vínculo do titular!';
    }else if(objeto.titular.instituicaoConvenio === null){
        cadastraDependente = 'ERRO!!! Tentando inserir um dependente como titular!';
    }else{
        cadastraDependente =
           <Card titulo="Dependente">
            <div className="col-lg-12">
                <div className="row">
                    <div className="col-lg-6">
                        <Input
                            type="text"
                            value={pessoa.nome}
                            onChange={handleChangeNome}
                            name="nome"
                            label="Nome"
                            placeholder="Nome" required/>
                    </div>
                    <div className="col-lg-3">
                        <Input
                            type="text"
                            value={pessoa.nomeSocial}
                            onChange={handleChangeNomeSocial}
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
                            onChange={handleChangeCpf}
                            name="cpf"
                            placeholder={"CPF"}/>
                    </div>
                    <div className="col-lg-3">
                        <Input
                            type="text"
                            value={pessoa.login}
                            onChange={handleChangeLogin}
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
                            onChange={handleChangeCelular}
                            name="celular"
                            placeholder={"Celular"}/>
                    </div>
                    <div className="col-lg-2">
                        <label>Telefone</label>
                        <MaskedInput
                            mask={"(99)9999-9999"}
                            type="text"
                            value={pessoa.telefone}
                            onChange={handleChangeTelefone}
                            name="telefone"
                            placeholder={"Telefone"}/>
                    </div>
                    <div className="col-lg-3">
                        <Input
                            type="text"
                            value={pessoa.email}
                            onChange={handleChangeEmail}
                            name="email"
                            label="Email"
                            placeholder="Email"/>
                    </div>
                    <div className="col-lg-2">
                        <Input
                            type="date"
                            value={pessoa.dataNascimento}
                            onChange={handleChangeDtNascimento}
                            name="dataNascimento"
                            label="Data de Nascimento"
                            placeholder="Nascimento"/>
                    </div>
                    <div className="col-lg-2">
                        <label>Acessa Sistema</label>
                        <select className={"form-control col-lg-12"} name="blAcessaSistema" onChange={handleChangeAcessaSistema}>
                            <option></option>
                            <option value={pessoa.blAcessaSistema}>Sim</option>
                            <option value={pessoa.blAcessaSistema}>Não</option>
                        </select>
                    </div>
                    <div className="col-lg-1">
                        <label>Vivo</label>
                        <select className={"form-control col-lg-12"} name="blVivo" onChange={handleChangeVivo}>
                            <option></option>
                            <option value={pessoa.blVivo}>Sim</option>
                            <option value={pessoa.blVivo}>Não</option>
                        </select>
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
                    <div className="col-lg-2">
                        <label>Tipo Dependência</label>
                        <Select
                            placeholder={"Tipo"}
                            funcao={handleDependencia}
                            nome={"tipo"}
                            url={"/hpm/tipo/opcoes/"}/>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <BotaoSalvar onClick={cadastrarDependente}></BotaoSalvar>
                </div>
            </div>
        </Card>
    }

    return(
        <Pagina titulo="Cadastrar Dependente">
            <div className="row">
                <div className="col-lg-12">
                    <Card titulo="Titular">
                        <div className="row">
                            <div className="col-lg-8">
                                <Autocompletar
                                    name="pessoa"
                                    url="/hpm/pessoa/"
                                    label="Digite os Dados:"
                                    placeholder="Nome ou CPF aqui"
                                    tamanho={6}
                                    retorno={selecionarPessoa} />
                            </div>
                            <div className="col-lg-4 mt-4 mb-4">
                                <BotaoPesquisar onClick={verificarVinculo}>Verificar Vínculo</BotaoPesquisar>
                            </div>
                        </div>
                    </Card>
                    <div className="col-lg-12">
                        {cadastraDependente}
                    </div>
                </div>
            </div>
        </Pagina>
    )
}

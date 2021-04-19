import React, {useState} from "react";
import Pagina from "../../componentes/pagina/Pagina";
import Select from "../../componentes/form/Select";
import {xfetch} from "../../util/Util";
import {HttpVerbo} from "../../util/Constantes";
import Card from "../../componentes/Card";
import Input from "../../componentes/form/Input";

function CadastrarPessoa() {
    const [nome, setNome] = useState('');
    const [nomeSocial, setNomeSocial] = useState('');
    const [objeto, setObjeto] = useState([]);

    const enviar = (e) => {
        e.preventDefault();

        xfetch('/hpm/pessoa/cadastrar', objeto, HttpVerbo.POST)
            .then(json => {
                if (json.status === "OK") {
                    window.alert('Sangue cadastrado')
                } else {
                    window.alert("Algo errado aconteceu - " + json.message)
                }
            });
    }

    const handleChange = (e) => {
        e.preventDefault();
        setObjeto(e.target.value);
    }

    return(
        <Pagina>
            <div className="form-group row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <Card>
                        <Input
                            type="text"
                            onChange={handleChange}
                            value={nome}
                            name="nome"
                            label="Nome"
                            placeholder="Nome"/>
                        <Input
                            type="text"
                            onChange={handleChange}
                            value={nomeSocial}
                            name="nomeSocial"
                            label="Nome Social"
                            placeholder="Nome Social"/>
                        <input className="form-group col-lg-4" name="pessoa.nomeSocial"/>
                        <input className="form-group col-lg-4" name="pessoa.cpf"/>
                        <input className="form-group col-lg-4" name="pessoa.celular"/>
                        <input className="form-group col-lg-4" name="pessoa.telefone"/>
                        <input className="form-group col-lg-4" name="pessoa.email"/>
                        <input className="form-group col-lg-4" name="pessoa.dtNascimento"/>
                        {/*<div className="form-group col-lg-2">*/}
                        {/*    <label>Policial Militar</label>*/}
                        {/*    <Select className={"form-group col-lg-4"} name={"pessoa.policialMilitar"}/>*/}
                        {/*</div>*/}
                        {/*<div className="form-group col-lg-2">*/}
                        {/*    <label>Bombeiro Militar</label>*/}
                        {/*    <Select className={"form-group col-lg-4"} name={"pessoa.bombeiroMilitar"} />*/}
                        {/*</div>*/}
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
                        {/*<div className="form-group col-lg-2">*/}
                        {/*    <label>Instituição</label>*/}
                        {/*    <Select className={"form-group col-lg-4"} name={"instituicao.id"} />*/}
                        {/*</div>*/}
                        <div className="form-group col-lg-4">
                            <label>Tipo Sanguíneo</label>
                            <Select className={"form-group col-lg-4"} name={"sangue.id"} url={"/hpm/sangue/opcoes"} />
                        </div>
                        {/*<div className="form-group col-lg-2">*/}
                        {/*    <label>Sexo</label>*/}
                        {/*    <Select className={"form-group col-lg-4"} name={"sexo.id"} />*/}
                        {/*</div>*/}
                        <div className="align-items-end col-4">
                            <button className="btn btn-success" onClick={enviar}> Cadastrar </button>
                        </div>
                    </Card>
                </div>
            </div>
        </Pagina>
    );
}

export default CadastrarPessoa;
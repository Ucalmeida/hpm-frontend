import {useState, useEffect} from 'react';
import Pagina from "../../componentes/pagina/Pagina";
import Select from "../../componentes/Select";

function CadastrarPessoa() {
    return(
        <Pagina titulo={"Cadastrar Pessoa"}>
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-12">
                    <input className="form-group col-lg-4" name="pessoa.nome"/>
                    <input className="form-group col-lg-4" name="pessoa.nomeSocial"/>
                    <input className="form-group col-lg-4" name="pessoa.cpf"/>
                    <input className="form-group col-lg-4" name="pessoa.celular"/>
                    <input className="form-group col-lg-4" name="pessoa.telefone"/>
                    <input className="form-group col-lg-4" name="pessoa.email"/>
                    <input className="form-group col-lg-4" name="pessoa.dtNascimento"/>
                    <div className="form-group col-lg-2">
                        <label>Policial Militar</label>
                        <Select className={"form-group col-lg-4"} name={"pessoa.policialMilitar"}/>
                    </div>
                    <div className="form-group col-lg-2">
                        <label>Bombeiro Militar</label>
                        <Select className={"form-group col-lg-4"} name={"pessoa.bombeiroMilitar"} />
                    </div>
                    <div className="form-group col-lg-2">
                        <label>Policial Civil</label>
                        <Select className={"form-group col-lg-4"} name={"pessoa.policialCivil"} />
                    </div>
                    <div className="form-group col-lg-2">
                        <label>Funcionário</label>
                        <Select className={"form-group col-lg-4"} name={"pessoa.funcionario"} />
                    </div>
                    <div className="form-group col-lg-2">
                        <label>Acessa Sistema</label>
                        <Select className={"form-group col-lg-4"} name={"pessoa.acessoSistema"} />
                    </div>
                    <div className="form-group col-lg-2">
                        <label>Ativo</label>
                        <Select className={"form-group col-lg-4"} name={"pessoa.ativo"} />
                    </div>
                    <div className="form-group col-lg-2">
                        <label>Vivo</label>
                        <Select className={"form-group col-lg-4"} name={"pessoa.vivo"} />
                    </div>
                    <div className="form-group col-lg-2">
                        <label>Instituição</label>
                        <Select className={"form-group col-lg-4"} name={"instituicao.id"} />
                    </div>
                    <div className="form-group col-lg-2">
                        <label>Tipo Sanguíneo</label>
                        <Select className={"form-group col-lg-4"} name={"sangue.id"} url={"/opcoes"} />
                    </div>
                    <div className="form-group col-lg-2">
                        <label>Sexo</label>
                        <Select className={"form-group col-lg-4"} name={"sexo.id"} />
                    </div>
                </div>
            </div>
        </Pagina>
    );
}

export default CadastrarPessoa();
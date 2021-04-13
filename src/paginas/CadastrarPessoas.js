import {useState, useEffect} from 'react';
import Pagina from "../componentes/pagina/Pagina";

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
                    <select className="form-group col-lg-4" name="pessoa.policialMilitar">
                        <option></option>
                    </select>
                    <select className="form-group col-lg-4" name="pessoa.bombeiroMilitar">
                        <option></option>
                    </select>
                    <select className="form-group col-lg-4" name="pessoa.policialCivil">
                        <option></option>
                    </select>
                    <select className="form-group col-lg-4" name="pessoa.funcionario">
                        <option></option>
                    </select>
                    <select className="form-group col-lg-4" name="pessoa.acessoSistema">
                        <option></option>
                    </select>
                    <select className="form-group col-lg-4" name="pessoa.ativo">
                        <option></option>
                    </select>
                    <select className="form-group col-lg-4" name="pessoa.vivo">
                        <option></option>
                    </select>
                    <select className="form-group col-lg-4" name="instituicao.id">
                        <option></option>
                    </select>
                    <select className="form-group col-lg-4" name="sangue.id">
                        <option></option>
                    </select>
                    <select className="form-group col-lg-4" name="sexo.id">
                        <option></option>
                    </select>
                </div>
            </div>
        </Pagina>
    );
}

export default CadastrarPessoa();
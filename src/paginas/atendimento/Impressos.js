import React, { useState } from "react";
import { Autocompletar, Botao, Card, Input, Pagina, Select, Tabela } from "../../componentes";
import { BOTAO } from '../../util/Constantes';

export default function Impressos() {

    const [objeto, setObjeto] = useState(
        {
            idPessoa: null,
        }
    )

    const [calendario, setCalendario] = useState({
        dtInicio: "",
        dtTermino: ""
    });

    let idpessoa = "";

    const consultas = ["Urian de Castro Almeida", "999.999.999-99", "23/02/2023 - 08:00", "Atestado"]

    const selecionarPessoa = (e) => {
        idpessoa = document.getElementById('idpessoa').value;
        localStorage.setItem("idPessoa", idpessoa);
        setObjeto({...objeto, idPessoa: idpessoa});
    }

    const handleData = (e) => {
        const {name, value} = e.target;
        setCalendario({...calendario, [name]: value});
        console.log("Escolheu uma data");
    }

    const handleBtnImprimir = () => {
        alert("Imprimir");
    }

    const colunas = [
        {text: "Paciente"},
        {text: "CPF do Paciente"},
        {text: "Data - Hora"},
        {text: "Tipo"},
        {text: "Ações"}
    ]

    const dados = () => {
        return(
            consultas.map(() => {
                return({
                    'paciente': "Urian de Castro Almeida",
                    'cpf_do_paciente': "999.999.999-99",
                    'data__hora': "23/02/2023 - 08:00",
                    'tipo': "Atestado",
                    'acoes': <div>
                                <Botao cor={BOTAO.COR.SUCESSO} onClick={() => handleBtnImprimir()}>Imprimir</Botao>
                            </div>
    
                })
            })
        )
    }
    
    return (
        <Pagina titulo="Reimpressão">
            <div className="row">
                <div className="col-lg-12">
                    <Card>
                        <div className={"row"}>
                            <div className="col-lg-5">
                                <Autocompletar
                                    name="pessoa"
                                    url="/hpm/pessoa/"
                                    label="Digite os Dados:"
                                    placeholder="Nome ou CPF aqui"
                                    tamanho={6}
                                    retorno={selecionarPessoa} />
                            </div>
                            <div className="col-lg-3">
                                <label htmlFor="">Tipo</label>
                                <select className="form-control" id="teste">
                                    <option value="0">Selecione...</option>
                                    <option value="1">Atestado</option>
                                    <option value="2">Receita</option>
                                    <option value="3">Relatório</option>
                                </select>
                            </div>
                            <div className="col-lg-2">
                                <Input
                                    type="date"
                                    value={calendario.dtInicio}
                                    onChange={handleData}
                                    name="dtInicio"
                                    label="Data Início"
                                    placeholder="Data e hora"/>
                            </div>
                            <div className="col-lg-2">
                                <Input
                                    type="date"
                                    value={calendario.dtTermino}
                                    onChange={handleData}
                                    name="dtTermino"
                                    label="Data Término"
                                    placeholder="Data e hora"/>
                            </div>
                        </div>
                    </Card>
                    <Card titulo="Lista de Impressos">
                        <Tabela colunas={colunas} dados={dados()} pageSize={5} />
                    </Card>
                </div>
            </div>
        </Pagina>
    )
}
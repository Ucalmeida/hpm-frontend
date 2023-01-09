import React, { useState } from "react";
import { FormGroup, Tab, Tabs } from "react-bootstrap";
import { Botao, BotaoExcluir, Card, EditorTexto, Input, Pagina } from "../../componentes";
import { AutocompletarCid } from "../../componentes/form/AutocompletarCid";
import { default as ModalFormMedico, default as ModalFormMedicoAtestado } from "../../componentes/modal/ModalFormMedicoAtestado";
import { ExibirMensagem, xfetch } from "../../util";
import { BOTAO, HttpVerbo, ICONE, MSG } from "../../util/Constantes";

export default function PacienteEmAtendimento() {
    const [consulta, setConsulta] = useState({
        id: localStorage.getItem("pacienteConsulta"),
        idPessoa: localStorage.getItem("idPessoa"),
        nmPaciente: localStorage.getItem("nmPaciente"),
        dtNascimento: localStorage.getItem('dtNascimento'),
        altura: localStorage.getItem('altura'),
        peso: localStorage.getItem('peso'),
        txtRelato: localStorage.getItem("relato"),
        idade: null,
        imc: null,
        pessoas: [],
        idCids: []
    });

    let medida = {
        medidaAltura: "m",
        medidaPeso: "Kg"
    };

    const altura = Number(consulta.altura / 100);

    let calcIdade = (data) => {
        const atual = new Date();
        const dataNascimento = data.split('/');
        const anoNascimento = dataNascimento[2].split("-");
        let idade = atual.getFullYear() - anoNascimento[0];
        const m = atual.getMonth() - dataNascimento[1];
        if (m < 0 || (m === 0 && atual.getDate() < dataNascimento[0])) {
            idade--;
        }
        return idade;
    }

    let calcImc = () => {
        let peso = Number(consulta.peso);
        let imc = peso / (altura * altura);
        return imc.toFixed(2);
    }

    consulta.idade = calcIdade(consulta.dtNascimento);
    consulta.imc = calcImc();

    return (
        <Pagina titulo="Paciente em Atendimento">
            <div className="row">
                <div className="col-lg-12">
                    <Card>
                        <div className="col-lg-12">
                            <div className={"info-box"}>
                                <div className="info-box-content">
                                    <span className="info-box-text">Nome do Paciente</span>
                                    <span className="info-box-text">{consulta.nmPaciente}</span>
                                </div>
                                <div className="info-box-content">
                                    <span className="info-box-text">Idade do Paciente</span>
                                    <span className="info-box-number">{consulta.idade}</span>
                                </div>
                                <div className="info-box-content">
                                    <span className="info-box-text">Altura do Paciente</span>
                                    <span className="info-box-number">{altura + medida.medidaAltura}</span>
                                </div>
                                <div className="info-box-content">
                                    <span className="info-box-text">Peso do Paciente</span>
                                    <span className="info-box-number">{consulta.peso + medida.medidaPeso}</span>
                                </div>
                                <div className="info-box-content">
                                    <span className="info-box-text">IMC do Paciente</span>
                                    <span className="info-box-number">{consulta.imc}</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                    <Card className={"collapsed-card"} titulo="Evolução" botaoMin>
                        <div className={"row"}>
                            <div className="col-lg-12">
                                <EditorTexto
                                    corDoBotao={BOTAO.COR.PERIGO}
                                    icone={ICONE.SALVAR}
                                    idConsulta={consulta.id}
                                    cids={consulta.idCids}
                                    nome={"Finalizar Consulta"}
                                />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </Pagina>
    );
}
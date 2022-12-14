import {Card, EditorTexto, Pagina} from "../../componentes";
import React, {useState} from "react";
import {BOTAO, ICONE} from "../../util/Constantes";
import ModalFormMedico from "../../componentes/modal/ModalFormMedicoAtestado";
import ModalFormMedicoAtestado from "../../componentes/modal/ModalFormMedicoAtestado";
import {FormGroup, Tab, Tabs} from "react-bootstrap";
import {AutocompletarCid} from "../../componentes/form/AutocompletarCid";

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
        idCids: [],
        diasAfastado: null
    });

    const [cids, setCids] = useState([]);

    let medida = {
        medidaAltura: "m",
        medidaPeso: "Kg"
    };

    consulta.altura /= 100;

    const handleCID = () => {
        const idCid = document.getElementById("idcid").value;
        const idCidNome = document.getElementById("idcidAuto").value;
        let codigoCid = idCidNome.split(" - ");
        setConsulta({...consulta, idCids: [...consulta.idCids, Number(idCid)]});
        setCids([...cids, codigoCid[0]]);
    }

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
        let altura = Number(consulta.altura);
        let imc = peso / (altura * altura);
        return imc.toFixed(2);
    }

    consulta.idade = calcIdade(consulta.dtNascimento);
    consulta.imc = calcImc();

    localStorage.setItem("arrayCids", consulta.idCids);
    localStorage.setItem("arrayCodigosCids", cids);
    console.log("CIDs:", cids);
    console.log("Consulta CIDs:", consulta.idCids);
    console.log("Consulta:", consulta);
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
                                    <span className="info-box-number">{consulta.altura + medida.medidaAltura}</span>
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
                    <Card titulo="Evolução">
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
                    <Card titulo="CID">
                        <div className={"row"}>
                            <div className="col-lg-12">
                                <AutocompletarCid
                                    name="cid"
                                    url={"/hpm/cid/por-nome/"}
                                    label="Digite o CID:"
                                    placeholder="Nome ou código aqui"
                                    tamanho={6}
                                    retorno={handleCID} />
                            </div>
                            <br />
                            <br />
                        </div>
                        <br />
                        <FormGroup>
                            <div className={"col-lg-12"}>
                                {cids.map((cid, index) => (
                                    <div className={"info-box col-lg-2"}>
                                        <div key={index} className="info-box-content">
                                            <span className="info-box-text">CID</span>
                                            <span className="info-box-text">{cid}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </FormGroup>
                    </Card>
                    <Card titulo={"Formulários"}>
                        <Tabs>
                            <Tab title="Atestado" eventKey="aba1">
                                <br />
                                <ModalFormMedicoAtestado
                                    corDoBotao={BOTAO.COR.SUCESSO}
                                    icone={ICONE.PDF}
                                    titulo={"Atestado"}
                                    nome={"Atestado"}/>
                            </Tab>
                            <Tab title="Receita" eventKey="aba2">
                                <br />
                                <ModalFormMedico corDoBotao={BOTAO.COR.INFO} icone={ICONE.PDF} titulo={"Receita"} nome={"Receita"} />
                            </Tab>
                            <Tab title="Requisição de Exames" eventKey="aba3">
                                <br />
                                <ModalFormMedico corDoBotao={BOTAO.COR.ALERTA} icone={ICONE.PDF} titulo={"Requisição de Exames"} nome={"Requisição de Exames"} />
                            </Tab>
                        </Tabs>
                    </Card>
                </div>
            </div>
        </Pagina>
    );
}
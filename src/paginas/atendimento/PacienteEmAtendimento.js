import {Botao, BotaoExcluir, Card, EditorTexto, Input, Pagina} from "../../componentes";
import React, {useState} from "react";
import {BOTAO, HttpVerbo, ICONE, MSG} from "../../util/Constantes";
import ModalFormMedico from "../../componentes/modal/ModalFormMedicoAtestado";
import ModalFormMedicoAtestado from "../../componentes/modal/ModalFormMedicoAtestado";
import {FormGroup, Tab, Tabs} from "react-bootstrap";
import {AutocompletarCid} from "../../componentes/form/AutocompletarCid";
import {ExibirMensagem, xfetch} from "../../util";

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

    const [cids, setCids] = useState([]);

    let medida = {
        medidaAltura: "m",
        medidaPeso: "Kg"
    };

    const altura = Number(consulta.altura / 100);

    const [receita, setReceita] = useState({
        idConsulta: Number(localStorage.getItem("pacienteConsulta")),
        texto: null,
        idMedicamentos: []
    });

    const [medicamentos, setMedicamentos] = useState([]);

    const [discriminacao, setDiscriminacao] = useState([{}]);

    const handleCID = () => {
        const idCid = document.getElementById("idcid").value;
        const idCidNome = document.getElementById("idcidAuto").value;
        let codigoCid = idCidNome.split(" - ");
        setConsulta({...consulta, idCids: [...consulta.idCids, Number(idCid)]});
        setCids([...cids, codigoCid[0]]);
        document.getElementById("idcidAuto").value = "";
    }

    const handleRemoveCid = (position) => {
        setConsulta({...consulta, idCids: [...consulta.idCids.filter((_, index) => index !== position)]});
        setCids([...cids.filter((_, index) => index !== position)]);
    }

    const handleReceitaCadastrar = () => {
        console.log("Receita:", receita);
        xfetch('/hpm/consulta/receita/cadastrar', receita, HttpVerbo.POST)
            .then(json => {
                if(typeof json !== 'undefined' ? json.status === "OK" : false) {
                    ExibirMensagem('Receita Salva Com Sucesso!', MSG.SUCESSO)
                }
            })
        handleReceitaImprimir(receita)
    }

    function handleReceitaImprimir(receita) {
        localStorage.setItem('texto', receita.texto);
        window.open("/atendimento/receitaImprimir");
    }

    const handleMedicamento = () => {
        const idMedicamento = document.getElementById("idmedicamento").value;
        const idMedicamentoNome = document.getElementById("idmedicamentoAuto").value;
        setMedicamentos([...medicamentos, idMedicamentoNome]);
        setReceita({...receita, idMedicamentos: [...receita.idMedicamentos, Number(idMedicamento)], texto: document.getElementById("discriminacao").innerText});
        document.getElementById("idmedicamentoAuto").value = "";
    }

    const handleRemoveMedicamento = (position) => {
        setReceita({...receita, idMedicamentos: [...receita.idMedicamentos.filter((_, index) => index !== position)]});
        setMedicamentos([...medicamentos.filter((_, index) => index !== position)]);
    }

    const handleReceitaChange = (e) => {
        let {name, value} = e.target;
        let texto = document.getElementById("discriminacao").innerText.split("\n");
        texto.map((novoTexto, index) => {
            console.log("NovoTextoTag:", novoTexto);
            console.log("NovoTextoIndex:", index);
            if (index === 0 || index % 2 === 0) {
                discriminacao.texto += novoTexto;
            } else {
                discriminacao.texto += " ";
            }
        });
        console.log("DiscriminacaoTextoTag:", discriminacao.texto);
        setDiscriminacao([...discriminacao, {[name]: value, texto: document.getElementById("discriminacao").innerText}]);
        console.log("Discriminacao:", discriminacao);
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
        let imc = peso / (altura * altura);
        return imc.toFixed(2);
    }

    consulta.idade = calcIdade(consulta.dtNascimento);
    consulta.imc = calcImc();

    localStorage.setItem("arrayCids", consulta.idCids);
    localStorage.setItem("arrayCodigosCids", cids);
    // console.log("CIDs:", cids);
    // console.log("Consulta CIDs:", consulta.idCids);
    // console.log("Consulta:", consulta);
    // console.log("Receita:", receita);
    // console.log("Medicamentos:", medicamentos);
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
                    <Card className={"collapsed-card"} titulo="CID" botaoMin>
                        <div className={"row"}>
                            <div className="col-lg-12">
                                <AutocompletarCid
                                    name="cid"
                                    url={"/hpm/cid/"}
                                    label="Digite o CID:"
                                    placeholder="Nome ou código aqui"
                                    tamanho={4}
                                    retorno={handleCID} />
                            </div>
                            <br />
                        </div>
                        <br />
                        <FormGroup>
                            <div className={"col-lg-12"}>
                                {cids.map((cid, index) => (
                                    <FormGroup key={index}>
                                        <div className={"info-box col-lg-2"} style={{display: "flex"}}>
                                            <div key={index} className="info-box-content">
                                                <span className="info-box-text">CID</span>
                                                <span className="info-box-text">{cid}</span>
                                            </div>
                                            <BotaoExcluir
                                                style={{marginLeft: "1em"}}
                                                onClick={() => {handleRemoveCid(index)}}
                                            />
                                        </div>
                                    </FormGroup>
                                ))}
                            </div>
                        </FormGroup>
                    </Card>
                    <Card className={"collapsed-card"} titulo={"Formulários"} botaoMin>
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
                                <div className={"row"}>
                                    <div className="col-lg-12">
                                        <AutocompletarCid
                                            name="medicamento"
                                            url={"/hpm/medicamento/por-nome/"}
                                            label="Digite o nome do medicamento:"
                                            placeholder="Nome do medicamento aqui"
                                            tamanho={4}
                                            retorno={handleMedicamento} />
                                    </div>
                                </div>
                                <br />
                                <div className={"col-lg-12"}>

                                </div>
                                <div className={"col-lg-12"}>

                                </div>
                                <FormGroup className={"form-inline"}>
                                    <div className={"col-lg-12"}>
                                        {medicamentos.map((medicamento, index) => (
                                            <FormGroup key={index}>
                                                <div className={"info-box col-lg-12"} style={{display: "flex"}}>
                                                    <div key={index} className="control">
                                                        <div id={"discriminacao"} className={"form-group mb-2"}>
                                                            {index + 1})
                                                            <div className={"m-1"}>
                                                                <Input
                                                                    style={{marginLeft: "1em", width: "100px"}}
                                                                    type="number"
                                                                    onChange={handleReceitaChange}
                                                                    name={index + "quantidade"}
                                                                    label={"Qtd: "}
                                                                />
                                                            </div>
                                                            <pre />
                                                            <div style={{width: "200px", textAlign: "justify"}}>
                                                                {medicamento}
                                                            </div>
                                                            <pre />
                                                            <div className={"m-1"}>
                                                                <Input
                                                                    style={{width: "100px"}}
                                                                    type="number"
                                                                    onChange={handleReceitaChange}
                                                                    name={index + "posologia"}
                                                                />
                                                            </div>
                                                            <p style={{marginTop: "1em", marginLeft: "1em", marginRight: "1em"}}> em </p>
                                                            <div className={"m-1"}>
                                                                <Input
                                                                    style={{width: "100px"}}
                                                                    type="number"
                                                                    onChange={handleReceitaChange}
                                                                    name={index + "posologia"}
                                                                />
                                                            </div>
                                                            <p style={{marginTop: "1em", marginLeft: "1em", marginRight: "1em"}}> horas.</p>
                                                        </div>
                                                    </div>
                                                    <BotaoExcluir
                                                        style={{marginLeft: "15em"}}
                                                        onClick={() => {handleRemoveMedicamento(index)}}
                                                    />
                                                </div>
                                            </FormGroup>
                                        ))}
                                    </div>
                                    <br />
                                    <br />
                                </FormGroup>
                                <Botao cor={BOTAO.COR.INFO} icone={ICONE.PDF} onClick={() => handleReceitaCadastrar()}>Imprimir Receita</Botao>
                                {/*<ModalFormMedicoReceita corDoBotao={BOTAO.COR.INFO} icone={ICONE.PDF} titulo={"Receita"} nome={"Receita"} />*/}
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
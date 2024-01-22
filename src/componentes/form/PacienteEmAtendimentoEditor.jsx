import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import { FormGroup, Tab, Tabs } from "react-bootstrap";
import { ExibirMensagem, xfetch } from "../../util";
import { BOTAO, HttpVerbo, ICONE, MSG } from "../../util/Constantes";
import { Botao, BotaoExcluir } from "../Botao";
import { EditorTexto } from "../EditorTexto";
import { Card } from "../card/Card";
import ModalFormMedicoAtestado from "../modal/ModalFormMedicoAtestado";
import { AutocompletarCid } from "./AutocompletarCid";
import Input from "./Input";
import { ModalAgendarNovaConsulta } from "../modal/ModalAgendarNovaConsulta";

function PacienteEmAtendimentoEditor(props) {
  const [showModal, setShowModal] = useState(false);

  const editorRef = useRef(null);
  const editorExFisico = useRef(null);
  const editorConduta = useRef(null);

  let consultaSelecionada = {
    idConsulta: "",
    idStatus: "",
    anamnese: "",
    exameFisico: "",
    conduta: "",
    idCIDs: [],
  };

  const [consulta, setConsulta] = useState({
    id: localStorage.getItem("pacienteConsulta"),
    idPessoa: localStorage.getItem("idPessoa"),
    nmPaciente: localStorage.getItem("nmPaciente"),
    dtNascimento: localStorage.getItem("dtNascimento"),
    altura: localStorage.getItem("altura"),
    peso: localStorage.getItem("peso"),


    
    txtRelato: localStorage.getItem("relato"),
    idade: null,
    imc: null,
    pessoas: [],
    idCids: [],
  });

  const [cids, setCids] = useState([]);

  const [receita, setReceita] = useState({
    idConsulta: Number(localStorage.getItem("pacienteConsulta")),
    idMedicamentos: [],
    texto: "",
  });

  const [medicamentos, setMedicamentos] = useState([]);

  const [discriminacao, setDiscriminacao] = useState([
    {
      idMedicamento: null,
      quantidade: 0,
      posologia: 0,
      texto: "",
    },
  ]);

  const handleCID = () => {
    const idCid = document.getElementById("idcid").value;
    const idCidNome = document.getElementById("idcidAuto").value;
    let codigoCid = idCidNome.split(" - ");
    setConsulta({ ...consulta, idCids: [...consulta.idCids, Number(idCid)] });
    setCids([...cids, codigoCid[0]]);
    document.getElementById("idcidAuto").value = "";
  };

  const handleRemoveCid = (position) => {
    setConsulta({
      ...consulta,
      idCids: [...consulta.idCids.filter((_, index) => index !== position)],
    });
    setCids([...cids.filter((_, index) => index !== position)]);
  };

  const handleReceitaCadastrar = () => {
    console.log("Receita:", receita);
    let texto = "";
    discriminacao.map((disc) => (texto += disc.texto + " "));
    receita.texto = texto;
    xfetch("/hpm/consulta/receita/cadastrar", receita, HttpVerbo.POST).then(
      (json) => {
        if (typeof json !== "undefined" ? json.status === "OK" : false) {
          ExibirMensagem("Receita Salva Com Sucesso!", MSG.SUCESSO);
        }
      }
    );
    handleReceitaImprimir(discriminacao);
  };

  function handleReceitaImprimir(discriminacao) {
    localStorage.setItem(
      "texto",
      discriminacao.map((disc) => disc.texto)
    );
    localStorage.setItem(
      "qtd",
      discriminacao.map((disc) => disc.quantidade)
    );
    localStorage.setItem(
      "posologia",
      discriminacao.map((disc) => disc.posologia)
    );
    window.open("/atendimento/receitaImprimir");
  }

  const handleMedicamento = () => {
    const idMedicamento = document.getElementById("idmedicamento").value;
    const medicamentoNome = document.getElementById("idmedicamentoAuto").value;
    setMedicamentos([...medicamentos, medicamentoNome]);
    setReceita({
      ...receita,
      idMedicamentos: [...receita.idMedicamentos, Number(idMedicamento)],
      texto: medicamentoNome,
    });
    document.getElementById("idmedicamentoAuto").value = "";
  };

  const handleRemoveMedicamento = (position) => {
    setReceita({
      ...receita,
      idMedicamentos: [
        ...receita.idMedicamentos.filter((_, index) => index !== position),
      ],
    });
    setMedicamentos([...medicamentos.filter((_, index) => index !== position)]);
  };

  const handleReceitaChange = (indice) => {
    let quantidade = document.getElementById(indice + "quantidade").value;
    let posologia = document.getElementById(indice + "posologia").value;
    medicamentos.map((desc, index) => {
      if (index === indice) {
        const idMedicamento = index;
        const texto = desc;
        if (typeof discriminacao[index] === "undefined") {
          discriminacao.push({ idMedicamento, quantidade, posologia, texto });
        }
        if (
          typeof discriminacao[index] !== "undefined" &&
          discriminacao[index].idMedicamento === null
        ) {
          discriminacao[indice].idMedicamento = index;
          discriminacao[indice].quantidade = quantidade;
          discriminacao[indice].posologia = posologia;
          discriminacao[indice].texto = texto;
        }
        if (discriminacao[indice].idMedicamento === indice) {
          discriminacao[indice].quantidade = quantidade;
          discriminacao[indice].posologia = posologia;
        }
      }
      return discriminacao.texto;
    });
  };

  const handleBtnFinalizarConsulta = async (consultaId, statusId) => {
    consultaSelecionada.idConsulta = consultaId;
    consultaSelecionada.idStatus = statusId;
    consultaSelecionada.idCIDs = consulta.idCids;
    if (editorRef.current || editorExFisico.current || editorConduta.current) {
      consultaSelecionada.anamnese = editorRef.current.getContent({
        format: "text",
      });
      consultaSelecionada.exameFisico = editorExFisico.current.getContent({
        format: "text",
      });
      consultaSelecionada.conduta = editorConduta.current.getContent({
        format: "text",
      });
    }
    await xfetch(
      "/hpm/consulta/alterar-status",
      consultaSelecionada,
      HttpVerbo.POST
    ).then((json) => {
      if (typeof json !== "undefined" ? json.status === "OK" : false) {
        ExibirMensagem("Consulta Salva Com Sucesso!", MSG.SUCESSO);
      }
    });
    window.opener.location.reload();
    window.close();
  };

  localStorage.setItem("arrayCids", consulta.idCids);
  localStorage.setItem("arrayCodigosCids", cids);

  return (
    <div className="row">
      <div className="col-lg-12">
        <Card
          className={"collapsed-card"}
          titulo={"Anamnese | Exame Físico | Conduta"}
          botaoMin
        >
          <EditorTexto />
        </Card>
        <Card className={"collapsed-card"} titulo={"CID"} botaoMin>
          <AutocompletarCid
            name="cid"
            url={"/hpm/cid/"}
            label="Digite o CID:"
            placeholder="Nome ou código aqui"
            tamanho={3}
            retorno={handleCID}
          />
          <br />
          <FormGroup>
            <div className={"col-lg-12"}>
              {cids.map((cid, index) => (
                <FormGroup
                  key={index}
                  className={"col-lg-3"}
                  style={{ display: "inline-flex" }}
                >
                  <div
                    className={"info-box col-lg-12"}
                    style={{ display: "flex" }}
                  >
                    <div key={index} className="info-box-content">
                      <span className="info-box-text">CID</span>
                      <span className="info-box-text">{cid}</span>
                    </div>
                    <BotaoExcluir
                      style={{ marginLeft: "1em" }}
                      onClick={() => {
                        handleRemoveCid(index);
                      }}
                    />
                  </div>
                </FormGroup>
              ))}
            </div>
          </FormGroup>
        </Card>
        <Card className={"collapsed-card"} titulo={"Impressos"} botaoMin>
          <Tabs>
            <Tab title="Atestado" eventKey="aba1">
              <br />
              <ModalFormMedicoAtestado
                corDoBotao={BOTAO.COR.SUCESSO}
                icone={ICONE.PDF}
                titulo={"Atestado"}
                nome={"Atestado"}
              />
            </Tab>
            <Tab title="Receita" eventKey="aba2">
              <br />
              <div className={"row"}>
                <div className="col-lg-12">
                  <AutocompletarCid
                    name="medicamento"
                    url={"/hpm/medicamento/"}
                    label="Digite o nome do medicamento:"
                    placeholder="Nome do medicamento aqui"
                    tamanho={4}
                    retorno={handleMedicamento}
                  />
                </div>
              </div>
              <br />
              <div className={"col-lg-12"}></div>
              <div className={"col-lg-12"}></div>
              <FormGroup className={"form-inline"}>
                <div className={"col-lg-12"}>
                  {medicamentos.map((medicamento, index) => (
                    <FormGroup key={index}>
                      <div
                        className={"info-box col-lg-12"}
                        style={{ display: "flex" }}
                      >
                        <div key={index} className="control">
                          <div
                            id={"discriminacao"}
                            className={"form-group mb-2"}
                          >
                            {index + 1}
                            <div className={"m-1"}>
                              <Input
                                id={index + "quantidade"}
                                style={{ marginLeft: "1em", width: "100px" }}
                                type="number"
                                onChange={() => {
                                  handleReceitaChange(index);
                                }}
                                name={"quantidade"}
                                label={"Qtd: "}
                              />
                            </div>
                            <pre />
                            <div
                              style={{ width: "200px", textAlign: "justify" }}
                            >
                              {medicamento}
                            </div>
                            <pre />
                            <div className={"m-1"}>
                              <Input
                                id={index + "posologia"}
                                style={{ width: "100px" }}
                                type="number"
                                onChange={() => {
                                  handleReceitaChange(index);
                                }}
                                name={"posologia"}
                              />
                            </div>
                            <p
                              style={{
                                marginTop: "1em",
                                marginLeft: "1em",
                                marginRight: "1em",
                              }}
                            >
                              {" "}
                              em{" "}
                            </p>
                            <div className={"m-1"}>
                              <Input
                                id={index + "posologia"}
                                style={{ width: "100px" }}
                                type="number"
                                onChange={() => {
                                  handleReceitaChange(index);
                                }}
                                name={"posologia"}
                              />
                            </div>
                            <p
                              style={{
                                marginTop: "1em",
                                marginLeft: "1em",
                                marginRight: "1em",
                              }}
                            >
                              {" "}
                              horas.
                            </p>
                          </div>
                        </div>
                        <BotaoExcluir
                          style={{ marginLeft: "15em" }}
                          onClick={() => {
                            handleRemoveMedicamento(index);
                          }}
                        />
                      </div>
                    </FormGroup>
                  ))}
                </div>
              </FormGroup>
              <Botao
                cor={BOTAO.COR.INFO}
                icone={ICONE.PDF}
                onClick={() => handleReceitaCadastrar()}
              >
                Imprimir Receita
              </Botao>
            </Tab>
            {/* <Tab title="Requisição de Exames" eventKey="aba3"> */}
            {/* <br /> */}
            {/* <ModalFormMedicoAtestado corDoBotao={BOTAO.COR.ALERTA} icone={ICONE.PDF} titulo={"Requisição de Exames"} nome={"Requisição de Exames"} /> */}
            {/* </Tab> */}
          </Tabs>
        </Card>
        <div className={"btnFinalizar"}>
          <Botao
            cor={props.corDoBotao}
            icone={props.icone}
            onClick={() =>
              handleBtnFinalizarConsulta(props.idConsulta, Number("7"))
            }
          >
            {props.nome}
          </Botao>
          <Botao
            cor={props.BotaoNovaConsulta}
            icone={props.iconeNovaConsulta}
            onClick={() => setShowModal(true)}
          >
            {props.nomeConsulta}
          </Botao>
        </div>
      </div>
      <ModalAgendarNovaConsulta
        show={showModal}
        titulo="Agendar"
        handleClose={() => setShowModal(false)}
      />
    </div>
  );
}

PacienteEmAtendimentoEditor.defaultProps = {
  menuBara: true,
};
PacienteEmAtendimentoEditor.propTypes = {
  menuBara: PropTypes.bool,
  corDoBotao: PropTypes.string,
  icone: PropTypes.string,
  nome: PropTypes.string,
  idConsulta: PropTypes.string,
  cids: PropTypes.array,
  funcao: PropTypes.func,
};

export { PacienteEmAtendimentoEditor };

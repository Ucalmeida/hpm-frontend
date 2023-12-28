import React, {useState} from "react";
import {Botao} from "../Botao";
import PropTypes from "prop-types";
import {BOTAO, HttpVerbo, MSG} from "../../util/Constantes";
import {Form, Modal} from "react-bootstrap";
import {Link} from "react-router-dom";
import logoHPM from "../../img/brasoes/brasao_hpm.png";
import {AutocompletarCid} from "../form";
import {ExibirMensagem, xfetch} from "../../util";

export default function ModalFormMedicoReceita(props) {
    const [show, setShow] = useState(false);

    const [receita, setReceita] = useState({
        idConsulta: localStorage.getItem("pacienteConsulta"),
        texto: null,
        idMedicamentos: []
    });

    const [medicamentos, setMedicamentos] = useState([]);

    const handleMedicamento = (e) => {
        const idMedicamento = document.getElementById("idmedicamento").value;
        const idMedicamentoNome = document.getElementById("idmedicamentoAuto").value;
        let codigoMedicamento = idMedicamentoNome.split(" - ");
        setReceita({...receita, idMedicamentos: [...receita.idMedicamentos, Number(idMedicamento)]});
        setMedicamentos([...medicamentos, codigoMedicamento[0]]);
    }

    const handleCadastrar = () => {
        xfetch('/hpm/consulta/atestado/cadastrar', receita, HttpVerbo.POST)
            .then(json => {
                if(typeof json !== 'undefined' ? json.status === "OK" : false) {
                    ExibirMensagem('Atestado Salvo Com Sucesso!', MSG.SUCESSO)
                }
            })
        handleImprimir(receita)
    }

    function handleImprimir(receita) {
        localStorage.setItem('texto', receita.texto);
        window.open("/atendimento/atestadoImprimir");
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Botao cor={props.corDoBotao} icone={props.icone} onClick={handleShow}>{props.nome}</Botao>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.titulo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="login-logo">
                        <Link to="/">
                            <img src={logoHPM}  alt={"Brasão"}/>
                        </Link>
                    </div>
                    <Form titulo="Receita">
                        <div className={"row"}>
                            <div className={"col-lg-12"}>
                                <p>Paciente: <b>{localStorage.getItem("nmPaciente")}</b></p>
                            </div>
                            <div className="col-lg-12">
                                <AutocompletarCid
                                    name="medicamento"
                                    url={"/hpm/medicamento/por-nome/"}
                                    label="Digite o nome do medicamento:"
                                    placeholder="Nome do medicamento aqui"
                                    tamanho={6}
                                    retorno={handleMedicamento} />
                            </div>
                            <br />
                            <br />
                            <div className={"col-lg-12"}>
                                {medicamentos.map((medicamento, index) => (
                                    <div className={"info-box col-lg-2"}>
                                        <div key={index} className="info-box-content">
                                            <span className="info-box-text">Medicamento</span>
                                            <span className="info-box-text">{medicamento}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <br />
                            <div className={"col-lg-12"}>
                                <p style={{marginLeft: '18em'}}>Aracaju, <b>{new Date().toLocaleDateString()}</b></p>
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Botao cor={BOTAO.COR.SECUNDARIO} onClick={handleClose}>
                        Fechar
                    </Botao>
                    <Botao cor={BOTAO.COR.PRIMARIO} onClick={handleCadastrar}>
                        Salvar Mudanças
                    </Botao>
                </Modal.Footer>
            </Modal>
        </>
    )
}

ModalFormMedicoReceita.propTypes = {
    corDoBotao: PropTypes.string,
    icone: PropTypes.string,
    titulo: PropTypes.string,
    nome: PropTypes.string,
    texto: PropTypes.string,
    funcao: PropTypes.func,
}
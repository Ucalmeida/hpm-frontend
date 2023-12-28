import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";

import { Form, Modal } from 'react-bootstrap';
import { Botao, Card, Input, Select, Tabela } from '../../componentes';
import ModalFormAlterarConsultorioBloco from '../../componentes/modal/ModalFormAlterarConsultorioBloco';
import { ExibirMensagem, xfetch } from '../../util';
import { BOTAO, HttpVerbo, ICONE, MSG } from '../../util/Constantes';

export default function EditarConsultorioBloco(props) {
    const [show, setShow] = useState(false);

    const [apagar, setApagar] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dtInicio = useRef("");
    const dtTermino = useRef("");

    const [dadosConsultorioBloco, setDadosConsultorioBloco] = useState({
        bloco: {
            dataInicio: "",
            dataTermino: "",
            escalaId: "",
            escalaNome: "",
            especialidadeId: "",
            especialidadeNome: "",
            id: "",
            profissionalSaudeId: "",
            profissionalSaudeNome: "",
            qtdConsultas: "",
            qtdEncaixes: "",
            salaId: "",
            salaNome: "",
            consultasDTO: []
        }
    });


    const [objeto, setObjeto] = useState(
        {
            dataInicio : "",
            dataTermino: "",
            idEscala: "",
            idEspecialidade: "",
            idProfissionalSaude: "",
            idSala: "",
            qtdConsultas: null,
            qtdEmergencias: null
        }
    )
    
    const [profissionais, setProfissionais] = useState({});

    const [escala, setEscala] = useState({});

    const [status, setStatus] = useState({
        listaStatus: []
    });

    const [verificador, setVerificador] = useState({
        ano: 0,
        mesInicio: 0,
        mesTermino: 0,
        mesEscala: 0,
        anoEscala: 0
    });

    useEffect(() => {
        if (show) {
            xfetch(`/hpm/consultorioBloco/${props.valor}/consultas`, {}, HttpVerbo.GET)
                .then(res => res.json())
                .then(json => {
                    setDadosConsultorioBloco({...dadosConsultorioBloco, bloco: json.resultado});
                })
        }
    }, [show])
    
    useEffect(() => {
        if (show) {
            xfetch(`/hpm/consultorioBloco/${props.valor}/consultas`, {}, HttpVerbo.GET)
                .then(res => res.json())
                .then(json => {
                    setDadosConsultorioBloco({...dadosConsultorioBloco, bloco: json.resultado});
                })
        }
    }, [apagar])

    useEffect(() => {
        if (show) {
            setObjeto({...objeto, 
                dataInicio: dtInicio.current, 
                dataTermino: dtTermino.current,
                qtdConsultas: Number(dadosConsultorioBloco.bloco.qtdConsultas),
                qtdEmergencias: Number(dadosConsultorioBloco.bloco.qtdEncaixes),
                idEscala: Number(dadosConsultorioBloco.bloco.escalaId),
                idSala: Number(dadosConsultorioBloco.bloco.salaId)
            });
        }
    }, [dtInicio.current])

    const escalaObjeto = 31;

    const meses = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
    ];

    let [mes, ano] = "";

    let dt = "";

    const [nomes] = useState({
            escalaNome: "",
            especialidadeNome: "",
            profissionalSaudeNome: "",
            salaNome: ""
    });

    const [datas] = useState({
        inicio: "",
        termino: ""
    });

    const [qtd] = useState({
        consultas: "",
        encaixes: ""
    })

    const escalaSelecionada = (nm_escala) => {
        const nomeEscala = nm_escala;
        [mes, ano] = nomeEscala.split(" - ");
        verificador.mesEscala = meses.indexOf(mes) + 1;
        verificador.anoEscala = Number(ano);
    }

    if (typeof dadosConsultorioBloco.bloco !== "undefined" && show) {
        datas.inicio = dadosConsultorioBloco.bloco.dataInicio.split(" - ");
        datas.termino = dadosConsultorioBloco.bloco.dataTermino.split(" - ");
        dtInicio.current = datas.inicio[0].split("/")[2] + "-" + datas.inicio[0].split("/")[1] + "-" + datas.inicio[0].split("/")[0] + "T" + datas.inicio[1];
        dtTermino.current = datas.termino[0].split("/")[2] + "-" + datas.termino[0].split("/")[1] + "-" + datas.termino[0].split("/")[0] + "T" + datas.termino[1];
        verificador.mesInicio = Number(datas.inicio[0].split("/")[1])
        verificador.mesTermino = Number(datas.termino[0].split("/")[1])
        verificador.ano = Number(datas.inicio[0].split("/")[2])
        
        objeto.idEspecialidade = dadosConsultorioBloco.bloco.especialidadeId;
        objeto.idProfissionalSaude = dadosConsultorioBloco.bloco.profissionalSaudeId;
        nomes.escalaNome = dadosConsultorioBloco.bloco.escalaNome;
        nomes.especialidadeNome = dadosConsultorioBloco.bloco.especialidadeNome;
        nomes.profissionalSaudeNome = dadosConsultorioBloco.bloco.profissionalSaudeNome;
        nomes.salaNome = dadosConsultorioBloco.bloco.salaNome;
        escalaSelecionada(nomes.escalaNome);
    }

    const selecionarEscala = (e) => {
        objeto.idEscala = Number(e.target.value);
        const nomeEscala = escala.escalas.filter(escala => escala.valor === objeto.idEscala);
        [mes, ano] = nomeEscala[0].nome.split(" - ");
        verificador.mesEscala = meses.indexOf(mes) + 1;
        verificador.anoEscala = Number(ano);
    }

    const handleDtHrInicio = (e) => {
        dt = e.target.value;
        let mesVerificador = dt.split("-");
        verificador.mesInicio = Number(mesVerificador[1]);
        verificador.ano = Number(mesVerificador[0]);
        objeto.dataInicio = dt;
        setObjeto({...objeto, dataInicio: dt});
    }

    const handleDtHrTermino = (e) => {
        dt = e.target.value;
        let mesVerificador = dt.split("-");
        verificador.mesTermino = Number(mesVerificador[1]);
        verificador.ano = Number(mesVerificador[0]);
        objeto.dataTermino = dt;
        setObjeto({...objeto, dataTermino: dt});
    }

    const handleQtdConsulta = (e) => {
        e.preventDefault();
        setObjeto({...objeto, qtdConsultas: Number(e.target.value)});
    }

    const handleQtdEmergencia = (e) => {
        e.preventDefault()
        setObjeto({...objeto, qtdEmergencias: Number(e.target.value)})
    }

    const handleStatus = (e) => {
        const statusId = e.target.value;
        status.idStatus = Number(statusId);
        listarEscalaPorStatus();
    }

    let consultaSelecionada = {
        idConsulta: '',
        idStatus: ''
    }

    const handleBtnCancelar = async (consultaId, statusId) => {
        consultaSelecionada.idConsulta = consultaId;
        consultaSelecionada.idStatus = statusId;
        await xfetch('/hpm/consulta/alterar-status', consultaSelecionada, HttpVerbo.POST)
        .then( json =>{
            if (typeof json !== "undefined" ? json.status === "OK" : false) {
                ExibirMensagem('Consulta Cancelada!', MSG.SUCESSO)
            } else {
                ExibirMensagem(json.message, MSG.ERRO)
            }
        })
        setApagar(!apagar);
    }

    const listarEscalaPorStatus = (e) => {
        xfetch('/hpm/escala/' + status.idStatus + '/opcoes',{}, HttpVerbo.GET)
            .then(res => res.json())
            .then(json => {
                    setEscala({...escala, escalas: json.resultado});
                }
            )
    }

    const selecionarEspecialidade = (e) => {
        objeto.idEspecialidade = Number(e.value);
        listarProfissionalPorEspecialidade();
    }

    const selecionarProfissionalSaude = (e) => {
        objeto.idProfissionalSaude = Number(e.target.value);
    }

    const selecionarSala = (e) => {
        objeto.idSala = e.value;
    }

    const listarProfissionalPorEspecialidade = () => {
        xfetch('/hpm/profissionalSaude/' + objeto.idEspecialidade + '/opcoes',{}, HttpVerbo.GET)
            .then(res => res.json())
            .then(json => {
                    setProfissionais({...profissionais, profissionais: json.resultado});
                }
            )
    }

    useEffect(() => {
        xfetch('/hpm/status/' + escalaObjeto, {}, HttpVerbo.GET)
            .then( res => res.json())
            .then(status => setStatus({...status, listaStatus: status.resultado}))
    }, [])

    const selectEspecialista =  objeto.idEspecialidade ? <div className="col-lg-6">
        <label>Profissional</label>
        <select
            className="form-control"
            onChange={selecionarProfissionalSaude}
            name="idProfissionalSaude">
            <option className="flex-fill" value={objeto.idProfissionalSaude}>{nomes.profissionalSaudeNome}</option>
            {typeof profissionais.profissionais !== "undefined" ? profissionais.profissionais.map((v, k) => {
                if (objeto.idProfissionalSaude === v.valor) {
                    return "";
                } else {
                    return <option className="flex-fill" value={v.valor} key={k}> {v.texto}</option>;
                }
            }) : ''}
        </select>
    </div> : ''

    const colunas = [
        {text: "Nome"},
        {text: "Telefone"},
        {text: "Atendimento"},
        {text: "Ação"}
    ]

    const dados = () => {
        return (
            typeof dadosConsultorioBloco.bloco !== "undefined" ? dadosConsultorioBloco.bloco.consultasDTO.map((consulta, index) => {
                return ({
                    'nome': consulta.nmPaciente,
                    'telefone': consulta.nmCelular,
                    'atendimento': consulta.nmStatus,
                    'acao': <div>
                        <Botao cor={BOTAO.COR.ALERTA} onClick={() => handleBtnCancelar(consulta.id, Number("8"), index)} value={consulta.id}>Cancelar</Botao>
                    </div>
                })
            }) : ""
        )
    }

    return (
        <>
            <Botao cor={props.corDoBotao} icone={props.icone} onClick={handleShow}>{props.nome}</Botao>
            <Modal show={show} onHide={handleClose} size="xl" scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.titulo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div className="row">
                            <div className="col-lg-12">
                                <Card titulo="Escala">
                                    <div className="row">
                                        <div className="col-lg-3">
                                            <label>Tipo Escala</label>
                                            <select
                                                className="form-control"
                                                name="idStatus"
                                                value={status.idStatus}
                                                onChange={handleStatus}>
                                                <option hidden>Selecione...</option>
                                                {status.listaStatus.map((v, k) => {
                                                    if (v.id !== 15) {
                                                        return <option className="flex-fill" value={v.id} key={k}> {v.nome}</option>
                                                    }
                                                })}
                                            </select>
                                        </div>
                                        <div className="col-lg-3">
                                            <label>Escala</label>
                                            <select
                                                className="form-control"
                                                onChange={selecionarEscala}
                                                nome="idEscala">
                                                <option className="flex-fill" value={objeto.idEscala}>{nomes.escalaNome}</option>
                                                {typeof escala.escalas !== "undefined" ? escala.escalas.map((v, k) => {
                                                    if (objeto.idEscala === v.valor) {
                                                        return "";
                                                    } else {
                                                        return <option className="flex-fill" value={v.valor} key={k}> {v.nome}</option>
                                                    }
                                                }) : ''}
                                            </select>
                                        </div>
                                        <div className="col-lg-6">
                                            <label>Especialidade</label>
                                            <Select
                                                placeholder={nomes.especialidadeNome}
                                                funcao={selecionarEspecialidade}
                                                nome="idEspecialidade"
                                                url={"/hpm/especialidade/opcoes"} />
                                        </div>
                                        {selectEspecialista}
                                        <div className="col-lg-6">
                                            <label>Prédio - Piso - Sala</label>
                                            <Select
                                                placeholder={nomes.salaNome}
                                                funcao={selecionarSala}
                                                nome="idSala"
                                                url={"/hpm/sala/opcoes"} />
                                        </div>
                                        <div className="col-lg-3">
                                            <Input
                                                type="datetime-local"
                                                value={objeto.dataInicio}
                                                onChange={handleDtHrInicio}
                                                name="dataInicio"
                                                label="Data e hora início"
                                                placeholder="Data e hora"/>
                                        </div>
                                        <div className="col-lg-3">
                                            <Input
                                                type="datetime-local"
                                                value={objeto.dataTermino}
                                                onChange={handleDtHrTermino}
                                                name="dataTermino"
                                                label="Data e hora término"
                                                placeholder="Data e hora"/>
                                        </div>
                                        <div className="col-lg-3">
                                            <Input
                                                type="text"
                                                onChange={handleQtdConsulta}
                                                value={objeto.qtdConsultas}
                                                name="qtdConsultas"
                                                label="Quantidade de Consultas"
                                                placeholder={qtd.consultas}/>
                                        </div>
                                        <div className="col-lg-3">
                                            <Input
                                                type="text"
                                                onChange={handleQtdEmergencia}
                                                value={objeto.qtdEmergencias}
                                                name="qtdEmergencias"
                                                label="Quantidade de Encaixes"
                                                placeholder={qtd.encaixes}/>
                                        </div>
                                    </div>
                                </Card>
                                <Card titulo={"Consultas Cadastradas na Escala Selecionada"}>
                                    <Tabela id={"consultas"} colunas={colunas} dados={dados()} pageSize={5} />
                                </Card>
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Botao cor={BOTAO.COR.SECUNDARIO} onClick={handleClose}>
                        Fechar
                    </Botao>
                    <ModalFormAlterarConsultorioBloco 
                            corDoBotao={BOTAO.COR.ALERTA}
                            icone={ICONE.ALTERAR}
                            titulo={"Alterar"}
                            nome={"Alterar"}
                            verificador={verificador}
                            objeto={objeto}
                            qtd={qtd}
                            url={"/hpm/consultorioBloco/alterar/" + props.valor}
                        />
                </Modal.Footer>
            </Modal>
        </>
    )
}

EditarConsultorioBloco.propTypes = {
  corDoBotao: PropTypes.string,
  icone: PropTypes.string,
  titulo: PropTypes.string,
  nome: PropTypes.string,
  valor: PropTypes.number,
  texto: PropTypes.string,
  funcao: PropTypes.func,
}
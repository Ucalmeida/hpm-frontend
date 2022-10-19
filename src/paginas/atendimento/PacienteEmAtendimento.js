import {Botao, Card, EditorTexto, Pagina, Tabela} from "../../componentes";
import React, {useEffect, useState} from "react";
import {ExibirMensagem, xfetch} from "../../util";
import {BOTAO, HttpVerbo, ICONE, MSG} from "../../util/Constantes";
import {Modal} from "react-bootstrap";
import BotaoMedico from "../../componentes/BotaoMedico";

export default function PacienteEmAtendimento() {
    const [pessoa, setPessoa] = useState({
        id: localStorage.getItem("pacienteConsulta"),
        pessoas: []
    })

    useEffect(() => {
        xfetch('/hpm/pessoa/porId/' + pessoa.id, {}, HttpVerbo.GET)
            .then(res => res.json())
            .then(json => {
                    setPessoa({...pessoa, pessoas: json.resultado})
                }
            )
            .catch(err => ExibirMensagem(err.message, MSG.ERRO))
    }, [])

    return (
        <Pagina titulo="Paciente em Atendimento">
            <div className="row">
                <div className="col-lg-12">
                    <Card>
                        <div className="col-lg-12">
                            <div className={"info-box"}>
                                <div className="info-box-content">
                                    <span className="info-box-text" _msthash="2400268"
                                          _msttexthash="134784">Nome do Paciente</span>
                                    <span className="info-box-number" _msthash="2400424"
                                          _msttexthash="28353">{pessoa.pessoas.nome}</span>
                                </div>
                                <div className="info-box-content">
                                    <span className="info-box-text" _msthash="2400268"
                                          _msttexthash="134784">Idade do Paciente</span>
                                    <span className="info-box-number" _msthash="2400424"
                                          _msttexthash="28353">{42}</span>
                                </div>
                                <div className="info-box-content">
                                    <span className="info-box-text" _msthash="2400268"
                                          _msttexthash="134784">Altura do Paciente</span>
                                    <span className="info-box-number" _msthash="2400424"
                                          _msttexthash="28353">{1.75}</span>
                                </div>
                                <div className="info-box-content">
                                    <span className="info-box-text" _msthash="2400268"
                                          _msttexthash="134784">Peso do Paciente</span>
                                    <span className="info-box-number" _msthash="2400424"
                                          _msttexthash="28353">{"90kg"}</span>
                                </div>
                                <div className="info-box-content">
                                    <span className="info-box-text" _msthash="2400268"
                                          _msttexthash="134784">IMC do Paciente</span>
                                    <span className="info-box-number" _msthash="2400424"
                                          _msttexthash="28353">{25}</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                    <Card titulo="Evolução">
                        <div className={"row"}>
                            <div className="col-lg-12">
                                <EditorTexto />
                            </div>
                        </div>
                    </Card>
                    <Card titulo="CID">
                        <div className={"row"}>
                            <select className={"form-control col-lg-12"}>
                                <option>Selecione...</option>
                                <option>CID1</option>
                                <option>CID2</option>
                                <option>CID3</option>
                            </select>
                            <br />
                            <br />
                            <div className={"form-group"}>
                                <BotaoMedico corDoBotao={BOTAO.COR.SUCESSO} icone={ICONE.PDF} titulo={"Atestado"} nome={"Atestado"} />
                                <BotaoMedico corDoBotao={BOTAO.COR.INFO} icone={ICONE.PDF} titulo={"Receita"} nome={"Receita"} />
                                <BotaoMedico corDoBotao={BOTAO.COR.ALERTA} icone={ICONE.PDF} titulo={"Requisição de Exames"} nome={"Requisição de Exames"} />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </Pagina>
    );
}
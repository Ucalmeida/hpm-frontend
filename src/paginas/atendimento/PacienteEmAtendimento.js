import {Card, EditorTexto, Pagina, Tabela} from "../../componentes";
import React, {useEffect, useState} from "react";
import {ExibirMensagem, xfetch} from "../../util";
import {HttpVerbo, MSG} from "../../util/Constantes";

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

    console.log("Pessoa Selecionada Campos:", pessoa.pessoas);

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
                    <Card titulo="Anaminese">
                        <div className={"row"}>
                            <div className="col-lg-12">
                                <EditorTexto />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </Pagina>
    );
}
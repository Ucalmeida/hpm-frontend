import React, {useEffect, useState} from "react";
import {Autocompletar, Botao, Card, Pagina, Select} from "../../componentes";
import {ExibirMensagem, xfetch} from "../../util";
import {BOTAO, HttpVerbo, ICONE, MSG} from "../../util/Constantes";
import ConsultasAgendadasCard from "../../componentes/card/ConsultasAgendadasCard";

export default function ConsultaEmergencia() {
    const [objeto, setObjeto] = useState(
        {
            idPessoa: null,
            emergencia: localStorage.getItem("emergencia"),
            idConsultorioBloco: localStorage.getItem("medicoConsulta"),
            nmProfissionalSaude: localStorage.getItem("nmProfissionalSaude"),
            nmEspecialidade: localStorage.getItem("nmEspecialidade"),
            idEspecialidade: localStorage.getItem("idEspecialidade"),
            idProfissional: localStorage.getItem("idProfissionalSaude"),
            dataHora: localStorage.getItem("dataHora")
        }
    )

    const selecionarPessoa = (e) => {
        let idpessoa = document.getElementById('idpessoa').value;
        if (localStorage.getItem('id') === idpessoa) {
            ExibirMensagem("Você não pode marcar para si mesmo(a) aqui. Vá em Agendar.", MSG.ALERTA, null, "Consulta", null, null, null);
        }
        setObjeto({...objeto, idPessoa: idpessoa});
    }

    const enviar = () => {
        xfetch('/hpm/consulta/cadastrar', objeto, HttpVerbo.POST)
            .then(json => {
                    if (typeof json !== 'undefined' ? json.status === "OK" : false){
                        ExibirMensagem('Consulta Agendada com Sucesso!', MSG.SUCESSO, null, 'Emergência', null, null, window.location.reload());
                    }
                }
            )
    }

    return(
        <Pagina titulo="Agendar Consulta Emergencial">
            <div className="row">
                <div className="col-lg-12">
                    <Card titulo="Agendar">
                        <div className="row">
                            <div className="col-lg-4">
                                <label>Especialidade: {objeto.nmEspecialidade}</label>
                            </div>
                            <input type="hidden" name="idPessoa"/>
                            <div className="col-lg-4">
                                <label>Médico: {objeto.nmProfissionalSaude}</label>
                            </div>
                            <div className="col-lg-4">
                                <label>Data - Hora: {objeto.dataHora}</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-8">
                                <Autocompletar
                                    name="pessoa"
                                    url="/hpm/pessoa/"
                                    label="Digite os Dados:"
                                    placeholder="Nome ou CPF aqui"
                                    tamanho={6}
                                    retorno={selecionarPessoa} />
                            </div>
                            <div className="col-lg-12 text-lg-right mt-4 mb-4">
                                <Botao cor={BOTAO.COR.SUCESSO} icone={ICONE.SALVAR} onClick={enviar}>Agendar</Botao>
                            </div>
                        </div>
                    </Card>
                    <ConsultasAgendadasCard url={'/hpm/consulta/' + objeto.idConsultorioBloco + '/opcoes'} objeto={objeto.idConsultorioBloco}/>
                </div>
            </div>
        </Pagina>
    )
}
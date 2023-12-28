import React, {useState} from "react";
import {Autocompletar, Botao, Card, Pagina} from "../../componentes";
import {ExibirMensagem, xfetch} from "../../util";
import {BOTAO, HttpVerbo, ICONE, MSG} from "../../util/Constantes";
import ConsultasAgendadasCard from "../../componentes/card/ConsultasAgendadasCard";


export default function Consulta() {
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

    let idpessoa = "";

    const selecionarPessoa = (e) => {
        idpessoa = document.getElementById('idpessoa').value;
        localStorage.setItem("idPessoa", idpessoa);
        setObjeto({...objeto, idPessoa: idpessoa});
    }

    const enviar = () => {
        xfetch('/hpm/consulta/cadastrar', objeto, HttpVerbo.POST)
            .then(json => {
                    if (typeof json !== 'undefined' ? json.status === "OK" : false){
                        ExibirMensagem('Consulta Agendada com Sucesso!', MSG.SUCESSO, null, 'Consulta', null, null, window.location.reload());
                    }
                }
            )
            window.opener.location.reload();
    }

    return(
        <Pagina titulo="Agendar Consulta">
            <div className="row">
                <div className="col-lg-12">
                    <Card titulo="Agendar">
                        <div className="row">
                            <input type="hidden" name="idPessoa"/>
                        </div>
                        <div className={"info-box"}>
                            <div className="info-box-content">
                                <span className="info-box-text">Especialidade</span>
                                <span className="info-box-number">{objeto.nmEspecialidade}</span>
                            </div>
                            <div className="info-box-content">
                                <span className="info-box-text">Médico</span>
                                <span className="info-box-number">{objeto.nmProfissionalSaude}</span>
                            </div>
                            <div className="info-box-content">
                                <span className="info-box-text">Data - Hora</span>
                                <span className="info-box-number">{objeto.dataHora}</span>
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
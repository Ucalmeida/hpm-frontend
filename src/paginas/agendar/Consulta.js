import React, {useEffect, useState} from "react";
import {Botao, Card, Pagina, Select} from "../../componentes";
import {ExibirMensagem, xfetch} from "../../util";
import {BOTAO, HttpVerbo, ICONE, MSG} from "../../util/Constantes";
import ConsultasAgendadasCard from "../../componentes/card/ConsultasAgendadasCard";

export default function Consulta() {
    const [objeto, setObjeto] = useState(
        {
            idPessoa: localStorage.getItem('id'),
            idConsultorioBloco: '',
            idProfissional: '',
            idEspecialidade: null,
            profissionais: [],
            consultoriosBloco: [],
            pessoas:[],
            comDependentes: false
        }
    )

    const selecionarDependente = (e) => {
        setObjeto({...objeto, idPessoa: e.value});
    }

    const dependentesLista =
        objeto.comDependentes ? <div className="col-lg-4">
            <label>Dependente</label>
            <Select
                funcao={selecionarDependente}
                nome="idDependente"
                url={"/hpm/dependente/tit/" + objeto.idPessoa + "/opcoes"}
            />
        </div> : '';

    const selecionarEspecialidade = (e) => {
        objeto.idEspecialidade = e.value;
        listarProfissionalPorEspecialidade()

    }

    const listarProfissionalPorEspecialidade = () => {
        setObjeto({...objeto, profissionais: []})
        xfetch('/hpm/profissionalSaude/' + objeto.idEspecialidade + '/opcoes',{}, HttpVerbo.GET)
            .then(res => res.json())
            .then(json => {
                    setObjeto({...objeto, profissionais: json.resultado})
                }
            )
    }
    const selecionarProfissionalSaude = (e) => {
        e.preventDefault()
        objeto.idProfissional = e.target.value
        listarConsultorioBlocoPorEspecialidadeProfissionalSaude()
    }

    const selecionarConsultorioBloco = (e) => {
        e.preventDefault()
        // setObjeto({...objeto, idConsultorioBloco: e.target.value})
        objeto.idConsultorioBloco = e.target.value;
        console.log("idConsultorioBloco", objeto.idConsultorioBloco);
    }

    const listarConsultorioBlocoPorEspecialidadeProfissionalSaude = () => {
        setObjeto({...objeto, consultoriosBloco: []})
        xfetch('/hpm/consultorioBloco/' + objeto.idEspecialidade + '/' + objeto.idProfissional + '/opcoes', {}, HttpVerbo.GET)
            .then(res => res.json())
            .then(json => {
                    setObjeto({...objeto, consultoriosBloco: json.resultado})
                }
            )
    }

    const enviar = () => {
        console.log("Objeto:", objeto)
        xfetch('/hpm/consulta/cadastrar', objeto, HttpVerbo.POST)
            .then(json => {
                    if (typeof json !== 'undefined' ? json.status === "OK" : false){
                        ExibirMensagem('Consulta Agendada com Sucesso!', MSG.SUCESSO);
                        window.location.reload();
                    }
                }
            )
    }

    useEffect(() => {
        xfetch("/hpm/dependente/tit/" + localStorage.getItem('id') + "/opcoes", {}, HttpVerbo.GET)
            .then(res => res.json())
            .then(json => {
                console.log("Resultado json:", json.status);
                json.status === "SEM_RESULTADOS" ? setObjeto({...objeto, comDependentes: false}) : setObjeto({...objeto, comDependentes: true})
            })
    }, [])

    let prof = objeto.profissionais
    let consultaBloco = objeto.consultoriosBloco

    return(
        <Pagina titulo="Agendar Consulta">
            <div className="row">
                <div className="col-lg-12">
                    <Card titulo="Agendar">
                        <div className="row">
                            {dependentesLista}
                            <div className="col-lg-3">
                                <label>Especialidade</label>
                                <Select
                                    funcao={selecionarEspecialidade}
                                    nome="idEspecialidade"
                                    url={"/hpm/especialidade/opcoes"}
                                />
                            </div>

                            <input type="hidden" name="idPessoa"/>

                            <div className="col-lg-4">
                                <label>Médico</label>
                                <br/>
                                <select
                                    className="form-control"
                                    name="idProfissional"
                                    value={objeto.idProfissional}
                                    onChange={selecionarProfissionalSaude}>
                                    <option hidden>Selecione...</option>
                                    {prof.map((v, k) => {
                                        return <option className="flex-fill" value={v.valor} key={k}> {v.texto}</option>
                                    })}
                                </select>
                            </div>

                            <div className="col-lg-3">
                                <label>Data - Hora</label>
                                <br/>
                                <select
                                    className="form-control"
                                    name="idConsultorioBloco"
                                    value={objeto.idConsultorioBloco}
                                    onChange={selecionarConsultorioBloco}>
                                    <option hidden>Selecione...</option>
                                    {consultaBloco.map((v, k) => {
                                        return <option className="flex-fill" value={v.valor} key={k}> {v.texto}</option>
                                    })}
                                </select>
                            </div>
                            <div className="col-lg-12 text-lg-right mt-4 mb-4">
                                <Botao cor={BOTAO.COR.SUCESSO} icone={ICONE.SALVAR} onClick={enviar}>Agendar</Botao>
                            </div>
                        </div>
                    </Card>
                    <ConsultasAgendadasCard url={'/hpm/consulta/agendadas/' + objeto.idPessoa} objeto={objeto.idPessoa}/>
                </div>
            </div>
        </Pagina>
    )
}
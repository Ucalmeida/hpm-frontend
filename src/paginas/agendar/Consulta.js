import React, {useState} from "react";
import {Botao, Card, Pagina, Select} from "../../componentes";
import {ExibirMensagem, xfetch} from "../../util";
import {BOTAO, HttpVerbo, ICONE, MSG} from "../../util/Constantes";

export default function Consulta() {
    const [objeto, setObjeto] = useState(
        {
            idPessoa: null,
            idConsultorioBloco: '',
            idProfissional: '',
            idEspecialidade: null,
            profissionais: [],
            consultoriosBloco: [],
            pessoas:[]
        }
    )

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
        setObjeto({...objeto, idConsultorioBloco: e.target.value, idPessoa: 0})
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
        xfetch('/hpm/consulta/cadastrarComPessoaLogada', objeto, HttpVerbo.POST)
            .then(json => {
                    if (typeof json !== 'undefined' ? json.status === "OK" : false){
                        ExibirMensagem('Consulta Agendada com Sucesso!', MSG.SUCESSO);
                        window.location.reload();
                    } else {
                        ExibirMensagem('Não foi possível cadastrar a consulta!', MSG.ERRO);
                    }
                }
            )
    }

    let prof = objeto.profissionais
    let consultaBloco = objeto.consultoriosBloco

    return(
        <Pagina titulo="Agendar Consulta">
            <div className="row">
                <div className="col-lg-12">
                    <Card titulo="Agendar">
                        <div className="row">
                            <div className="col-lg-4">
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

                            <div className="col-lg-4">
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
                </div>
            </div>
        </Pagina>
    )
}
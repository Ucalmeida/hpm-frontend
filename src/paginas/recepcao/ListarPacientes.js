import React, {useEffect, useState} from "react";
import {Select} from "../../componentes/form";
import {xfetch} from "../../util";
import {HttpVerbo} from "../../util/Constantes";
import {Card, Pagina} from "../../componentes";

export default function ListarPacientes() {
    const [objeto, setObjeto] = useState({});

    const selecionarEspecialidade = (e) => {
        setObjeto({...objeto, idEspecialidade: e.value});
    }

    const selecionarProfissionalSaude = (e) => {
        objeto.idProfissionalSaude = e.target.value;
        listarDatasPorEspecialidadeProfissionalSaude();
    }

    const selecionarConsultorioBloco = (e) => {
        e.preventDefault()
        setObjeto({...objeto, idConsultorioBloco: e.target.value})
    }

    const listarProfissionalPorEspecialidade = () => {
        console.log("Especialidade:", objeto.idEspecialidade);
        xfetch('/hpm/profissionalSaude/' + objeto.idEspecialidade + '/opcoes',{}, HttpVerbo.GET)
            .then(res => res.json())
            .then(json => {
                    setObjeto({...objeto, profissionais: json.resultado});
                }
            )
    }

    const listarDatasPorEspecialidadeProfissionalSaude = () => {
        setObjeto({...objeto, consultoriosBloco: []})
        xfetch('/hpm/consultorioBloco/' + objeto.idEspecialidade + '/' + objeto.idProfissional + '/opcoes', {}, HttpVerbo.GET)
            .then(res => res.json())
            .then(json => {
                    setObjeto({...objeto, consultoriosBloco: json.resultado})
                }
            )
    }

    useEffect( () => {
        listarProfissionalPorEspecialidade();
    }, [objeto.idEspecialidade]);

    let consultaBloco = objeto.consultoriosBloco;

    return (
        <Pagina titulo={"Listar Pacientes"}>
            <div className={"row"}>
                <div className={"col-lg-12"}>
                    <Card titulo="Especialidade Médico">
                        <div className={"row"}>
                            <div className={"col-lg-6"}>
                                <label>Selecionar Especialidade</label>
                                <Select
                                    url={"/hpm/especialidade/opcoes"}
                                    nome={"idEspecialidade"}
                                    funcao={selecionarEspecialidade}
                                />
                            </div>
                            <div className={"col-lg-6"}>
                                <label>Profissional</label>
                                <select
                                    className="form-control"
                                    onChange={selecionarProfissionalSaude}
                                    name="idProfissionalSaude">
                                    <option hidden>Selecione...</option>
                                    {typeof objeto.profissionais != 'undefined' ? objeto.profissionais.map((v, k) => {
                                        return <option className="flex-fill" value={v.valor} key={k}> {v.texto}</option>
                                    }) : ''}
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
                        </div>
                    </Card>
                </div>
            </div>
        </Pagina>
    );
}
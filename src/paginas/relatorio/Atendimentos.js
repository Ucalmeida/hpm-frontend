import React, {useEffect, useState} from "react";
import {BotaoPesquisar, Card, Pagina, Select, Tabela,Spinner} from "../../componentes";
import {ExibirMensagem, xfetch} from "../../util";
import { HttpVerbo,MSG} from "../../util/Constantes";

export default function Atendimentos(){
     const [objeto, setObjeto] = useState({
        dataInicial: null,
        dataFinal: null,
        idStatus: null,
        idEspecialidade: null,
        idProfissionalSaude: null,
         listandoAtendimentos: false
    })

    const [aux, setAux] = useState({
        dataInicial: null,
        dataFinal: null,
        idStatus: null,
        idEspecialidade: null,
        idProfissionalSaude: null,
    })

    const [list, setList] = useState({
        status:[],
        especialidades:[],
        profissionais:[],
        consultas:[]
    })

    const listarStatus = () => {
        xfetch('/hpm/status/objeto-opcoes/20',{}, HttpVerbo.GET)
            .then(res => res.json())
            .then(json => {
                    list.status = json.resultado
                console.log('Lista de Status: ', list.status)
                }
            )
    }

    const listarEspecialidades = () => {
        xfetch('/hpm/especialidade/opcoes',{}, HttpVerbo.GET)
            .then(res => res.json())
            .then(json => {
                    list.especialidades = json.resultado
                console.log('Lista de especialidades: ', list.especialidades)
                }
            )
    }

      const selecionarDtInicial = (e) => {
        objeto.dataInicial = e.target.value;
        aux.dataInicial = objeto.dataInicial;
    }

    const selecionarDtFinal = (e) => {
        objeto.dataFinal = e.target.value;
        aux.dataFinal = objeto.dataFinal;
    }

    const selecionarStatus = (e) => {
       if(e.value == ''){
           aux.idStatus = null
       }else{
           objeto.idStatus = e.value;
           aux.idStatus = objeto.idStatus
       }
    }

    const selecionarEspecialidade = (e) => {
        if(e.value == ''){
          aux.idEspecialidade = null
            setList({...list,profissionais: []})
        }else{
            objeto.idEspecialidade = e.value;
            aux.idEspecialidade = objeto.idEspecialidade;
            limparCampo('idProfissionalSaude');
            listarProfissionalPorEspecialidade(aux.idEspecialidade);
        }
    }

    const selecionarProfissionalSaude = (e) => {
        if(e.target.value == 'Selecione...'){
           aux.idProfissionalSaude = null
        }else{
            objeto.idProfissionalSaude = e.target.value;
            aux.idProfissionalSaude = e.target.value;
        }
    }

    const listarProfissionalPorEspecialidade = (valor) => {
        if(typeof objeto.idEspecialidade !== 'undefined') {
            xfetch('/hpm/profissionalSaude/' + valor + '/opcoes',{}, HttpVerbo.GET)
                .then(res => res.json())
                .then(json => {
                        setList({...list, profissionais: json.resultado});
                    }
                )
        }
    }

    const limparCampo = (id) => {
        document.getElementById(id).value = '';
    }

    const listarConsultas = () => {
        if(aux.dataInicial == null && aux.dataFinal == null ){
            ExibirMensagem("Informe a data - hora inicial e data - hora final!", MSG.ALERTA)
            setList({...list, consultas:[]})
        }else if(aux.dataInicial > aux.dataFinal){
            ExibirMensagem("A data - hora inicial não pode ser superior a data - hora final!", MSG.ALERTA)
            setList({...list, consultas:[]})
        }else if(aux.dataInicial == ''){
            ExibirMensagem("Insira um valor válido. O campo data - hora inicial está incompleto ou inválido.", MSG.ALERTA)
            setList({...list, consultas:[]})
        }else if(aux.dataInicial != null && aux.dataFinal == null){
            ExibirMensagem("Insira um valor válido. O campo data - hora final está incompleto ou inválido.", MSG.ALERTA)
            setList({...list, consultas:[]})
        }else{
            setObjeto({...objeto, listandoAtendimentos: true})

            xfetch('/hpm/consulta/relatorio/atendimentos', aux, HttpVerbo.POST)
                .then(response => {
                    if(response.status === "OK"){
                        setList({...list, consultas: response.resultado})
                    }else{
                        setList({...list, consultas:[]})
                        ExibirMensagem("Não existe resultados para essa pesquisa!", MSG.ALERTA)
                    }
                    }
                )
               setObjeto({...objeto, listandoAtendimentos: false})
        }
    }

    const colunas = [
        {text: "Data Hora"},
        {text: "Status" },
        {text: "Especialidade" },
        {text: "Profissional"}
    ]

    const dados = () => {
        return(
            typeof list.consultas !== 'undefined' ? list.consultas.map((consulta, indice) => {
                return ({
                    'id': consulta.id,
                    'data_hora': consulta.dtHora,
                    'status': consulta.nmStatus,
                    'especialidade': consulta.nmEspecialidade,
                    'profissional': consulta.nmMedico
                })
            }) : ''
        )
    }

    let spinner = objeto.listandoAtendimentos ? <Spinner/> : ''

    return(
        <Pagina titulo="Atendimentos">
            <form >
                <div className="row">
                    <div className="col-lg-12">
                        <Card titulo="Pesquisa">

                            <div className="col-lg-12">
                                {spinner}
                            </div>

                            <div className={"row"}>

                                <div className={"col-lg-3"}>
                                    <label>Data - Hora Inicial</label>
                                    <input
                                        id="dtInicial"
                                        className="form-control"
                                        type="datetime-local"
                                        name="dataInicial"
                                        required={true}
                                        onChange={selecionarDtInicial}
                                    />
                                </div>

                                <div className={"col-lg-3"}>
                                    <label>Data - Hora Final</label>
                                    <input
                                        id="dtFinal"
                                        className="form-control"
                                        type="datetime-local"
                                        name="dataFinal"
                                        onChange={selecionarDtFinal}
                                    />
                                </div>
                                <div className={"col-lg-2"}>
                                    <label>Status</label>
                                    <Select
                                        url={"/hpm/status/objeto-opcoes/20"}
                                        nome={"idStatus"}
                                        funcao={selecionarStatus}
                                    />
                                </div>
                                <div className={"col-lg-2"}>
                                    <label>Especialidade</label>
                                    <Select
                                        url={"/hpm/especialidade/opcoes"}
                                        nome={"idEspecialidade"}
                                        funcao={selecionarEspecialidade}
                                    />
                                </div>
                                <div className={"col-lg-2"}>
                                    <label>Profissional</label>
                                    <select
                                        className="form-control"
                                        id="idProfissionalSaude"
                                        onChange={selecionarProfissionalSaude}
                                        name="idProfSaude">
                                        <option >Selecione...</option>
                                        {(typeof list.profissionais !== 'undefined') ? list.profissionais.map((v, k) => {
                                          return <option className="flex-fill" value={v.valor} key={k}> {v.texto}</option>
                                        }) : ''}
                                    </select>
                                </div>

                            </div>

                            <br/>
                            <center>
                                <div className="col-lg-2">
                                    <BotaoPesquisar onClick={listarConsultas}>
                                        Listar
                                    </BotaoPesquisar>
                                </div>
                            </center>
                        </Card>
                    </div>
                    <div className="col-lg-12">
                        <Card titulo="Lista de Consultas">
                            <Tabela colunas={colunas} dados={dados()} />
                        </Card>
                    </div>
                </div>
            </form>
        </Pagina>
    )
}
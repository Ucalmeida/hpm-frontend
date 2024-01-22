import React, {useState} from "react";
import {Select} from "../../componentes/form";
import {xfetch} from "../../util";
import {BOTAO, HttpVerbo} from "../../util/Constantes";
import {Botao, Card, Pagina, Tabela} from "../../componentes";

export default function MarcarConsultaMedico() {
    const objeto = {};

    const [lista, setLista] = useState({
        medicos: []
    });

    const [total, setTotal] = useState({
        id: [],
        qtConsultas: []
    });

    const handleBtnVerPacientes = async (consultorioBlocoId, medico) => {
        objeto.idConsultorioBloco = consultorioBlocoId;
        localStorage.setItem('consultorioBloco', objeto.idConsultorioBloco);
        localStorage.setItem('dtHora', medico.dataInicio + " - " + medico.dataTermino);
        localStorage.setItem('nmEspecialidade', medico.especialidadeNome);
        localStorage.setItem('nmMedico', medico.profissionalSaudeNome);
        window.open("/recepcao/verPacientesConsultaAgendada");
    }

    // const handleBtnConsulta = async (medico) => {
    //     localStorage.setItem('emergencia', false);
    //     localStorage.setItem('medicoConsulta', medico.id);
    //     localStorage.setItem('nmProfissionalSaude', medico.profissionalSaudeNome);
    //     localStorage.setItem('nmEspecialidade', medico.especialidadeNome);
    //     localStorage.setItem('idEspecialidade', medico.especialidadeId);
    //     localStorage.setItem('idProfissionalSaude', medico.profissionalSaudeId);
    //     localStorage.setItem('dataHora', medico.dataInicio + " - " + medico.dataTermino);
    //     window.open("/recepcao/consulta");
    // }

    const handleBtnUrgencia = async (medico) => {
        localStorage.setItem('emergencia', true);
        localStorage.setItem('medicoConsulta', medico.id);
        localStorage.setItem('nmProfissionalSaude', medico.profissionalSaudeNome);
        localStorage.setItem('nmEspecialidade', medico.especialidadeNome);
        localStorage.setItem('idEspecialidade', medico.especialidadeId);
        localStorage.setItem('idProfissionalSaude', medico.profissionalSaudeId);
        localStorage.setItem('dataHora', medico.dataInicio + " - " + medico.dataTermino);
        window.open("/recepcao/consultaEmergencia");
    }

    const handleEspecialidade = (e) => {
        objeto.idEspecialidade = e.value;
        listarConsultoriosBlocoPorEspecialidade();
    }

    const listarConsultoriosBlocoPorEspecialidade = () => {
        xfetch('/hpm/consultorioBloco/especialidade/' + objeto.idEspecialidade + '/opcoes', {}, HttpVerbo.POST)
            .then(lista => {
                console.log("Resultado da lista:", lista.resultado);
                setLista({...lista, medicos: lista.resultado})
            })
    }
    console.log("Medicos", lista);

    const colunas =[
        {text: "Nome"},
        {text: "Início"},
        {text: "Término"},
        {text: "Vagas"},
        {text: "Encaixes"},
        {text: "Ações"}
    ]

    const dados = () => {
        if(typeof(lista.medicos) !== "undefined") {
            return(
                lista.medicos.map((medico, index) => {
                    let numeroEncaixes = Number(medico.qtdTotalEmergenciasDisponiveis);
                    console.info(numeroEncaixes)
                    let isDesabilitado = false;
                    if (numeroEncaixes === 0) {
                        isDesabilitado = true;
                    }
                    return({
                        'nome': medico.profissionalSaudeNome,
                        'inicio': medico.dataInicio,
                        'termino': medico.dataTermino,
                        'vagas': medico.qtdTotalConsultasDisponiveis,
                        'encaixes': medico.qtdTotalEmergenciasDisponiveis,
                        'acoes': <div>
                                    <Botao onClick={() => handleBtnVerPacientes(medico.id, medico)} value={medico.id}>Ver Pacientes</Botao>
                                    {/*<Botao cor={BOTAO.COR.PRIMARIO} onClick={() => handleBtnConsulta(medico)}>Consulta</Botao>*/}
                                    <Botao disabled={isDesabilitado} cor={BOTAO.COR.ALERTA} onClick={() => handleBtnUrgencia(medico)}>Encaixes</Botao>
                                </div>
                    })
                })
            )
        }
    }

    return(
        <Pagina titulo="Marcar Consultas">
            <div className={"row"}>
                <div className={"col-lg-12"}>
                    <Card titulo="Listar">
                        <div className={"row"}>
                            <div className={"col-lg-12"}>
                                <label>Selecionar Especialidade</label>
                                <Select
                                    url={`/hpm/especialidade/${localStorage.getItem('id')}/opcoes`}
                                    nome={"idEspecialidade"}
                                    funcao={handleEspecialidade}
                                />
                            </div>
                        </div>
                    </Card>
                    <Card titulo="Lista de médicos por especialidade">
                        <Tabela colunas={colunas} dados={dados()} pageSize={5} />
                    </Card>
                </div>
            </div>
        </Pagina>
    );
}
import React, {useState} from "react";
import {Select} from "../../componentes/form";
import {xfetch} from "../../util";
import {BOTAO, HttpVerbo} from "../../util/Constantes";
import {Botao, Card, Pagina, Tabela} from "../../componentes";

export default function MarcarConsultas() {
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
        localStorage.setItem('dtHora', medico.texto3 + " - " + medico.texto4);
        localStorage.setItem('nmEspecialidade', medico.texto2);
        localStorage.setItem('nmMedico', medico.texto);
        window.open("/recepcao/verPacientesConsultaAgendada");
    }

    const handleBtnConsulta = async (medico) => {
        localStorage.setItem('emergencia', false);
        localStorage.setItem('medicoConsulta', medico.valor);
        localStorage.setItem('nmProfissionalSaude', medico.texto);
        localStorage.setItem('nmEspecialidade', medico.texto2);
        localStorage.setItem('idEspecialidade', medico.valor3);
        localStorage.setItem('idProfissionalSaude', medico.valor2);
        localStorage.setItem('dataHora', medico.texto3 + " - " + medico.texto4);
        window.open("/recepcao/consulta");
    }

    const handleBtnUrgencia = async (medico) => {
        localStorage.setItem('emergencia', true);
        localStorage.setItem('medicoConsulta', medico.valor);
        localStorage.setItem('nmProfissionalSaude', medico.texto);
        localStorage.setItem('nmEspecialidade', medico.texto2);
        localStorage.setItem('idEspecialidade', medico.valor3);
        localStorage.setItem('idProfissionalSaude', medico.valor2);
        localStorage.setItem('dataHora', medico.texto3 + " - " + medico.texto4);
        window.open("/recepcao/consultaEmergencia");
    }

    const handleEspecialidade = (e) => {
        objeto.idEspecialidade = e.value;
        listarConsultoriosBlocoPorEspecialidade();
        // totalConsultaDisponivel();
    }

    const listarConsultoriosBlocoPorEspecialidade = () => {
        xfetch('/hpm/consultorioBloco/' + objeto.idEspecialidade + '/opcoes', {}, HttpVerbo.GET)
            .then(res => res.json())
            .then(lista => {
                setLista({...lista, medicos: lista.resultado})
            })
    }

    // const totalConsultaDisponivel = () => {
    //     lista.medicos.map((medico, index) => {
    //         xfetch('/hpm/consultorioBloco/consulta/disponiveis/' + medico.valor, {}, HttpVerbo.GET)
    //             .then(res => res.json())
    //             .then(total => {
    //                 setTotal({...total, qtdConsultas: total.resultado});
    //             })
    //     })
    // }

    // console.log("Total", lista);
    console.log("Total", total);

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
                    return({
                        'nome': medico.texto,
                        'inicio': medico.texto3,
                        'termino': medico.texto4,
                        'vagas': medico.texto5,
                        'encaixes': medico.texto6,
                        'acoes': <div>
                                    <Botao onClick={() => handleBtnVerPacientes(medico.valor, medico)} value={medico.valor}>Ver Pacientes</Botao>
                                    <Botao cor={BOTAO.COR.PRIMARIO} onClick={() => handleBtnConsulta(medico)}>Consulta</Botao>
                                    <Botao cor={BOTAO.COR.ALERTA} onClick={() => handleBtnUrgencia(medico)}>Encaixes</Botao>
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
                                    url={"/hpm/especialidade/opcoes"}
                                    nome={"idEspecialidade"}
                                    funcao={handleEspecialidade}
                                />
                            </div>
                        </div>
                    </Card>
                    <Card titulo="Lista de médicos por especialidade">
                        <Tabela colunas={colunas} dados={dados()} />
                    </Card>
                </div>
            </div>
        </Pagina>
    );
}
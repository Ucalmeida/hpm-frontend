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

    const handleBtnVerPacientes = async (consultorioBlocoId) => {
        objeto.idConsultorioBloco = consultorioBlocoId;
        localStorage.setItem('consultorioBloco', objeto.idConsultorioBloco);
        window.open("/recepcao/verPacientesConsultaAgendada");
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
    }

    const listarConsultoriosBlocoPorEspecialidade = () => {
        xfetch('/hpm/consultorioBloco/' + objeto.idEspecialidade + '/opcoes', {}, HttpVerbo.GET)
            .then(res => res.json())
            .then(lista => {
                setLista({...lista, medicos: lista.resultado})
            })
    }

    const colunas =[
        {text: "Nome"},
        {text: "Início"},
        {text: "Término"},
        {text: "Vagas"},
        {text: "Ações"}
    ]

    const dados = () => {
        if(typeof(lista.medicos) !== "undefined") {
            return(
                lista.medicos.map((medico) => {
                    return({
                        'nome': medico.texto,
                        'inicio': medico.texto2,
                        'termino': medico.texto3,
                        'vagas': medico.texto4,
                        'acoes': <div>
                                    <Botao onClick={() => handleBtnVerPacientes(medico.valor)} value={medico.valor}>Ver Pacientes</Botao>
                                    <Botao cor={BOTAO.COR.ALERTA} onClick={() => handleBtnUrgencia(medico)}>Urgência</Botao>
                                </div>
                    })
                })
            )
        }
    }

    return(
        <Pagina titulo="Listar Médicos">
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
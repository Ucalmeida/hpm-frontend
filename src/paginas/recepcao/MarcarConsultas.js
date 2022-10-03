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

    const handleBtnUrgencia = async (consultorioBlocoId) => {
        // consultaSelecionada.idConsulta = consultaId;
        // consultaSelecionada.idStatus = statusId;
        // await xfetch('/hpm/consulta/alterar-status', consultaSelecionada, HttpVerbo.POST)
        //     .then( json =>{
        //             if(json.status === "OK"){
        //                 ExibirMensagem('Consulta Cancelada!', MSG.SUCESSO, '', '', '', '', listarPacientesPorData())
        //             }else{
        //                 ExibirMensagem(json.message, MSG.ERRO)
        //             }
        //         }
        //     )
        alert("Urgente!!!");
        objeto.idConsultorioBloco = consultorioBlocoId;
        console.log("Lista:", lista);
        console.log("Objeto:", objeto);
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
                                    <Botao cor={BOTAO.COR.INFO} onClick={() => handleBtnVerPacientes(medico.valor)} value={medico.valor}>Ver Pacientes</Botao>
                                    <Botao cor={BOTAO.COR.ALERTA} onClick={() => handleBtnUrgencia(medico.valor)} value={medico.valor}>Urgência</Botao>
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
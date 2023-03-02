import React, { useEffect, useState } from "react";
import { Botao, BotaoSalvar, Card, Input, Pagina, Select, Tabela } from "../../componentes";
import { ExibirMensagem, xfetch } from "../../util";
import { BOTAO, HttpVerbo, ICONE, MSG } from "../../util/Constantes";
import EditarConsultorioBloco from '../editar/EditarConsultorioBloco';
// ATUALIZAR: import ConsultoriosBlocoCard from "../../componentes/card/ConsultoriosBlocoCard"; -- Comitei

export default function ConsultorioBloco() {
    const [selecionar, setSelecionar] = useState(false);

    // ATUALIZAR: Inseri isso aqui no dia 06 de fevereiro de 2023 para teste
    const [lista, setLista] = useState({
        blocos: [
            {
                id: "",
                nmEscala: "",
                nmEspecialidade: "",
                nmPiso: "",
                dtInicio: "",
                dtTermino: "",
                qtConsultas: "",
                qtEmergencias: "",
            }
        ]
    });
    // ATUALIZAR: Até aqui

    const [objeto, setObjeto] = useState(
        {
            dataInicio : null,
            dataTermino: null,
            idEscala: null,
            idEspecialidade: null,
            idProfissionalSaude: null,
            idSala: null,
            qtdConsultas: null,
            qtdEmergencias: null
        }
    )

    const [profissionais, setProfissionais] = useState({});

    const [escala, setEscala] = useState({});

    const [status, setStatus] = useState({
        listaStatus: []
    });

    const escalaObjeto = 31;

    const [verificador, setVerificador] = useState({
        ano: 0,
        mesInicio: 0,
        mesTermino: 0,
        mesEscala: 0,
        anoEscala: 0
    });

    const meses = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
    ];

    let [mes, ano] = "";

    let dt = "";

    const handleDtHrInicio = (e) => {
        dt = e.target.value;
        let mesVerificador = dt.split("-");
        verificador.mesInicio = Number(mesVerificador[1]);
        verificador.ano = Number(mesVerificador[0]);
        setObjeto({...objeto, dataInicio: dt});
    }

    const handleDtHrTermino = (e) => {
        dt = e.target.value;
        let mesVerificador = dt.split("-");
        verificador.mesTermino = Number(mesVerificador[1]);
        verificador.ano = Number(mesVerificador[0]);
        setObjeto({...objeto, dataTermino: dt});
    }

    const handleQtdConsulta = (e) => {
        e.preventDefault()
        setObjeto({...objeto, qtdConsultas: Number(e.target.value)})
    }

    const handleQtdEmergencia = (e) => {
        e.preventDefault()
        setObjeto({...objeto, qtdEmergencias: Number(e.target.value)})
    }

    const handleStatus = (e) => {
        const statusId = e.target.value;
        status.idStatus = Number(statusId);
        listarEscalaPorStatus();
    }

    const listarEscalaPorStatus = (e) => {
        xfetch('/hpm/escala/' + status.idStatus + '/opcoes',{}, HttpVerbo.GET)
            .then(res => res.json())
            .then(json => {
                    setEscala({...escala, escalas: json.resultado});
                }
            )
    }

    const selecionarEscala = (e) => {
        objeto.idEscala = Number(e.target.value);
        const nomeEscala = escala.escalas.filter(escala => escala.valor === objeto.idEscala);
        [mes, ano] = nomeEscala[0].nome.split(" - ");
        verificador.mesEscala = meses.indexOf(mes) + 1;
        verificador.anoEscala = Number(ano);
        console.log("IdEscala:", objeto.idEscala);
        setSelecionar(!selecionar);
    }

    const selecionarEspecialidade = (e) => {
        objeto.idEspecialidade = Number(e.value)
        listarProfissionalPorEspecialidade();
    }

    const selecionarProfissionalSaude = (e) => {
        objeto.idProfissionalSaude = Number(e.target.value);
    }

    const selecionarSala = (e) => {
        objeto.idSala = e.value;
    }

    const listarProfissionalPorEspecialidade = () => {
        xfetch('/hpm/profissionalSaude/' + objeto.idEspecialidade + '/opcoes',{}, HttpVerbo.GET)
            .then(res => res.json())
            .then(json => {
                    setProfissionais({...profissionais, profissionais: json.resultado});
                }
            )
    }

    const enviar = (e) => {
        if (verificador.mesInicio === verificador.mesEscala && 
            verificador.mesTermino === verificador.mesEscala &&
            verificador.ano === verificador.anoEscala) {
                xfetch('/hpm/consultorioBloco/cadastrar', objeto, HttpVerbo.POST)
                    .then( json =>{
                            if (typeof json !== "undefined" ? json.status === "OK" : false) {
                                ExibirMensagem('Consultorio Bloco Cadastrado Com Sucesso!', MSG.SUCESSO);
                            }
                        }
                    )
                setSelecionar(!selecionar);
        } else {
            ExibirMensagem("Escala selecionada não pode ser diferente do mês de início e término da escala!", MSG.ALERTA);
        }
    }

    useEffect(() => {
        xfetch('/hpm/status/' + escalaObjeto, {}, HttpVerbo.GET)
            .then( res => res.json())
            .then(status => setStatus({...status, listaStatus: status.resultado}))
    }, [])

    // ATUALIZAR: Inseri isso aqui no dia 06 de fevereiro de 2023 para teste
    const handleBtnExcluir = (blocoId) => {
        xfetch('/hpm/consultorioBloco/excluir/' + blocoId, {}, HttpVerbo.PUT)
            .then( json => {
                    if (typeof json !== "undefined" ? json.status === "OK" : false) {
                        ExibirMensagem("Bloco Excluído!", MSG.SUCESSO);
                    }
                }
            )
        setSelecionar(!selecionar);
    }

    useEffect(() => {
        console.log("🚀 ~ file: ConsultorioBloco.js:189 ~ useEffect ~ objeto.idEscala:", objeto.idEscala)
        if (objeto.idEscala !== null) {
            xfetch('/hpm/consultorioBloco/escala/' + objeto.idEscala + '/opcoes', {}, HttpVerbo.POST)
            .then(lista => setLista({...lista, blocos: lista.resultado}))
        }
    }, [selecionar])

    const colunas = [
        {text: "Escala"},
        {text: "Nome"},
        {text: "Especialidade"},
        {text: "Sala"},
        {text: "Data Início"},
        {text: "Data Término"},
        {text: "Consultas"},
        {text: "Encaixes"},
        {text: "Ação"}
    ]

    const dados = () => {
        return (
            lista.blocos.map((bloco) => {
                console.log("Teste:", bloco);
                return ({
                    'escala': bloco.texto8,
                    'nome': bloco.texto,
                    'especialidade': bloco.texto2,
                    'sala': bloco.texto7, // Inserir o nome completo
                    'data_inicio': bloco.texto3,
                    'data_termino': bloco.texto4,
                    'consultas': bloco.texto5,
                    'encaixes': bloco.texto6,
                    'acao': bloco.id !== "" ? <div>
                        <Botao cor={BOTAO.COR.PERIGO} onClick={() => handleBtnExcluir(bloco.valor)} value={bloco.valor} icone={""}>Excluir</Botao>
                        <EditarConsultorioBloco 
                            corDoBotao={BOTAO.COR.ALERTA}
                            icone={ICONE.EDITAR}
                            titulo={"Editar"}
                            nome={"Editar"}
                            valor={bloco.valor}
                        />
                    </div> : ""
                })
            })
        )
    }
    // ATUALIZAR: Até aqui

    const selectEspecialista =  objeto.idEspecialidade ? <div className="col-lg-6">
        <label>Profissional</label>
        <select
            className="form-control"
            onChange={selecionarProfissionalSaude}
            name="idProfissionalSaude">
            <option hidden>Selecione...</option>
            {typeof profissionais.profissionais !== "undefined" ? profissionais.profissionais.map((v, k) => {
                return <option className="flex-fill" value={v.valor} key={k}> {v.texto}</option>
            }) : ''}
        </select>
    </div> : ''

    return(
        <Pagina titulo="Cadastrar ConsultorioBloco">
            <div className="row">
                <div className="col-lg-12">
                    <Card titulo="Cadastrar">
                        <div className="row">
                            <div className="col-lg-3">
                                <label>Tipo Escala</label>
                                <select
                                    className="form-control"
                                    name="idStatus"
                                    value={status.idStatus}
                                    onChange={handleStatus}>
                                    <option hidden>Selecione...</option>
                                    {status.listaStatus.map((v, k) => {
                                        if (v.id !== 15) {
                                            return <option className="flex-fill" value={v.id} key={k}> {v.nome}</option>
                                        }
                                    })}
                                </select>
                            </div>
                            <div className="col-lg-3">
                                <label>Escala</label>
                                <select
                                    className="form-control"
                                    onChange={selecionarEscala}
                                    nome="idEscala">
                                    <option hidden>Selecione...</option>
                                    {typeof escala.escalas !== "undefined" ? escala.escalas.map((v, k) => {
                                        return <option className="flex-fill" value={v.valor} key={k}> {v.nome}</option>
                                    }) : ''}
                                </select>
                            </div>
                            <div className="col-lg-6">
                                <label>Especialidade</label>
                                <Select
                                    funcao={selecionarEspecialidade}
                                    nome="idEspecialidade"
                                    url={"/hpm/especialidade/opcoes"} />
                            </div>
                            {selectEspecialista}
                            <div className="col-lg-6">
                                <label>Prédio - Piso - Sala</label>
                                <Select
                                    funcao={selecionarSala}
                                    nome="idSala"
                                    url={"/hpm/sala/opcoes"} />
                            </div>
                            <div className="col-lg-3">
                                <Input
                                    type="datetime-local"
                                    value={objeto.dataInicio}
                                    onChange={handleDtHrInicio}
                                    name="dataInicio"
                                    label="Data e hora início"
                                    placeholder="Data e hora"/>
                            </div>
                            <div className="col-lg-3">
                                <Input
                                    type="datetime-local"
                                    value={objeto.dataTermino}
                                    onChange={handleDtHrTermino}
                                    name="dataTermino"
                                    label="Data e hora término"
                                    placeholder="Data e hora"/>
                            </div>
                            <div className="col-lg-3">
                                <Input
                                    type="text"
                                    onChange={handleQtdConsulta}
                                    value={objeto.qtdConsultas}
                                    name="qtdConsultas"
                                    label="Quantidade de Consultas"
                                    placeholder="Qtd consultas"/>
                            </div>
                            <div className="col-lg-3">
                                <Input
                                    type="text"
                                    onChange={handleQtdEmergencia}
                                    value={objeto.qtdEmergencias}
                                    name="qtdEmergencias"
                                    label="Quantidade de Encaixes"
                                    placeholder="Qtd encaixes"/>
                            </div>
                        </div>
                        <div className="col-lg-15 text-lg-right mt-4 mb-4">
                            <BotaoSalvar onClick={enviar} />
                        </div>
                    </Card>
                    {/* ATUALIZAR: <ConsultoriosBlocoCard idEspecialidade={Number(objeto.idEspecialidade)} apagarBloco={apagar}/> --Comitei */}
                    <Card titulo="Consultórios Cadastrados">
                        <Tabela colunas={colunas} dados={dados()} pageSize={5}/>
                    </Card>
                </div>
            </div>
        </Pagina>
    )
}
import React, { useEffect, useState } from "react";
import { BotaoSalvar, Card, Input, Pagina, Tabela } from "../../componentes";
import { ExibirMensagem, xfetch } from "../../util";
import { HttpVerbo, MSG } from "../../util/Constantes";
// ATUALIZAR: import EscalasCadastradasCard from "../../componentes/card/EscalasCadastradasCard"; -- Comentei

export default function CadastrarEscala() {
    // ATUALIZAR: const [cadastrar, setCadastrar] = useState(false); -- Comentei

    // ATUALIZAR: Inseri isso aqui no dia 06 de fevereiro de 2023 para teste
    const [lista, setLista] = useState({
        escalas: [
            {
                id: "",
                nmEscala: "",
                dtInicio: "",
                dtTermino: "",
                situacao: "",
            }
        ]
    });
    // ATUALIZAR: Até aqui

    const [objeto, setObjeto] = useState({
        nome: '',
        dataInicio: null,
        dataTermino: null,
        idStatus: null
    });

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
    
    const handleChange = (e) => {
        const myDate = e.target.value;
        let [ano, mes] = myDate.split("-");
        verificador.mesEscala = Number(mes);
        mes = meses[mes - 1];
        objeto.nome = mes + " - " + ano;
        verificador.anoEscala = Number(ano);
    }

    const handleStatus = (e) => {
        objeto.idStatus = e.target.value;
    }

    // ATUALIZAR: Inseri isso aqui no dia 06 de fevereiro de 2023 para teste
    const listarEscalasPorStatus = () => {
        xfetch('/hpm/escala/' + objeto.idStatus + '/opcoes', {}, HttpVerbo.GET)
            .then(res => res.json())
            .then(lista => setLista({...lista, escalas: lista.resultado}))
    }
    // ATUALIZAR: Até aqui

    const enviar = (e) => {
        if (verificador.mesInicio === verificador.mesEscala && 
            verificador.mesTermino === verificador.mesEscala &&
            verificador.ano === verificador.anoEscala) {
            xfetch('/hpm/escala/cadastrar', objeto, HttpVerbo.POST)
                .then( json =>{
                        if (typeof json !== "undefined" ? json.status === "OK" : null) {
                            ExibirMensagem('Escala Cadastrada Com Sucesso!', MSG.SUCESSO);
                        }
                    }
                )
            // setCadastrar(!cadastrar); ATUALIZAR: Mudei isso aqui no dia 06 de fevereiro de 2023 para teste
            listarEscalasPorStatus(); // ATUALIZAR: Inseri isso aqui no dia 06 de fevereiro de 2023 para teste
        } else {
            ExibirMensagem("Mês selecionado para nome da escala não pode ser diferente do mês de início e término da escala!", MSG.ALERTA);
        }
    }

    useEffect(() => {
        xfetch('/hpm/status/' + escalaObjeto, {}, HttpVerbo.GET)
        .then(res => res.json())
        .then(status => setStatus({...status, listaStatus: status.resultado}))
    }, [])

    // ATUALIZAR: Inseri isso aqui no dia 06 de fevereiro de 2023 para teste
    const colunas = [
        {text: "Nome"},
        {text: "Data Início"},
        {text: "Data Término"},
        {text: "Situação"}
    ]

    const dados = () => {
        return (
            typeof lista.escalas !== "undefined" ? lista.escalas.map((escala) => {
                return ({
                    'nome': escala.nome,
                    'data_inicio': escala.dtInicio,
                    'data_termino': escala.dtTermino,
                    'situacao': escala.status
                })
            }) : null
        )
    }
    // ATUALIZAR: Até aqui
    
    return(
        <Pagina titulo="Cadastrar Escala">
            <div className="row">
                <div className="col-lg-12">
                    <Card titulo="Cadastrar">
                        <div className={"row"}>
                            <div className={"col-lg-6"}>
                                <Input
                                    id={"date-input"}
                                    type="Month"
                                    onChange={handleChange}
                                    name="nome"
                                    label="Nome da Escala"/>
                            </div>
                            <div className="col-lg-6">
                                <Input
                                    type="datetime-local"
                                    value={objeto.dataInicio}
                                    onChange={handleDtHrInicio}
                                    name="dataInicio"
                                    label="Data e hora início"
                                    placeholder="Data e hora"/>
                            </div>
                            <div className="col-lg-6">
                                <Input
                                    type="datetime-local"
                                    value={objeto.dataTermino}
                                    onChange={handleDtHrTermino}
                                    name="dataTermino"
                                    label="Data e hora término"
                                    placeholder="Data e hora"/>
                                </div>
                            <div className="col-lg-6">
                                <label>Tipo Escala</label>
                                <select
                                    className="form-control"
                                    name="idStatus"
                                    value={objeto.idStatus}
                                    onChange={handleStatus}>
                                    <option hidden>Selecione...</option>
                                    {status.listaStatus.map((v, k) => {
                                        return <option className="flex-fill" value={v.id} key={k}> {v.nome}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-15 text-lg-right mt-4 mb-4">
                            <BotaoSalvar onClick={enviar} />
                        </div>
                    </Card>
                    {/* ATUALIZAR: <EscalasCadastradasCard idStatus={Number(objeto.idStatus)} cadastrarEscala={cadastrar}/> -- Comentei */}
                    <Card titulo="Escalas Cadastradas">
                        <Tabela colunas={colunas} dados={dados()} pageSize={5} />
                    </Card>
                </div>
            </div>
        </Pagina>
    );
}
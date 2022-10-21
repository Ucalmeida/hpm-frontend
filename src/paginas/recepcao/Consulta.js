import React, {useState} from "react";
import {Autocompletar, Botao, Card, Pagina} from "../../componentes";
import {ExibirMensagem, xfetch} from "../../util";
import {BOTAO, HttpVerbo, ICONE, MSG} from "../../util/Constantes";


export default function Consulta() {
    const [objeto, setObjeto] = useState(
        {
            idPessoa: null,
            emergencia: localStorage.getItem("emergencia"),
            idConsultorioBloco: localStorage.getItem("medicoConsulta"),
            nmProfissionalSaude: localStorage.getItem("nmProfissionalSaude"),
            nmEspecialidade: localStorage.getItem("nmEspecialidade"),
            idEspecialidade: localStorage.getItem("idEspecialidade"),
            idProfissional: localStorage.getItem("idProfissionalSaude"),
            dataHora: localStorage.getItem("dataHora")
        }
    )

    const selecionarPessoa = (e) => {
        let idpessoa = document.getElementById('idpessoa').value;
        setObjeto({...objeto, idPessoa: idpessoa});
    }

    const enviar = () => {
        xfetch('/hpm/consulta/cadastrar', objeto, HttpVerbo.POST)
            .then(json => {
                    if (typeof json !== 'undefined' ? json.status === "OK" : false){
                        ExibirMensagem('Consulta Agendada com Sucesso!', MSG.SUCESSO, null, 'Consulta', null, null, window.location.reload());
                    }
                }
            )
    }

    return(
        <Pagina titulo="Agendar Consulta">
            <div className="row">
                <div className="col-lg-12">
                    <Card titulo="Agendar">
                        <div className="row">
                            <input type="hidden" name="idPessoa"/>
                        </div>
                        <div className={"info-box"}>
                            <div className="info-box-content">
                                <span className="info-box-text" _msthash="2400268"
                                      _msttexthash="134784">Especialidade</span>
                                <span className="info-box-number" _msthash="2400424"
                                      _msttexthash="28353">{objeto.nmEspecialidade}</span>
                            </div>
                            <div className="info-box-content">
                                <span className="info-box-text" _msthash="2400268"
                                      _msttexthash="134784">Médico</span>
                                <span className="info-box-number" _msthash="2400424"
                                      _msttexthash="28353">{objeto.nmProfissionalSaude}</span>
                            </div>
                            <div className="info-box-content">
                                <span className="info-box-text" _msthash="2400268"
                                      _msttexthash="134784">Data - Hora</span>
                                <span className="info-box-number" _msthash="2400424"
                                      _msttexthash="28353">{objeto.dataHora}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-8">
                                <Autocompletar
                                    name="pessoa"
                                    url="/hpm/pessoa/"
                                    label="Digite os Dados:"
                                    placeholder="Nome ou CPF aqui"
                                    tamanho={6}
                                    retorno={selecionarPessoa} />
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

    // const [objeto, setObjeto] = useState(
    //     {
    //         idPessoa: null,
    //         idEspecialidade: null,
    //         idProfissional: null,
    //         idConsultorioBloco: null,
    //         profissionais: [],
    //         exibePessoaPorNome : false,
    //         exibePessoaPorCpf : false,
    //         exibePesquisaPaciente: 0,
    //         consultoriosBloco: [],
    //     }
    // )

    // const [lista, setLista] = useState({
    //     consultas: []
    // })
    //
    // const selecionarEspecialidade = (e) => {
    //     objeto.idEspecialidade = e.value
    //     listarProfissionalPorEspecialidade()
    // }
    //
    // const selecionarProfissionalSaude = (e) => {
    //     e.preventDefault()
    //     objeto.idProfissional = e.target.value
    //     listarConsultorioBlocoPorEspecialidadeProfissionalSaude()
    // }
    //
    // const selecionarConsultorioBloco = (e) => {
    //     e.preventDefault()
    //     setObjeto({...objeto, idConsultorioBloco: e.target.value})
    // }
    //
    // const selecionarPessoa = (e) => {
    //     let idpessoa = document.getElementById('idpessoa').value;
    //     setObjeto({...objeto, idPessoa: idpessoa});
    // }
    //
    // const listarProfissionalPorEspecialidade = () => {
    //    setObjeto({...objeto, profissionais: []})
    //    xfetch('/hpm/profissionalSaude/' + objeto.idEspecialidade + '/opcoes',{}, HttpVerbo.GET)
    //        .then(res => res.json())
    //        .then(json => {
    //                setObjeto({...objeto, profissionais: json.resultado})
    //            }
    //        )
    // }
    //
    // const listarConsultorioBlocoPorEspecialidadeProfissionalSaude = () => {
    //     setObjeto({...objeto, consultoriosBloco: []})
    //     xfetch('/hpm/consultorioBloco/' + objeto.idEspecialidade + '/' + objeto.idProfissional + '/opcoes', {}, HttpVerbo.GET)
    //         .then(res => res.json())
    //         .then(json => {
    //             setObjeto({...objeto, consultoriosBloco: json.resultado})
    //             }
    //         )
    // }
    //
    // useEffect(() => {
    //     xfetch('/hpm/consulta/opcoes', {}, HttpVerbo.GET)
    //         .then(response => response.json())
    //         .then(lista => setLista({...lista, consultas: lista.resultado}))
    // },[])
    //
    //
    // const enviar = (e) => {
    //     xfetch('/hpm/consulta/cadastrar', objeto, HttpVerbo.POST)
    //         .then( json =>{
    //                 if(json.status === "OK"){
    //                     ExibirMensagem('Consulta Cadastrada Com Sucesso!', MSG.SUCESSO)
    //                     // window.location.reload();
    //                 }
    //             }
    //         )
    // }
    //
    // const colunas = [
    //     {text: "Data - Hora"},
    //     {text: "Piso" },
    //     {text: "Sala"},
    //     {text: "CPF do Paciente" },
    //     {text: "Paciente"},
    //     {text: "Especialidade"},
    //     {text: "Médico" },
    //
    // ]
    //
    // const dados = () => {
    //     return(
    //     lista.consultas.map((consulta) => {
    //         return({
    //                     'id': consulta.valor,
    //                     'data__hora': consulta.dtHora,
    //                     'piso': consulta.piso,
    //                     'sala': consulta.sala,
    //                     'cpf_do_paciente': consulta.cpfPaciente,
    //                     'paciente': consulta.nmPaciente,
    //                     'especialidade': consulta.nmEspecialidade,
    //                     'medico': consulta.nmMedico
    //                 })
    //             })
    //         )
    // }
    //
    //
    // let prof = objeto.profissionais
    // let consultaBloco = objeto.consultoriosBloco
    // return(
    //     <Pagina titulo="Cadastrar Consulta">
    //         <div className="row">
    //             <div className="col-lg-12">
    //                 <Card titulo="Cadastrar">
    //
    //                     <div className="row">
    //                         <div className="col-lg-4">
    //                             <label>Especialidade</label>
    //                             <Select
    //                                 funcao={selecionarEspecialidade}
    //                                 nome="idEspecialidade"
    //                                 url={"/hpm/especialidade/opcoes"}
    //                             />
    //                         </div>
    //
    //                         <div className="col-lg-4">
    //                             <label>Profissional</label>
    //                             <br/>
    //                             <select
    //                                 className="form-control"
    //                                 name="idProfissional"
    //                                 value={objeto.idProfissional}
    //                                 onChange={selecionarProfissionalSaude}>
    //                                 <option hidden>Selecione...</option>
    //                                 {prof.map((v, k) => {
    //                                     return <option className="flex-fill" value={v.valor} key={k}> {v.texto}</option>
    //                                 })}
    //                             </select>
    //                         </div>
    //
    //                         <div className="col-lg-4">
    //                             <label>Data - Hora</label>
    //                             <br/>
    //                             <select
    //                                 className="form-control"
    //                                 name="idConsultorioBloco"
    //                                 value={objeto.idConsultorioBloco}
    //                                 onChange={selecionarConsultorioBloco}>
    //                                 <option hidden>Selecione...</option>
    //                                 {consultaBloco.map((v, k) => {
    //                                     return <option className="flex-fill" value={v.valor} key={k}> {v.texto}</option>
    //                                 })}
    //                             </select>
    //                         </div>
    //                     </div>
    //
    //                     <br/>
    //                     <div className="row">
    //                         <div className="col-lg-8">
    //                             <Autocompletar
    //                                 name="pessoa"
    //                                 url="/hpm/pessoa/"
    //                                 label="Digite os Dados:"
    //                                 placeholder="Nome ou CPF aqui"
    //                                 tamanho={6}
    //                                 retorno={selecionarPessoa} />
    //                         </div>
    //
    //                         <div className="col-lg-12 text-lg-right mt-4 mb-4">
    //                             <BotaoSalvar onClick={enviar} />
    //                         </div>
    //                     </div>
    //                 </Card>
    //                 <Card titulo="Consultas cadastradas para hoje">
    //                     <Tabela colunas={colunas} dados={dados()} />
    //                 </Card>
    //             </div>
    //         </div>
    //     </Pagina>
    //     )
}
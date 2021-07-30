import React, {useState} from "react";
import {
    BotaoSalvar,
    Card,
    Pagina,
    Select,
    Autocompletar
} from "../../componentes";
import {ExibirMensagem, xfetch} from "../../util";
import {HttpVerbo, MSG} from "../../util/Constantes";


export default function Consulta() {
    const [objeto, setObjeto] = useState(
        {
            idPessoa: null,
            idEspecialidade: null,
            idProfissional: null,
            idConsultorioBloco: null,
            profissionais: [],
            exibePessoaPorNome : false,
            exibePessoaPorCpf : false,
            exibePesquisaPaciente: 0,
            consultoriosBloco: []

        }
    )

    let selecionarEspecialidade = (e) => {
        objeto.idEspecialidade = e.value
        listarProfissionalPorEspecialidade()
    }

    let selecionarProfissionalSaude = (e) => {
        e.preventDefault()
        objeto.idProfissional = e.target.value
        listarConsultorioBlocoPorProfissionalSaude()
    }

    let selecionarConsultorioBloco = (e) => {
        e.preventDefault()
        objeto.idConsultorioBloco = e.target.value
    }

   function selecionarPessoaNome(idPessoa) {
       objeto.idPessoa = idPessoa
    }

    let selecionarPaciente = (e) => {
        setObjeto({...objeto, exibePesquisaPaciente: e.target.value})
    }

    let listarProfissionalPorEspecialidade = () => {
        setObjeto({...objeto, profissionais: []})
        xfetch('/hpm/profissionalSaude/' + objeto.idEspecialidade + '/opcoes',{}, HttpVerbo.GET)
            .then(res => res.json())
            .then(json => {
                    setObjeto({...objeto, profissionais: json.resultado})
                }
            )
    }

    let listarConsultorioBlocoPorProfissionalSaude = () => {
        console.log(objeto.idProfissional)
        setObjeto({...objeto, consultoriosBloco: []})
        xfetch('/hpm/consultorioBloco/' + objeto.idProfissional + '/opcoes', {}, HttpVerbo.GET)
            .then(res => res.json())
            .then(json => {
                setObjeto({...objeto, consultoriosBloco: json.resultado})
                }
            )
    }

    let enviar = (e) => {
        xfetch('/hpm/consulta/cadastrar', objeto, HttpVerbo.POST)
            .then( json =>{
                    if(json.status === "OK"){
                        ExibirMensagem('Consultorio Bloco Cadastrado Com Sucesso!', MSG.SUCESSO)
                    }else{
                        ExibirMensagem(json.message, MSG.ERRO)
                    }
                }
            )
    }

    let opcaoNome = objeto.exibePesquisaPaciente == 1 ?
        <div className="col-lg-6">
            <label>Nome do Paciente</label>
            <Autocompletar id="nome" name="idPessoa" url="/hpm/pessoa/porNome" retorno={selecionarPessoaNome}/>
        </div>
        :
        ''
    let opcaoCpf = objeto.exibePesquisaPaciente == 2 ?
        <div className="col-lg-6">
            <label>CPF do Paciente</label>
            <Autocompletar id="cpf" name="idPessoa" url="/hpm/pessoa/porCpf" retorno={selecionarPessoaNome}/>
        </div>
        :
        ''

    let prof = objeto.profissionais
    let consultaBloco = objeto.consultoriosBloco
    return(
        <Pagina titulo="Cadastrar Consulta">
            <div className="row">
                <div className="col-lg-12">
                    <Card titulo="Cadastrar">

                        <div className="row">
                            <div className="col-lg-4">
                                <label>Especialidade</label>
                                <Select
                                    funcao={selecionarEspecialidade}
                                    nome="idEspecialidade"
                                    url={"/hpm/especialidade/opcoes"}
                                />
                            </div>

                            <div className="col-lg-4">
                                <label>Profissional</label>
                                <br/>
                                <select
                                    className="form-control"
                                    name="idProfissional"
                                    value={objeto.idProfissional}
                                    onChange={selecionarProfissionalSaude}>
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
                                    {consultaBloco.map((v, k) => {
                                        return <option className="flex-fill" value={v.valor} key={k}> {v.texto}</option>
                                    })}
                                </select>
                            </div>
                        </div>

                        <br/>
                        <div className="row">
                            <div className="col-lg-3">
                                <label>Selecionar Paciente</label>
                                <br/>
                                <select
                                    className = "form-control"
                                    onChange= {selecionarPaciente}>
                                    <option value="0" selected>Selecione</option>
                                    <option value="1">Por Nome</option>
                                    <option value="2">Por CPF</option>
                                </select>
                            </div>
                            <div className="col-lg-6">
                                {opcaoNome}
                                {opcaoCpf}
                            </div>
                        </div>
                        <br/>

                        <div className="col-lg-15 text-lg-right mt-4 mb-4">
                            <BotaoSalvar onClick={enviar} />
                        </div>
                    </Card>
                </div>
            </div>
        </Pagina>
        )
}
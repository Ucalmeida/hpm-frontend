import React, {useState} from "react";
import {BotaoSalvar, Card, Input, Pagina, Select} from "../../componentes";
import {ExibirMensagem, xfetch} from "../../util";
import {HttpVerbo, MSG} from "../../util/Constantes";

export default function ConsultorioBloco(){
    const [objeto, setObjeto] = useState(
        {
            dataInicio : null,
            dataTermino: null,
            idEspecialidade: null,
            idProfissionalSaude: null,
            idSala: null,
            qtdConsultas: null,
            qtdEmergencias: null,
            profissionais: []
        }
    )
    let handleDtHrInicio = (e) => {
        setObjeto({...objeto, dataInicio: e.target.value});
    }

    let handleDtHrTermino = (e) => {
       setObjeto({...objeto, dataTermino: e.target.value});
    }

    let handleQtdConsulta = (e) => {
        e.preventDefault()
       setObjeto({...objeto, qtdConsultas: e.target.value})
    }

    let handleQtdEmergencia = (e) => {
        e.preventDefault()
        setObjeto({...objeto, qtdEmergencias: e.target.value})
    }

    let selecionarEspecialidade = (e) => {
        objeto.idEspecialidade = e.value
        listarProfissionalPorEspecialidade()
    }

    let selecionarProfissionalSaude = (e) => {
        objeto.idProfissionalSaude = e.value


    }

    let selecionarSala = (e) => {
        objeto.idSala = e.value
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

    let enviar = (e) => {

        xfetch('/hpm/consultorioBloco/cadastrar', objeto, HttpVerbo.POST)
            .then( json =>{
                    if(json.status === "OK"){
                        ExibirMensagem('Consultorio Bloco Cadastrado Com Sucesso!', MSG.SUCESSO)
                    }else{
                        ExibirMensagem(json.message, MSG.ERRO)
                    }
                }
            )

    }

 let selectEspeciaista =  objeto.idEspecialidade ?   <div className="col-lg-6">
     <label>Profissional</label>
     <Select
         funcao={selecionarProfissionalSaude}
         nome="idProfissionalSaude"
         url={"/hpm/profissionalSaude/"+ objeto.idEspecialidade+"/opcoes"} />
 </div> : ''

    return(
        <Pagina titulo="Cadastrar ConsultorioBloco">
            <div className="row">
                <div className="col-lg-12">
                    <Card titulo="Cadastrar">
                        <div className="row">
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
                                    label="Quantidade de Emergencias"
                                    placeholder="Qtd emergencias"/>
                            </div>
                            <div className="col-lg-6">
                                <label>Especialidade</label>
                                <Select
                                    funcao={selecionarEspecialidade}
                                    nome="idEspecialidade"
                                    url={"/hpm/especialidade/opcoes"} />
                            </div>
                            {selectEspeciaista}
                            <div className="col-lg-6">
                                <label>Prédio - Piso - Sala</label>
                                <Select
                                    funcao={selecionarSala}
                                    nome="idSala"
                                    url={"/hpm/sala/opcoes"} />
                            </div>
                        </div>
                        <div className="col-lg-15 text-lg-right mt-4 mb-4">
                            <BotaoSalvar onClick={enviar} />
                        </div>
                    </Card>
                </div>
            </div>
        </Pagina>
    )
}
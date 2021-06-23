import React, {useEffect, useState} from "react";
import {BotaoSalvar, Card, Input, Pagina, Spinner} from "../../componentes";
import {ExibirMensagem, xfetch} from "../../util";
import {HttpVerbo, MSG} from "../../util/Constantes";

export default function Medicamento() {
    const [objeto, setObjeto] = useState(
        {
            nome: "",
            descricao: "",
            medicamentos: [],
            carregandoMedicamentos: false,
            carregandoCadastrar: false
        }
    )

    let handleChange = (e) => {
        e.preventDefault()
        setObjeto({...objeto, nome: e.target.value})
    }

    let handleChange1 = (e) => {
        e.preventDefault()
        setObjeto({...objeto, descricao: e.target.value})
        console.log(objeto.descricao)
    }

    const listarMedicamentos = () => {
        setObjeto({...objeto,medicamentos: [], carregandoMedicamentos: true})
        xfetch('/hpm/medicamento', {}, HttpVerbo.GET)
            .then(res => res.json())
            .then(json => {
                setObjeto({...objeto, medicamentos: json.resultado, carregandoMedicamentos: false})
            })
    }

    useEffect(() =>{
        listarMedicamentos();
    }, [])

    const enviar = (e) => {
        e.preventDefault()
        setObjeto({...objeto, carregandoCadastrar: true})
        xfetch('/hpm/medicamento/cadastrar', objeto, HttpVerbo.POST)
            .then(json => {
                    if(json.status === "OK"){
                        ExibirMensagem('Medicamento Cadastrado Com Sucesso!', MSG.SUCESSO)
                        setObjeto({ nome: '', descricao: '', medicamentos: []})
                        listarMedicamentos()
                    }else{
                        ExibirMensagem(json.message, MSG.ERRO)
                    }
                    setObjeto({...objeto, carregandoCadastrar: false})
                }
            )
    }

    let spinner = objeto.carregandoMedicamentos ? <Spinner/> : ''
    let spinnerCadastrar = objeto.carregandoCadastrar ? <Spinner/> : ''
    let medicamentos = objeto.medicamentos;
    return(

        <Pagina titulo="Cadastrar Medicamento">

            <div className="row animated--fade-in">

                <div className="col-lg-6">
                    <Card titulo="Cadastrar">

                        <div className="col-lg-12">
                            {spinnerCadastrar}
                        </div>

                        <div className="row">

                            <div className="col-lg-6">
                                <Input
                                    type="text"
                                    label="Medicamento"
                                    value={objeto.nome}
                                    onChange = {handleChange}
                                    name="nome"
                                    placeholder="Medicamento"/>
                            </div>

                            <div className="col-lg-6">
                                <label>Descrição</label>
                                <textarea
                                    className={"form-control"}
                                    rows={"2"}
                                    value={objeto.descricao}
                                    onChange={handleChange1}
                                    name="descricao"
                                    placeholder= "Descrição"
                                />
                            </div>

                        </div>

                        <div className="align-items-end col-12">
                            <BotaoSalvar onClick={enviar} />
                        </div>

                    </Card>
                </div>

                <div className="col-lg-6">
                    <Card titulo="Medicamentos cadastrados">
                        {spinner}
                        <ul className={"list-unstyled"} style={{columns: 3}}>
                            {medicamentos.map((v, k) => {
                                return <li className="flex-fill" key={k}> {v.nome}</li>
                            })}
                        </ul>
                    </Card>
                </div>

            </div>
        </Pagina>
    )
}

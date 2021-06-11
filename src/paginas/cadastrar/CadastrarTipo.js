import React, {useState} from "react";
import {BotaoSalvar, Card, Input, Pagina, Select, Spinner} from "../../componentes";
import {ExibirMensagem, xfetch} from "../../util";
import {HttpVerbo, MSG} from "../../util/Constantes";

function CadastrarTipo(){
    const [objeto, setObjeto] = useState(
        {
            nome: "",
            idObjeto:null,
            tipos: [],
            carregandoTipos: false,
            carregandoCadastrar: false
        }
    )

   let selecionarObjeto = (e) => {
       objeto.idObjeto = e.value
       listarTiposPorObjeto();
   }

   let handleChange = (e) => {
        e.preventDefault()
       setObjeto({...objeto, nome: e.target.value})
   }

  const listarTiposPorObjeto = () => {
        setObjeto({...objeto, carregandoTipos: true, tipos: []})
        xfetch('/hpm/tipo/' + objeto.idObjeto,{}, HttpVerbo.GET)
            .then(res => res.json())
            .then(json => {
                    setObjeto({...objeto, tipos: json.resultado, carregandoTipos: false})
            }
        )
   }

   const enviar = (e) => {
        e.preventDefault()
       setObjeto({...objeto, carregandoCadastrar: true})
        xfetch('/hpm/tipo/cadastrar', objeto, HttpVerbo.POST)
           .then(json => {
               if(json.status === "OK"){
                   ExibirMensagem('Tipo Cadastrado Com Sucesso!', MSG.SUCESSO)
                   setObjeto({ idObjeto: '', tipos: []})
                   listarTiposPorObjeto()
               }else{
                   ExibirMensagem(json.message, MSG.ERRO)
               }
               setObjeto({...objeto, carregandoCadastrar: false})
           }
        )
   }

    let spinner = objeto.carregandoTipos ? <Spinner/> : ''
    let spinnerCadastrar = objeto.carregandoCadastrar ? <Spinner/> : ''
    let tipos = objeto.tipos

    return(
        <Pagina titulo="Cadastrar Tipo">
            <div className="row animated--fade-in">
                <div className="col-lg-6">
                    <Card titulo="Cadastrar">
                        <div className="col-lg-12">
                            {spinnerCadastrar}
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <label>Objeto</label>
                                <Select
                                    funcao={selecionarObjeto}
                                    nome="idObjeto"
                                    url={"/hpm/objeto/opcoes"} />
                            </div>
                            <div className="col-lg-6">

                                <Input
                                    type="text"
                                    label="Tipo"
                                    value={objeto.nome}
                                    onChange = {handleChange}
                                    name="nome"
                                    placeholder="Tipo"/>
                            </div>
                        </div>
                        <div className="align-items-end col-12">
                            <BotaoSalvar onClick={enviar} />
                        </div>

                    </Card>
                </div>
                <div className="col-lg-6">
                    <Card titulo="Tipos No Objeto Selecionado">
                        {spinner}
                        <ul className={"list-unstyled"} style={{columns: 3}}>
                            {tipos.map((v, k) => {
                                return <li className="flex-fill" key={k}> {v.nome}</li>
                            })}
                        </ul>
                    </Card>
                </div>
            </div>
        </Pagina>
    );
}
export {CadastrarTipo};
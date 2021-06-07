import React, {useState} from "react";
import {BotaoSalvar, Card, Input, Pagina, Select} from "../../componentes";
import {ExibirMensagem, xfetch} from "../../util";
import {HttpVerbo, MSG} from "../../util/Constantes";



function CadastrarTipo(){
    const [objeto, setObjeto] = useState(
        {
            nome: "",
            idObjeto:null,
            tipos: []
        }
    )

   let handleChange = (e) => {
       e.preventDefault();
        setObjeto({...objeto,[e.target.name]:e.target.value});
   }


  const listarTipos = () => {
        xfetch('/hpm/tipo/opcoes',{}, HttpVerbo.GET)
            .then(res => res.json())
            .then(json => {
                    setObjeto({'tipos': json.resultado})
            }
        )
   }

    const enviar = (e) => {
        e.preventDefault()
       xfetch('/hpm/tipo/cadastrar', objeto, HttpVerbo.POST)
           .then(json => {
               if(json.status === "OK"){
                   ExibirMensagem('Tipo Cadastrado Com Sucesso!', MSG.SUCESSO)
                   setObjeto({idObjeto: ''})
                   setObjeto({nome: ''})
               }else{
                   ExibirMensagem(json.message, MSG.ERRO)
                   setObjeto({idObjeto: ''})
                   setObjeto({nome: ''})
               }
           }
       )
   }

   let tipos = objeto.tipos
    return(

        <Pagina>

            <div className="row animated--fade-in">
                <div className="col-lg-6">
                    <Card>

                        <div className="col-lg-6">
                            <label>Objeto</label>
                            <Select
                                funcao={handleChange}
                                valorAttr={objeto.idObjeto}
                                nome={"idObjeto"}
                                url={"/hpm/objeto/opcoes"} />
                        </div>

                        <div className="col-lg-6">
                            <Input
                                type="text"
                                value={objeto.nome}
                                onChange = {handleChange}
                                name="nome"
                                label="Tipo"
                                placeholder="Tipo"/>
                        </div>

                        <div className="align-items-end col-12">
                            <BotaoSalvar onClick={enviar} />
                        </div>

                    </Card>
                </div>
                <div className="col-lg-6">
                    <Card titulo="Tipos No Objeto Selecionado">
                        <ul className={"list-unstyled"} style={{columns: 3}}>
                            {
                                tipos.map((v,k) => {
                                    return <li className="flex-fill" key={k}> {v.nome}</li>
                                })
                            }
                        </ul>
                    </Card>
                </div>
            </div>
        </Pagina>
    );
}

export {CadastrarTipo};
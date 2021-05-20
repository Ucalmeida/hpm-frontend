import React, {useState} from "react";
import {BotaoSalvar, Card, Input, Pagina, Select} from "../../componentes";
import {ExibirMensagem, xfetch} from "../../util";
import {HttpVerbo, MSG} from "../../util/Constantes";

function CadastrarTipo(){
    const [objeto, setObjeto] = useState(
        {
            nome: "",
            idObjeto:null,
            objetos: []
        }
    )



   let handleChange = (e) => {
       e.preventDefault();
        setObjeto({'nome': e.target.value});
   }

  const carregarObjetos = () => {
        xfetch('/hpm/objeto/opcoes',{}, HttpVerbo.GET)
            .then(res => res.json())
            .then(json => {
                    setObjeto({'objetos': json.resultado})
            }
        )
   }
   const enviar = (e) => {
        e.preventDefault()

       xfetch('/hpm/objeto/cadastrar', objeto, HttpVerbo.POST)
           .then(json => {
               if(json.status === "OK"){
                   ExibirMensagem('Tipo Cadastrado', MSG.SUCESSO)
                   window.location.reload();
               }
               if(json.status === 500){
                   ExibirMensagem("Ocorreu um Erro", MSG.ERRO)
               }
           }
       )
   }
    return(
        <Pagina>
            <div className="row animated--fade-in">
                <div className="col-lg-6">
                    <Card>
                        <div className="col-lg-6">
                            <Input
                                type="text"
                                value={objeto.nome}
                                onChange = {handleChange}
                                name="nome"
                                label="Tipo"
                                placeholder="Tipo"/>
                        </div>

                        <div className="col-lg-6">
                            <label>Objeto</label>
                            <Select
                                funcao={handleChange}
                                valorAttr={objeto.idObjeto}
                                nome={"idObjeto"}
                                url={"/hpm/objeto/opcoes"} />
                        </div>

                        <div className="align-items-end col-12">
                            <BotaoSalvar onClick={enviar} />
                        </div>

                    </Card>
                </div>
                <div className="col-lg-6">
                    <Card titulo="Tipos Cadastrados Por Objeto">

                    </Card>
                </div>
            </div>
        </Pagina>
    );
}

export {CadastrarTipo};
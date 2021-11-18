import { useState } from "react";
import { BotaoSalvar, Card, Input, Pagina, Select } from "../../componentes";
import { ExibirMensagem, xfetch } from "../../util";
import { HttpVerbo, MSG } from "../../util/Constantes";

export default function CadastrarEscala() {
    const [objeto, setObjeto] = useState({});

    const handleDtHrInicio = (e) => {
        setObjeto({...objeto, dataInicio: e.target.value});
    }

    const handleDtHrTermino = (e) => {
       setObjeto({...objeto, dataTermino: e.target.value});
    }
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setObjeto({...objeto, [name]: value});
    }

    const handleStatus = (e) => {
        const idStatus = e.value;
        setObjeto({...objeto, idStatus : idStatus});
    }

    let enviar = (e) => {
        xfetch('/hpm/escala/cadastrar', objeto, HttpVerbo.POST)
            .then( json =>{
                    if(json.status === "OK"){
                        ExibirMensagem('Escala Cadastrada Com Sucesso!', MSG.SUCESSO)
                    }else{
                        ExibirMensagem(json.message, MSG.ERRO)
                    }
                }
            )
    }
    
    return(
        <Pagina titulo="Cadastrar Escala">
            <div className="row">
                <div className="col-lg-12">
                    <Card titulo="Cadastrar">
                        <div className="col-lg-6">
                            <Input
                                type="text"
                                value={objeto.nome}
                                onChange={handleChange}
                                name="nome"
                                label="Nome"
                                placeholder="Nome" required/>
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
                        <div className="col-lg-2">
                            <label>Tipo Escala</label>
                            <Select
                                placeholder={"Status"}
                                funcao={handleStatus}
                                nome={"idStatus"}
                                url={"/hpm/status/" + 31}/>
                        </div>
                        <div className="col-lg-15 text-lg-right mt-4 mb-4">
                            <BotaoSalvar onClick={enviar} />
                        </div>
                    </Card>
                </div>
            </div>
        </Pagina>
    );
}
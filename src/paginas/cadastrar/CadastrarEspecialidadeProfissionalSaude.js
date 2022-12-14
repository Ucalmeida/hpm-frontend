import React, {useEffect, useState} from "react";
import {Autocompletar} from "../../componentes/form";
import {Card, Pagina, Tabela} from "../../componentes";
import {xfetch} from "../../util";
import {HttpVerbo} from "../../util/Constantes";

export default function CadastrarEspecialidadeProfissionalSaude() {
    const [objeto, setObjeto] = useState({});

    const [lista, setLista] = useState({
        especialidades: []
    });

    const [psf, setPsf] = useState({
        especialidades: [],
        nmRegistroConselho: null,
        nmCoren: null,
        nmCrefito: null,
        nmConter: null
    });

    let idpessoa = "";

    const handleEspecialidade = (e) => {
        const especialidades = e.map((item) => { return item.value });
        setPsf({...psf, especialidades : especialidades});
    }

    useEffect( () => {
        setObjeto({...objeto, profissionalSaudeCmd : {
                especialidades : psf.especialidades,
                nmRegistroConselho : psf.nmRegistroConselho,
                nmCoren: psf.nmCoren,
                nmCrefito: psf.nmCrefito,
                nmConter: psf.nmConter
            }});
    }, [psf]);

    const handleSelecionarPessoa = (e) => {
        idpessoa = document.getElementById('idpessoa').value;
        localStorage.setItem("idPessoa", idpessoa);
        setObjeto({...objeto, idPessoa: idpessoa});
    }

    // useEffect(() => {
    //     if(typeof(objeto.idEspecialidade) !== undefined) {
    //         listarEspecialidadePorProfissional();
    //     }
    //     console.log("UseEffect", objeto)
    // }, [objeto])
    //
    // const listarEspecialidadePorProfissional = () => {
    //     console.log("Objeto", objeto);
    //     xfetch('/hpm/profissionalSaude/' + objeto.idPessoa + '/opcoes', {objeto}, HttpVerbo.GET)
    //         .then(res => res.json())
    //         .then(lista => {
    //             setLista({...lista, especialidades: lista.resultado})
    //         })
    // }

    const colunas = [
        {text: "Especialidade"}
    ]

    const dados = () => {
        if(typeof(lista.especialidades) !== "undefined") {
            return(
                lista.especialidades.map((especialidade, indice) => {
                    return({
                        'especialidade': especialidade.texto
                    })
                })
            )
        }
    }

    return(
        <Pagina titulo="Cadastrar Especialidade Profissional de Saúde">
            <div className={"row"}>
                <div className="col-lg-12">
                    <Card titulo="Cadastrar">
                        <Autocompletar
                            name="pessoa"
                            url="/hpm/pessoa/"
                            label="Digite os Dados:"
                            placeholder="Nome ou CPF aqui"
                            tamanho={6}
                            onSelect={handleSelecionarPessoa} />
                    </Card>
                    <Card titulo="Lista de especialidades por profissional de saúde">
                        <Tabela colunas={colunas} dados={dados()} />
                    </Card>
                </div>
            </div>
        </Pagina>
    );
}
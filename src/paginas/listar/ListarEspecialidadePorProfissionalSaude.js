import { useState } from "react";
import { Card, Pagina, Select, Tabela } from "../../componentes";
import { xfetch } from "../../util";
import { HttpVerbo } from "../../util/Constantes";

export default function ListarEspecialidadePorProfissionalSaude() {

    const objeto = {};
    
    const [lista, setLista] = useState({
        especialidades: []
    });

    const handleProfissionalSaude = (e) => {
        objeto.idProfissionalSaude = e.value;
        listarEspecialidadePorProfissionalSaude();
    }

    const listarEspecialidadePorProfissionalSaude = () => {
        xfetch('/hpm/especialidade/' + objeto.idProfissionalSaude + '/opcoes', {objeto}, HttpVerbo.GET)
            .then(res => res.json())
            .then(lista => {
                setLista({...lista, especialidades: lista.resultado})
            })
    }

    const colunas = [
        {text: "Nome"}
    ]

    const dados = () => {
        if(typeof(lista.especialidades) !== "undefined") {
            return(
                lista.especialidades.map((especialidade, indice) => {
                    return({
                        'nome': especialidade.texto
                    })
                })
            )
        }
    }

    return(
        <Pagina titulo="Listar Especialidades">
            <Card titulo="Listar">
                <div className={"row"}>
                    <div className={"col-lg-12"}>
                        <label>Selecionar Profissional de Saúde</label>
                        <Select
                            url={"/hpm/profissionalSaude/opcoes"}
                            nome={"idProfissionalSaude"}
                            funcao={handleProfissionalSaude}
                        />
                    </div>
                </div>
            </Card>
            <Card titulo="Lista de especialidades por profissional de saúde">
                <Tabela colunas={colunas} dados={dados()} pageSize={5} />
            </Card>
        </Pagina>
    );
}
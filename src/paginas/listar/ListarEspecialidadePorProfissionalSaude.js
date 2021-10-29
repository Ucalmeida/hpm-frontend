import { useEffect, useState } from "react";
import { Card, Pagina, Select, Tabela } from "../../componentes";
import { xfetch } from "../../util";
import { HttpVerbo } from "../../util/Constantes";

export default function ListarEspecialidadePorProfissionalSaude() {

    const [objeto, setObjeto] = useState({
        profissionais: []
    });
    
    const [lista, setLista] = useState({
        especialidades: []
    });

    const handleProfissionalSaude = (e) => {
        const idProfissionalSaude = e.value;
        setObjeto({...objeto, idProfissionalSaude: idProfissionalSaude});
    }

    useEffect(() => {
        if(typeof(objeto.idProfissionalSaude) !== undefined) {
            listarEspecialidadePorProfissionalSaude();
        }
    }, [objeto])

    const listarEspecialidadePorProfissionalSaude = () => {
        console.log("Objeto", objeto);
        xfetch('/hpm/especialidade/' + objeto.idProfissionalSaude + '/opcoes', {objeto}, HttpVerbo.GET)
            .then(res => res.json())
            .then(lista => {
                setLista({...lista, especialidades: lista.resultado})
                console.log("Lista", lista);
            })
    }

    const colunas = [
        {text: "ID"},
        {text: "Nome"}
    ]

    const dados = () => {
        if(typeof(lista.especialidades) !== "undefined") {
            return(
                lista.especialidades.map((especialidade, indice) => {
                    return({
                        'id': especialidade.valor,
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
                        <label>Selecionar Especialidade</label>
                        <Select
                            url={"/hpm/profissionalSaude/opcoes"}
                            nome={"idProfissionalSaude"}
                            funcao={handleProfissionalSaude}
                        />
                    </div>
                </div>
            </Card>
            <Card titulo="Lista de especialidades por médico">
                <Tabela colunas={colunas} dados={dados()}></Tabela>
            </Card>
        </Pagina>
    );
}
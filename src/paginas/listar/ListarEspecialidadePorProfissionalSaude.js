import { useState } from "react";
import { Card, Pagina, Tabela } from "../../componentes";

export default function ListarEspecialidadePorProfissionalSaude() {

    
    const [lista, setLista] = useState({
        medicos: []
    });

    const colunas = [
        {text: "ID"},
        {text: "Nome"}
    ]

    const dados = () => {
        if(typeof(lista.medicos) !== "undefined") {
            return(
                lista.medicos.map((medico, indice) => {
                    return({
                        'id': medico.valor,
                        'nome': medico.texto
                    })
                })
            )
        }
    }

    return(
        <Pagina titulo="Listar Especialidades">
            <Card titulo="Listar"></Card>
            <Card titulo="Lista de especialidades por médico">
                <Tabela colunas={colunas} dados={dados()}></Tabela>
            </Card>
        </Pagina>
    );
}
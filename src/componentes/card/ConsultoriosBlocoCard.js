import React, {useEffect, useState} from "react";
import {Card, Tabela} from "../index";
import {xfetch} from "../../util";
import {HttpVerbo} from "../../util/Constantes";
import PropTypes from "prop-types";

export default function ConsultoriosBlocoCard(props) {
    const [lista, setLista] = useState({
        blocos: [
            {
                id: "",
                nmEscala: "",
                nmEspecialidade: "",
                nmPiso: "",
                dtInicio: "",
                dtTermino: "",
                qtConsultas: "",
                qtEmergencias: "",
            }
        ]
    })

    useEffect(() => {
        if (props.idEspecialidade !== null) {
            xfetch('/hpm/consultorioBloco/' + props.idEspecialidade + '/opcoes', {}, HttpVerbo.GET)
                .then(response => response.json())
                .then(lista => setLista({...lista, blocos: lista.resultado}))
        }
    }, [props.idEspecialidade])

    const colunas = [
        {text: "Escala"},
        {text: "Especialidade"},
        {text: "Sala"},
        {text: "Data Início"},
        {text: "Data Término"},
        {text: "Consultas"},
        {text: "Emergências"}
    ]

    const dados = () => {
        return(
            lista.blocos.map((bloco) => {
                console.log("Bloco:", bloco);
                return({
                    'escala': bloco.texto8,
                    'especialidade': bloco.texto2,
                    'sala': bloco.texto7,
                    'data_inicio': bloco.texto3,
                    'data_termino': bloco.texto4,
                    'consultas': bloco.texto5,
                    'emergencias': bloco.texto6,
                })
            })
        )
    }

    return(
        <Card titulo="Consultas Agendadas">
            <Tabela colunas={colunas} dados={dados()} />
        </Card>
    );
}

ConsultoriosBlocoCard.propTypes = {
    idEspecialidade: PropTypes.number,
    apagarBloco: PropTypes.bool
}
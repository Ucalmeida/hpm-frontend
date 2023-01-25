import React, {useEffect, useState} from "react";
import {Card, Tabela} from "../index";
import {xfetch} from "../../util";
import {HttpVerbo} from "../../util/Constantes";
import PropTypes from "prop-types";

export default function EscalasCadastradasCard(props) {
    const [lista, setLista] = useState({
        escalas: [
            {
                id: "",
                nmEscala: "",
                dtInicio: "",
                dtTermino: "",
                situacao: "",
            }
        ]
    })

    const listarEscalasPorStatus = () => {
        xfetch('/hpm/escala/' + props.idStatus + '/opcoes', {}, HttpVerbo.GET)
            .then(res => res.json())
            .then(lista => setLista({...lista, escalas: lista.resultado}))
    }

    useEffect(() => {
        listarEscalasPorStatus();
    }, [props.cadastrarEscala])

    useEffect(() => {
        listarEscalasPorStatus();
    }, [props.cadastrarEscala])

    const colunas = [
        {text: "Nome"},
        {text: "Data Início"},
        {text: "Data Término"},
        {text: "Situação"}
    ]

    const dados = () => {
        return (
            typeof lista.escalas !== "undefined" ? lista.escalas.map((escala) => {
                return ({
                    'nome': escala.nome,
                    'data_inicio': escala.dtInicio,
                    'data_termino': escala.dtTermino,
                    'situacao': escala.status
                })
            }) : null
        )
    }

    return (
        <Card titulo="Escalas Cadastradas">
            <Tabela colunas={colunas} dados={dados()}/>
        </Card>
    );
}

EscalasCadastradasCard.propTypes = {
    idStatus: PropTypes.number,
    cadastrarEscala: PropTypes.bool
}
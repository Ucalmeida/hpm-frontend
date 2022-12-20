import React, {useEffect, useState} from "react";
import {Botao, Card, Tabela} from "../index";
import {ExibirMensagem, xfetch} from "../../util";
import {BOTAO, HttpVerbo, MSG} from "../../util/Constantes";
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
    const handleBtnExcluir = (blocoId) => {
        xfetch('/hpm/consultorioBloco/excluir/' + blocoId, {}, HttpVerbo.PUT)
            .then( json => {
                    if (typeof json !== "undefined" ? json.status === "OK" : false) {
                        ExibirMensagem("Bloco Excluído!", MSG.SUCESSO, '', '', '', '', handleChange());
                    }
                }
            )
    }

    const handleChange = async () => {
        if (props.idEspecialidade !== null) {
            await xfetch('/hpm/consultorioBloco/' + props.idEspecialidade + '/opcoes', {}, HttpVerbo.GET)
                .then(response => response.json())
                .then(lista => setLista({...lista, blocos: lista.resultado}))
        }
    }

    useEffect(() => {
        handleChange().then();
    }, [props.apagarBloco]);

    const colunas = [
        {text: "Escala"},
        {text: "Especialidade"},
        {text: "Sala"},
        {text: "Data Início"},
        {text: "Data Término"},
        {text: "Consultas"},
        {text: "Emergências"},
        {text: "Ação"}
    ]

    const dados = () => {
        return (
            lista.blocos.map((bloco) => {
                return ({
                    'escala': bloco.texto8,
                    'especialidade': bloco.texto2,
                    'sala': bloco.texto7,
                    'data_inicio': bloco.texto3,
                    'data_termino': bloco.texto4,
                    'consultas': bloco.texto5,
                    'emergencias': bloco.texto6,
                    'acao': <div>
                        <Botao cor={BOTAO.COR.PERIGO} onClick={() => handleBtnExcluir(bloco.valor)} value={bloco.valor} icone={""}>Excluir</Botao>
                        {/*<BotaoExcluir onClick={() => UseHandleExcluir("/hpm/consultorioBloco/excluir/" + bloco.valor, {}, "Bloco Excluído!", handleChange())} />*/}
                    </div>
                })
            })
        )
    }

    return (
        <Card titulo="Consultórios Cadastrados">
            <Tabela colunas={colunas} dados={dados()}/>
        </Card>
    );
}

ConsultoriosBlocoCard.propTypes = {
    idEspecialidade: PropTypes.number,
    apagarBloco: PropTypes.bool
}
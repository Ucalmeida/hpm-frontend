import {BotaoImprimir, Card, Pagina} from "../../componentes";
import React, {Fragment, useRef} from "react";
import logoHPM from "../../img/brasoes/brasao_hpm.png";
import {Link} from "react-router-dom";
import ReactToPrint, {useReactToPrint} from "react-to-print";

const ReceitaImprimir = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const receitaTexto = {
        texto: localStorage.getItem('texto'),
    }

    return (
        <Pagina titulo="Imprimir Receita">
            <div className="row">
                <div className="col-lg-12">
                    <Card titulo="Imprimir Atestado">
                        <ReactToPrint ref={componentRef}>
                            <div>
                                <div className="login-logo">
                                    <Link to="/">
                                        <img src={logoHPM}  alt={"Brasão"}/>
                                    </Link>
                                </div>
                                <h4 style={{textAlign: 'center'}}><b>HOSPITAL DA POLÍCIA MILITAR DO ESTADO DE SERGIPE<br />
                                    SISTEMA DE AGENDAMENTO DE CONSULTA MÉDICA <br />
                                    RECEITA</b></h4><br />
                                <br/>
                                <br/>
                                <p style={{textAlign: 'justify', marginLeft: '2em', marginRight: '2em'}}>{receitaTexto.texto}</p>
                                <br/>
                                <p style={{textAlign: 'center'}}>{localStorage.getItem("nmMedico")}</p>
                                <p style={{textAlign: 'center'}}>{localStorage.getItem("nmEspecialidade")}</p>
                            </div>
                        </ReactToPrint>
                        <div align={"center"}>
                            <BotaoImprimir onClick={handlePrint} />
                        </div>
                    </Card>
                </div>
            </div>
        </Pagina>
    );
}

export default ReceitaImprimir;
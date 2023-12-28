import React, { useRef } from "react";
import { Link } from "react-router-dom";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { BotaoImprimir, Card, Pagina } from "../../componentes";
import logoHPM from "../../img/brasoes/brasao_hpm.png";

const ReceitaImprimir = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const discriminacao = {
        txt: localStorage.getItem('texto'),
        qtd: localStorage.getItem('qtd'),
        pos: localStorage.getItem('posologia')
    }
    
    let linha = [];

    let txt = discriminacao.txt.split(",");
    let qtd = discriminacao.qtd.split(",");
    let pos = discriminacao.pos.split(",");

    for(let i = 0; i < txt.length; i++) {
        let qtde = qtd[i];
        let texto = txt[i];
        let posologia = pos[i];
        let textoCompleto = Number(i + 1) + ") " + qtde + " " + texto + " de " + posologia + " em " + posologia + " horas.";
        linha.push(textoCompleto);
    }

    return (
        <Pagina titulo="Imprimir Receita">
            <div className="row">
                <div className="col-lg-12">
                    <Card titulo="Imprimir Receita">
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
                                {linha.map((txt, index) => (
                                    <div key={index}>
                                        <p style={{textAlign: 'justify', marginLeft: '2em', marginRight: '2em'}}>{txt}</p>
                                    </div>
                                ))}
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
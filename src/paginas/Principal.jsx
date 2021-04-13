import React, {useState} from "react";
import Pagina from "../componentes/pagina/Pagina";
import Accordion from "../componentes/Accordion";
import Card from "../componentes/Card";
import Botao from "../componentes/Botao";
import {Button, Tab, Tabs} from "react-bootstrap";
import {exibirMensagem} from "../util/Util";
import Bootbox from "bootbox-react";

import Autocompletar from "../componentes/Autocompletar";

function Principal () {

    // render() {
        let titulo = "Portal HPM";
        if (titulo != null) {
            titulo = titulo + " | " + titulo
        }
        document.getElementById('root').classList.remove('login-page');
        document.getElementById('root').classList.add('hold-transition','sidebar-mini','layout-fixed');
        window.document.title = titulo;



        const [showConfirm, setShowConfirm] =  useState(false);
        const [showAlert, setShowAlert] = useState(false);
        const [showPrompt, setShowPrompt] = useState(false);
        const {pessoa} = useState(false)

        const handleConfirm = () => {
            console.log("You clicked Yes!");
            return setShowConfirm(false);
        }

        const retorno = (valor) => {
            console.log(valor)
        }

        const handleCancel = () => {
            console.log("You clicked No!");
            return setShowConfirm(false);
        }

        const handleClose = () => {
            console.log("You closed Alert!");
            return setShowAlert(false);
        }

        const handlePrompt = (result) => {
            console.log(`User input: ${result}`);
            return setShowPrompt(false);
        }

        return (

            <Pagina titulo="Bem Vindo" subTitulo="Sub Titulo">
                <div className="col-12">
                    <Autocompletar name="pessoa" url="/hpm/pessoa/porNome/" retorno={retorno}/>

                </div>

                <Accordion titulo="Teste" >
                    teste accordion
                </Accordion>
                <Card className="gradient-primary">teste
                    Tesde de Card <a href="#"><i className="fas fa-plus"> </i>Novo</a>
                </Card>
                <Card>

                <Tabs>
                    <Tab title="Aba1" eventKey="aba1">
                        adasdsasadd
                    </Tab>
                    <Tab title="Aba2" eventKey="aba2">
                        çlgkopdfg jpodfgjpdfgogj dfopgdf
                    </Tab>
                    <Tab title="Aba3" eventKey="aba3">
                        opgk podfgjiofdgf´g jdf´pgj ipdfg iosp´fj ´sps
                    </Tab>
                </Tabs>
                    <button onClick={exibirMensagem('teste','teste')}>bootstrap</button>
                    <Botao onClick={exibirMensagem('titulo','corpo da mensagem')}>Bootbox</Botao>
                    <Button onClick={() => exibirMensagem('titulo','corpo da mensagem')}>Bootbox</Button>
                </Card>




        <Botao onClick={ () => setShowAlert(true) }> Alert </Botao>
    <Bootbox show={showAlert}
    type={"alert"}
    message={"This is a simple alert"}
    onClose={handleClose}
    />

    <button onClick={ () => setShowPrompt(true) }> Prompt </button>
    <Bootbox show={showPrompt}
    type={"prompt"}
    message={"What's your name"}
    onPrompt={handlePrompt}
    />











            </Pagina>
        );
    // }
};

export default Principal;
import React, {useRef} from 'react';

import {useReactToPrint} from 'react-to-print';
import {Modal} from './Modal';
import {BotaoImprimir} from "./Botao";
import {BOTAO} from "../util/Constantes";

function ModalImpressao() {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div>
            <Modal ref={componentRef} />
            <BotaoImprimir cor={BOTAO.COR.PRIMARIO} onClick={handlePrint}>Imprima Esta Merdaaaaa!!!</BotaoImprimir>
        </div>
        // <Fragment>
        //     <ReactToPrint
        //         trigger={() => {
        //             return (
        //                 <div className="modal fade" id="myModalImpressao" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
        //                     <a href={"#"} color={'#FFFAFA'}>Imprima esta merda!</a>
        //                 </div>
        //             )
        //         }}
        //         content={() => this.componentRef}
        //     />
        //     <Modal ref={el => (this.componentRef = el)} />
        // </Fragment>
    )
}

export default ModalImpressao;
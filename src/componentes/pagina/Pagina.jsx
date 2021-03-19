import React from "react";
import MenuLateral from "./MenuLateral";
import Topo from "./Topo";
import Rodape from "./Rodape";

document.getElementById('root').classList = 'hold-transition';

const Pagina = ({conteudo}) => {
    return (
        <section>
            <Topo />
            <MenuLateral />
            <section>
                {conteudo}
            </section>
            <Rodape />
        </section>
    );
};

export default Pagina;


import React from "react";
import MenuLateral from "./MenuLateral";
import Topo from "./Topo";
import Rodape from "./Rodape";

document.getElementById('root').classList = 'hold-transition';

export default class Pagina extends React.Component {
    render() {
        return (
            <section className="anim-fade-in">
                <Topo />
                <MenuLateral />
                <section>
                    {this.props.children}
                </section>
                <Rodape />
            </section>
        )
    }

}
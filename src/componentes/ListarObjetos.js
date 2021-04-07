import React from 'react'
import {HttpVerbo, xfetch} from "../util/Util";
import Spinner from "react-bootstrap/Spinner";



export default class ListarObjetos extends React.Component {

    constructor() {
        super();
        this.state = {
            objetos: [],
            carregando: false
        }
    }

    componentDidMount() {
        this.setState({carregando: true})
        xfetch('/hpm/objeto', {}, HttpVerbo.GET)
            .then(resultado => resultado.json())
            .then(json => this.setState({objetos: json.resultado, carregando:false}))
            .catch(e => this.setState({carregando: false}))
    }

    render() {
        const {objetos, carregando} = this.state;
        let spinner = '';
        if (carregando) {
            spinner =
                <div className="fa-1x">
                    <i className="fas fa-spinner fa-spin"></i>
                </div>;
        }
        return (
            <div className="text-center">
                {spinner}
                <ul>
                    {objetos.map((v, k) => {
                        return <li key={k}>{v.nome}</li>
                    })}
                </ul>
            </div>
        );
    }
}
import React from "react";
import * as $ from "jquery"
import 'jquery-ui/themes/base/all.css'
import 'jquery-ui/ui/widgets/autocomplete'
import {xfetch} from "../../util";
import {HttpVerbo} from "../../util/Constantes";

export class Autocompletar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            carregando: false,
            valor: {},
            busca: ''
        }
    }

    handle = (e) => {
        e.preventDefault()
        this.setState({[e.target.name]: e.target.value})
    }


    componentDidMount() {
        const url = this.props.url + '/';
        let that = this
        $('#idAuto').autocomplete({
            source: function( request, response ) {
                that.setState({carregando: true})
                xfetch(url+request.term, {}, HttpVerbo.GET)
                    .then(res => res.json())
                    .then(json => response(json.resultado) & that.setState({carregando: false}))
                    .catch(e => that.setState({carregando: false}))
            },
            minLength: 2,
            select: function( event, ui ) {
                that.setState({valor: ui.item.value, busca: ui.item.label})
                that.props.retorno(ui.item.value)
                return false
            }
        });
    }

    render() {
        const {busca, valor, carregando} = this.state
        let spinner = '';
        if (carregando) {
            spinner =
                <span className="spinner-border spinner-border-sm text-success" role="status"/>

        }
        return (
            <div className="col-lg-12 form-group">
                <div className="col-lg-12">
                    <input id="idAuto"
                       autoComplete="off"
                       className="form-control"
                       type="text" name="busca" onChange={this.handle}
                       value={busca} placeholder="Digite um nome"/>
                    {spinner}
                </div>
                <div className="col-lg-1">

                </div>
                <input type="hidden" id={'id'+this.props.name} name={this.props.name} value={valor}/>
            </div>
        );
    }

}
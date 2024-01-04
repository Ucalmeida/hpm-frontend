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
        this.setState({[e.target.name]: e.target.value.toUpperCase()})
        if (!e.target.value) {
            this.props.retorno(null)
        }
    }

    componentDidMount() {
        let idAuto = 'id' + this.props.name + 'Auto';
        const url = this.props.url;
        let that = this;
        $('#' + idAuto).autocomplete({
            source: function( request, response ) {
                that.setState({carregando: true})
                let key = request.term;
                let requisicao = !isNaN(key) ? 'porCpf/' : 'porNome/';
                xfetch(url + requisicao + key, {}, HttpVerbo.GET)
                    .then(res => res.json())
                    .then(json => response(json.resultado) && that.setState({carregando: false}))
                    .catch(e => that.setState({carregando: false}))
            },
            minLength: this.props.tamanho,
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
            <>
                <div>
                    <label>{this.props.label}</label>
                    <input
                       id={'id' + this.props.name + 'Auto'}
                       autoComplete="off"
                       className="form-control"
                       type="text"
                       name="busca"
                       onChange={this.handle}
                       value={busca}
                       placeholder={this.props.placeholder}
                    />
                    {/*{spinner}*/}
                </div>
                <div className="col-lg-1">
                    <input
                        type="hidden"
                        id={'id'+this.props.name}
                        name={this.props.name}
                        value={valor}
                    />
                </div>
            </>
        );
    }

}
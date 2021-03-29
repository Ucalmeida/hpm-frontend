import React, {Component} from 'react';
import logoHPM from "../../img/brasoes/brasao_hpm.png";
import {Link} from "react-router-dom";

class PaginaSemLogin extends Component {
  render() {
    document.getElementById('root').classList.add('login-page');

    return (
      <div className="login-box animated--fade-in">
        <div className="login-box">
          <div className={"login-logo"}>
            <Link to="/">
              <img src={logoHPM} />
            </Link>
          </div>
          <div className="card card-outline card-primary">
            <div className="card-header text-center">
              <b>PORTAL</b>
              <span> HPM</span>
            </div>
            <div className="card-body login-card-body">
              <p className="login-box-msg">{this.props.titulo}</p>
              <div className="mb-3">
                {this.props.children}
              </div>
              <div className="social-auth-links text-center mt-2 mb-3">
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PaginaSemLogin;
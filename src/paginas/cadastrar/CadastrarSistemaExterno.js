import {Botao, Card, Pagina} from "../../componentes";
import {CARD, HttpVerbo} from "../../util/Constantes";
import {useEffect, useState} from "react";
import {xfetch} from "../../util";

export default function CadastrarSistemaExterno() {

  const [sistemas, setSistemas] = useState([])
  const [nome, setNome] = useState('')


  function buscarSistemas() {
    xfetch('/hpm/sistema-externo', {}, HttpVerbo.GET)
      .then(res => res.json())
      .then(dados => setSistemas(dados.resultado))
  }

  useEffect(() => {
    buscarSistemas()
  }, [])

  function toggle(id) {
    xfetch('/hpm/sistema-externo/'+id+ '/toggle', {}, HttpVerbo.POST)
      .then(res => res.json())
      .then(dados => { buscarSistemas()})
  }

  function recriarToken(id) {
    xfetch('/hpm/sistema-externo/'+id+ '/recriar-token', {}, HttpVerbo.POST)
      .then(res => res.json())
      .then(dados => { buscarSistemas()})
  }

  return (
    <Pagina titulo="Cadastrar Sistema Externo">
      <Card titulo="Novo sistema" >
        <div className="row">
          <div className="col-6">
            <div className="col-lg">
              <label>Nome do sistema</label>
              <input type='text' className="form-control"
                value={nome}
                onChange={(e) => setNome(e.target.value.toUpperCase())}/>
            </div>
          </div>
          <div className="col-2 mt-3">
            <Botao className='mt-3' cor='success'>Cadastrar</Botao>
          </div>
        </div>

      </Card>

      <hr/>

      <Card titulo="Sistemas cadastrados" cor={CARD.COR.SECUNDARIO}>
        <div className="col-12">
          <table className="text-center table table-hover table-bordered table-striped">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Situação</th>
                <th>Token</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {sistemas.map((v, k) => {
                return (
                  <tr key={k}>
                    <td>{v.nome}</td>
                    <td>
                      <div className={v.isAtivo ? 'text-success' : 'd-none'}>Ativo</div>
                      <div className={v.isAtivo ? 'd-none' : 'text-danger'}>Inativo</div>
                    </td>
                    <td>
                      <b>{v.token}</b>
                      <span title="recriar token" onClick={(e) => recriarToken(v.id)}>
                        &nbsp;<i className="text-info fa fa-code-branch"/>
                      </span>
                    </td>
                    <td>
                      <span title="desligar" onClick={(e) => toggle(v.id)} className={v.isAtivo ? '' : 'd-none'}>
                        <i className="text-danger fa fa-thumbs-down"/>
                      </span>
                      &nbsp;
                      <span title="ligar" onClick={(e) => toggle(v.id)} className={v.isAtivo ? 'd-none' : ''}>
                        <i className="text-success fa fa-thumbs-up"/>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </Card>
    </Pagina>
  );
}
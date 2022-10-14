import React, { useState } from 'react';
import { Pagina, Card, Select, Input, Autocompletar } from '../../componentes';
import { ExibirMensagem } from '../../util';
import { HttpVerbo, MSG } from '../../util/Constantes';
import { xfetch } from '../../util/Util';

export function ProfissionalSaudeEspecialidade() {
  const [objeto, setObjeto] = useState({
    profissionalSaudeNome: null,
    especialidades: []
  });

  const handleProfissional = (e) => {
    const {name, value} = e.target;
    setObjeto({...objeto, [name]: value});
  }

  const listarEspecialidades = () => {
    setObjeto({ ...objeto, especialidades: [] })
    xfetch('/hpm/especialidade/opcoes', {}, HttpVerbo.GET)
      .then(res => res.json())
      .then(json => {
        setObjeto({ ...objeto, especialidades: json.resultado })
      }
      )
  }

  const enviar = (e) => {

    xfetch('/hpm/consultorioBloco/cadastrar', objeto, HttpVerbo.POST)
      .then(json => {
        if (json.status === "OK") {
          ExibirMensagem('Consultorio Bloco Cadastrado Com Sucesso!', MSG.SUCESSO)
        } else {
          ExibirMensagem(json.message, MSG.ERRO)
        }
      }
      )
  }

  return (
    <Pagina titulo="Cadastrar ConsultorioBloco">
      <div className="row">
        <div className="col-lg-12">
          <Card titulo="Cadastrar">
            <div className="row">
              <div className="col-lg-3">
                <div className="col-lg-6">
                  <label>Profissional de Saúde</label>
                  <Autocompletar name="pessoa" url="/hpm/pessoa/porNome/" retorno={() => {}}/>
                  <Input
                    type="text"
                    onChange={handleProfissional}
                    value={objeto.profissionalSaudeNome}
                    name="profissionalSaudeNome"
                    label="Buscar Profissional de Saúde"
                    placeholder="Digite o nome"
                    url={"/hpm/profissionalSaude/porNome/" + objeto.profissionalSaudeNome} />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Pagina>
  );
}
import { useState, useEffect } from "react";
import { ExibirMensagem, xfetch } from "../../util";
import { BOTAO, HttpVerbo, MSG } from "../../util/Constantes";
import { Botao } from "../Botao";
import { Modal } from "react-bootstrap";

export const ModalAgendarNovaConsulta = (props) => {
  const [objeto, setObjeto] = useState({
    idPessoa: localStorage.getItem("idPessoa"),
    emergencia: localStorage.getItem("emergencia"),
    idConsultorioBloco: localStorage.getItem("medicoConsulta"),
    nmProfissionalSaude: localStorage.getItem("nmProfissionalSaude"),
    nmEspecialidade: localStorage.getItem("nmEspecialidade"),
    idEspecialidade: localStorage.getItem("idEspecialidade"),
    idProfissional: localStorage.getItem("idProfissionalSaude"),
  });




useEffect(() => {
const listarConsultorioBlocoPorEspecialidadeProfissionalSaude = () => {
  setObjeto({ ...objeto, consultoriosBloco: [] })
  xfetch('/hpm/consultorioBloco/' + objeto.idEspecialidade + '/' + objeto.idProfissional + '/disponiveis/opcoes', {}, HttpVerbo.GET)
      .then(res => res.json())
      .then(json => {
          setObjeto({ ...objeto, consultoriosBloco: json.resultado })
      }
      )
}

  listarConsultorioBlocoPorEspecialidadeProfissionalSaude()
}, [])

const selecionarConsultorioBloco = (e) => {
  e.preventDefault()
  setObjeto({ ...objeto, idConsultorioBloco: e.target.value })
  console.log("idConsultorioBloco", objeto.idConsultorioBloco);
}



  const enviar = () => {
    console.log(objeto)
    xfetch("/hpm/consulta/cadastrar", objeto, HttpVerbo.POST).then((json) => {
      if (typeof json !== "undefined" ? json.status === "OK" : false) {
        ExibirMensagem(
          "Consulta Agendada com Sucesso!",
          MSG.SUCESSO,
          null,
          "Emergência",
          null,
          null,
          window.location.reload()
        );
      }
    });
  };

  let consultaBloco = objeto.consultoriosBloco;

  console.log('Objeto', objeto)

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header>
        <Modal.Title>{props.titulo}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <label htmlFor="idConsultorioBloco">Data - Hora</label>
                                    <br />
                                    <select
                                        className="form-control"
                                        name="idConsultorioBloco"
                                        value={objeto.idConsultorioBloco}
                                        onChange={selecionarConsultorioBloco}>
                                        <option hidden>Selecione...</option>
                                        {consultaBloco !== undefined ? consultaBloco.map((v, k) => {
                                            return <option className="flex-fill" value={v.valor} key={k}> {v.texto}</option>
                                        }) : null}
                                    </select>
      </Modal.Body>
      <Modal.Footer>
        <Botao cor={BOTAO.COR.SUCESSO} onClick={enviar}>
          Agendar
        </Botao>
        <Botao cor={BOTAO.COR.PERIGO} onClick={props.handleClose}>
          Fechar
        </Botao>
      </Modal.Footer>
    </Modal>
  );
};

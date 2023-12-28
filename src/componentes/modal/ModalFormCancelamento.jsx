import { BOTAO } from "../../util/Constantes";
import { Botao } from "../Botao";
import { Modal } from "react-bootstrap";

export const ModalFormCancelamento = (props) => {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header>
        <Modal.Title>{props.titulo}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p> {props.body}</p>
      </Modal.Body>
      <Modal.Footer>
        <Botao cor={BOTAO.COR.SECUNDARIO} onClick={props.handleClose}>
          Fechar
        </Botao>
        <Botao cor={BOTAO.COR.PRIMARIO} onClick={props.handleOpen}>
          Confirmar
        </Botao>
      </Modal.Footer>
    </Modal>
  );
};

import React, { useState } from "react";
import {
  Autocompletar,
  Botao,
  Card,
  Input,
  Pagina,
  Tabela,
} from "../../componentes";
import { ExibirMensagem, xfetch } from "../../util";
import { BOTAO, HttpVerbo, ICONE, MSG } from "../../util/Constantes";
import { ModalFormCancelamento } from "../../componentes/modal/ModalFormCancelamento";

export default function ListaPacientesParaAtendimento() {
  const [apagar, setApagar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [objeto, setObjeto] = useState({
    idPessoa: localStorage.getItem("id"),
  });

  const [atendimentos, setAtendimentos] = useState({
    dataConsulta: null,
    idEspecialidade: null,
    idPessoa: null,
    idProfissionalSaude: Number(localStorage.getItem("id")),
  });

  const [dataExibida, setDataExibida] = useState("");

  let idConsultorioBlocos = [];

  const [consultorioBloco, setConsultorioBloco] = useState({
    idEspecialidade: null,
    data: "",
  });

  const [consultaSelecionada, setConsultaSelecionada] = useState({
    idConsulta: "",
    idStatus: "",
  });

  const handleDtBloco = (e) => {
    const selectedDate = e.target.value;
    const dataHora = selectedDate + "T00:00";
    console.log(dataHora);
    setConsultorioBloco({ ...consultorioBloco, data: dataHora });
    atendimentos.dataConsulta = dataHora;
    setDataExibida(selectedDate);
  };

  const selecionarPessoa = (event) => {
    let idpessoa = event;
    atendimentos.idPessoa = idpessoa;
    setAtendimentos({ ...atendimentos, idPessoa: idpessoa });
  };

  function handleBtnIniciarAtendimento(consulta) {
    consultaSelecionada.idConsulta = consulta.id;
    consultaSelecionada.idStatus = Number("20");
    localStorage.setItem("pacienteConsulta", consulta.id);
    localStorage.setItem("idPessoa", consulta.idPessoa);
    localStorage.setItem("nmPaciente", consulta.nmPaciente);
    localStorage.setItem("cpfPaciente", consulta.cpfPaciente);
    localStorage.setItem("nmCelular", consulta.nmCelular);
    localStorage.setItem("nmInstituicao", consulta.nmInstituicao);
    localStorage.setItem("nmSangue", consulta.nmSangue);
    localStorage.setItem("sexo", consulta.sexo);
    localStorage.setItem("dtNascimento", consulta.dtNascimento);
    localStorage.setItem("altura", consulta.altura);
    localStorage.setItem("peso", consulta.peso);
    localStorage.setItem("dtHora", consulta.dtHora);
    localStorage.setItem("nmEspecialidade", consulta.nmEspecialidade);
    localStorage.setItem("nmMedico", consulta.nmMedico);
    localStorage.setItem("sala", consulta.sala);
    localStorage.setItem("piso", consulta.piso);
    localStorage.setItem("nmStatus", consulta.nmStatus);
    localStorage.setItem("idStatus", consulta.idStatus);
    localStorage.setItem("relato", consulta.relato);
    xfetch(
      "/hpm/consulta/alterar-status",
      consultaSelecionada,
      HttpVerbo.POST
    ).then((json) => {});
    window.open("/atendimento/pacienteEmAtendimento");
  }

  const handleBtnCancelar = (consultaId, statusId) => {
    setConsultaSelecionada({
      idConsulta: consultaId,
      idStatus: statusId,
    });
    setShowModal(true);
  };

  const handleConfirmacao = async () => {
    try {
      await xfetch(
        "/hpm/consulta/alterar-status",
        consultaSelecionada,
        HttpVerbo.POST
      );
      ExibirMensagem("Consulta Alterada Com Sucesso!", MSG.SUCESSO);
      setApagar(!apagar);
      enviar();
    } catch (error) {
      ExibirMensagem(error.message || "Erro ao cancelar a consulta", MSG.ERRO);
    } finally {
      setShowModal(false);
    }
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const enviar = () => {
    console.log("Dentro de ListarPacientesParaAtendimentoPorData");
    console.log("Tamanho:", idConsultorioBlocos.length);
    console.log("idConsultorioBloco maior que Zero");
    xfetch("/hpm/consulta/pesquisar-atendimentos", atendimentos, HttpVerbo.POST)
      .then((response) => {
        console.log("Atendimentos:", atendimentos);
        if (
          typeof response !== "undefined" ? response.status === "OK" : false
        ) {
          setObjeto({ ...objeto, consultas: response.resultado });
        }
      })
      .catch((error) => console.log(error));
  };

  console.log("Consultas", objeto.consultas);

  const colunas = [
    { text: "Paciente" },
    { text: "CPF do Paciente" },
    { text: "Data - Hora" },
    { text: "Especialidade" },
    { text: "Médico" },
    { text: "Sala" },
    { text: "Piso" },
    { text: "Status" },
    { text: "Ações" },
  ];

  const dados = () => {
    return typeof objeto.consultas !== "undefined"
      ? objeto.consultas.map((consulta) => {
          let desabilitado = false;
          let textoBotao = "Iniciar Atendimento";
          if (consulta.nmStatus === "Agendada") {
            desabilitado = true;
            textoBotao = "Aguardando confirmação";
          }
          return {
            paciente: consulta.nmPaciente,
            cpf_do_paciente: consulta.cpfPaciente,
            data__hora: consulta.dtHora,
            especialidade: consulta.nmEspecialidade,
            medico: consulta.nmMedico,
            sala: consulta.sala,
            piso: consulta.piso,
            status: consulta.nmStatus,
            acoes: (
              <div>
                <Botao
                  disabled={desabilitado}
                  cor={BOTAO.COR.SUCESSO}
                  onClick={() => handleBtnIniciarAtendimento(consulta)}
                >
                  {textoBotao}
                </Botao>
                <Botao
                  cor={BOTAO.COR.ALERTA}
                  onClick={() => handleBtnCancelar(consulta.id, Number("8"))}
                  value={consulta.id}
                >
                  Cancelar
                </Botao>
              </div>
            ),
          };
        })
      : "";
  };

  return (
    <Pagina titulo="Consultas Agendadas">
      <div className="row">
        <div className="col-lg-12">
          <Card>
            <div className={"row"}>
              <div className={"col-lg-6"}>
                <Autocompletar
                  name="pessoa"
                  url="/hpm/pessoa/"
                  label="Digite os Dados:"
                  placeholder="Nome ou CPF aqui"
                  tamanho={6}
                  retorno={(e) => selecionarPessoa(e)}
                />
              </div>
              <div className="col-lg-6">
                <Input
                  type="date"
                  value={dataExibida}
                  onChange={handleDtBloco}
                  name="dataBloco"
                  label="Data"
                  placeholder="Data e hora"
                />
              </div>
              <div className="col-lg-12 text-lg-right mt-4 mb-4">
                <Botao
                  cor={BOTAO.COR.SUCESSO}
                  icone={ICONE.PESQUISAR}
                  onClick={enviar}
                >
                  Consultar
                </Botao>
              </div>
            </div>
          </Card>
          <Card titulo="Paciente Confirmado">
            {objeto.consultas !== undefined ? (
              <Tabela colunas={colunas} dados={dados()} pageSize={5} />
            ) : (
              "Nenhum Resultado Encontrado..."
            )}
            <ModalFormCancelamento
              show={showModal}
              titulo="Confirmação"
              body="Deseja realmente cancelar a consulta?"
              handleClose={handleCloseModal}
              handleOpen={handleConfirmacao}
            />
          </Card>
        </div>
      </div>
    </Pagina>
  );
}

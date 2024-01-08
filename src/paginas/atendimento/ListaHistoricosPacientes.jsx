import React, { useEffect, useState } from "react";
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
import { Tab, Tabs } from "react-bootstrap";

export default function ListaHistoricosPacientes() {
  const [objeto, setObjeto] = useState({
    dataConsulta: "",
    idEspecialidade: null,
    idPessoa: null,
    idProfissionalSaude: Number(localStorage.getItem("id")),
    historico: true
  });

  const [dataExibida, setDataExibida] = useState("");

  const [lista, setLista] = useState({
    consultas: [],
  });

  const [atestado, setAtestado] = useState({
    atestados: [],
  });

  const [consultorioBloco, setConsultorioBloco] = useState({
    idEspecialidade: null,
    data: "",
  });

  const handleDtBloco = (e) => {
    let dtSelecionada = e.target.value;
    if (dtSelecionada) {
      dtSelecionada = dtSelecionada + "T00:00";
    }
    setConsultorioBloco({ ...consultorioBloco, data: dtSelecionada });
    setObjeto({ ...objeto, dataConsulta: dtSelecionada });
    setDataExibida(e.target.value);
  };

  const selecionarPessoa = (event) => {
    let idpessoa = event;
    objeto.idPessoa = idpessoa;
    setObjeto({ ...objeto, idPessoa: idpessoa });
  };

  const enviar = () => {
    xfetch("/hpm/consulta/pesquisar-atendimentos", objeto, HttpVerbo.POST)
      .then((response) => {
        console.log(objeto);
        if (
          typeof response !== "undefined" ? response.status === "OK" : false
        ) {
          setLista({ ...lista, consultas: response.resultado });
          listaAtestadosPacientes();
        }
      })
      .catch((error) => {
        ExibirMensagem(error.message || "Erro ao cancelar a consulta", MSG.ERRO);
      });
  };

  const listaAtestadosPacientes = () => {
    xfetch(
      "/hpm/consulta/atestado/historico/pessoa/" + objeto.idPessoa,
      {},
      HttpVerbo.GET
    )
      .then((res) => res.json())
      .then((response) => {
        console.log("Atestados:", response.resultado);
        if (
          typeof response !== "undefined" ? response.status === "OK" : false
        ) {
          setAtestado({ ...atestado, atestados: response.resultado });
        }
      })
      .catch((error) => {
        ExibirMensagem(error.message || "Erro ao cancelar a consulta", MSG.ERRO);
      });
  };

  const colunasHistorico = [
    { text: "Paciente" },
    { text: "Data Hora Atendimento" },
    { text: "Médico Especialidade" },
    { text: "Anamnese" },
    { text: "Conduta" },
    { text: "Exame Físico" },
  ];

  const colunasAtestados = [
    { text: "Paciente" },
    { text: "Data Hora Atendimento" },
    { text: "CID" },
    { text: "Quantidade de dias concedidos" },
    { text: "Responsável pela Concessão" },
  ];

  const dadosHistorico = () => {
    return typeof lista.consultas !== "undefined"
      ? lista.consultas.map((consulta) => {
          return {
            paciente: consulta.nmPaciente,
            data_hora_atendimento: consulta.dtHora,
            medico_especialidade:
              consulta.nmMedico + " - " + consulta.nmEspecialidade,
            anamnese: consulta.anamnese,
            conduta: consulta.conduta,
            exame_fisico: consulta.exameFisico,
          };
        })
      : "";
  };

  const dadosAtestados = () => {
    return typeof atestado.atestados !== "undefined"
      ? atestado.atestados.map((atestado) => {
          let listaCids =
            atestado.cids.length > 0
              ? atestado.cids.map((cid, index) => {
                  return (
                    cid.codigo + (index < atestado.cids.length - 1 ? ", " : "")
                  );
                })
              : "";
          return {
            paciente: atestado.consulta.nmPaciente,
            data_hora_atendimento: atestado.consulta.dtHora,
            cid: listaCids,
            quantidade_de_dias_concedidos: atestado.qtdDiasAfastamento,
            responsavel_pela_concessao:
              atestado.consulta.nmMedico +
              " - " +
              atestado.consulta.nmEspecialidade,
          };
        })
      : "";
  };

  return (
    <Pagina titulo={"Histórico"}>
      <div className="row">
        <div className="col-lg-12">
          <Card titulo="Consultar">
            <div className="row">
              <input type="hidden" name="idPessoa" />
            </div>
            <div className="row">
              <div className="col-lg-6">
                <Autocompletar
                  name="pessoa"
                  url="/hpm/pessoa/"
                  label="Digite os Dados:"
                  placeholder="Nome ou CPF aqui"
                  tamanho={6}
                  retorno={selecionarPessoa}
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
          <Card titulo={"Dados do Paciente"} botaoMin>
            <Tabs>
              <Tab
                title="Histórico Evolução"
                eventKey="aba2"
                style={{ width: "100%", overflow: "auto" }}
              >
                <br />
                <div className="col-lg-12">
                  <Card>
                    <Tabela
                      colunas={colunasHistorico}
                      dados={dadosHistorico()}
                      pageSize={5}
                    />
                  </Card>
                </div>
              </Tab>
              <Tab
                title="Atestados Concedidos"
                eventKey="aba3"
                style={{ width: "100%", overflow: "auto" }}
              >
                <br />
                <div className="col-lg-12">
                  <Card>
                    <Tabela
                      colunas={colunasAtestados}
                      dados={dadosAtestados()}
                      pageSize={5}
                    />
                  </Card>
                </div>
              </Tab>
            </Tabs>
          </Card>
        </div>
      </div>
    </Pagina>
  );
}

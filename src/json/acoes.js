
export const acoes = [
  //   {
  //   "nome": "Alterar Senha",
  //   "descricao": "Página Principal",
  //   "url": "alterarSenha",
  //   "icone": "fas fa-unlock-alt",
  //   "depencias": []
  // },
  // {
  //   "nome": "Agenda de Consultas",
  //   "descricao": "Componente Calendário",
  //   "url": "agendaDeConsultas",
  //   "icone": "far fa-calendar-alt",
  //   "depencias": []
  // },
  {
    "nome": "Agendar",
    "descricao": "Menu de Agendamento",
    "url": "agendar",
    "icone": "far fa-calendar-alt",
    "acoes": [
      {
        "nome": "Consulta",
        "descricao": "Consulta",
        "url": "consulta",
        "icone": "fas fa-stethoscope"
      },
      {
        "nome": "Consultas Agendadas",
        "descricao": "Consultas Agendadas",
        "url": "consultasAgendadas",
        "icone": "fas fa-stethoscope"
      }
    ]
  },
  {
    "nome": "Atendimento",
    "descricao": "Menu de Agendamento",
    "url": "atendimento",
    "icone": "fa fa-medkit",
    "acoes": [
      {
        "nome": "Lista Pacientes para Atendimento",
        "descricao": "Lista para atendimento de pacientes",
        "url": "listaPacientesParaAtendimento",
        "icone": "fas fa-stethoscope"
      }
    ]
  },
  // {
  //   "nome": "Editor de Texto",
  //   "descricao": "Componente Editor de texto",
  //   "url": "editorTexto",
  //   "icone": "fas fa-edit",
  //   "depencias": []
  // },
  {
    "nome": "Cadastrar",
    "descricao": "Menu de Cadastro",
    "url": "cadastrar",
    "icone": "far fa-plus-square",
    "acoes": [
      // {
      //   "nome": "Consulta",
      //   "descricao": "Consulta",
      //   "url": "consulta",
      //   "icone": "fas fa-stethoscope"
      // },
      {
        "nome": "Consultorio Bloco",
        "descricao": "Criando Consultorio Bloco ",
        "url": "consultorioBloco",
        "icone": "fas fa-hospital-alt" +
            ""
      },
      {
        "nome": "Dependente",
        "descricao": "Cadastro de dependente",
        "url": "dependente",
        "icone": "fas fa-clinic-medical"
      },
      {
        "nome": "Especialidade",
        "descricao": "Criando Especialidade",
        "url": "especialidade",
        "icone": "fas fa-user-nurse"
      },
      {
        "nome": "Exame",
        "descricao": "Criando Exame",
        "url": "exame",
        "icone": "fas fa-file-prescription"
      },
      {
        "nome": "Funcao",
        "descricao": "Página Principal",
        "url": "funcao",
        "icone": "fas fa-user-cog"
      },
      {
        "nome": "Instituição/Convênio",
        "descricao": "Criando Instituição/Convênio",
        "url": "instituicaoConvenio",
        "icone": "fas fa-hotel"
      },
      {
        "nome": "Medicamento",
        "descricao": "Criando Medicamento",
        "url": "medicamento",
        "icone": "fas fa-capsules"
      },
      {
        "nome": "Menu",
        "descricao": "Cadastro de URL",
        "url": "menu",
        "icone": "fas fa-bars",
        "dependencias": [
          {"verbo": "POST", "uri": "/hpm/acao/frontend"}
        ]
      },
      {
        "nome": "Objeto",
        "descricao": "Página Principal",
        "url": "objeto",
        "icone": "fas fa-cubes"
      },
      {
        "nome": "Perfil",
        "descricao": "Criando perfil",
        "url": "perfil",
        "icone": "far fa-user"
      },
      {
        "nome": "Pessoa",
        "descricao": "Página Principal",
        "url": "pessoa",
        "icone": "fas fa-user-plus"
      },
      {
        "nome": "Piso",
        "descricao": "Criando piso",
        "url": "piso",
        "icone": "fas fa-layer-group"
      },
      {
        "nome": "Prédio",
        "descricao": "Página Principal",
        "url": "predio",
        "icone": "fas fa-hospital"
      },
      {
        "nome": "Sala",
        "descricao": "Criando Sala",
        "url": "sala",
        "icone": "fas fa-clinic-medical"
      },
      {
        "nome": "Sangue",
        "descricao": "Página Principal",
        "url": "sangue",
        "icone": "fas fa-burn"
      },
      {
        "nome": "Setor",
        "descricao": "Página Principal",
        "url": "setor",
        "icone": "fas fa-code-branch"
      },
      {
        "nome": "Status",
        "descricao": "Criando Status",
        "url": "status",
        "icone": "fas fa-traffic-light"
      },
      {
        "nome": "Tipo",
        "descricao": "Página Principal",
        "url": "tipo",
        "icone": "fab fa-delicious"
      },
      {
        "nome": "Cadastrar Escala",
        "descricao": "Cadastro de Escala",
        "url": "cadastrarEscala",
        "icone": "fas fa-stethoscope"
      },
      {
        "nome": "Sistema externo",
        "descricao": "Cadastro Sistema externo",
        "url": "cadastrarSistemaExterno",
        "icone": "fas fa-cubes"
      }
    ]
  },
  {
    "nome": "Listar",
    "descricao": "Menu de Listas",
    "url": "listar",
    "icone": "fa fa-list-alt",
    "acoes": [
      {
        "nome": "Listar Dependentes",
        "descricao": "Listagem de Dependentes",
        "url": "listarDependentes",
        "icone": "fa fa-list"
      },
      {
        "nome": "Listar Profissionais Saúde",
        "descricao": "Listagem de Profissionais de Saúde",
        "url": "listarProfissionaisSaude",
        "icone": "fa fa-list"
      },
      {
        "nome": "Listar Especialidade Por Profissional Saúde",
        "descricao": "Listagem de Especialidade Por Profissional de Saúde",
        "url": "listarEspecialidadePorProfissionalSaude",
        "icone": "fa fa-list"
      },
      {
        "nome": "Listar Escalas",
        "descricao": "Listagem de Escalas por Status",
        "url": "listarEscalas",
        "icone": "fa fa-list"
      }
    ]
  },
  {
    "nome": "Vincular",
    "descricao": "Página Principal",
    "url": "vincular",
    "icone": "fas fa-retweet",
    "acoes": [
      {
        "nome": "Pessoa Perfis",
        "descricao": "Vincula perfis por pessoa",
        "url": "pessoaPerfis",
        "icone": "fas fa-people-arrows"
      },
      {
        "nome": "Perfil Ações",
        "descricao": "Vincula ações por perfil",
        "url": "perfilAcoes",
        "icone": "fas fa-people-arrows"
      },
      {
        "nome": "Setor Função",
        "descricao": "Página Principal",
        "url": "setorFuncao",
        "icone": "fas fa-users-cog"
      },
      {
        "nome": "Setor Função Acoes",
        "descricao": "Página Principal",
        "url": "setorFuncaoAcoes",
        "icone": "fas fa-sitemap"
      },
      {
        "nome": "Sub Setor",
        "descricao": "Página Principal",
        "url": "setorSubSetor",
        "icone": "fas fa-code-branch"
      },
    ]
  },
  {
    "nome": "Recepção",
    "descricao": "Página Recepção",
    "url": "recepcao",
    "icone": "fas fa-retweet",
    "acoes": [
      {
        "nome": "Listar Pacientes",
        "descricao": "Lista Pacientes por especialidade, profissional de saúde e data",
        "url": "listarPacientes",
        "icone": "fa fa-list"
      },
      {
        "nome": "Marcar Consulta",
        "descricao": "Marca consulta por especialidade e paciente",
        "url": "marcarConsultas",
        "icone": "fas fa-users-cog"
      },
    ]
  },
  {
    "nome": "Relatório",
    "descricao": "Menu de Relatorio",
    "url": "relatorio",
    "icone": "fas fa-list",
    "acoes": [
      {
        "nome": "Atendimentos ",
        "descricao": "Relatório de Consultas",
        "url": "atendimentos",
        "icone": "fas fa-stethoscope"
      },
    ]
  },
]
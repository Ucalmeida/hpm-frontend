import React from "react";

export const acoes = [
  {
    "nome": "Alterar Senha",
    "descricao": "Página Principal",
    "url": "alterarSenha",
    "icone": "fas fa-unlock-alt",
    "depencias": []
  },
  {
    "nome": "Cadastrar",
    "descricao": "Menu de Cadastro",
    "url": "cadastrar",
    "icone": "far fa-plus-square",
    "acoes": [
        {
            "nome": "Especialidade",
            "descricao": "Página Principal",
            "url": "especialidade",
            "icone": "fas fa-user-nurse"
        },
        {
            "nome": "Consultorio Bloco",
            "descricao": "Criando Consultorio Bloco ",
            "url": "consultorioBloco",
            "icone": "fas fa-plus"
         },
      {
        "nome": "Perfil",
        "descricao": "Criando perfil",
        "url": "perfil",
        "icone": "fas fa-user"
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
    ]
  },
  {
    "nome": "Vincular",
    "descricao": "Página Principal",
    "url": "vincular",
    "icone": "fas fa-retweet",
    "acoes": [
      {
        "nome": "Perfil ações",
        "descricao": "Vincula ações por perfil",
        "url": "perfilAcao",
        "icone": "fas fa-people-arrows"
      },
      {
      "nome": "Setor Função",
        "descricao": "Página Principal",
        "url": "setorFuncao",
        "icone": "fas fa-users-cog"
      },
      {
        "nome": "Setor Função acoes",
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
]
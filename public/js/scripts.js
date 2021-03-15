// Scrips que são executados em todo o portal pela tag Página.

function contadorSessao(tempo) {
    timerRegressivo(tempo,
        'timerSessao',
        2,
        'Sessão Expirada',
        true,
        'Sua sessão está expirando',
        'Sua sessão no Portal PMSE está prestes a encerrar. Para renova-la basta atualizar a página perssionando a tecla F5.',
        120000,
        'timerAviso');
}
$(document).ready( function () {

// ativação dos links da pagina em exibição
    var url = document.location.href;
    var urlSeparada = url.split('/');
    var uri = urlSeparada[urlSeparada.length-1];
    $el = $('a[data-target="'+uri+'"]');

    if (uri == "gestao" || uri == "principal") { //Interface Gestão
        $('#tituloIcone').html('<i class="fas fa-home mr-2"></i>');
    } else {
        if ($el.attr('data-target') === undefined) {
            uri = sessionStorage.getItem("uriAnterior");
            $el = $('a[data-target="'+uri+'"]');
        }

        getIcone($el);

        $el.addClass('active');
        $el.has('img').find('img').addClass('active')//Caso ícone do menu lateral seja svg
        var $parent = $el.parent().parent().parent().get(0);
        if ($parent != undefined && $parent.tagName !== undefined && $parent.tagName != 'NAV') {
            $elSuperior = $el.parent().parent().parent();
            $elSuperior.addClass('menu-open');
            $($elSuperior.children()[0]).addClass('active');
            // iconeTitulo = $elSuperior.find('img').clone();
            getIcone($elSuperior);
            let elPai = $elSuperior.parent().parent();
            while (elPai[0].localName == 'li') {
                $($elSuperior.children()[0]).addClass('bg-primary');
                elPai.addClass('menu-open');
                $(elPai.children()[0]).addClass('active');
                elPai = elPai.parent().parent();
            }
        }
    }
    sessionStorage.setItem('uriAnterior', uri);
});

//Icone do Título da página.
function getIcone(elemento) {
    var iconeTitulo = null;
    if (elemento.has('img').length) { //Caso ícone do menu lateral seja svg
        iconeTitulo = elemento.find('img').first().clone();
        iconeTitulo.addClass('icon-header')
        iconeTitulo.removeClass('nav-icon-svg')
        // elemento.find('img').addClass('active');
    } else { //Caso ícone do menu lateral seja da tag i
        iconeTitulo = elemento.find('i').first().clone();
    }
    iconeTitulo.addClass('mr-3')
    $('#tituloIcone').html(iconeTitulo);
}

//Maximiza ou minimiza automaticamente o menu
window.onload = function () {
    var corpo = $('body');
    // Setar o menu
    corpo.addClass(sessionStorage.getItem('ajustarMenu'));
    sessionStorage.setItem('menuCollapse', document.body.classList.contains('sidebar-collapse'))
};

function ajustarMenu() {
    if (sessionStorage.getItem('menuCollapse') == 'false') {
        sessionStorage.setItem('ajustarMenu','sidebar-collapse');
    } else {
        sessionStorage.setItem('ajustarMenu','');
    }
}

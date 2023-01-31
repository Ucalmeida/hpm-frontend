import React from "react";
import $ from 'jquery/src/jquery'

// ativação dos links da pagina em exibição

    const url = document.location.href;
    let urlSeparada = url.split('/');
    let uri = urlSeparada[urlSeparada.length - 1];
    let elemento = $('a[data-target="' + uri + '"]');

    if (uri === "gestao" || uri === "principal") { //Interface Gestão
        $('#tituloIcone').html('<i class="fas fa-home mr-2"></i>');
    } else {
        if (elemento.attr('data-target') === undefined) {
            uri = sessionStorage.getItem("uriAnterior");
            elemento = $('a[data-target="' + uri + '"]');
        }

        getIcone(elemento);

        elemento.addClass('active');
        elemento.has('img').find('img').addClass('active')//Caso ícone do menu lateral seja svg
        const $parent = elemento.parent().parent().parent().get(0);
        if ($parent !== undefined && $parent.tagName !== undefined && $parent.tagName !== 'NAV') {
            let elementoSup = elemento.parent().parent().parent();
            elementoSup.addClass('menu-open');
            $(elementoSup.children()[0]).addClass('active');
            // iconeTitulo = $elSuperior.find('img').clone();
            getIcone(elementoSup);
            let elPai = elementoSup.parent().parent();
            while (elPai[0].localName === 'li') {
                $(elementoSup.children()[0]).addClass('bg-primary');
                elPai.addClass('menu-open');
                $(elPai.children()[0]).addClass('active');
                elPai = elPai.parent().parent();
            }
        }
    }
    sessionStorage.setItem('uriAnterior', uri);
//Icone do Título da página.
function getIcone(elemento) {
    console.log(elemento)
    let iconeTitulo = null;
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


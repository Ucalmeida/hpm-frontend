import Bootbox from "bootbox-react/src";

const HttpVerbo = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH'
}

const xfetch = (endpoint, dados, verbo = HttpVerbo.GET) => {
    const servidor = process.env.NODE_ENV === 'development'? 'http://localhost:8080' : 'http://172.23.7.47:8081'

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    // myHeaders.append("Content-Length", content.length.toString());
    if (localStorage.getItem('token')) {
        myHeaders.append("token", localStorage.getItem('token'));
    }


    const myInit = { method: verbo,
        headers: myHeaders,
        mode: 'cors',
        cache: 'default' };


    if (verbo === HttpVerbo.POST) {
         return fetch(servidor+endpoint, {
            headers: myHeaders,
            method: verbo,
            body: JSON.stringify(dados)
        })
             .then(res => res.json())
             .catch(e => window.alert("Um erro ocorreu - " + e.message));
    } else {
        return fetch(servidor+endpoint, myInit)
            .catch(e => window.alert("Um erro ocorreu - " + e.message));
    }

}


const isLogado = () => {
    let token = localStorage.getItem('token')
    if(!token) {
        return true
    } else
        return false
}

const removerCaracteresEspecciais = (texto) => {
    texto = texto.replace((/[ÀÁÂÃÄÅ]/g,"A"))
    return texto;
}

const exibirMensagem = (titulo,mensagem) => {
    return <Bootbox message={mensagem} />
}


export {xfetch, HttpVerbo, isLogado, removerCaracteresEspecciais, exibirMensagem};



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

    let resposta;
    if (verbo === HttpVerbo.POST) {
         return fetch(servidor+endpoint, {
            headers: myHeaders,
            method: verbo,
            body: JSON.stringify(dados)
        })
             .then(res => res.json())
    } else {
        resposta = fetch(servidor+endpoint, myInit)
            .then(e => e.json());
    }

    return resposta;
}

export {xfetch, HttpVerbo};
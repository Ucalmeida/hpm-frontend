import React, {useEffect, useMemo, useState} from 'react';
import {HttpVerbo, xfetch} from "../util/Util";
import List from "./List";

function Select({ url }) {
    const [list, setList] = useState([]);
    // const [url, setUrl] = useState('');

    useEffect(() => {
        fetch(url)
            .then(r => r.json())
            .then(r => setList(r))
    }, []);

    let listToRender;

    if(list) {
        listToRender = list.map((list) => {
            return <List key={list.id} list={list} url={url}/>;
        });
    } else {
        listToRender = 'Carregando...';
    }
    return (
        <div className="Lista">
            { listToRender }
            {/*{useMemo(() => {*/}
            {/*    return (*/}
            {/*{*/}
            {/*    list.map((list) => {*/}
            {/*        return <List key={list.id} list={list} url={setUrl}/>;*/}
            {/*    })*/}
            {/*}*/}
            {/*    );*/}
            {/*}, [list])}*/}
        </div>
    );
}

export default Select;
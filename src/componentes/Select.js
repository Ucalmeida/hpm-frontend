import React, {useEffect, useMemo, useState} from 'react';
import {HttpVerbo, xfetch} from "../util/Util";
import List from "./List";

function Select() {
    const [list, setList] = useState([]);
    const [url, setUrl] = useState('');

    useEffect(() => {
        xfetch(url, {}, HttpVerbo.GET)
            .then((r) => r.json())
            .then((r) => setList(r));
    }, [url]);

    return (
        <div className="Lista">
            {useMemo(() => {
                return (
                    list.map((list) => {
                        return <List key={list.id} list={list} url={setUrl} />;
                    })
                );
            }, [list])}
        </div>
    );
}

export default Select;
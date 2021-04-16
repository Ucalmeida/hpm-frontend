import P from "prop-types";
import React from "react";

function List ({ list, url }) {
    return (
        <select key={list.id} url={url}>
            <option></option>
            <option>{list.nome}</option>
        </select>
    );
};

List.propTypes = {
    list: P.shape({
        id: P.number,
        nome: P.string,
    }),
    url: P.string,
}

export default List;
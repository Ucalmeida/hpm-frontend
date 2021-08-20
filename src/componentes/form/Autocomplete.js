import React, {useEffect, useRef, useState, useMemo} from 'react'
import {xfetch} from "../../util";
import {HttpVerbo} from "../../util/Constantes";
import { AutoCompleteItem } from './AutoCompleteItem';

export const Autocomplete = (props) => {
    const [isVisible, setVisibility] = useState(false);
    const [search, setSearch] = useState("");
    const [cursor, setCursor] = useState(-1);
    const [data, setData] = useState({
        pessoas: []
    });
    
    const searchContainer = useRef(null);
    const searchResultRef = useRef(null);

    useEffect(() => {
        window.addEventListener("mousedown", handleClickOutside);
        // window.addEventListener("mousedown", handleClick);

        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);

    const scrollIntoView = position => {
        searchResultRef.current.parentNode.scrollTo({
            top: position,
            behavior: 'smooth'
        })
    }

    useEffect(() => {
        if(cursor < 0 || cursor > (typeof suggestions !== 'undefined' ? suggestions.length : '') || !searchResultRef) {
            return () => {};
        }

        let listItems = Array.from(searchResultRef.current.children);
        listItems[cursor] && scrollIntoView(listItems[cursor].offsetTop);

    }, [cursor])

    const suggestions = useMemo(() => { 
        if(!search || typeof data === 'undefined') {
            return undefined;
        }

        setCursor(-1);
        scrollIntoView(0);

        return data.filter(pessoa => isNaN(search) ? pessoa.name.toLowerCase().includes(search.toLowerCase()) : pessoa);
    }, [data, search]);

    let url = props.url;

    const loadPessoas = async (key) => {
        let complementoUrl = !isNaN(+key) ? 'porCpf/' : 'porNome/';

        console.warn(complementoUrl);

        let result = await xfetch(url + complementoUrl + key, {}, HttpVerbo.GET);
        result = await result.json();
        setData(result.resultado);
        setSearch(key);
    }

    useEffect(() => {
        loadPessoas();
    }, []);

    const handleClickOutside = (event) => {
        if(searchContainer.current && !searchContainer.current.contains(event.target)) {
            hideSuggestion();
        }
    }

    // const handleClick = () => {
    //     if(cursor >= 0) {
    //         setCursor(c => (c > 0 ? c - 1 : 0));
    //         props.onSelect(suggestions[cursor].value);
    //     } else {
    //         isVisible ?
    //         setCursor(c => (tamanhoSuggestions(c)))
    //         : showSuggestion();         
    //         if(typeof suggestions !== 'undefined') {
    //             props.onSelect(suggestions[cursor].value);
    //         }
    //     }
    // }
    // console.log("Outro Cursor", cursor);

    const showSuggestion = () => setVisibility(true);
    const hideSuggestion = () => setVisibility(false);

    const tamanhoSuggestions = (c) => {
        if(typeof suggestions !== 'undefined') {
            return (c < suggestions.length - 1 ? c + 1 : c)
        }
    }

    const keyboardNavigation = (e) => {
        if(e.key === 'ArrowDown') {
            isVisible ?
                setCursor(c => (tamanhoSuggestions(c)))
                : showSuggestion();
        }

        if(e.key === 'ArrowUp') {
            setCursor(c => (c > 0 ? c - 1 : 0));
        }

        if(e.key === 'Escape') {
            hideSuggestion();
        }

        if(e.key === 'Enter' && cursor >= 0) {
            setSearch(suggestions[cursor].name);
            hideSuggestion();
            props.onSelect(suggestions[cursor].value);
        }
    }

    return (
        <div>
            <div ref={searchContainer}>
                <label>{props.label}</label>
                <input id="idAuto"
                        autoComplete="off"
                        type="text"
                        className="form-control"
                        name="nome"
                        value={search}
                        onClick={showSuggestion}
                        onChange={(e) => loadPessoas(e.target.value)}
                        onKeyDown={(e) => keyboardNavigation(e)}
                        placeholder={props.placeholder}/>
            </div>
            <div className={`search-result ${
                isVisible ? "visible" : "invisible"
            }`}>
                <div className="list-group" ref={searchResultRef}>
                    {
                        typeof suggestions === 'undefined' ? '' : suggestions.map((item, idx) => (
                            <AutoCompleteItem key={item.value} 
                            onSelectItem={() => {
                                hideSuggestion();
                                setSearch(item.name);
                                props.onSelect(item.value);
                            }}
                            isHighlighted={cursor === idx ? true : false}
                            {...item}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
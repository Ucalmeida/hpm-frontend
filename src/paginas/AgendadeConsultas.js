import React from 'react';
import {Calendario, Card, Pagina} from "../componentes";

export default function AgendadeConsultas () {

    const eventos = [
        { title: 'Paciente José 30 anos, Paciente Maria, Paciente Jonas', start: '2021-06-25T08:30:00', end: '2021-06-25T09:30:00', color:'#ff0000'},
        { title: 'Paciente José 30 anos', start: '2021-06-25T10:30:00', end: '2021-06-25T12:30:00', color:'#0c64cd'},
        { title: 'Paciente José 30 anos', start: '2021-06-25T12:30:00', end: '2021-06-25T14:30:00', color:'#000000'},
        { title: 'Paciente José 30 anos', start: '2021-06-26T12:30:00', end: '2021-06-26T14:30:00', color:'#126524'},
        { title: 'Paciente José 30 anos', start: '2021-06-24T12:30:00', end: '2021-06-24T14:30:00', color:'#b8af0f'}
    ]

    return (
        <Pagina titulo={"Agenda de Consultas"}>
            <Card>
                <Calendario eventos={eventos}/>
            </Card>
        </Pagina>
    );
};
import React from 'react';
import PropTypes from 'prop-types';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin  from "@fullcalendar/timegrid";
import listPlugin from '@fullcalendar/list';
import ptBrLocale from "@fullcalendar/core/locales/pt-br";

function Calendario (props) {
    return (
        <FullCalendar
            plugins={[ dayGridPlugin, timeGridPlugin, listPlugin ]}
            initialView={"timeGridWeek"}
            locale={ptBrLocale}
            events={props.eventos}
            headerToolbar={{
                start: 'prev,next today',
                center: 'title',
                end: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
           }}

        />
    );
}

Calendario.defaultProps = {
    verMes: true,
    verSemana: true,
    verDia: true,
    verLista: true,
}
Calendario.propTypes = {
    eventos: PropTypes.array,
    verMes: PropTypes.bool,
    verSemana: PropTypes.bool,
    verDia: PropTypes.bool,
    verLista: PropTypes.bool,
};

export {Calendario};
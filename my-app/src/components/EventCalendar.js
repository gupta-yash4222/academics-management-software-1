import React from 'react';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!


export default class EventCalendar extends React.Component {
    render() {
      const calendarRef = React.createRef()
      return (
        <FullCalendar
          ref={calendarRef}
          plugins={[ dayGridPlugin]}
          initialView="dayGridMonth"
          events={[
            { title: 'event 1', date: '2022-03-01' },
            { title: 'event 2', date: '2022-03-04' },
            { title: 'event 3', date: '2022-03-29' },
          ]}
          headerToolbar={{
            left: "prev,next",
            centre: "Title",
            right: "dayGridDay,dayGridWeek,dayGridMonth"
          }}
        />
      )
    }
  }

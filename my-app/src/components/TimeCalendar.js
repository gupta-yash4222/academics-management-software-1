import React from 'react';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import timeGridPlugin from '@fullcalendar/timegrid'


export default class TimeCalendar extends React.Component {
  render() {
    const calendarRef = React.createRef()
    return (
      <FullCalendar
        ref={calendarRef}
        plugins={[timeGridPlugin ]}
        initialView="timeGridDay"
        events={[
          { title: 'event 1', date: '2022-03-01' },
          { title: 'event 2', date: '2022-03-04' },
          { title: 'event 3', date: '2022-03-29' },
        ]}
        headerToolbar={{
          left: "prev,next",
          centre: "Title",
          right: "timeGridDay,timeGridWeek"
        }}
      />
    )
  }
}
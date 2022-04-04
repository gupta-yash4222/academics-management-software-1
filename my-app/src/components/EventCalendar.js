import React from 'react';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import { SelectionState } from 'draft-js';
import EventCalendarChild from './EventCalenderChild';
import AddEventForm from './AddEventForm';

export default class EventCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pastEvents: [], addedEvents: [] };
  }

  fnGetEvents = async () => {

    try {
      let res = await axios.get('http://localhost:3000/calender')

      console.log(res)
      console.log(res.data.events);
      let arr = res.data.events

      let events = []

      for (let i = 0; i < arr.length; i++) {
        let temp = {
          "title": arr[i].title,
          "startTime": arr[i].startTime,
          "endTime": arr[i].endTime,
          "daysOfWeek": arr[i].daysOfWeek,
        }

        events.push(temp)
      }

      this.setState({ pastEvents: events });

    } catch (error) {
      console.log(error)
    }

  }

  componentDidMount() {
    this.fnGetEvents();
  }

  render() {
    const calendarRef = React.createRef()
    return (
      // <EventCalendarChild pastEvents={this.state.pastEvents} />
      <div>
        <br />
        <div>
          <AddEventForm >  </AddEventForm>
        </div>
        <FullCalendar
          height="auto"
          nowIndicator={true}
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          events={this.state.pastEvents}
          headerToolbar={{
            left: "prev,next",
            centre: "Title",
            right: "dayGridMonth,timeGridDay,timeGridWeek"
          }}
        />
      </div>
    )
  }
}

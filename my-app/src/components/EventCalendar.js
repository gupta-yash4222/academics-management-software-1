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
      let res = await axios.get('http://localhost:3000/calendar/getEvents')

      console.log(res)
      console.log(res.data.events);
      let arr = res.data.events

      let events = []

      for (let i = 0; i < arr.length; i++) {

        let temp = {};

        if(arr[i].startDate === arr[i].endDate) {
            temp = {
              title: arr[i].title,
              start: arr[i].startDate.concat("T", arr[i].startTime),
              end: arr[i].endDate.concat("T", arr[i].endTime),
              repeatWeekly: arr[i].repeatWeekly,
              content: arr[i].content
          }     
        }

        else {
            temp = {
              "title": arr[i].title,
              "start": arr[i].startDate,
              "end": arr[i].endDate,
              "repeatWeekly": arr[i].repeatWeekly,
              "content": arr[i].content
            }
        }

        console.log(arr[i].repeatWeekly);
        console.log(temp);

      if(arr[i].repeatWeekly) {
          let daysOfWeek = [];
          const date = new Date(arr[i].startDate.split("-"));
          daysOfWeek.push(date.getDay());
          temp['daysOfWeek'] = daysOfWeek;
      }

        events.push(temp)
      }

      this.setState({ pastEvents: events });

    } catch (error) {
      console.log(error)
    }

  }

  componentDidMount() {
    //this.fnGetEvents();
  }

  handleEventClick = ({ event, el }) => {
    console.log("event clicked");
  };

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
          plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          events={this.state.pastEvents}
          eventClick={this.handleEventClick}
          editable={true}
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

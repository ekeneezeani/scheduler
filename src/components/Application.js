import React, { useEffect, useState } from "react";
import axios from "axios"
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "../helpers/selectors"
// import getInterview from "../helpers/getInterview"
// import getInterviewersForDay from "helpers/getInterviewersForDay";


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => {
    setState(prev =>({...prev,day}))
  }  
  
  useEffect(()=>{
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then((all)=>{
      setState(prev => ({...prev, days: all[0].data, appointments:all[1].data, interviewers:  all[2].data }));
    })
  },[])

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

   return axios.put(`/api/appointments/${id}`, appointment).then(()=>{
      setState({
        ...state,
        appointments
      });
    })

    // console.log("BookInterview",id, interview);
  }

  function cancelInterview(id){
    console.log(id)
    const appointment = {
      ...state.appointments[id], interview: null
    }
    
    const appointments = {
      ...state.appointments, [id]: appointment
    }
    console.log(appointments)
    
    return axios.delete(`/api/appointments/${id}`, appointment).then(()=>{
      setState({
        ...state,
        appointments
      });
    })

  }

  const appointments = getAppointmentsForDay(state,state.day);
  const interviewers = getInterviewersForDay(state, state.day);



  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (    
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
          <img
            className="sidebar--centered"
            src="images/logo.png"
            alt="Interview Scheduler"
          />

          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay}></DayList>
          </nav>
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
          />
      </section>
      <section className="schedule">
        {schedule}  
      </section>
    </main>
  );
}

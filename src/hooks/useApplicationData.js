import React, { useEffect, useState } from "react";
import axios from "axios"

export default function useApplicationData(){

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
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
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
    const days = updateSpots(state,appointments)
      setState({
        ...state,
        appointments,days
      });
    })

    // console.log("BookInterview",id, interview);
  }

  function cancelInterview(id){
    const appointment = {
      ...state.appointments[id], interview: null
    }
    
    const appointments = {
      ...state.appointments, [id]: appointment
    }
    // console.log(appointments)
    
    return axios.delete(`/api/appointments/${id}`, appointment).then(()=>{
      const days = updateSpots(state,appointments)
      setState({
        ...state,
        appointments,days
      });
    })
    
  }


  const updateSpots =  (state, appointments) => {
    const newDays = [...state.days]
    const index = newDays.findIndex(d => d.name === state.day);
    const dayObj = newDays[index];

    let spots = 0;

    for(const id of dayObj.appointments){
      const appointment = appointments[id]
      if(!appointment.interview){
        spots++;
      }
    }
    
    const day = {...dayObj, spots}
    newDays[index] = day;

    return newDays;
  }
  return {state,bookInterview, cancelInterview, setDay}
}
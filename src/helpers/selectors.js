function getAppointmentsForDay(state, day) {
  const days = [...state.days]
  let appointments=[];
  days.filter(element => {
    if (element.name === day) {
      appointments= element.appointments.map(item=>{
        return(state.appointments[item]);
      })
    }
    if(appointments.length===0){
      return null;
    }
    return appointments;
  })
  return appointments
}

export default getAppointmentsForDay;


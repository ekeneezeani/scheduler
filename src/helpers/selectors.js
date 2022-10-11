export function getAppointmentsForDay(state, day) {
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

export function getInterviewersForDay(state, day){
  const days = [...state.days]
  let interviewers = [];
  days.forEach((e)=>{
    if(e.name === day){
      interviewers = e.interviewers.map(interviewer => {
      
        return state.interviewers[interviewer] || [];
      })
    }
  })

  return interviewers;
}


export function getInterview(state, interview){

  return (
    interview && {...interview, interviewer:state.interviewers[interview.interviewer]}
  )
  // const _state = {...state}
  // if(!interview){
  //   return null
  // }

  //   interview.interviewer = _state.interviewers[interview.interviewer];
  
  // return interview;
}



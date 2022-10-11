import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form"
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";
import Error from "./Error";


import "./styles.scss"
import Confirm from "./Confirm";

function Appointment(props){
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE ="ERROR_SAVE"
  const ERROR_DELETE= "ERROR_DELETE"

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);


  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer:interviewer
      // interviewer:props.interviewers.find((value)=>value.id === interviewer)
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(()=>{
      transition(SHOW)
    }).catch(error =>transition(ERROR_SAVE,true))
  }

  function cancelInterview(id){
    
    transition(DELETE, true)
    props.cancelInterview(id).then(()=>{
      transition(EMPTY)
    }).catch(error =>transition(ERROR_DELETE,true))
  }

  console.log("PROPS.IN", props.interview)

  return(
    <article className="appointment">
      <Header time={props.time}/>
    
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    
    {mode === SHOW && (
    <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer} 
    id = {props.id}
    onDelete={()=>transition(CONFIRM)}
    onEdit={()=>transition(EDIT)}/>)}
    
    {mode === CREATE && (
    <Form 
    interviewers={props.interviewers}
    onCancel={()=>back()}
    onSave = {save}
    />)}
    
    {mode === SAVING && <Status message="Saving" />}
    
    {mode === ERROR_SAVE && <Error message=" Could not save appointment" onClose={()=>back()} />}

    {mode === ERROR_DELETE && <Error message="Could not cancel appointment" onClose={()=>back()} />}

    {mode === CONFIRM && 
    <Confirm onCancel={()=>back()} 
    onConfirm={cancelInterview} 
    id={props.id}
    message="Are you sure you want to delete?"/>} 
    {mode === DELETE && <Status message="Deleting"/>}  

    {mode === EDIT && (
    <Form 
    interviewers={props.interviewers}
    onCancel={()=>back()}
    onSave = {save}
    interviewer={props.interview.interviewer.id}
    student={props.interview.student}
    />)}

    </article>  
  )
}
export default Appointment;

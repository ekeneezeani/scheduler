import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import '../styles/variables.scss'


function InterviewerList(props){
  const interviewerList = props.interviewers.map((interviewer) =>{
    return (
      <InterviewerListItem
      key = {interviewer.key}
      avatar = {interviewer.avatar}
      name = {interviewer.name}
      selected = {props.value === interviewer.id}
      setInterviewer = {() => props.onChange(interviewer.id)}
      />
    )
  })

  return(
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
      {interviewerList}
      </ul>
    </section>

  )

}

export default InterviewerList;
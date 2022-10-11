import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import '../styles/variables.scss'
import PropTypes from 'prop-types'; 

function InterviewerList(props){


  const interviewerList = props.interviewers.map((interviewer) =>{
    return (
      <InterviewerListItem
      key = {interviewer.id}
      id= {interviewer.id}
      avatar = {interviewer.avatar}
      name = {interviewer.name}
      selected = {props.interviewerId === interviewer.id}
      setInterviewer = {props.onChange}
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

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};
export default InterviewerList;
import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const Appointment = (props) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);

    props.bookInterview(props.id, interview, (err) => {
      if (err) return transition(ERROR_SAVE, true);

      return transition(SHOW);
    });
  }

  function onDelete() {
    transition(CONFIRM);
  }

  function onEdit() {
    transition(EDIT);
  }

  function confirmDelete() {
    transition(DELETING, true);

    props.deleteInterview(props.id, (error) => {
      if (error) return transition(ERROR_DELETE, true);

      return transition(EMPTY);
    });
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}
      {mode === EDIT && (
        <Form
          onSave={save}
          interviewers={props.interviewers}
          {...props.interview}
          onCancel={back}
        />
      )}
      {mode === CREATE && (
        <Form onSave={save} interviewers={props.interviewers} onCancel={back} />
      )}
      {mode === SAVING && <Status message={SAVING} />}
      {mode === DELETING && <Status message={DELETING} />}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to delete?"}
          onConfirm={confirmDelete}
          onCancel={back}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message={"Could not create an appointment."} onClose={back} />
      )}
      {mode === ERROR_DELETE && (
        <Error message={"Could not delete appointment."} onClose={back} />
      )}
    </article>
  );
};

export default Appointment;

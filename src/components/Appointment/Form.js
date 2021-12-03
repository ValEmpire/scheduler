import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

const Form = (props) => {
  const { student, interviewer, interviewers, onSave, onCancel } = props;

  const [name, setName] = useState(student || "");

  const [interviewerVal, setInterviewerVal] = useState(
    interviewer ? interviewer.id : null
  );

  const handleOnChange = (e) => {
    setName(e.target.value);
  };

  const reset = () => {
    setName("");
    setInterviewerVal(null);
  };

  const cancel = () => {
    reset();
    onCancel();
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={(e) => handleOnChange(e)}
            value={name}
          />
        </form>
        <InterviewerList
          interviewers={interviewers}
          value={interviewerVal}
          onChange={setInterviewerVal}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={() => onSave(name, interviewerVal)}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
};

export default Form;

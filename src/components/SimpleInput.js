import { useState } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const [enteredEmailTouched, setEnteredEmailTouched] = useState("");

  
  const enteredNameIsValid = enteredName.trim() !== "";
  
  function validateEmail(mail) {
    return /(.+)@(.+){2,}\.(.+){2,}/.test(mail);
  }
  const enteredEmailIsValid = validateEmail(enteredEmail);
  // console.log(enteredEmailIsValid);

  const showNameError = !enteredNameIsValid && enteredNameTouched
  const showEmailError = !enteredEmailIsValid && enteredEmailTouched

  let formIsValid = false;
  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const nameInputBlur = () => {
    setEnteredNameTouched(true);
  };
  
  const emailInputBlur = () => {
    setEnteredEmailTouched(true);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    setEnteredNameTouched(true);
    setEnteredEmailTouched(true)
    if (!formIsValid) {
      return;
    }
    console.log('valid!');
    setEnteredName("");
    setEnteredEmail("")
    setEnteredNameTouched(false);
    setEnteredEmailTouched(false)
  };

  const nameInputClasses = showNameError ? "form-control invalid" : "form-control";
  const emailInputClasses = showNameError ? "form-control invalid" : "form-control";
  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onBlur={nameInputBlur}
          onChange={nameInputChangeHandler}
        />
        {showNameError && <p className="error-text">name cannot be empty</p>}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          onBlur={emailInputBlur}
          onChange={emailInputChangeHandler}
          placeholder="a@bc.de"
        />
        {showEmailError && <p className="error-text">email must be valid</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState()
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const errors = []
    if(password !== repeatPassword) errors.push('Passwords must match')
    setErrors(errors)
  }, [password, repeatPassword])

  const onSignUp = async (e) => {
    e.preventDefault();
    setHasSubmitted(true)


    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <form 
    className="background_modal"
    onSubmit={onSignUp}>
        <h1>Join Contempo</h1>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={updateUsername}
          value={username}
          ></input>
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={updateEmail}
          value={email}
          ></input>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={updatePassword}
          value={password}
          ></input>
        <input
          type="password"
          name="repeat_password"
          placeholder="Confirm Password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          ></input>
          <div>
            {hasSubmitted && errors.length > 0 &&(
              errors.map((error, ind) => (
                <div className='errors' key={ind}>{error}</div>
              ))
              )} 
          </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;

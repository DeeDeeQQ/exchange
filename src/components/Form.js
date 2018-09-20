import React from "react";
import { Form, Field } from "react-final-form";
import axios from "axios";
import styled from "react-emotion";

import Spinner from "./Spinner";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
  await sleep(300);
  const url = "https://nodeserverapis.herokuapp.com/api/register";
  const data = JSON.stringify(values, 0, 2);

  axios
    .post(url, {
      topic: "register",
      body: data
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
};

const required = value => (value ? undefined : "Required");
const strongTest = value => (value.length < 8 ? "Too short" : undefined);

const simpleMemoize = fn => {
  let lastArg;
  let lastResult;
  return arg => {
    if (arg !== lastArg) {
      lastArg = arg;
      lastResult = fn(arg);
    }
    return lastResult;
  };
};

const emailAvailable = simpleMemoize(async value => {
  if (!value) {
    return "Required";
  }
  await sleep(400);
  if (
    ~["john@gmail.com", "deedeeqqs@gmail.com"].indexOf(
      value && value.toLowerCase()
    )
  ) {
    return "Registered";
  }
});

const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);

const RegisterForm = () => (
  <DivForm>
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, pristine, validating, values }) => (
        <form onSubmit={handleSubmit}>
          {validating && <Spinner />}
          <Field
            name="email"
            validate={composeValidators(emailAvailable, required)}
          >
            {({ input, meta }) => (
              <div>
                <label>Email</label>
                <input {...input} type="text" placeholder="Email" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="name" validate={required}>
            {({ input, meta }) => (
              <div>
                <label>Name</label>
                <input {...input} type="text" placeholder="Name" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field
            name="password"
            validate={composeValidators(required, strongTest)}
          >
            {({ input, meta }) => (
              <div>
                <label>Password</label>
                <input {...input} type="password" placeholder="Password" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>

          <button type="submit" disabled={submitting}>
            Submit
          </button>
        </form>
      )}
    />
  </DivForm>
);

export default RegisterForm;

const DivForm = styled("div")`
  align: right;
  max-width: 500px;
  & > form {
    max-width: 500px;
    margin: 10px auto;
    padding: 20px;
    position: relative;
    & > div {
      display: flex;
      flex-flow: row nowrap;
      line-height: 2em;
      margin: 5px;
      & > label {
        color: white;
        width: 110px;
        font-weight: semi-bold;
        font-size: 1.3em;
        line-height: 32px;
      }
      & > input,
      & > textarea {
        flex: 1;
        padding: 3px 5px;
        font-size: 1em;
        margin-left: 15px;
        border: 1px solid #ccc;
        border-radius: 3px;
      }
      & > div {
        margin-left: 16px;
        & > label {
          display: block;
          & > input {
            margin-right: 3px;
          }
        }
      }
      & > span {
        line-height: 32px;
        margin-left: 10px;
        color: #800;
        font-weight: bold;
      }
    }
    button {
      white-space: nowrap;
      background-color: #4caf50;
      display: inline-block;
      border-radius: 5px;
      padding: 5px 15px;
      font-size: 16px;
      color: white;
      border: 1px solid #3a843d;
      &:visited {
        color: black;
      }
    }
  }
`;

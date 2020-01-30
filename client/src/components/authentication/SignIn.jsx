import React, { useState } from "react";
import { useFormik } from "formik";
import {
  TextField,
  InputLabel,
  Button,
  Typography,
  IconButton,
  InputAdornment
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { css } from "emotion";
import { useLazyQuery } from "@apollo/react-hooks";
import { LOGIN } from "../../apollo/constants";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function SignIn() {
  const { isLoggedIn } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [isPasswordShown, setPassShowed] = useState(false);
  const [handleLogin, { loading, data }] = useLazyQuery(LOGIN, {
    onCompleted: data => {
      data.login && dispatch({ type: "LOGIN", payload: { ...data.login } });
    }
  });
  const formik = useFormik({
    initialValues: {
      password: "",
      email: ""
    },
    onSubmit: values => {
      handleLogin({ variables: { ...values } });
    }
  });
  const handleShowPassword = () => {
    setPassShowed(!isPasswordShown);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  if (loading) return <p>Loading....</p>;

  if (data && data.login) {
    return <Redirect to="/" />;
  }
  return (
    <form
      className={css`
        height: 500px;
        width: 600px;
        margin: auto;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        & > button {
          align-self: flex-end;
          width: 100px;
        }
      `}
      onSubmit={formik.handleSubmit}
    >
      <Typography variant="h2">Sign In</Typography>
      <InputLabel />
      <TextField
        variant="outlined"
        type="email"
        name="email"
        label="Email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <TextField
        variant="outlined"
        type={isPasswordShown ? "text" : "password"}
        name="password"
        label="Password"
        onChange={formik.handleChange}
        value={formik.values.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {isPasswordShown ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <Link to="/register">Don't have an account?</Link>
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
}

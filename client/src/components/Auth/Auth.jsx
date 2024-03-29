import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { signUp, signIn } from '../../actions/auth'
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core"
import jwt_decode from "jwt-decode"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"

import { GoogleLogin } from "@react-oauth/google"

import useStyles from "./styles"
import Input from "./Input"

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
}

const Auth = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [isSignup, setIsSignup] = useState(false)
  const [formData, setFormData] = useState(initialState)

  const handleSubmit = e => {
    e.preventDefault()

    if(isSignup) {
      dispatch(signUp(formData, navigate))
    }else{
      dispatch(signIn(formData, navigate))
    }
  }

  const handleChange = e => {
    const name = e.target.name
    const value = e.target.value
    setFormData({...formData, [name] : value})
  }

  const handleShowPassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword)
  }

  const switchMode = () => {
    setIsSignup(prevMode => !prevMode)
    setShowPassword(false)
  }

  const googleSuccess = async res => {
    const result = jwt_decode(res?.credential)
    const token = result?.sub

    try {
      dispatch({ type: "AUTH", data: { result, token } })
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }
  const googleError = () => {
    console.log("Google Sign In was unsuccessful.")
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  handleChange={handleChange}
                  name='firstName'
                  label='Firstname'
                  half
                  autoFocus
                  type='text'
                />
                <Input
                  handleChange={handleChange}
                  name='lastName'
                  label='Lastname'
                  half
                  type='text'
                />
              </>
            )}
            <Input
              handleChange={handleChange}
              name='email'
              label='Email Address'
              type='email'
            />
            <Input
              handleChange={handleChange}
              name='password'
              label='Password'
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                handleChange={handleChange}
                name='confirmPassword'
                label='Repeat Password'
                type='password'
                handleShowPassword={handleShowPassword}
              />
            )}
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}>
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin onSuccess={googleSuccess} onError={googleError} />
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth

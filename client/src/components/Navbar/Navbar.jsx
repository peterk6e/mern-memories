import React, { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core"
import { useDispatch } from "react-redux"

import memories from "../../images/memories.png"
import useStyles from "./styles"

const Navbar = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")))

  useEffect(() => {
    const token = user?.token
    // JWT ...

    setUser(JSON.parse(localStorage.getItem("profile")))
  }, [location])

  const logout = () => {
    try {
      dispatch({ type: "LOGOUT" })
      setUser(null)
      navigate('/')
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to='/'
          className={classes.heading}
          variant='h2'
          align='center'>
          Memories
        </Typography>
        <img className={classes.image} src={memories} alt='mem' height='60' />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}>
              {user.result.name.charAt(0)}
            </Avatar>

            <Typography className={classes.userName} variant='h6'>
              {user.result.name}
            </Typography>
            <Button
              variant='contained'
              className={classes.logout}
              color='secondary'
              onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to='/auth'
            varaint='contained'
            color='primary'>
            Sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
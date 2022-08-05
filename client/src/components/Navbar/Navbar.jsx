import React, { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core"
import { useDispatch } from "react-redux"
import decode from "jwt-decode"

import memories from "../../images/memories.png"
import useStyles from "./styles"

const Navbar = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")))

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")))
    // Handle token Expiration (not working with google auth)
    // const token = user?.token
    // if (token) {
    //   const decodedToken = decode(token)
    //   if (decodedToken.exp * 1000 < new Date().getTime()) logout()
    //  }
  }, [location])

  const logout = () => {
    try {
      dispatch({ type: "LOGOUT" })
      setUser(null)
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
      <div className={classes.brandContainer}>
        <img className={classes.image} src={memories} alt='mem' height='60' />
        <Typography
          component={Link}
          to='/'
          className={classes.heading}
          variant='h2'
          align='center'>
          Memories
        </Typography>
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Typography className={classes.userName} variant='h6'>
              <Avatar
                className={classes.purple}
                alt={user.result.name}
                src={user.result.imageUrl}>
                {user.result.name.charAt(0)}
              </Avatar>
              &nbsp;{user.result.name}
            </Typography>
            <Button className={classes.logout} onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to='/auth'
            variant='contained'
            color='primary'>
            Sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar

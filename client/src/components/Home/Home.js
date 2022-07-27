import React, { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import {
  Grow,
  Grid,
  Container,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core"
import { useDispatch } from "react-redux"
import ChipInput from "material-ui-chip-input"

import Form from "../Form/Form"
import Posts from "../Posts/Posts"
import Paginate from "../Pagination/Pagination"

import { getPosts } from "../../actions/posts"
import useStyles from "./styles"

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null)
  const classes = useStyles()
  const query = useQuery()
  const navigate = useNavigate()
  const page = query.get("page") || 1
  const searchQuery = query.get("searchQuery")
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPosts())
  }, [currentId, dispatch])

  return (
    <Grow in>
      <Container maxWidth='xl'>
        <Grid
          container
          className={classes.gridContainer}
          justifyContent='space-between'
          alignItems='stretch'
          spacing={3}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearched}
              position='static'
              color='inherit'>
              <TextField
                name='search'
                variant='outlined'
                label='Search Memories'
                fullWidth
                value="TEST"
                onChange={()=>{}}
              />
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper elevation={6}>
              <Paginate />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Home

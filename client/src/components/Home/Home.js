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
import Pagination from "../Pagination/Pagination"

import { getPosts, getPostsBySearch } from "../../actions/posts"
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
  const [search, setSearch] = useState("")
  const [tags, setTags] = useState([])

  useEffect(() => {
    dispatch(getPosts())
  }, [currentId, dispatch])

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(
        getPostsBySearch({
          search,
          tags: tags.join(","), // can not send array through URL so we convert tags array to a string
        })
      )
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      )
    } else {
      navigate("/")
    }
  }

  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      searchPost()
    }
  }

  const handleAdd = tag => setTags([...tags, tag])

  const handleDelete = tagToDelete =>
    setTags(tags.filter(tag => tag !== tagToDelete))

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
              className={classes.appBarSearch}
              position='static'
              color='inherit'>
              <TextField
                name='search'
                variant='outlined'
                label='Search Memories'
                onKeyDown={handleKeyDown}
                fullWidth
                value={search}
                onChange={e => {
                  setSearch(e.target.value)
                }}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label='Search Tags'
                variant='outlined'
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                variant='contained'
                color='primary'
                disabled={!(tags.length > 0) && !search}
                >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <Paper elevation={6} className={classes.pagination}>
                <Pagination page={Number(page)} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Home

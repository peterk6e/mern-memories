import React from "react"
import { Grid, CircularProgress } from "@material-ui/core"
import Post from "./Post/Post"

import { useSelector } from "react-redux"

import useStyles from "./styles"
import { Link } from "react-router-dom"

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector(state => state.posts)
  const classes = useStyles()

  if (!posts.length && !isLoading) {
    return (
      <div className={classes.actionDiv}>
        <h2>Sorry, no posts match your criteria</h2>
        <Link
          to='/'
          align='center'>
          Show all posts
        </Link>
      </div>
    )
  }

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems='stretch'
      spacing={3}>
      {posts.map(post => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  )
}

export default Posts

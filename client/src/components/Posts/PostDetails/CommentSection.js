import React, { useState, useRef } from "react"
import { Typography, TextField, Button } from "@material-ui/core"
import { useDispatch } from "react-redux"
import { commentPost } from "./../../../actions/posts"

import useStyles from "./styles"

const CommentSection = ({ post }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [comments, setComments] = useState(post?.comments)
  const [comment, setComment] = useState("")
  const user = JSON.parse(localStorage.getItem("profile"))

  const handleClick = async () => {
    const finalComment = `${user.result.name} : ${comment} `
    const newComments = await dispatch(commentPost(finalComment, post._id))

    setComments(newComments)
    setComment('')
  }

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant='h6'>
            Comments
          </Typography>
          {comments.map((c, i) => (
            <Typography key={i} gutterBottom variant='subtitle1'>
              {c}
            </Typography>
          ))}
        </div>
        {user?.result?.name && (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant='subtitle1'>
              Write a Comment
            </Typography>
            <TextField
              fullWidth
              rows={4}
              variant='outlined'
              label='Comment'
              multiline
              value={comment}
              onChange={e => setComment(e.target.value)}
            />
            <Button
              style={{ margintop: "10px" }}
              color='primary'
              fullWidth
              disabled={!comment}
              variant='contained'
              onClick={handleClick}>
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CommentSection

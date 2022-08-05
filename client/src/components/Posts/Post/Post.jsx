import React from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { deletePost, likePost } from "../../../actions/posts"
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@material-ui/core"
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt"
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined"
import DeleteIcon from "@material-ui/icons/Delete"
import MoreHorizIcon from "@material-ui/icons/MoreHoriz"
import moment from "moment"
import useStyles from "./styles"

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem("profile"))

  const openPost = () => {
    navigate(`/posts/${post._id}`)
  }

  const Likes = () => {
    const numberOfLikes = post.likes.length

    if (numberOfLikes > 0) {
      return post.likes.find(like => user?.result?.sub || user?.result?._id) ? (
        <>
          <ThumbUpAltIcon fontSize='small' /> &nbsp;
          {numberOfLikes > 2
            ? `You and ${numberOfLikes - 1} others`
            : `${numberOfLikes} Like${numberOfLikes > 1 ? "s" : ""} `}
        </>
      ) : (
        <>
          <ThumbUpAltIcon fontSize='small' /> &nbsp;{numberOfLikes}{" "}
          {numberOfLikes === 1 ? "Like" : "Likes"}
        </>
      )
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize='small' /> &nbsp;Like
      </>
    )
  }

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase className={classes.cardAction} onClick={openPost}>
        <CardMedia
          className={classes.media}
          image={post.selectedFile}
          title={post.title}
        />

        <div className={classes.overlay}>
          <Typography variant='h6'>{post.name}</Typography>
          <Typography variant='body2'>
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        <div className={classes.details}>
          <Typography variant='body2' color='textSecondary'>
            {post.tags.map(tag => `#${tag} `)}
          </Typography>
        </div>
        <Typography className={classes.title} variant='h5' gutterBottom>
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            {post.message}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button
          size='small'
          color='primary'
          disabled={!user?.result}
          onClick={() => {
            dispatch(likePost(post._id))
          }}>
          <Likes />
        </Button>
        {user?.result?.sub === post?.creator ||
        user?.result?._id === post?.creator ? (
          <>
            <Button
              color='primary'
              size='small'
              onClick={() => {
                setCurrentId(post._id)
              }}>
              <MoreHorizIcon fontSize='small' />
            </Button>
            <Button
              size='small'
              color='primary'
              onClick={() => dispatch(deletePost(post._id))}>
              <DeleteIcon fontSize='small' />
            </Button>
          </>
        ) : null}
      </CardActions>
    </Card>
  )
}

export default Post

import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material'
import { ChatBubbleOutlineOutlined, FavoriteBorderOutlined, FavoriteOutlined, ShareOutlined } from "@mui/icons-material"
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setPost } from '../state/state'
import Friend from './Friend'

const Post = ({
  postId,
  postUserId,
  firstName,
  lastName,
  location,
  userPicturePath,
  description,
  postPicturePath,
  likes,
  comments
}) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const loggedInUserId = useSelector((state) => state.user._id)
  const isLike = Boolean(likes[loggedInUserId])
  const likeCount = Object.keys(likes).length

  const token = useSelector((state) => state.token)

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3003/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId: loggedInUserId})
    })
    const updatedPost = await response.json()
    dispatch(setPost({ post: updatedPost }))
  }

  const [isComment, setIsComment] = useState(false)

  return (
    <Box
      sx={{ backgroundColor: theme.palette.background.over }}
      padding="20px"
      borderRadius="15px"
      display="flex"
      flexDirection="column"
      mt="30px"
    >
      <Friend 
        friendId={postUserId}
        lastName={lastName}
        firstName={firstName}
        location={location}
        userPicturePath={userPicturePath}
      />
      <Typography fontSize="17px" color={theme.palette.typography.paragraph} mt="15px">{description}</Typography>
      {postPicturePath && (
        <img
          width="100%"
          height="auto"
          alt="post image"
          style={{ borderRadius: "15px", marginTop: "15px" }}
          src={`http://localhost:3003/assets/${postPicturePath}`}
        />
      )}

      <Box display="flex" justifyContent="space-between" mt="15px"> 
        <Box display="flex" gap="30px">
          <Box display="flex" gap="3px" alignItems="center">
            <IconButton onClick={()=> patchLike()}>
              {isLike ? (
                <FavoriteOutlined sx={{ color: theme.palette.logo.normal }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </Box>

          <Box display="flex" gap="3px" alignItems="center">
            <IconButton onClick={() => setIsComment(!isComment)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </Box>
        </Box>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </Box>

      {isComment && (
        <Box mt="15px">
        {comments.map((comment, i) => (
          <Box key={`${firstName} ${lastName} - ${i}`}>  
            <Divider />
            <Typography sx={{ my: "8px", pl: "15px" }}>{comment}</Typography>
          </Box>
        ))}
        <Divider />
        </Box>
      )}
    </Box>
  )
}

export default Post
import { Box, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../state/state";
import { useEffect } from "react";
import Friend from "./Friend";


const FriendList = ({ userId }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const token = useSelector((state) => state.token)
  const friends = useSelector((state) => state.user.friends)

  const getFriends = async() => {
    const response = await fetch(`http://localhost:3003/${userId}/friends`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    })
    const data = await response.json()
    dispatch(setFriends({ friends: data }))
  }

  useEffect(() => {
    getFriends()
  }, [])

  return (
    <Box
      sx={{ backgroundColor: theme.palette.background.over }}
      padding="20px"
      borderRadius="15px"
      display="flex"
      flexDirection="column"
    >
      <Typography
        variant="h5"
        fontWeight="500"
        sx={{ mb: "15px" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="15px">
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            firstName={friend.firstName}
            lastName={friend.lastName}
            occupation = {friend.occupation}
            userPicturePath={friend.userPicturePath}
          />
        ))}
      </Box>
    </Box>
  );
};

export default FriendList;

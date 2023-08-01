import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../state/state";
import { Box, Typography, IconButton } from "@mui/material";
import { PersonAdd, PersonRemove } from "@mui/icons-material";
import { useTheme } from "@emotion/react";

const Friend = ({
  friendId,
  firstName,
  lastName,
  location,
  userPicturePath,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const isFriend = friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3003/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box
        display="flex"
        gap="15px"
        alignItems="center"
        onClick={() => {
          navigate(`/profile/${friendId}`);
          navigate(0);
        }}
        sx={{ "&:hover": { cursor: "pointer" } }}
      >
        <Box width="60px" height="60px">
          <img
            src={`http://localhost:3003/assets/${userPicturePath}`}
            alt="UserImage"
            width="60px"
            height="60px"
            style={{ objectFit: "cover", borderRadius: "50%" }}
          />
        </Box>
        <Box>
          <Typography
            variant="h4"
            color={theme.palette.typography.title}
            fontWeight="500"
            sx={{
              "&:hover": {
                cursor: "pointer",
                color: theme.palette.logo.normal,
              },
            }}
          >
            {firstName} {lastName}
          </Typography>
          <Typography fontSize="14px" color={theme.palette.typography.subtitle}>
            {location}
          </Typography>
        </Box>
      </Box>

      <IconButton
        onClick={() => patchFriend()}
        sx={{
          backgroundColor: theme.palette.background.icon,
          width: "35px",
          height: "35px",
          padding: "10px",
        }}
      >
        {isFriend ? <PersonAdd /> : <PersonRemove />}
      </IconButton>
    </Box>
  );
};

export default Friend;

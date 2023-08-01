import { useTheme, Box, Typography, Divider } from "@mui/material";
import { ManageAccounts, LocationOn, Work, Edit } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const token = useSelector((state) => state.token);
  const [user, setUser] = useState(null);
  const getUser = async () => {
    const response = await fetch(`http://localhost:3003/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // This empty dependency array ensures the effect runs only once when the component mounts

  if (!user) return null; // If the user data is not available yet, return null (or a loading indicator)

  const {
    firstName,
    lastName,
    userPicturePath,
    friends,
    location,
    occupation,
    viewedProfile,
    impressions,
  } = user;

  return (
    <Box
      sx={{ backgroundColor: theme.palette.background.over }}
      padding="20px"
      borderRadius="15px"
      display="flex"
      flexDirection="column"
      gap="20px"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {/* FIRST ROW */}
        <Box
          display="flex"
          gap="15px"
          alignItems="center"
          onClick={() => {
            navigate(`/profile/${userId}`);
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
              variant="h3"
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
            <Typography
              fontSize="16px"
              color={theme.palette.typography.subtitle}
            >
              {friends && (friends.length === 0 ? "0" : friends.length)} friends
            </Typography>
          </Box>
        </Box>

        <ManageAccounts sx={{ fontSize: "30px" }} />
      </Box>

      <Divider />

      {/* SECOND ROW */}
      <Box>
        <Box display="flex" gap="20px" mb="10px" alignItems="center">
          <LocationOn sx={{ fontSize: "30px" }} />
          <Typography fontSize="18px">{location}</Typography>
        </Box>
        <Box display="flex" gap="20px" alignItems="center">
          <Work sx={{ fontSize: "30px" }} />
          <Typography fontSize="18px">{occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb="10px"
        >
          <Typography fontSize="15px">Who's viewed your profile</Typography>
          <Typography fontSize="15px" fontWeight="600">
            {viewedProfile}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography fontSize="15px">Impressions of your post</Typography>
          <Typography fontSize="15px" fontWeight="600">
            {impressions}
          </Typography>
        </Box>
      </Box>

      <Divider />

      {/* FOURTH ROW */}
      <Box>
        <Typography variant="h5" fontWeight="500" mb="15px">
          Social Profiles
        </Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb="15px"
        >
          <Box display="flex" gap="20px" alignContent="center">
            <img
              src="../assets/twitter.png"
              alt="Twitter Logo"
              style={{ objectFit: "none" }}
            />
            <Box>
              <Typography fontWeight="500">Twitter</Typography>
              <Typography color={theme.palette.typography.subtitle}>
                Social Network
              </Typography>
            </Box>
          </Box>
          <Edit />
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" gap="20px" alignContent="center">
            <img
              src="../assets/linkedin.png"
              alt="LinkedIn Logo"
              style={{ objectFit: "none" }}
            />
            <Box>
              <Typography fontWeight="500">LinkedIn</Typography>
              <Typography color={theme.palette.typography.subtitle}>
                Network Platform
              </Typography>
            </Box>
          </Box>
          <Edit />
        </Box>
      </Box>
    </Box>
  );
};

export default UserWidget;

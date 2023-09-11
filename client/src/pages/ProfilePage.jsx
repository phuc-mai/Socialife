import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, useMediaQuery } from "@mui/material";

import Navbar from "../components/Navbar";
import UserWidget from "../components/UserWidget";
import FriendList from "../components/FriendList";
import MyPost from "../components/MyPost";
import Posts from "../components/Posts";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);

  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  const getUser = async () => {
    const response = await fetch(`https://socialifeserver.phucmai.com/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        padding="30px 6%"
        display="flex"
        flexDirection={isNonMobile ? "row" : "column"}
        gap="60px"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobile ? "26%" : undefined}>
          <UserWidget userId={userId} />
          <Box m="30px 0" />
          <FriendList userId={userId} />
        </Box>

        <Box flexBasis={isNonMobile ? "42%" : undefined}>
          <MyPost userPicturePath={user.userPicturePath} />
          <Posts userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;

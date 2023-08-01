import { useSelector } from "react-redux";
import { Box, useMediaQuery } from "@mui/material";

import Navbar from "../components/Navbar";
import UserWidget from "../components/UserWidget";
import MyPost from "../components/MyPost";
import FriendList from "../components/FriendList";
import Posts from "../components/Posts";

const HomePage = () => {
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const { _id, userPicturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <Navbar />
      <Box
        padding="30px 6%"
        display="flex"
        flexDirection={isNonMobile ? "row" : "column"}
        gap="30px"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobile ? "26%" : undefined}>
          <UserWidget userId={_id} />
        </Box>

        <Box flexBasis={isNonMobile ? "42%" : undefined}>
          <MyPost userPicturePath={userPicturePath} />
          <Posts userId={_id}/>
        </Box>

        {isNonMobile && (
          <Box flexBasis="26%">
            <FriendList userId={_id}/>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;

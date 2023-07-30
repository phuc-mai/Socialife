import { useSelector } from "react-redux";
import { Box, useMediaQuery } from "@mui/material";

import Navbar from "../components/Navbar";
import UserWidget from "../components/UserWidget";
import MyPost from "../components/MyPost";

const HomePage = () => {
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const { _id, userPicturePath } = useSelector((state) => state.user)

  return (
    <Box>
      <Navbar />
      <Box
        padding="30px 6%"
        display={isNonMobile ? "flex" : "block"}
        gap="50px"
      >
        <Box flexBasis={isNonMobile ? "26%" : undefined}>
          <UserWidget userId={_id} />
        </Box>

        <Box flexBasis={isNonMobile ? "42%" : undefined}>
          <MyPost userPicturePath={userPicturePath}/>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;

import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import UserWidget from "../components/UserWidget";
import { Box, useMediaQuery } from "@mui/material";

const HomePage = () => {
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const { _id } = useSelector((state) => state.user)

  return (
    <Box>
      <Navbar />
      <Box
        padding="30px 6%"
        display={isNonMobile ? "flex" : "block"}
        justifyContent="space-between"
        gap="10px"
      >
        <Box flexBasis={isNonMobile ? "26%" : undefined}>
          <UserWidget userId={_id} />
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;

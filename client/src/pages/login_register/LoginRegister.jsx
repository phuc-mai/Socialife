import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

const LoginRegister = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  return (
    <Box>
      <Box
        padding="15px 0"
        backgroundColor={theme.palette.background.over}
        textAlign="center"
      >
        <Typography
          variant="h1"
          color={theme.palette.logo.normal}
          fontWeight="700"
        >
          Socialife
        </Typography>
      </Box>

      <Box
        width={isNonMobile ? "50%" : "93%"}
        backgroundColor={theme.palette.background.over}
        padding="30px"
        borderRadius="15px"
        margin="50px auto"
      >
        <Typography
          variant="h5"
          fontWeight="500"
          marginBottom="30px"
        >
          Welcome to Socialife, the Social Media for Sociopaths!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginRegister;

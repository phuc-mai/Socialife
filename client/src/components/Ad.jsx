import { Box, Typography, useTheme } from "@mui/material";

const Ad = () => {
  const theme = useTheme();

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
        <Typography
          variant="h4"
          color={theme.palette.typography.title}
          fontWeight="500"
        >
          Sponsored
        </Typography>
        <Typography
          variant="h5"
          color={theme.palette.typography.subtitle}
          fontWeight="500"
        >
          Create Ad
        </Typography>
      </Box>
      <img
        width="100%"
        height="auto"
        alt="advertisement"
        src="https://socialifeserver.phucmai.com/assets/ad.jpeg"
        style={{ borderRadius: "15px" }}
      />
      <Box>
        <Typography color={theme.palette.typography.title}>MikaCosmetics</Typography>
        <Typography color={theme.palette.typography.subtitle}>mikacosmetics.com</Typography>
      </Box>
      <Typography color={theme.palette.typography.paragraph} m="0.5rem 0">
        Your pathway to stunning and immaculate beauty and made sure your skin
        is exfoliating skin and shining like light.
      </Typography>
    </Box>
  );
};

export default Ad;

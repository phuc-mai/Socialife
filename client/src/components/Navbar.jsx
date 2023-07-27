import {
  useTheme,
  Box,
  Typography,
  InputBase,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import {
  Help,
  LightMode,
  Message,
  Notifications,
  Search,
  Menu,
  DarkMode,
  Close,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setLogout, setMode } from "../state/state";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const theme = useTheme();
  const iconColor = theme.palette.icon;
  const fullName = "Phuc Mai";

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  return (
    <Box padding="15px 6%" display="flex" justifyContent="space-between" backgroundColor={theme.palette.background.over}>
      <Box display="flex" gap="30px">
        <Typography
          variant="h1"
          fontWeight="700"
          color={theme.palette.logo.normal}
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              cursor: "pointer",
              color: theme.palette.logo.hover,
            },
          }}
        >
          Socialife
        </Typography>
        {isNonMobile && (
          <Box
            backgroundColor={theme.palette.background.default}
            borderRadius="10px"
            width="280px"
            padding="2px 15px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search sx={{ color: iconColor }} />
            </IconButton>
          </Box>
        )}
      </Box>

      {isNonMobile ? (
        <Box display="flex" gap="30px" alignItems="center">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "light" ? (
              <LightMode sx={{ color: iconColor, fontSize: "25px" }} />
            ) : (
              <DarkMode sx={{ color: iconColor, fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton>
            <Message sx={{ color: iconColor, fontSize: "25px" }} />
          </IconButton>
          <IconButton>
            <Notifications sx={{ color: iconColor, fontSize: "25px" }} />
          </IconButton>
          <IconButton>
            <Help sx={{ color: iconColor, fontSize: "25px" }} />
          </IconButton>
          <FormControl>
            <Select
              value={fullName}
              sx={{
                backgroundColor: theme.palette.background.default,
                padding: "5px 10px",
                borderRadius: "10px",
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>{fullName}</MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </Box>
      ) : (
        <IconButton onClick={() => setIsMobileMenu(!isMobileMenu)}>
          <Menu sx={{ color: iconColor, fontSize: "25px" }} />
        </IconButton>
      )}

      {isMobileMenu && (
        <Box
          position="fixed"
          top="0"
          right="0"
          height="100%"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={theme.palette.background.over}
          display="flex"
          flexDirection="column"
          gap="50px"
          zIndex="100"
        >
          <Box display="flex" justifyContent="flex-end" p="10px">
            <IconButton onClick={() => setIsMobileMenu(!isMobileMenu)}>
              <Close sx={{ color: iconColor, fontSize: "25px" }} />
            </IconButton>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            gap="30px"
            alignItems="center"
          >
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "light" ? (
                <LightMode sx={{ color: iconColor, fontSize: "25px" }} />
              ) : (
                <DarkMode sx={{ color: iconColor, fontSize: "25px" }} />
              )}
            </IconButton>
            <IconButton>
              <Message sx={{ color: iconColor, fontSize: "25px" }} />
            </IconButton>
            <IconButton>
              <Notifications sx={{ color: iconColor, fontSize: "25px" }} />
            </IconButton>
            <IconButton>
              <Help sx={{ color: iconColor, fontSize: "25px" }} />
            </IconButton>
            <FormControl>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: theme.palette.background.default,
                  padding: "5px 10px",
                  borderRadius: "10px",
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>{fullName}</MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;

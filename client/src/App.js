import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { themeSetting } from "./theme";

import LoginRegister from "./pages/login_register/LoginRegister"
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage"


function App() {
  const mode = useSelector((state) => state.mode)
  const theme = useMemo(() => createTheme(themeSetting(mode)), [mode])
  // The useMemo hook is used to memoize the result of the createTheme function.
  // The mode value is provided as a dependency array [mode] to the useMemo hook. This ensures that the theme object is recalculated whenever the mode value changes
  
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginRegister />} />
            <Route index path="/home" element={<HomePage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}
export default App;

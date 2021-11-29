import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import { BrowserRouter } from "react-router-dom";

import "./App.css";
import Routes from "./Routes";
import theme from "./styles/theme";

const App = () => (
  <ThemeProvider theme={createTheme(theme)}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </ThemeProvider>
);

export default App;

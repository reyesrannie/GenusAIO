import { ThemeProvider, createTheme } from "@mui/material";
import "./App.css";
import { Routing } from "./utilities/Routing";
import { SnackbarProvider } from "notistack";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#FFFFFF",
        dark: "#000000",
        light: "#FFFFFF",
      },
      secondary: {
        main: "rgb(174, 126, 79, .70)",
      },
      info: {
        main: "#6096b4",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Routing />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;

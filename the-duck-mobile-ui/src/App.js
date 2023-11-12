import { HelmetProvider } from "react-helmet-async";
import "./App.css";
import Router from "./routes";
import CustomThemeProvider from "./theme";
import AuthProvider from "./auth/AuthProvider";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <HelmetProvider>
      <CustomThemeProvider>
        <SnackbarProvider
          autoHideDuration={1000}
          maxSnack={3}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <AuthProvider>
            <Router />
          </AuthProvider>
        </SnackbarProvider>
      </CustomThemeProvider>
    </HelmetProvider>
  );
}

export default App;

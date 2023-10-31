import { HelmetProvider } from "react-helmet-async";
import "./App.css";
import Router from "./routes";
import CustomThemeProvider from "./theme";
import AuthProvider from "./auth/AuthProvider";

function App() {
  return (
    <HelmetProvider>
      <CustomThemeProvider>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </CustomThemeProvider>
    </HelmetProvider>
  );
}

export default App;

import { HelmetProvider } from "react-helmet-async";
import "./App.css";
import Router from "./routes";
import CustomThemeProvider from "./theme";

function App() {
  return (
    <HelmetProvider>
      <CustomThemeProvider>
        <Router />
      </CustomThemeProvider>
    </HelmetProvider>
  );
}

export default App;

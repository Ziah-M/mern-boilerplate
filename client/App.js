import React from "react";
import MainRouter from "./MainRouter";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";
import { hot } from "react-hot-loader";

const App = () => {
  // Removes server side injected CSS when the root React component mounts
  // To give back full control over rendering the React app
  // To the client side
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <MainRouter />
      </ThemeProvider>
    </BrowserRouter>
  );
};

// HOC for react-hot-loader (hot reloading)
export default hot(module)(App);

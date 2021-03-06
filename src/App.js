import React, { useEffect, useRef } from "react";
import Navigation from "./components/Navigation";
import Routes from "./components/Routes";
import SideBar from "./components/SideBar";
import { observer } from "mobx-react";
import "bootstrap/dist/css/bootstrap.min.css";
import * as api from "./api";
import { userStore } from "./stores/userinfo";
import { ThemeProvider } from "styled-components";
import { mainTheme, darkTheme } from "./styling/themes.styling";
import GlobalStyles from "./styling/global.styles";
import { darkStore } from "./stores/darkMode";

const App = observer(() => {
  const isMounted = useRef(true);

  useEffect(() => {
    api.fetchUsers().then((users) => {
      if (isMounted.current) {
        userStore.users = users;
      }
    });
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <ThemeProvider theme={darkStore.darkMode ? darkTheme : mainTheme}>
      <GlobalStyles />
      <div className="App">
        <Navigation />
        <SideBar />
        <Routes />
      </div>
    </ThemeProvider>
  );
});

export default App;

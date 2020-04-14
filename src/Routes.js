import React, { Component } from "react";
import { Router, Stack, Scene } from "react-native-router-flux";

import Login from "./pages/Login";
import InformationDetail from "./pages/InformationDetail";

export default class Routes extends Component<{}> {
  render() {
    return (
      <Router>
        <Stack key="root" hideNavBar={true}>
          {
            <Scene
              key="login"
              component={InformationDetail}
              title="Information Detail"
              initial={true}
            />
          }
        </Stack>
      </Router>
    );
  }
}

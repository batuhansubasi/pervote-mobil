import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";

import Drawer from "../components/Drawer";

class Main extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.navigation.state.params.name,
    };
  }

  render() {
    return (
      <NavigationContainer>
        <Drawer name={this.state.email} />
      </NavigationContainer>
    );
  }
}

export default Main;

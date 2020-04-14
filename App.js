// import React, { Component } from "react";
// import { StyleSheet, View, StatusBar } from "react-native";

// import Routes from "./src/Routes";

// export default class App extends Component<{}> {
//   render() {
//     return (
//       <View style={styles.container}>
//         <StatusBar backgroundColor="rgb(98,39,116)" barStyle="light-content" />
//         <Routes />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

import React from "react";
import { View, Text, Button } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Login from "./src/pages/Login";
import InformationDetail from "./src/pages/InformationDetail";

const Navigator = createStackNavigator({
  Login: { screen: Login },
  InformationDetail: { screen: InformationDetail },
});

const App = createAppContainer(Navigator);

export default App;

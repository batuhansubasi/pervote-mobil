import { View, Text, Button } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Login from "./src/pages/Login";
import InformationDetail from "./src/pages/InformationDetail";
import Main from "./src/pages/Main";
const Navigator = createStackNavigator(
  {
    Login: { screen: Login },
    InformationDetail: { screen: InformationDetail },
    Main: { screen: Main },
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerShown: false,
    },
  }
);
const App = createAppContainer(Navigator);
export default App;

/* eslint-disable react-native/sort-styles */
/* eslint-disable import/order */
import React from "react";
import { Image, StyleSheet, Alert } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  DrawerItem,
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import Animated from "react-native-reanimated";
import { Feather, AntDesign } from "@expo/vector-icons";
import { Block, Button, Text } from "expo-ui-kit";
import { LinearGradient } from "expo-linear-gradient";
import { Asset } from "expo-asset";

// screens
import Meeting from "../pages/Meeting";
import Point from "../pages/Point";
import Contact from "../pages/Contact";
import ChangePassword from "../pages/ChangePassword";
import InformationDetail from "../pages/InformationDetail";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
var email = "default@mail.com";

const Screens = ({ navigation, style }) => {
  return (
    <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
      <Stack.Navigator
        screenOptions={{
          headerTransparent: true,
          headerLeft: () => (
            <Button transparent onPress={() => navigation.openDrawer()}>
              <Feather
                name="menu"
                size={18}
                color="black"
                style={{ paddingHorizontal: 10 }}
              />
            </Button>
          ),
        }}
      >
        <Stack.Screen name="Meeting">
          {(props) => <Meeting {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Contact">
          {(props) => <Contact {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Point">
          {(props) => <Point {...props} />}
        </Stack.Screen>
        <Stack.Screen name="ChangePassword">
          {(props) => <ChangePassword {...props} />}
        </Stack.Screen>
        <Stack.Screen name="InformationDetail">
          {(props) => <InformationDetail {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </Animated.View>
  );
};

const DrawerContent = (props) => {
  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled={false}
      contentContainerStyle={{ flex: 1 }}
    >
      <Block>
        <Block flex={0.4} margin={20} bottom>
          <Image
            source={{
              uri: Asset.fromModule(require("../images/image.jpg")).uri,
              height: 80,
              width: 80,
              scale: 0.5,
            }}
            resizeMode="contain"
            style={styles.avatar}
          />
          <Text white title>
            PerVote
          </Text>
          <Text white size={15}>
            {email}
          </Text>
        </Block>
        <Block>
          <DrawerItem
            label="Meeting"
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
            onPress={() =>
              props.navigation.navigate("Meeting", { name: email })
            }
            icon={() => <AntDesign name="calendar" color="white" size={16} />}
          />
          <DrawerItem
            label="Point"
            labelStyle={styles.drawerLabel}
            style={{ alignItems: "flex-start", marginVertical: 0 }}
            onPress={() => props.navigation.navigate("Point", { name: email })}
            icon={() => <AntDesign name="barchart" color="white" size={16} />}
          />
          <DrawerItem
            label="Change Password"
            labelStyle={{ color: "white", fontSize: 9.75 }}
            style={{ alignItems: "flex-start", marginVertical: 0 }}
            onPress={() =>
              props.navigation.navigate("ChangePassword", { name: email })
            }
            icon={() => <AntDesign name="swap" color="white" size={16} />}
          />
          <DrawerItem
            label="Personnel Detail"
            labelStyle={{ color: "white", fontSize: 11 }}
            style={{ alignItems: "flex-start", marginVertical: 0 }}
            onPress={() =>
              props.navigation.navigate("InformationDetail", { name: email })
            }
            icon={() => <AntDesign name="user" color="white" size={16} />}
          />
          <DrawerItem
            label="Contact Us"
            labelStyle={styles.drawerLabel}
            style={{ alignItems: "flex-start", marginVertical: 0 }}
            onPress={() => props.navigation.navigate("Contact")}
            icon={() => <AntDesign name="phone" color="white" size={16} />}
          />
        </Block>
      </Block>

      <Block flex={false}>
        <DrawerItem
          label="Logout"
          labelStyle={styles.drawerLabel}
          icon={() => <AntDesign name="logout" color="white" size={16} />}
          onPress={() => Alert.alert("Are your sure to logout?")}
        />
      </Block>
    </DrawerContentScrollView>
  );
};

export default (props) => {
  email = props.name;
  const [progress, setProgress] = React.useState(new Animated.Value(0));
  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const animatedStyle = { borderRadius, transform: [{ scale }] };

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={["rgb(98,39,116)", "rgb(196,60,108)"]}
    >
      <Drawer.Navigator
        // hideStatusBar
        drawerType="slide"
        overlayColor="transparent"
        drawerStyle={styles.drawerStyles}
        contentContainerStyle={{ flex: 1 }}
        drawerContentOptions={{
          activeBackgroundColor: "transparent",
          activeTintColor: "white",
          inactiveTintColor: "white",
        }}
        sceneContainerStyle={{ backgroundColor: "transparent" }}
        drawerContent={(props) => {
          setProgress(props.progress);
          return <DrawerContent {...props} />;
        }}
      >
        <Drawer.Screen name="Screens">
          {(props) => <Screens {...props} style={animatedStyle} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  stack: {
    flex: 1,
    shadowColor: "#FFF",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,
  },
  drawerStyles: { flex: 1, width: "50%", backgroundColor: "transparent" },
  drawerItem: { alignItems: "flex-start", marginVertical: 0 },
  drawerLabel: { color: "white", fontSize: 13 },
  avatar: {
    borderRadius: 60,
    marginBottom: 15,
    borderColor: "white",
    borderWidth: StyleSheet.hairlineWidth,
  },
});

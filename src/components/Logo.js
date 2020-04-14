import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default class Logo extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{ width: 90, height: 140 }}
          source={require("../images/website_logo_solid_background.png")}
        />
        <Text style={styles.logoText}>Personnel Voting System</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logoText: {
    marginVertical: 15,
    fontSize: 25,
    color: "rgb(98,39,116)",
  },
});

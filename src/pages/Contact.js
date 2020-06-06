import React, { Component } from "react";
import {
  Linking,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import qs from "qs";
import * as SMS from "expo-sms";

class Contact extends Component<{}> {
  constructor() {
    super();
  }

  async sendEmail() {
    let url = `mailto:${"160202091@kocaeli.edu.tr"}`;

    // Create email link query
    const query = qs.stringify({
      subject: "Pervote React Native About!",
      body: "Which software patterns you did work?",
    });

    if (query.length) {
      url += `?${query}`;
    }

    // check if we can use this link
    const canOpen = await Linking.canOpenURL(url);

    if (!canOpen) {
      throw new Error("Provided URL can not be handled");
    }

    return Linking.openURL(url);
  }

  async pushSMS() {
    const { result } = await SMS.sendSMSAsync(
      ["05308776095", "05308776095"],
      "Which software patterns you did work?"
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.sendEmail.bind(this)}>
          <Text
            h3
            center
            style={{
              fontSize: 20,
              textAlign: "center",
            }}
          >
            CLICK US VIA e-MAIL!
          </Text>
          <Text
            style={{ fontWeight: "500", fontSize: 15, textAlign: "center" }}
          >
            (160202091@kocaeli.edu.tr)
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.pushSMS.bind(this)}>
          <Text
            h3
            center
            style={{
              marginTop: 25,
              fontSize: 20,
              textAlign: "center",
            }}
          >
            CLICK US VIA SMS!
          </Text>
          <Text
            style={{
              fontWeight: "500",
              fontSize: 15,
              marginBottom: 25,
              textAlign: "center",
            }}
          >
            (05308776095)
          </Text>
        </TouchableOpacity>
        <Text
          h3
          center
          style={{
            marginBottom: 10,
          }}
        >
          <Text style={{ fontWeight: "500" }}>From Meeting Screen -> </Text>
          You can enter new meeting information. You can list your meetings
          details. You can delete your that joined meeting. Date and personnel
          picker is designed special to you.
        </Text>
        <Text
          h3
          center
          style={{
            marginBottom: 10,
          }}
        >
          <Text style={{ fontWeight: "500" }}>From Point Screen -></Text>
          You can see your meetings that its finished with your teammate. You
          should give point for your mate for her/him performance!
        </Text>
        <Text
          h3
          center
          style={{
            marginBottom: 10,
          }}
        >
          <Text style={{ fontWeight: "500", marginTop: 10 }}>
            From Change Password Screen ->
          </Text>
          You can change your password here with your old password.
        </Text>
        <Text
          h3
          center
          style={{
            marginBottom: 10,
          }}
        >
          <Text style={{ fontWeight: "500", marginTop: 10 }}>
            From Personnel Detail Screen ->
          </Text>
          Your information will be listed here. You can pick image with using
          your gallery. You can change your information and then click update!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    color: "#41D5FB",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
});

export default Contact;

import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import moment from "moment";
import "../config";

var mail = "";

export default class Meeting extends React.Component {
  componentDidMount() {
    this.initilization();
  }

  async initilization() {
    this.setState({ email: mail });
    const url =
      global.config.i18n.backend_api.url + "personnels/workfriendship/" + mail;
    const response = await fetch(url);
    const data = await response.json();
  }

  render() {
    return (
      <View key={this.props.val._id} style={styles.meeting}>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Subject: </Text>
          <Text style={styles.noteText}>{this.props.val.subject}</Text>
        </Text>

        <Text>
          <Text style={{ fontWeight: "bold" }}>Date: </Text>
          <Text style={styles.noteText}>
            {moment(this.props.val.date).format("DD-MM-YYYY HH:mm")}
          </Text>
        </Text>

        <TouchableOpacity
          onPress={this.props.deleteMethod}
          style={styles.meetingDelete}
        >
          <Text style={styles.meetingDeleteText}>Delete </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  meeting: {
    position: "relative",
    padding: 20,
    paddingRight: 100,
    borderBottomWidth: 2,
    borderBottomColor: "#ededed",
  },
  noteText: {
    paddingLeft: 20,
    borderLeftWidth: 10,
    borderLeftColor: "#e91e63",
  },
  meetingDelete: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(196,60,108)",
    padding: 10,
    top: 10,
    bottom: 10,
    right: 10,
    borderRadius: 25,
  },
  meetingDeleteText: {
    color: "white",
  },
});

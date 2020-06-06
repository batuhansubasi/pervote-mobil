import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";

class ChangePassword extends Component<{}> {
  constructor() {
    super();

    this.state = {
      password: "",
      newpassword: "",
      newpasswordagain: "",
      error: "",
      showProgress: false,
    };
  }

  control() {
    if (this.state.newpassword.length < 3) {
      this.setState({ error: "Password length is low for login!" });
      this.setState({ showProgress: false });
      return false;
    }
    return true;
  }

  async onLoginPressed() {
    this.setState({ showProgress: true });
    try {
      let response = await fetch(
        "http://192.168.1.111:3001/personnels/changepassword",
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.props.route.params.name,
            password: this.state.password,
            newpassword: this.state.newpassword,
          }),
        }
      );
      let res = await response.text();
      if (response.status >= 200 && response.status < 300) {
        this.setState({ error: "Password changed successfully" });
        this.setState({ showProgress: false });
      } else {
        var obj = JSON.parse(res);
        this.setState({ error: obj.error });
        this.setState({ showProgress: false });
      }
    } catch (error) {
      this.setState({ showProgress: false });
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.text}>{this.state.error}</Text>
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          onChangeText={(text) => this.setState({ password: text })}
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="#ffffff"
          ref={(input) => (this.password = input)}
        />
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          onChangeText={(text) => this.setState({ newpassword: text })}
          placeholder="New Password"
          secureTextEntry={true}
          placeholderTextColor="#ffffff"
          ref={(input) => (this.password = input)}
        />
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          onChangeText={(text) => this.setState({ newpasswordagain: text })}
          placeholder="New Password Again"
          secureTextEntry={true}
          placeholderTextColor="#ffffff"
          ref={(input) => (this.password = input)}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={this.onLoginPressed.bind(this)}
        >
          <Text style={styles.buttonText}>Change Password!</Text>
        </TouchableOpacity>

        <View style={styles.horizontal}>
          <ActivityIndicator
            animating={this.state.showProgress}
            size="large"
            color="rgb(196,60,108)"
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  inputBox: {
    width: 300,
    backgroundColor: "rgb(196,60,108)",
    borderRadius: 25, //< - ovalleştirme
    paddingHorizontal: 15, //<- inputun icindeki yazılar biraz önde baslıyor.
    fontSize: 25, //degistirdim
    color: "#ffffff",
    marginVertical: 10,
  },
  button: {
    width: 300,
    backgroundColor: "rgb(98,39,116)",
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center",
  },
  text: {
    fontSize: 13,
    justifyContent: "center",
    color: "rgb(98, 39, 116)",
    marginVertical: 15,
    textAlign: "center",
  },
  horizontal: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default ChangePassword;

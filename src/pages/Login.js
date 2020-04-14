import React, { Component } from "react";
import {
  StyleSheet,
  AsyncStorage,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";

import Logo from "../components/Logo";

const ACCESS_TOKEN = "access_token";

class Login extends Component<{}> {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      error: "",
      showProgress: false,
    };
  }

  static navigationOptions = {
    header: null,
  };

  // redirect(routeName, accessToken) {
  //   this.props.navigator.push({
  //     name: routeName,
  //   });
  // }

  control() {
    if (this.state.email.length < 3) {
      this.setState({ error: "Password length is low for login!" });
      this.setState({ showProgress: false });
      return false;
    }
    // if (bla bla bla){
    //   return false;
    // }
    return true;
  }

  storeToken(responseData) {
    AsyncStorage.setItem(ACCESS_TOKEN, responseData, (err) => {
      if (err) {
        console.log("an error");
        throw err;
      }
      console.log("storage is success");
    }).catch((err) => {
      console.log("error is: " + err);
    });
  }

  async onLoginPressed() {
    this.setState({ showProgress: true });
    if (this.control()) {
      try {
        let response = await fetch("http://localhost:3001/personnels/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.state.email,
            password: this.state.password,
          }),
        });
        console.log("Girmeye calistigimiz mail: " + this.state.email);
        console.log("Girmeye calistigimiz sifre: " + this.state.password);
        let res = await response.text();
        if (response.status >= 200 && response.status < 300) {
          let accessToken = res;
          this.storeToken(accessToken);
          console.log(res.length);
          if (res.length !== 33 || res.length !== 36) {
            this.setState({ error: "Login success" });
            const { navigate } = this.props.navigation;
            navigate("InformationDetail", { name: "deneme@deneme.com" });
            this.setState({ showProgress: false });
          } else {
            var obj = JSON.parse(res);
            this.setState({ error: obj.error });
            this.setState({ showProgress: false });
          }
        } else {
          var obj = JSON.parse(res);
          this.setState({ error: obj.error });
          this.setState({ showProgress: false });
        }
      } catch (error) {
        this.setState({ error: "We can't reach to my API." });
        console.log(error);
        this.setState({ showProgress: false });
      }
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Logo />
        <Text style={styles.text}>{this.state.error}</Text>
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Email"
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          onChangeText={(text) => this.setState({ email: text })}
          keyboardType="email-address"
          onSubmitEditing={() => this.password.focus()}
        />
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          onChangeText={(text) => this.setState({ password: text })}
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="#ffffff"
          ref={(input) => (this.password = input)}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={this.onLoginPressed.bind(this)}
        >
          <Text style={styles.buttonText}>Sign IN!</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgetpassword}>
          <Text style={styles.text}>
            Did you forget your password?
            <Text style={{ fontWeight: "500" }}> Send Mail!</Text>
          </Text>
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
  forgetpassword: {
    alignSelf: "center",
    marginTop: 5,
  },
  horizontal: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default Login;

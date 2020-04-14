import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";

const ACCESS_TOKEN = "access_token";

class InformatıonDetail extends Component<{}> {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      error: "",
      name: "",
      lastname: "",
      birthyear: "",
      telephone: "",
      departman: "",
      isLoggenIn: "",
      showProgress: false,
      accessToken: "",
    };
  }

  // componentWillMount() {
  //   this.getToken();
  // }

  static navigationOptions = {
    header: null,
  };

  // async getToken() {
  //   try {
  //     let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
  //     if (!accessToken) {
  //       this.redirect("login");
  //     } else {
  //       this.setState({ accessToken: accessToken });
  //     }
  //   } catch (error) {
  //     console.log("Something went wrong");
  //     this.redirect("login");
  //   }
  // }

  // async deleteToken() {
  //   try {
  //     await AsyncStorage.removeItem(ACCESS_TOKEN);
  //     this.redirect("root");
  //   } catch (error) {
  //     console.log("Something went wrong");
  //   }
  // }

  // redirect(routeName) {
  //   this.props.navigator.push({
  //     name: routeName,
  //     passProps: {
  //       accessToken: this.state.accessToken,
  //     },
  //   });
  // }

  // onLogout() {
  //   this.setState({ showProgress: true });
  //   this.deleteToken();
  // }

  async onLoginPressed() {
    this.setState({ showProgress: true });
    try {
      // var obj = JSON.parse(this.prop);
      // this.setState({ error: obj.error });
      let response = await fetch("http://localhost:3001/personnels/update", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.props.navigation.state.params.name,
          password: this.state.password,
          name: this.state.name,
          surname: this.state.surname,
          birthyear: this.state.birthyear,
          phone: this.state.phone,
          department: this.state.departman,
        }),
      });
      let res = await response.text();
      if (response.status >= 200 && response.status < 300) {
        this.setState({ error: "Information is registered successfully" });
        this.setState({ showProgress: false });
      } else {
        var obj = JSON.parse(res);
        this.setState({ error: obj.error });
        this.setState({ showProgress: false });
      }
    } catch (error) {
      var obj = JSON.parse(res);
      this.setState({ error: obj.error });
      this.setState({ showProgress: false });
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Image
          style={styles.avatar}
          source={{ uri: "https://bootdey.com/img/Content/avatar/avatar6.png" }}
        />
        <Text style={styles.text}>{this.state.error}</Text>
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Name"
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          onChangeText={(text) => this.setState({ name: text })}
        />
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Surname"
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          onChangeText={(text) => this.setState({ surname: text })}
        />
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Birthyear"
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          keyboardType="numeric"
          onChangeText={(text) => this.setState({ birthyear: text })}
        />
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Phone"
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          keyboardType="phone-pad"
          onChangeText={(text) => this.setState({ phone: text })}
        />
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Departman"
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          onChangeText={(text) => this.setState({ departman: text })}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={this.onLoginPressed.bind(this)}
        >
          <Text style={styles.buttonText}>GO ON!</Text>
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
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    marginTop: 20,
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

export default InformatıonDetail;

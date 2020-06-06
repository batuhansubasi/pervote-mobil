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
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { Dropdown } from "react-native-material-dropdown";
import "../../config.js";

var mail = "";

class InformatıonDetail extends Component<{}> {
  constructor() {
    super();

    this.state = {
      email: "",
      error: "",
      name: "",
      surname: "",
      birthyear: "",
      phone: "",
      department: "",
      isLoggenIn: "",
      showProgress: false,
      accessToken: "",
      photodata: "https://bootdey.com/img/Content/avatar/avatar6.png",
      dropdownlist: [],
    };
  }

  componentDidMount() {
    mail = this.props.route.params.name;
    this.initilization();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async initilization() {
    this._isMounted = true;
    if (this._isMounted) {
      this.setState({ email: mail });

      //Mail bilgisiyle apimize gittik.
      const url = "http://192.168.1.111:3001/personnels/email/" + mail;
      const response = await fetch(url);
      const data = await response.json();

      const urldepartment =
        global.config.i18n.backend_api.url + "admins/" + data.admin;
      const responsedepartment = await fetch(urldepartment);
      const datadepartment = await responsedepartment.json();
      const values = datadepartment.departments;
      console.log(values);

      for (var i = 0; i < values.length; i++) {
        const tempvalue = values[i];
        Object.defineProperty(
          tempvalue,
          "value",
          Object.getOwnPropertyDescriptor(tempvalue, "department")
        );
        delete tempvalue["department"];
      }
      this.setState({ dropdownlist: values });

      //giriş yapılan userın detay bilgileri dolu mu?
      if (
        data.name != null &&
        data.surname != null &&
        data.phone != null &&
        data.department != null &&
        data.birthyear != null &&
        data.photo != null
      ) {
        //Bilgiler boş değilse bastırmamız lazım.
        this.setState({ name: data.name });
        this.setState({ surname: data.surname });
        this.setState({ phone: data.phone });
        this.setState({ department: data.department });
        this.setState({ birthyear: data.birthyear });
        console.log("bilgier veritabanından");
        this.setState({ photodata: data.photo });
      } else {
        console.log("bilgiler manuel");
        this.getPermissionAsync();
      }
    }
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        Alert.alert(
          "Permission",
          "Sorry, we need camera roll permissions to make this work!"
        );
      }
    }
  };

  handleChoosePhoto = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        base64: true,
        quality: 0.05,
      });
      if (!result.cancelled) {
        this.setState({ photodata: "data:image/jpg;base64," + result.base64 });
      }
    } catch (E) {
      console.log(E);
    }
  };

  control() {
    if (
      this.state.photodata.length === 0 ||
      this.state.department.length === 0 ||
      this.state.phone.length === 0 ||
      this.state.birthyear.length === 0 ||
      this.state.surname.length === 0 ||
      this.state.name.length === 0
    ) {
      this.setState({ error: "Please fill all!" });
      return false;
    } else {
      return true;
    }
  }

  onChangeText(text) {
    this.setState({ department: text });
  }

  async onLoginPressed() {
    this.setState({ showProgress: true });
    console.log(this.state.department);
    if (this.control()) {
      try {
        let response = await fetch(
          "http://192.168.1.111:3001/personnels/update",
          {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: this.state.email,
              name: this.state.name,
              surname: this.state.surname,
              birthyear: this.state.birthyear,
              phone: this.state.phone,
              department: this.state.department,
              photo: this.state.photodata,
            }),
          }
        );
        let res = await response.text();
        console.log(res);
        if (response.status >= 200 && response.status < 300) {
          this.setState({ error: "Information is registered successfully" });
          this.setState({ showProgress: false });
        } else {
          console.log("selam");
          // console.log(this.state.name);
          // console.log(this.state.surname);
          // console.log(this.state.birthyear);
          // console.log(this.state.phone);
          // console.log(this.state.department);
          var obj = JSON.parse(res);
          this.setState({ error: obj.error });
          this.setState({ showProgress: false });
        }
      } catch (error) {
        console.log("selam");
        // console.log(this.state.name);
        // console.log(this.state.surname);
        // console.log(this.state.birthyear);
        // console.log(this.state.phone);
        // console.log(this.state.department);
        var obj = JSON.parse(res);
        this.setState({ error: obj.error });
        this.setState({ showProgress: false });
      }
    } else {
      this.setState({ showProgress: false });
    }
  }

  render() {
    const { photo } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TouchableOpacity onPress={this.handleChoosePhoto.bind()}>
          <Image style={styles.avatar} source={{ uri: this.state.photodata }} />
        </TouchableOpacity>
        <Text style={styles.text}>{this.state.error}</Text>
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Name"
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          value={this.state.name}
          onChangeText={(text) => this.setState({ name: text })}
        />
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Surname"
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          value={this.state.surname}
          onChangeText={(text) => this.setState({ surname: text })}
        />
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Birthyear"
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          keyboardType="numeric"
          value={`${this.state.birthyear}`}
          onChangeText={(text) => this.setState({ birthyear: text })}
        />
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Phone"
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          keyboardType="phone-pad"
          value={`${this.state.phone}`}
          onChangeText={(text) => this.setState({ phone: text })}
        />

        <View style={styles.inputBox}>
          <Dropdown
            label="Department"
            itemTextStyle={styles.buttonText}
            value={this.state.department}
            pickerStyle={styles.dropdown}
            baseColor="#fff"
            selectedItemColor="#fff"
            textColor="#fff"
            data={this.state.dropdownlist}
            onChangeText={(input) => this.onChangeText(input)}
          />
        </View>

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
    marginTop: 105,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    // marginBottom: 10,
    alignSelf: "center",
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
  dropdown: {
    width: 300,
    backgroundColor: "rgb(196,60,108)",
    borderRadius: 25, //< - ovalleştirme
    paddingHorizontal: 15, //<- inputun icindeki yazılar biraz önde baslıyor.
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

// const { navigate } = this.props.navigation;
// navigate("Main", { name: this.props.navigation.state.params.name });

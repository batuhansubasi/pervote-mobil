import React, { Component } from "react";
import {
  StyleSheet,
  AsyncStorage,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  ScrollView,
  Alert,
} from "react-native";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

import Meeting from "../components/Meeting";
import "../config";

var mail = "";

class Dashboard extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      admin: "",
      email: "",
      subject: "",
      error: "",
      isDatePickerVisible: false,
      isPopUpVisible: false,
      selectedItems: [],
      personnels: [], // ayni sirketteki kullanıcılar
      text: "Pick Date!",
      myID: "", // giren kullancıı icin
      showProgress: false,
      meetingsArray: [],
      text1: "Pick Date!",
    };
  }

  componentDidMount() {
    // mail = this.props.route.params.name;
    // this.setState({ email: this.props.route.params.name });
    this.initilization();
    this.setState({ text: "Pick Date!" });
  }

  async initilization() {
    let user = await AsyncStorage.getItem("email");
    this.setState({ email: user });
    mail = user;
    this.setState({ email: mail });
    const url =
      global.config.i18n.backend_api.url + "personnels/workfriendship/" + mail;
    const response = await fetch(url);
    const data = await response.json();

    for (let i = 0; i < data.length; i++) {
      const newSingleData = data[i];
      if (data[i].email === mail) {
        //Ekrana giren personelin id' sinin alınması
        //Toplantıya otomatik olarak eklenmesi
        this.setState({ myID: data[i]._id });
        this.setState({ admin: data[i].admin });
      }
      Object.defineProperty(
        newSingleData,
        "id",
        Object.getOwnPropertyDescriptor(newSingleData, "_id")
      );
      delete newSingleData["_id"];

      Object.defineProperty(
        newSingleData,
        "name",
        Object.getOwnPropertyDescriptor(newSingleData, "email")
      );
      delete newSingleData["email"];
      delete newSingleData["admin"];
    }

    this.setState({
      personnels: [
        {
          name: "Company Employees",
          id: 0,
          children: data,
        },
      ],
    });

    this.setState({
      selectedItems: [this.state.myID],
    });

    //halihazırda olan meetingslerin gösterilmesi...
    const newurl =
      global.config.i18n.backend_api.url +
      "meetings/personnelid/" +
      this.state.myID;
    const newresponse = await fetch(newurl);
    const newdata = await newresponse.json();
    this.setState({ meetingsArray: newdata });
  }

  showDatePicker = () => {
    this.setState({ isDatePickerVisible: true });
  };

  handleConfirmDate = (date) => {
    var newM = moment(date, "YYYY-MM-DDTHH:mm:ss.SSSS[Z]", true).add(
      3,
      "hours"
    );
    this.setState({ text: newM.toString() });

    this.setState({ text1: moment(date).format("DD-MM-YYYY HH:mm") });
    this.hideDatePicker();
  };

  hideDatePicker = (date) => {
    this.setState({ isDatePickerVisible: false });
  };

  showPopUpPicker = () => this.setState({ isPopUpVisible: true });

  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
  };

  async onLoginPressed() {
    this.setState({ showProgress: true });

    //hatalar yoksa, doldurulmuşsa vs.
    var bufferSelectedItems = this.state.selectedItems;
    var persmeetings = [];

    for (let i = 0; i < bufferSelectedItems.length; i++) {
      var deneme = bufferSelectedItems[i];

      var obj = {
        persID: deneme,
        point: false,
      };
      persmeetings[i] = obj;
    }
    console.log("deneme");
    try {
      let response = await fetch(
        global.config.i18n.backend_api.url + "meetings/add",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            admin: this.state.admin,
            subject: this.state.subject,
            date: this.state.text,
            personnels: persmeetings,
          }),
        }
      );
      let res = await response.text();
      if (response.status >= 200 && response.status < 300) {
        this.setState({ error: "Meeting saved successfully" });
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

  async deleteMeeting(key, val) {
    try {
      let response = await fetch(
        global.config.i18n.backend_api.url + "meetings/" + val._id,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );
    } catch (error) {
      console.log(
        "http://192.168.1.111:3001/meetings/" +
          this.state.meetingsArray +
          "            " +
          error
      );
    }
    // console.log(key);
    this.state.meetingsArray.splice(key, 1);
    this.setState({ meetingsArray: this.state.meetingsArray });
    Alert.alert("Meeting", "Meeting deleted.");
  }

  render() {
    const { selectedItems } = this.state;

    let meetings = this.state.meetingsArray.map((val, key) => {
      return (
        <Meeting
          key={key}
          keyval={key}
          val={val}
          deleteMethod={() => this.deleteMeeting(key, val)}
        />
      );
    });
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <StatusBar />
          <Text style={styles.text}>{this.state.error}</Text>
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="rgba(0,0,0,0)"
            onChangeText={(text) => this.setState({ subject: text })}
            placeholder="Meeting Subject"
            placeholderTextColor="#ffffff"
          />
          <TouchableOpacity style={styles.button} onPress={this.showDatePicker}>
            <Text style={styles.buttonText}>{this.state.text1}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={this.state.isDatePickerVisible}
            mode="datetime"
            minimumDate={new Date()}
            locale="tr-TR"
            is24Hour={true}
            minuteInterval={10}
            onConfirm={this.handleConfirmDate}
            onCancel={this.hideDatePicker}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.SectionedMultiSelect._toggleSelector()}
          >
            <Text style={styles.buttonText}>
              Pick Personnels that will be joined!
            </Text>
          </TouchableOpacity>

          <View style={styles.text}>
            <SectionedMultiSelect
              hideSelect={true}
              items={this.state.personnels}
              uniqueKey="id"
              colors={{ primary: "#622774" }}
              subKey="children"
              confirmText="Pick Personnels"
              ref={(SectionedMultiSelect) =>
                (this.SectionedMultiSelect = SectionedMultiSelect)
              }
              showCancelButton={true}
              showDropDowns={false}
              readOnlyHeadings={true}
              onSelectedItemsChange={this.onSelectedItemsChange}
              selectedItems={this.state.selectedItems}
            />
          </View>

          <TouchableOpacity
            style={styles.savebutton}
            onPress={this.onLoginPressed.bind(this)}
          >
            <Text style={styles.savebuttonText}>Save Meeting!</Text>
          </TouchableOpacity>

          <Text style={styles.headertext}>Meeting LIST</Text>

          <View style={styles.horizontal}>
            <ActivityIndicator
              animating={this.state.showProgress}
              size="large"
              color="rgb(196,60,108)"
            />
          </View>

          <View>{meetings}</View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#ffffff",
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  inputBox: {
    width: 300,
    backgroundColor: "rgb(196,60,108)",
    borderRadius: 25, //< - ovallestirme
    paddingHorizontal: 15, //<- inputun icindeki yazilar biraz önde basliyor.
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
  savebutton: {
    width: 300,
    backgroundColor: "rgb(98,39,116)",
    borderRadius: 25,
    marginVertical: 40,
    paddingVertical: 30,
  },
  headertext: {
    fontSize: 30,
    fontWeight: "500",
    alignItems: "center",
    color: "rgb(196,60,108)",
    paddingHorizontal: 15,
    textAlign: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "left",
    paddingHorizontal: 15,
  },
  savebuttonText: {
    fontSize: 25,
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
  contentContainer: {
    marginHorizontal: 20,
  },
});

export default Dashboard;

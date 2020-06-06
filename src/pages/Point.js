import React, { Component } from "react";
import {
  View,
  Text,
  Picker,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import Moment from "moment";

var mail = "";
var sayac = 0;
var gosterilecekler = [
  {
    photo: "",
    name: "",
    subject: "",
    date: "",
    description: "",
    meetingID: "",
    ratedPersonnel: "",
    user: "",
  },
];

class Messages extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      user: "", //listbox icin
      myID: "", //girilen kisi
      photo: "https://bootdey.com/img/Content/avatar/avatar6.png",
      name: "",
      subject: "",
      date: "",
      description: "",
      showProgress: true,
      meetingID: "",
      ratedPersonnel: "",
    };
  }

  componentDidMount() {
    mail = this.props.route.params.name;
    this.setState({ email: this.props.route.params.name });
    this.initilization();
  }

  updateUser = (user) => {
    //listbox icin
    this.setState({ user: user });
  };

  async onLoginPressed() {
    //puanı kaydet denildiğinde.
    this.setState({ showProgress: true });
    sayac = sayac + 1;

    if (!this.state.user) {
      this.setState({ user: 1 });
    }

    if (!this.state.ratedPersonnel) {
      Alert.alert("Wait!...", "Just wait name, subject and date informations.");
    } else {
      if (this.state.description) {
        // burada hali hazırdaki statelerdeki bilgiyi veritabanıyla kaydedeceğiz.
        try {
          let response = await fetch("http://192.168.1.111:3001/points/add", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              meetingID: this.state.meetingID,
              ratedPersonnel: this.state.ratedPersonnel,
              scorerPersonnel: this.state.myID,
              pointValue: this.state.user,
              description: this.state.description,
            }),
          });
          let res = await response.text();
          if (response.status >= 200 && response.status < 300) {
            if (!res.includes("error")) {
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

        const url3 =
          "http://192.168.1.111:3001/meetings/" + this.state.meetingID;
        const response3 = await fetch(url3);
        const data3 = await response3.json();

        for (let u = 0; u < data3.personnels.length; u++) {
          var tempmeet = data3.personnels[u];
          if (tempmeet.persID === this.state.ratedPersonnel) {
            var passmeet = {
              persID: this.state.ratedPersonnel,
              point: true,
            };
            data3.personnels[u] = passmeet;
          }
        }

        try {
          let response = await fetch(
            "http://192.168.1.111:3001/meetings/update/" + this.state.meetingID,
            {
              method: "PUT",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                personnels: data3.personnels,
              }),
            }
          );
        } catch (error) {
          this.setState({ showProgress: false });
        }

        //sonrada stateleri değiştireceğiz.
        for (let k = 0; k < gosterilecekler.length; k++) {
          if (k === sayac) {
            //oy verilecek stateler burada...
            const temps = gosterilecekler[k];
            this.setState({ photo: temps.photo });
            this.setState({ name: temps.name });
            this.setState({ subject: temps.subject });
            this.setState({ date: temps.date });
            this.setState({ meetingID: temps.meetingID });
            this.setState({ ratedPersonnel: temps.ratedPersonnel });
            this.setState({ showProgress: false });
            this.setState({ description: "" });
          }
        }
        Alert.alert("Point", "You gave " + this.state.user + " point");
      } else {
        Alert.alert("Point", "You must write some description.");
      }
    }
  }

  async initilization() {
    this.setState({ showProgress: true });
    this.setState({ email: mail });
    const url = "http://192.168.1.111:3001/personnels/email/" + mail;
    const response = await fetch(url);
    const personeldata = await response.json();

    //girilen kisinin mailinden, id ve resminin alınması
    this.setState({ myID: personeldata._id });

    //kisinin girmis oldugu meetingsler...
    const newurl =
      "http://192.168.1.111:3001/meetings/personnelid/" + this.state.myID;
    const newresponse = await fetch(newurl);
    const newdata = await newresponse.json(); //newdata = bütün girilen meetingsler

    var counter = 0;
    for (let i = 0; i < newdata.length; i++) {
      //Gelen meeting objesi kadar dön. 12 tane toplantı varsa 1 tane = meeting[1]
      const newSingleData = newdata[i];
      for (let j = 0; j < newSingleData.personnels.length; j++) {
        //meeting[i].personnels[j] içindeyim suan.
        const newSinglePersonnel = newSingleData.personnels[j];
        //oylanacak olan kisinin id'si kendisi değilse.
        //todo newsinglepersonnel.point false ise
        if (newSinglePersonnel.persID !== this.state.myID) {
          //Fotoğrafını çekmek icin...
          const newurllast =
            "http://192.168.1.111:3001/personnels/" + newSinglePersonnel.persID;
          const newresponselast = await fetch(newurllast);
          const newdatalast = await newresponselast.json();
          if (newdatalast !== null) {
            var templete = {
              photo: "",
              name: "",
              subject: "",
              date: "",
              point: "",
              description: "",
              meetingID: "",
              ratedPersonnel: "",
            };
            templete.photo = newdatalast.photo;
            templete.name = newdatalast.name;
            templete.subject = newSingleData.subject;
            templete.date = Moment(newSingleData.date).format(
              "DD-MM-YYYY HH:mm"
            );

            // templete.date = newSingleData.date;
            templete.meetingID = newSingleData._id;
            templete.ratedPersonnel = newdatalast._id;
            gosterilecekler[counter] = templete;
            counter = counter + 1;
          }
          ///////////////////////////////////////////////////////////////////////
        }
      }
    }

    //İlk gelen değeri statelere verme...
    const birinci = gosterilecekler[0];
    this.setState({ photo: birinci.photo });
    this.setState({ name: birinci.name });
    this.setState({ subject: birinci.subject });
    this.setState({ date: birinci.date });
    this.setState({ meetingID: birinci.meetingID });
    this.setState({ ratedPersonnel: birinci.ratedPersonnel });
    this.setState({ showProgress: false });
  }

  render() {
    return (
      <View behavior="padding" style={styles.container}>
        <Image
          style={styles.avatar}
          source={{
            uri: this.state.photo,
          }}
        />

        <Text style={styles.text}>
          <Text style={{ fontWeight: "bold" }}>Personnel Name: </Text>
          <Text>{this.state.name}</Text>
        </Text>

        <Text style={styles.text}>
          <Text style={{ fontWeight: "bold" }}>Meeting Subject: </Text>
          <Text>{this.state.subject}</Text>
        </Text>

        <Text style={styles.text}>
          <Text style={{ fontWeight: "bold" }}>Meeting Date&Time: </Text>
          <Text>{this.state.date}</Text>
        </Text>

        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Point Description"
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          clearButtonMode="always"
          onChangeText={(text) => this.setState({ description: text })}
          keyboardType="default"
        />

        <Picker
          selectedValue={this.state.user}
          onValueChange={this.updateUser}
          style={styles.picker}
        >
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
        </Picker>

        <TouchableOpacity
          style={styles.button}
          onPress={this.onLoginPressed.bind(this)}
        >
          <Text style={styles.buttonText}>Confirm VOTE!</Text>
        </TouchableOpacity>

        <View style={styles.horizontal}>
          <ActivityIndicator
            animating={this.state.showProgress}
            size="large"
            color="rgb(196,60,108)"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
  },
  text: {
    fontSize: 13,
    justifyContent: "center",
    color: "rgb(98, 39, 116)",
    marginVertical: 15,
    textAlign: "center",
  },
  inputBox: {
    backgroundColor: "rgb(196,60,108)",
    borderRadius: 25, //< - ovalleştirme
    paddingHorizontal: 15, //<- inputun icindeki yazılar biraz önde baslıyor.
    fontSize: 25, //degistirdim
    color: "#ffffff",
    marginVertical: 10,
    textAlign: "center",
  },
  button: {
    marginTop: 10,
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
  horizontal: {
    marginTop: 20,
    marginBottom: 20,
  },
  picker: {
    backgroundColor: "white",
    width: "100%", //
    borderColor: "black",
    // height:
    paddingBottom: 0,

    transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }],
  },
});

export default Messages;

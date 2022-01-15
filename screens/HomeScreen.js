import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  FlatList,
  Alert,
} from "react-native";
import * as Google from "expo-google-app-auth";

export function HomeScreen({ route, navigation }) {
  const handleGoogleSignIn = () => {
    const config = {
      iosClientId:
        "43210928779-2cpp01ggda8uauqkkbuh6dvne9008veq.apps.googleusercontent.com",
      androidClientId:
        "43210928779-67ummr81diqbv4h722e4bkmniqu0qsmf.apps.googleusercontent.com",
      scopes: ["profile", "email"],
    };

    Google.logInAsync(config)
      .then((result) => {
        const { type, user } = result;
        if (type == "success") {
          const { email, name, photoUrl } = user;
          console.log("Signin successfull");
          setTimeout(
            () => navigation.navigate("Settings", { email, name, photoUrl }),
            1000
          );
        } else {
          console.log("Siging not successfull");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.buttonContainer}>
        <Button 
        style={styles.button}
          title="Sign In With Google"
          onPress={handleGoogleSignIn}
          
          color="#3ae8cf"
          
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
buttonContainer:{
  width:"90%",
  height:"20%"
},
});

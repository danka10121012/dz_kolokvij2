import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";

export function SettingsScreen({ route, navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getBeer = async () => {
    try {
      const response = await fetch(
        "https://api.sampleapis.com/beers/ale"
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBeer();
  }, []);

  function handleSettingsPress() {
    navigation.navigate("Home");
  }

  return (
    <View style={styles.screen}>
      
      <View>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View style={styles.itemWrapper}>
                <View style={styles.item}>
                  <View style={styles.image}>
                    <Image
                      style={styles.tinyLogo}
                      source={{
                        uri: `${item.image}`,
                      }}
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>Name:  {item.name}</Text>
                    <Text style={styles.text}>Price:  {item.price}</Text>
                  </View>
                  <Button title="Go to the Home screen!" onPress={handleSettingsPress}  color="#3ae8cf" /> 
                </View>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "black",


  },
  tinyLogo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  item: {
    flexDirection: "row",
    margin: 10,
  },
  textContainer: {
    padding: 15,
    paddingRight: 250,

  },
  text: {
    color: "white",
    padding: 3,
  },
});

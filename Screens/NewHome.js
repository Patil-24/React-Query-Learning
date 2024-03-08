import React from "react";
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import { useQueryClient } from "@tanstack/react-query";

const NewHome = ({ navigation }) => {
  const queryClient = useQueryClient();
  const query = queryClient.getQueryData(["products"]);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Detail', { productId: item.id })}>
      <View style={styles.item}>
        <Image source={{ uri: item.thumbnail }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>Price: ${item.price}</Text>
          <Text style={styles.category}>Category: {item.category}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={{margin:10}}>
      <Text style={{color:'blue',fontSize:18}}>In this screen data is displayed using cache not from api call </Text>
      </View>
      <FlatList
        data={query}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    color: "green",
  },
  category: {
    fontSize: 14,
    color: "#888",
  },
});

export default NewHome;

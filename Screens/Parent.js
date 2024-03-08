import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';


const Parent = ({navigation}) => {


  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Query Application</Text>
     
      <View style={styles.buttonContainer}>
      <View style={styles.buttonWrapper}>
            <Button
              title="Home"
              onPress={() => navigation.navigate("Home")}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              title="PaginationHome Home(pagination)"
              onPress={() => navigation.navigate("PaginationHome")}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              title="New Home(Cache)"
              onPress={() => navigation.navigate("NewHome")}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              title="Add Product"
              onPress={() => navigation.navigate("AddProduct")}
            />
          </View>

          <View style={styles.buttonWrapper}>
            <Button
              title="Update Product"
              onPress={() => navigation.navigate("UpdateProduct")}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              title="Delete Product"
              onPress={() => navigation.navigate("DeleteProduct")}
            />
          </View>
          
        </View>
    </View>
  );
};

export default Parent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    // flex:1,
    marginTop: 20,
  },
  buttonWrapper: {
    marginTop: 10,
  },
});

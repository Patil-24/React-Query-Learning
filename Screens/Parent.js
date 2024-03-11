import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';

// Screen component responsible for rendering navigation buttons
export default function Parent({navigation})  {
  return (
    // Main container
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>React Query Application</Text>
     
      {/* Container for buttons */}
      <View style={styles.buttonContainer}>
        {/* Button for navigating to Home */}
        <View style={styles.buttonWrapper}>
          <Button
            title="Home"
            onPress={() => navigation.navigate("Home")} // Navigate to Home screen
          />
        </View>
        {/* Button for navigating to PaginationHome */}
        <View style={styles.buttonWrapper}>
          <Button
            title="PaginationHome Home(pagination)"
            onPress={() => navigation.navigate("PaginationHome")} // Navigate to PaginationHome screen
          />
        </View>
        {/* Button for navigating to NewHome */}
        <View style={styles.buttonWrapper}>
          <Button
            title="New Home(Cache)"
            onPress={() => navigation.navigate("NewHome")} // Navigate to NewHome screen
          />
        </View>
        {/* Button for navigating to AddProduct */}
        <View style={styles.buttonWrapper}>
          <Button
            title="Add Product"
            onPress={() => navigation.navigate("AddProduct")} // Navigate to AddProduct screen
          />
        </View>
        {/* Button for navigating to UpdateProduct */}
        <View style={styles.buttonWrapper}>
          <Button
            title="Update Product"
            onPress={() => navigation.navigate("UpdateProduct")} // Navigate to UpdateProduct screen
          />
        </View>
        {/* Button for navigating to DeleteProduct */}
        <View style={styles.buttonWrapper}>
          <Button
            title="Delete Product"
            onPress={() => navigation.navigate("DeleteProduct")} // Navigate to DeleteProduct screen
          />
        </View>
      </View>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
  buttonWrapper: {
    marginTop: 10,
  },
});

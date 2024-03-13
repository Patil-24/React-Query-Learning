import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";

import { usePostHook } from "../hooks/usePostHook";

// Component for adding a new product
export default function AddProduct() {
  // State variable to hold the title of the new product
  const [title, setTitle] = useState("");
  const mutation = usePostHook("https://dummyjson.com/products/add");
  

  // Render UI
  return (
    <View style={styles.container}>
      {/* Input field for entering the title of the new product */}
      <TextInput
        style={styles.input}
        placeholder="Enter product title"
        value={title}
        onChangeText={setTitle}
      />
      {/* Render different UI based on mutation state */}
      {mutation.isLoading ? (
        <Text>Adding product...</Text>
      ) : (
        <>
          {/* Button to trigger adding the new product */}
          <Button
            title="Add Product"
            onPress={() => {
              mutation.mutate({ title });
            }}
            disabled={!title}
          />
          {/* Display error message if adding the product fails */}
          {mutation.isError && (
            <Text>An error occurred: {mutation.error.message}</Text>
          )}
          {/* Display success message if adding the product is successful */}
          {mutation.isSuccess && <Text>Product added!</Text>}
          {/* Display the response data if adding the product is successful */}
          {mutation.isSuccess && (
            <Text>Response: {JSON.stringify(mutation.data)}</Text>
          )}
        </>
      )}
    </View>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: "100%",
  },
});

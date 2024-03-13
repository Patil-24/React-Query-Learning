import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { useUpdateHook } from "../hooks/useUpdateHook";

// Component for updating product details
export default function UpdateProduct() {
  // State variables to hold product ID and new title
  const [productId, setProductId] = useState("");
  const [title, setTitle] = useState("");
  const mutation = useUpdateHook("https://dummyjson.com/products");

  return (
    <View style={styles.container}>
      {/* Input field for product ID */}
      <TextInput
        style={styles.input}
        placeholder="Enter product ID"
        value={productId}
        onChangeText={setProductId}
      />
      {/* Input field for new product title */}
      <TextInput
        style={styles.input}
        placeholder="Enter new product title"
        value={title}
        onChangeText={setTitle}
      />
      {/* Render different UI based on mutation state */}
      {mutation.isLoading ? (
        <Text>Updating product...</Text>
      ) : (
        <>
          {/* Button to trigger product update */}
          <Button
            title="Update Product"
            onPress={() => mutation.mutate()}
            disabled={!productId || !title}
          />
          {/* Display error message if update fails */}
          {mutation.isError && (
            <Text>An error occurred: {mutation.error.message}</Text>
          )}
          {/* Display success message if update is successful */}
          {mutation.isSuccess && <Text>Product updated!</Text>}
          {/* Display updated product details */}
          {mutation.isSuccess && (
            <Text>Response: {JSON.stringify(mutation.data.title)}</Text>
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

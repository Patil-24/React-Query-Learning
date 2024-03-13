import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { useDeleteHook } from "../hooks/useDeleteHook";

// Component for deleting a product
export default function DeleteProduct() {
  // State variable to hold the ID of the product to be deleted
  const [productId, setProductId] = useState("");
  const mutation = useDeleteHook("https://dummyjson.com/products");

  return (
    <View style={styles.container}>
      {/* Input field for entering the ID of the product to be deleted */}
      <TextInput
        style={styles.input}
        placeholder="Enter product ID"
        value={productId}
        onChangeText={setProductId}
      />
      {/* Render different UI based on mutation state */}
      {mutation.isLoading ? (
        <Text>Deleting product...</Text>
      ) : (
        <>
          <Text>Are you sure you want to delete this product?</Text>
          {/* Button to trigger deleting the product */}
          <Button
            title="Delete Product"
            onPress={() => {
              mutation.mutate();
            }}
            disabled={!productId}
          />
          {/* Display error message if deleting the product fails */}
          {mutation.isError && (
            <Text>An error occurred: {mutation.error.message}</Text>
          )}
          {/* Display success message if deleting the product is successful */}
          {mutation.isSuccess && <Text>Product deleted!</Text>}
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

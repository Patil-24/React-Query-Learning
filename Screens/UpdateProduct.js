import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { useMutation } from '@tanstack/react-query';

// Component for updating product details
export default function UpdateProduct() {
  // State variables to hold product ID and new title
  const [productId, setProductId] = useState('');
  const [title, setTitle] = useState('');

  // Mutation hook to handle product update
  const mutation = useMutation({
    mutationFn: async () => {
      try {
        // Send PUT request to update product
        const response = await fetch(`https://dummyjson.com/products/${productId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title }),
        });
        // Check if request was successful
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Return updated product data
        return response.json();
      } catch (error) {
        // Throw error if update fails
        throw new Error(`Unable to update product: ${error.message}`);
      }
    },
  });

  // Render UI
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
          {mutation.isError && <Text>An error occurred: {mutation.error.message}</Text>}
          {/* Display success message if update is successful */}
          {mutation.isSuccess && <Text>Product updated!</Text>}
          {/* Display updated product details */}
          {mutation.isSuccess && <Text>Response: {JSON.stringify(mutation.data.title)}</Text>}
        </>
      )}
    </View>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: '100%',
  },
});

import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { useMutation } from '@tanstack/react-query';

// Component for adding a new product
export default function AddProduct() {
  // State variable to hold the title of the new product
  const [title, setTitle] = useState('');

  // Mutation hook to handle adding a new product
  const mutation = useMutation({
    // Define the mutation function
    mutationFn: async (newProduct) => {
      try {
        // Send a POST request to add the new product
        const response = await fetch('https://dummyjson.com/products/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProduct)
        });
        // Check if the request was successful
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Return the response data
        return response.json();
      } catch (error) {
        // Throw an error if adding the product fails
        throw new Error(`Unable to add product: ${error.message}`);
      }
    },
  });

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
          {mutation.isError &&
            <Text>An error occurred: {mutation.error.message}</Text>
          }
          {/* Display success message if adding the product is successful */}
          {mutation.isSuccess && <Text>Product added!</Text> }
          {/* Display the response data if adding the product is successful */}
          {mutation.isSuccess &&
            <Text>Response: {JSON.stringify(mutation.data)}</Text>
          }
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

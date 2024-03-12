import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { UpdateHook } from '../hooks/UpdateHook'; // Import the custom hook

export default function UpdateProduct() {
  const [productId, setProductId] = useState('');
  const [title, setTitle] = useState('');

  // Define the endpoint
  const endpoint = 'https://dummyjson.com/products'; // Example endpoint, replace with your desired endpoint

  // Use the custom hook with the dynamic endpoint
  const mutation = UpdateHook(endpoint);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter product ID"
        value={productId}
        onChangeText={setProductId}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter new product title"
        value={title}
        onChangeText={setTitle}
      />
      {mutation.isLoading ? (
        <Text>Updating product...</Text>
      ) : (
        <>
          <Button
            title="Update Product"
            onPress={() => mutation.mutate({ productId, title })}
            disabled={!productId || !title}
          />
          {mutation.isError && <Text>An error occurred: {mutation.error.message}</Text>}
          {mutation.isSuccess && <Text>Product updated!</Text>}
          {mutation.isSuccess && <Text>Response: {JSON.stringify(mutation.data.title)}</Text>}
        </>
      )}
    </View>
  );
}

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

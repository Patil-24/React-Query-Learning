import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { DeleteHook } from '../hooks/DeleteHook';

export default function DeleteProduct() {
  const [productId, setProductId] = useState('');
  const endpoint = 'https://dummyjson.com/products'; // Example endpoint, replace with your desired endpoint
  const mutation = DeleteHook(endpoint);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter product ID"
        value={productId}
        onChangeText={setProductId}
      />
      {mutation.isLoading ? (
        <Text>Deleting product...</Text>
      ) : (
        <>
          <Text>Are you sure you want to delete this product?</Text>
          <Button
            title="Delete Product"
            onPress={() => {
              mutation.mutate(productId);
            }}
            disabled={!productId}
          />
          {mutation.isError && (
            <Text>An error occurred: {mutation.error.message}</Text>
          )}
          {mutation.isSuccess && <Text>Product deleted!</Text>}
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

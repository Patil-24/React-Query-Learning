import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { useMutation } from '@tanstack/react-query';

function UpdateProduct() {
  const [productId, setProductId] = useState('');
  const [title, setTitle] = useState('');
  const mutation = useMutation({
    mutationFn: async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${productId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title }),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      } catch (error) {
        throw new Error(`Unable to update product: ${error.message}`);
      }
    },
  });

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
            onPress={() => mutation.mutate()}
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

export default UpdateProduct;

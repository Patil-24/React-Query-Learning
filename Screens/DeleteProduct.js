import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function DeleteProduct() {
  const queryClient = useQueryClient();
  const [productId, setProductId] = useState('');
  const mutation = useMutation({
    mutationFn: async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${productId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Invalidate the previous product query to remove the deleted product from the cache
        // queryClient.invalidateQueries(['product', productId]);
        return response.json();
      } catch (error) {
        throw new Error(`Unable to delete product: ${error.message}`);
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
      {mutation.isLoading ? (
        <Text>Deleting product...</Text>
      ) : (
        <>
          <Text>Are you sure you want to delete this product?</Text>
          <Button
            title="Delete Product"
            onPress={() => {
              mutation.mutate();
            }}
            disabled={!productId}
          />
          {mutation.isError &&
            <Text>An error occurred: {mutation.error.message}</Text>
          }
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

export default DeleteProduct;

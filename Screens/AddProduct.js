import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { useMutation } from '@tanstack/react-query';

function AddProduct() {
  const [title, setTitle] = useState('');
  const mutation = useMutation({
    mutationFn: async (newProduct) => {
      try {
        const response = await fetch('https://dummyjson.com/products/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProduct)
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      } catch (error) {
        throw new Error(`Unable to add product: ${error.message}`);
      }
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter product title"
        value={title}
        onChangeText={setTitle}
      />
      {mutation.isLoading ? (
        <Text>Adding product...</Text>
      ) : (
        <>        

          <Button
            title="Add Product"
            onPress={() => {
              mutation.mutate({ title });
            }}
            disabled={!title}
          />
          {mutation.isError &&
            <Text>An error occurred: {mutation.error.message}</Text>
          }

          {mutation.isSuccess && <Text>Product added!</Text> }
          {mutation.isSuccess &&
            <Text>Response: {JSON.stringify(mutation.data)}</Text>
          }
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

export default AddProduct;

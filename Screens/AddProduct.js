import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { PostHook } from '../hooks/PostHook';

export default function AddProduct() {
  const [title, setTitle] = useState('');
  const mutation = PostHook('https://dummyjson.com/products/add');

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
          {mutation.isError && (
            <Text>An error occurred: {mutation.error.message}</Text>
          )}
          {mutation.isSuccess && <Text>Product added!</Text>}
          {mutation.isSuccess && (
            <Text>Response: {JSON.stringify(mutation.data)}</Text>
          )}
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

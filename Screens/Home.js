import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import { useQuery } from '@tanstack/react-query';

import { GetHook } from '../hooks/GetHook';

// // Function to fetch products from the API
// const fetchProducts = async () => {
//   try {
//     const response = await fetch('https://dummyjson.com/products');
//     const data = await response.json();
//     console.log("Data Fetched Home");
//     return data.products; 
//   } catch (error) {
//     console.error('Error fetching products:', error);
//   }
// };

// Home screen component
export default function Home ({ navigation })  {

  const { isLoading, error, data: products } = GetHook('https://dummyjson.com/products', 'products');
  // Query to fetch products using useQuery hook
  // const { isLoading, error, data: products } = useQuery({
  //   queryKey: ['products'],
  //   queryFn: fetchProducts,
  //   staleTime: Infinity,
  // });

  // Function to render each item in the FlatList
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Detail', { productId: item.id })}>
      <View style={styles.item}>
        <Image source={{ uri: item.thumbnail }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>Price: ${item.price}</Text>
          <Text style={styles.category}>Category: {item.category}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Render loading state
  if (isLoading) return <Text>Loading...</Text>;
  
  // Render error state if there's an error
  if (error) return <Text>Error fetching data</Text>;

  // Render the FlatList with fetched products
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: 'green',
  },
  category: {
    fontSize: 14,
    color: '#888',
  },
});

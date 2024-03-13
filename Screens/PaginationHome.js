import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query';

// Function to fetch products with pagination
const fetchProducts = async ({ pageParam = 0 }) => {
  // Fetch products with limit and skip parameters for pagination
  const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${pageParam}`);
  const data = await response.json();
  console.log("Data Fetched Paginated Home ",{pageParam});
  return data.products; 
};

// Paginated Home screen component
export default function PaginationHome ({ navigation })  {
  // Use InfiniteQuery to handle pagination
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    error,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['productsScroll'],
    queryFn: ({ pageParam }) => fetchProducts({ pageParam }), // Fetch products for the given page
    getNextPageParam: (allPages) => {
      // Calculate the next page to fetch based on the length of the current page
      return allPages.reduce((acc, page) => acc + page.length, 0);
    },
    staleTime: Infinity,
  });

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

  // Function to handle loading more items when reaching the end of the list
  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage(); // Fetch next page of products
    }
  };

  // Render loading state
  if (isLoading) return <Text>Loading...</Text>;
  // Render error state if there's an error
  if (error) return <Text>Error fetching data</Text>;

  // Render the FlatList with fetched products
  return (
    <View style={styles.container}>
      <FlatList
        data={data.pages.flatMap(page => page)} // Combine all pages of data
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={handleLoadMore} // Trigger loading more items when reaching the end
        onEndReachedThreshold={0.1} // Load more items when reaching 10% from the end
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
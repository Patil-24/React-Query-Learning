import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query';

const fetchProducts = async ({ pageParam = 0 }) => {
  const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${pageParam}`);
  const data = await response.json();
  console.log("Data Fetched Paginated Home ",{pageParam});
  return data.products; 
};

const PaginationHome = ({ navigation }) => {
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    error,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['productsScroll'],
    queryFn: ({ pageParam }) => fetchProducts({ pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      // Calculate the next page to fetch based on the length of the current page
      return allPages.reduce((acc, page) => acc + page.length, 0);
    },
    staleTime:Infinity,
  });

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

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error fetching data</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={data.pages.flatMap(page => page)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

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

export default PaginationHome;

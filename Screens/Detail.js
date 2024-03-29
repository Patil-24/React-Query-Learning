import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Button,
} from "react-native";
import { useQuery } from "@tanstack/react-query";

// Function to fetch product details by id
const fetchProductById = async (productId) => {
  const response = await fetch(`https://dummyjson.com/product/${productId}`);
  const data = await response.json();
  console.log("Data Fetched Detail", { productId });
  return data;
};

// Detail screen component
export default function Detail ({ navigation, route })  {
  const { productId } = route.params;

  // Query to fetch product details using useQuery hook
  const {
    isLoading,
    error,
    data: product,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProductById(productId),
    staleTime: Infinity,
  });

  // Render loading state
  if (isLoading) return <Text>Loading...</Text>;
  
  // Render error state if there's an error
  if (error) return <Text>Error fetching data</Text>;

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.card}>
          {/* Render product details */}
          <Image source={{ uri: product.thumbnail }} style={styles.image} />
          <View style={styles.cardContent}>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <Text style={styles.price}>Price: ${product.price}</Text>
            <Text style={styles.brand}>Brand: {product.brand}</Text>
            <Text style={styles.category}>Category: {product.category}</Text>
          </View>
        </View>

     
      </View>
    </ScrollView>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 20,
  },
  cardContent: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    color: "green",
    marginBottom: 5,
  },
  brand: {
    fontSize: 16,
    marginBottom: 5,
  },
  category: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    marginTop: 20,
  },
  buttonWrapper: {
    marginTop: 10,
  },
});

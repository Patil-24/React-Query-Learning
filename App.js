import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Screens/Home";
import Detail from "./Screens/Detail";
import AddProduct from "./Screens/AddProduct";
import UpdateProduct from "./Screens/UpdateProduct";
import DeleteProduct from "./Screens/DeleteProduct";
import NewHome from "./Screens/NewHome";
import PaginationHome from "./Screens/PaginationHome";
import Parent from "./Screens/Parent";

// Importing React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Creating a stack navigator
const Stack = createNativeStackNavigator();

// Creating a new instance of QueryClient
const queryClient = new QueryClient();

// Main component of the app
export default function App() {
  return (
    // Navigation container for managing navigation state
    <NavigationContainer>
      {/* Provider for QueryClient */}
      <QueryClientProvider client={queryClient}>
        {/* Stack Navigator for managing screens */}
        <Stack.Navigator initialRouteName="Parent">
        <Stack.Screen name="Parent" component={Parent} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Detail" component={Detail} />
          <Stack.Screen name="AddProduct" component={AddProduct} />         
          <Stack.Screen name="UpdateProduct" component={UpdateProduct} />
          <Stack.Screen name="DeleteProduct" component={DeleteProduct} />
          <Stack.Screen name="NewHome" component={NewHome} />
          <Stack.Screen name="PaginationHome" component={PaginationHome} />
        </Stack.Navigator>
      </QueryClientProvider>
    </NavigationContainer>
  );
}

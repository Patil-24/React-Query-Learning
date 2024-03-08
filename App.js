import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
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

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const Stack = createNativeStackNavigator();

const queryClient = new QueryClient();

export default function App() {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
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

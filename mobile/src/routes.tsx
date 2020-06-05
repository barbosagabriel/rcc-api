import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../src/pages/Home";
import CollectionCenters from "../src/pages/CollectionCenters";
import CenterDetail from "../src/pages/CenterDetail";

const AppStack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        headerMode="none"
        screenOptions={{
          cardStyle: {
            backgroundColor: "#f0f0f5",
          },
        }}
      >
        <AppStack.Screen name="Home" component={Home} />
        <AppStack.Screen
          name="CollectionCenters"
          component={CollectionCenters}
        />
        <AppStack.Screen name="CenterDetail" component={CenterDetail} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;

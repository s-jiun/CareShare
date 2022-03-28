import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../Home/Home";
import PostForm from "../Home/PostForm";
import PostDetail from "../Home/PostDetail";
import Chat from "../Chat/Chat";
import MyPage from "../User/MyPage";

const Stack = createStackNavigator();

export default function UserStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    cardStyle: { backgroundColor: "#ffffff" },
                }}
            >
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="PostDetail" component={PostDetail} />
                <Stack.Screen name="PostForm" component={PostForm} />
                <Stack.Screen name="Chat" component={Chat} />
                <Stack.Screen name="MyPage" component={MyPage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

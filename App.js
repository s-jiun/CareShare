import React from "react";
import { ThemeProvider } from "react-native-elements";
import "./config/firebase";
import RootNavigation from "./navigation";
import { StatusBar } from "expo-status-bar";

export default function App() {
    return (
        <ThemeProvider>
            <RootNavigation />
            <StatusBar style="auto" />
        </ThemeProvider>
    );
}

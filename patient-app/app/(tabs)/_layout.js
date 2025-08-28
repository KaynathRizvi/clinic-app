import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function TabLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Check token on mount
  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("token");
      setIsLoggedIn(!!token);
    };
    checkLogin();
  }, []);

  // Logout function
  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    setIsLoggedIn(false);
    router.replace("/auth/loginPage"); // redirect to login
  };

  return (
    <Tabs
      key={isLoggedIn ? "loggedIn" : "loggedOut"} // forces remount to update tab label/icon
      initialRouteName="index"
      screenOptions={{
        tabBarActiveTintColor: "#056c6c",
        headerStyle: { backgroundColor: "#056c6c" },
        headerTintColor: "#fff",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
          headerStyle: { backgroundColor: "#056c6c" },
          headerTintColor: "#fff",
        }}
      />
      <Tabs.Screen
        name="aboutPage"
        options={{
          title: "About",
          tabBarIcon: ({ color, size }) => <Ionicons name="information-circle" size={size} color={color} />,
          headerStyle: { backgroundColor: "#056c6c" },
          headerTintColor: "#fff",
        }}
      />
      <Tabs.Screen
        name="contactPage"
        options={{
          title: "Contact",
          tabBarIcon: ({ color, size }) => <Ionicons name="call" size={size} color={color} />,
          headerStyle: { backgroundColor: "#056c6c" },
          headerTintColor: "#fff",
        }}
      />
      <Tabs.Screen
        name="viewAppointment"
        options={{
          title: "View",
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar" size={size} color={color} />,
          headerStyle: { backgroundColor: "#056c6c" },
          headerTintColor: "#fff",
        }}
      />
      <Tabs.Screen
        name="bookAppointment"
        options={{
          title: "Book",
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar" size={size} color={color} />,
          headerStyle: { backgroundColor: "#056c6c" },
          headerTintColor: "#fff",
        }}
      />
      <Tabs.Screen
        name="allPrescriptions"
        options={{
          title: "Prescriptions",
          tabBarIcon: ({ color, size }) => <Ionicons name="document-text" size={size} color={color} />,
          headerStyle: { backgroundColor: "#056c6c" },
          headerTintColor: "#fff",
        }}
      />
      <Tabs.Screen
        name="loginTab"
        options={{
          title: isLoggedIn ? "Logout" : "Login",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={isLoggedIn ? "log-out" : "log-in"} size={size} color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            if (isLoggedIn) {
              e.preventDefault(); // prevent navigation
              handleLogout();
            } else {
              router.push("/auth/loginPage"); // go to login
            }
          },
        }}
      />
    </Tabs>
  );
}

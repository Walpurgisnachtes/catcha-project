// App.js
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Login from "./js/login";
import Lobby from "./js/lobby";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAccount, setUserAccount] = useState("");

  const handleLogin = (account) => {
    setUserAccount(account);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserAccount("");
    setShowSurvey(false);
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {!isLoggedIn ? (
          <Login onLogin={handleLogin} />
        ) : (
          <>
            
            {/* 內容容器：使用 marginTop 預留空間給固定在頂部的 Header */}
            <View style={styles.content}>
                <Lobby 
                  onLogout={handleLogout} 
                  onSurveyNeeded={() => setShowSurvey(true)} 
                  account={userAccount} 
                />
            </View>
          </>
        )}
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

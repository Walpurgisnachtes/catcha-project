// App.js
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Login from "./js/login";
import Lobby from "./js/lobby";
import Survey from "./js/survey";
import Header from "./js/header"; // 匯入剛才寫的 Header

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAccount, setUserAccount] = useState("");
  const [isSurveyCompleted, setIsSurveyCompleted] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);

  const handleLogin = (account) => {
    setUserAccount(account);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserAccount("");
    setShowSurvey(false);
  };

  const handleSurveyComplete = () => {
    setIsSurveyCompleted(true);
    setShowSurvey(false);
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {!isLoggedIn ? (
          // 未登入時顯示登入頁面，通常不需要 Header
          <Login onLogin={handleLogin} />
        ) : (
          // 已登入後顯示 Header 與 內容
          <>
            <Header onLogout={handleLogout} username={userAccount} />
            
            {/* 內容容器：使用 marginTop 預留空間給固定在頂部的 Header */}
            <View style={styles.content}>
              {showSurvey ? (
                <Survey 
                  account={userAccount} 
                  onComplete={handleSurveyComplete} 
                />
              ) : (
                <Lobby 
                  onLogout={handleLogout} 
                  onSurveyNeeded={() => setShowSurvey(true)} 
                  account={userAccount} 
                />
              )}
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
  content: {
    flex: 1,
    // 重要：根據 Header 的高度與安全區域調整 marginTop
    // 這樣內容才不會被 absolute 定位的 Header 遮住
    marginTop: 100, 
  },
});

// lobby.js
import { StyleSheet, Text, View, ActivityIndicator, Alert } from "react-native";
import { useEffect, useState } from "react";
import Header from "./header";

export default function Lobby({ onLogout, onSurveyNeeded, account }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSurveyStatus();
  }, []);

  const checkSurveyStatus = async () => {
    try {
      const response = await fetch('http://192.168.0.203:8000/check_survey_status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          account: account,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (!data.is_all_finish) {
          // Survey not completed, redirect to survey
          onSurveyNeeded();
        }
      } else {
        Alert.alert("錯誤", "無法檢查問卷狀態");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("錯誤", "無法連線至伺服器");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header onLogout={onLogout} />
      <Text style={styles.welcomeText}>welcome</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
    alignItems: "center",
    justifyContent: "center",
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#333",
    letterSpacing: 1.5,
  },
});
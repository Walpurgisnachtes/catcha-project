// login.js
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert, ActivityIndicator } from "react-native";
import { useState } from "react";

export default function Login({ onLogin }) {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginPress = async () => {
    if (!account || !password) {
      Alert.alert("提示", "請輸入帳號和密碼");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://192.168.0.203:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          account: account,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.status === "pass") {
        Alert.alert("成功", "登入通過！");
        onLogin(account);
      } else {
        Alert.alert("失敗", "帳號或密碼錯誤");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("錯誤", "無法連線至伺服器，請檢查網路與 IP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/login/archetto.png")}
        style={styles.image}
      />
      <Text style={styles.text}>login</Text>
      <TextInput
        style={styles.input}
        placeholder="account"
        placeholderTextColor="#999"
        value={account}
        onChangeText={setAccount}
        editable={!loading}
      />
      <TextInput
        style={styles.input}
        placeholder="password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        editable={!loading}
      />
      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleLoginPress}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 30,
  },
  text: {
    color: "#333",
    fontSize: 48,
    fontWeight: "bold",
    letterSpacing: 1.5,
    marginBottom: 30,
  },
  input: {
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    color: "#333",
    fontSize: 16,
  },
  button: {
    width: "100%",
    backgroundColor: "#007AFF",
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
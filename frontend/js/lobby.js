// lobby.js
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export default function Lobby({ onLogout }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/login/archetto.png")}
          style={styles.headerImage}
        />
        <View style={styles.headerRight}>
          <Text style={styles.username}>matthew</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
            <Text style={styles.logoutButtonText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  header: {
    position: "absolute",
    top: 40, // 考慮到狀態欄高度
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  welcomeText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#333",
    letterSpacing: 1.5,
  },
});
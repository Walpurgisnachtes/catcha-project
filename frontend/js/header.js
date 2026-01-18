import { StyleSheet, Text, View, Image, TouchableOpacity, Platform, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; // 建議安裝此套件處理劉海屏

export default function Header({ onLogout, username = "matthew" }) {
  return (
    // 使用 SafeAreaView 自動處理 iPhone 的劉海區域
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.header}>
        <Image
          source={require("../assets/login/archetto.png")}
          style={styles.headerImage}
        />
        <View style={styles.headerRight}>
          <Text style={styles.username}>{username}</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
            <Text style={styles.logoutButtonText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#fff", // Header 的背景色，防止背景內容透出
    // 像 HTML sticky 一樣固定在頂部
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000, // 確保在所有組件最上層
    // 添加陰影讓它看起來更像頂部列
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10, // 縮小高度
    height: 60,
  },
  headerImage: {
    width: 40,
    height: 40,
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
    borderRadius: 6,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },
});
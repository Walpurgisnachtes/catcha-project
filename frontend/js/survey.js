import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useState } from "react";
import Header from "./header";

export default function Survey({ onLogout, account, onComplete }) {
  // 狀態管理
  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const [direction, setDirection] = useState("Law"); // 預設為 Law
  const [mode, setMode] = useState("普通"); // 預設為 普通
  const [performance, setPerformance] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim() || !skills.trim()) {
      Alert.alert("提示", "請填寫您的名字與基本技能");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://192.168.0.203:8000/submit_survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          account: account,
          name: name,
          skills: skills,
          direction: direction,
          learning_mode: mode,
          performance: performance,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("成功", "CatCHA! 已收到您的資訊，正在制定發展計劃");
        onComplete();
      } else {
        Alert.alert("失敗", data.detail || "問卷提交失敗");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("錯誤", "無法連線至伺服器");
    } finally {
      setLoading(false);
    }
  };

  // 方向選項渲染組件
  const DirectionButton = ({ label }) => (
    <TouchableOpacity
      style={[styles.dirButton, direction === label && styles.dirButtonActive]}
      onPress={() => setDirection(label)}
    >
      <Text
        style={[
          styles.dirButtonText,
          direction === label && styles.dirButtonTextActive,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        Step 1) 分析你的發展方向{"\n"}分析學習進度
      </Text>

      {/* 第一部分：簡短問卷 */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>1. 簡短問卷</Text>
        <Text style={styles.redTag}>-瞭解用戶需求</Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>1.1 基本資料 (姓名)</Text>
        <TextInput
          style={styles.input}
          placeholder="請輸入姓名"
          value={name}
          onChangeText={setName}
          editable={!loading}
        />

        <Text style={[styles.questionText, { marginTop: 15 }]}>
          1.2 過往學習及已有技能
        </Text>
        <TextInput
          style={styles.input}
          placeholder="例如：程式開發、基礎法律、數據分析"
          value={skills}
          onChangeText={setSkills}
          editable={!loading}
        />

        <Text style={[styles.questionText, { marginTop: 15 }]}>
          1.3 期望的發展方向
        </Text>
        <View style={styles.dirGrid}>
          {["Law", "Medical", "Research", "IT"].map((item) => (
            <DirectionButton key={item} label={item} />
          ))}
        </View>

        <Text style={[styles.questionText, { marginTop: 15 }]}>
          1.4 偏好的學習模式
        </Text>
        <View style={styles.modeRow}>
          {["輕鬆", "普通", "困難"].map((m) => (
            <TouchableOpacity
              key={m}
              style={[styles.modeButton, mode === m && styles.modeButtonActive]}
              onPress={() => setMode(m)}
            >
              <Text
                style={mode === m ? styles.modeTextActive : styles.modeText}
              >
                {m}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 第二部分：做測試 */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>2. 做測試</Text>
        <Text style={styles.redTag}>-確認用戶能力</Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>
          描述已選擇方向及表現出色的相關科目：
        </Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="這將方便我們為您制定個人檔案及計劃"
          multiline={true}
          numberOfLines={4}
          value={performance}
          onChangeText={setPerformance}
          editable={!loading}
        />
      </View>

      <Text style={styles.purpleFooter}>
        即使沒有擅長才能或清晰目標，{"\n"}
        CatCHA 都能幫你找到自己
      </Text>

      <TouchableOpacity
        style={[styles.submitButton, loading && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>提交分析問卷</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f0f4f8",
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "900",
    color: "#222",
    marginBottom: 30,
    textAlign: "left",
    lineHeight: 35,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  redTag: {
    fontSize: 16,
    color: "red",
    fontWeight: "bold",
    marginLeft: 10,
  },
  questionContainer: {
    marginBottom: 25,
    backgroundColor: "transparent",
  },
  questionText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#444",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  dirGrid: {
    flexDirection: "column",
    gap: 10,
  },
  dirButton: {
    backgroundColor: "#F9A825", // 橘黃色
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    elevation: 2,
  },
  dirButtonActive: {
    backgroundColor: "#E65100", // 點選後變深橘
    borderWidth: 2,
    borderColor: "#000",
  },
  dirButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  dirButtonTextActive: {
    color: "#fff",
  },
  modeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modeButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  modeButtonActive: {
    backgroundColor: "#333",
  },
  modeText: { color: "#333" },
  modeTextActive: { color: "#fff", fontWeight: "bold" },
  purpleFooter: {
    color: "#6A5ACD",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 20,
    lineHeight: 22,
  },
  submitButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 50,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

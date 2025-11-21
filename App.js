import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Pressable,
} from "react-native";
import {
  CalendarBody,
  CalendarContainer,
  CalendarHeader,
} from "@howljs/calendar-kit";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [viewMode, setViewMode] = useState(7); // Default to week view (7 days)

  const viewModeOptions = [
    { label: "Day View", value: 1 },
    { label: "3-Day View", value: 3 },
    { label: "Week View", value: 7 },
    { label: "Month View", value: 30 },
  ];

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    setModalVisible(false);
  };

  const getViewModeLabel = () => {
    const option = viewModeOptions.find((opt) => opt.value === viewMode);
    return option ? option.label : "Week View";
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {/* View Mode Selector Button */}
      <Pressable
        style={styles.viewModeButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.viewModeButtonText}>
          View: {getViewModeLabel()} ▼
        </Text>
      </Pressable>

      {/* Calendar Container */}
      <View style={styles.calendarWrapper}>
        <CalendarContainer numberOfDays={viewMode}>
          <CalendarHeader />
          <CalendarBody />
        </CalendarContainer>
      </View>

      {/* View Mode Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <Pressable style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select View Mode</Text>

            {viewModeOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.modalOption,
                  viewMode === option.value && styles.modalOptionSelected,
                ]}
                onPress={() => handleViewModeChange(option.value)}
              >
                <Text
                  style={[
                    styles.modalOptionText,
                    viewMode === option.value && styles.modalOptionTextSelected,
                  ]}
                >
                  {option.label}
                </Text>
                {viewMode === option.value && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.modalCancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  viewModeButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  viewModeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  calendarWrapper: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    maxWidth: 300,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  modalOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
  },
  modalOptionSelected: {
    backgroundColor: "#007AFF",
  },
  modalOptionText: {
    fontSize: 16,
    color: "#333",
  },
  modalOptionTextSelected: {
    color: "#fff",
    fontWeight: "600",
  },
  checkmark: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  modalCancelButton: {
    marginTop: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  modalCancelText: {
    fontSize: 16,
    color: "#666",
  },
});

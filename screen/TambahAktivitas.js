import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
} from "react-native";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { formatDate } from "../components/Options";

export default function TambahAktivitas() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState(["Pos 1", "Pos 2", "Pos 3", "Pos 4"]); // Your dropdown items
  const [showDateTimePick, setShowDateTimePick] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Set an initial date

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const selectItem = (item) => {
    setSelectedItem(item);
    setDropdownVisible(false);
  };

  const openDatePick = () => {
    setShowDateTimePick(true);
    setDropdownVisible(false);
  };

  const closeDatePick = () => {
    setShowDateTimePick(false);
  };

  const toggleDatePicker = () => {
    if (showDateTimePick) {
      closeDatePick();
    } else {
      openDatePick();
    }
  };

  const handleDateChange = (event, date) => {
    if (date) {
      setSelectedDate(date);
    }
    closeDatePick();
  };

  return (
    <View style={styles.formBox}>
      <Text>Pos Jaga</Text>
      {/* Dropdown */}
      <View style={styles.containerDropdown}>
        <TouchableOpacity onPress={toggleDropdown}>
          <Text style={styles.dropdownToggle}>
            {selectedItem || "Select an item"}
          </Text>
        </TouchableOpacity>

        {dropdownVisible && (
          <View style={styles.dropdown}>
            <FlatList
              data={items}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => selectItem(item)}>
                  <Text style={styles.dropdownItem}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>

      {/* Date Picker */}
      <View>
        <Text>Waktu Aktivitas</Text>
        <TouchableOpacity onPress={toggleDatePicker} style={styles.formInput}>
          <Text>{formatDate(selectedDate)}</Text>
        </TouchableOpacity>
      </View>

      {showDateTimePick && (
        <RNDateTimePicker
          value={selectedDate}
          mode="date"
          locale="id-ID"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerDropdown: {
    marginTop: 10,
  },
  formBox: {
    marginTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
  },
  formInput: {
    height: 50,
    borderRadius: 20,
    padding: 10,
    backgroundColor: "#DDDDDD",
  },
  dropdownToggle: {
    backgroundColor: "#DDDDDD",
    borderRadius: 20,
    height: 50,
    padding: 10,
  },
  dropdown: {
    position: "absolute",
    top: 40, // Adjust the top position as needed
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    width: "100%",
    maxHeight: 150,
    zIndex: 1,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

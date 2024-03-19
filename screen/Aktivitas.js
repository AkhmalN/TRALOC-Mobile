import React, { useEffect, useState } from "react";
import { formatDate } from "../components/Options";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AktivitasController from "../controllers/add-aktivitas";

export default function Aktivitas({ route }) {
  const { savedPhoto } = route ? route.params || {} : {};

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [items, setItems] = useState([]);
  const [lokasi, setLokasi] = useState("");
  const [Catatan, setCatatan] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const selectItem = (item) => {
    setSelectedItem(item.title);
    setDropdownVisible(false);
  };

  const getPosCollection = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://server-smartpatrol.vercel.app/api/v1/pos"
      );
      setLoading(false);
      setItems(response.data.data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    getPosCollection();
  }, []);

  return (
    <AktivitasController
      savedPhoto={savedPhoto}
      toggleDropdown={toggleDropdown}
      selectedItem={selectedItem}
      dropdownVisible={dropdownVisible}
      selectItem={selectItem}
      items={items}
      loading={loading}
    />
  );
}

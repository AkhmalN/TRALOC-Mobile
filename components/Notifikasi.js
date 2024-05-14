import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { BG_COLOR } from "../constant/color";

export const Notifikasi = ({ visible, hideModal, message }) => (
  <Modal
    visible={visible}
    transparent={true}
    animationType="slide"
    onRequestClose={hideModal}
  >
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          padding: 20,
          borderRadius: 10,
          width: 300,
          maxHeight: 200,
        }}
      >
        <Text style={{ fontSize: 30, marginBottom: 5 }}>Notifikasi</Text>
        <Text style={{ fontSize: 19, marginBottom: 15 }}>{message}</Text>
        <TouchableOpacity
          onPress={hideModal}
          style={{
            backgroundColor: BG_COLOR.primary,
            borderRadius: 10,
            height: 45,
            justifyContent: "center",
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 18, color: "#FFF" }}>
            Tutup
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

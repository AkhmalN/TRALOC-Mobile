import React, { useState } from "react";
import { View, Text, Modal, Button } from "react-native";

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
          height: 200,
        }}
      >
        <Text style={{ fontSize: 30, marginBottom: 10 }}>Notifikasi</Text>
        <Text style={{ fontSize: 20, marginBottom: 40 }}>{message}</Text>
        <Button title="Tutup" onPress={hideModal} />
      </View>
    </View>
  </Modal>
);

import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAbsensi } from "../../api/absensi";
import { useAuth } from "../../context/userContext";

const ModalDelete = ({ visible, onRequestClose, data }) => {
  const { id } = useAuth();
  const queryClient = useQueryClient();
  const deleteIzinMutation = useMutation({
    mutationFn: deleteAbsensi,
    onSuccess: async () => {
      console.log("delete success");
      await queryClient.refetchQueries(["data", id]);
      onRequestClose();
    },
    onError: () => {
      console.log("delete error");
    },
    onSettled: async () => {
      console.log("deleted state is reset");
    },
  });

  const handleOnDelete = () => {
    deleteIzinMutation.mutateAsync(data._id);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.overlay}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hapus Absensi</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "red" }]}
                onPress={handleOnDelete}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text style={[styles.buttonText]}>
                    {deleteIzinMutation.isPending ? (
                      <ActivityIndicator />
                    ) : (
                      "Hapus"
                    )}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.outlineButton]}
                onPress={onRequestClose}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text style={[styles.buttonText, { color: "red" }]}>
                    Cancel
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust opacity as needed
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "80%",
    height: "20%",
    backgroundColor: "#F6F5F5",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    width: "100%",
    padding: 10,
    marginBottom: 15,
    textAlign: "center",
    color: "red",
    fontSize: 20,
    fontWeight: "bold",
    borderBottomWidth: 0.5,
    borderBottomColor: "grey",
  },
  modalSubText: {
    color: "red",
    fontWeight: "400",
  },
  modalImgPreview: {
    width: "50%",
    height: "50%",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    width: "40%",
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    marginVertical: 10,
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: "red",
  },

  buttonText: {
    fontSize: 18,
    color: "#FFF",
  },
});

export default ModalDelete;

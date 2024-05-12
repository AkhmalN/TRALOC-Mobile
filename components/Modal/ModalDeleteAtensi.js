import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAtensi } from "../../api/atensi";

const ModalDeleteAtensi = ({ visible, onRequestClose, data }) => {
  const [errorDelete, setErrorDelete] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const queryClient = useQueryClient();
  const deleteAtensiMutation = useMutation({
    mutationFn: deleteAtensi,
    onSuccess: () => {
      setSuccessDelete(true);
      setSuccessMessage("Data atensi berhasil di hapus!");
      queryClient.refetchQueries(["data_aktivitas"]);
      queryClient.refetchQueries(["data_atensi"]);
      setTimeout(() => {
        setSuccessDelete(false);
        setSuccessMessage(null);
        onRequestClose();
      }, 2000);
    },
    onError: (error) => {
      setErrorDelete(true);
      setErrorMessage(`Terjadi kesalahan, ${error.message}`);
      setTimeout(() => {
        setErrorDelete(false);
        setErrorMessage(null);
        onRequestClose();
      }, 2000);
    },
    onSettled: async () => {},
  });

  const handleOnDelete = () => {
    deleteAtensiMutation.mutateAsync(data._id);
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
            <Text style={styles.modalText}>Hapus Atensi?</Text>
            {errorDelete && (
              <Text style={styles.errorText}>{errorMessage}</Text>
            )}
            {successDelete && (
              <Text style={styles.errorText}>{successMessage}</Text>
            )}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "red" }]}
                onPress={handleOnDelete}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text style={[styles.buttonText]}>
                    {deleteAtensiMutation.isPending ? (
                      <ActivityIndicator color={"#FFF"} />
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
  errorText: {
    fontSize: 16,
    color: "red",
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

export default ModalDeleteAtensi;

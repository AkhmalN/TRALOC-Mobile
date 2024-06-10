import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllPatroli } from "../api/patroli";
import ModalLoading from "../components/ModalLoading";
import { ScrollView } from "react-native-gesture-handler";
import { BG_COLOR, ICON_COLOR, TEXT_COLOR } from "../constant/color";
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import { DateFormat, TimeFormat } from "../utils/DateFormat";
const PatroliHarian = () => {
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["all_data_patroli"],
    queryFn: getAllPatroli,
  });

  if (isLoading) {
    return <ModalLoading />;
  }
  if (isError) {
    return (
      <View
        style={{
          backgroundColor: BG_COLOR.danger,
          marginHorizontal: 40,
          marginVertical: 20,
          alignItems: "center",
          borderRadius: 5,
          paddingVertical: 5,
        }}
      >
        <Text style={{ fontSize: 18, color: TEXT_COLOR.light }}>
          Terjadi kesalahan dalam memuat data ...
        </Text>
        <Text style={{ fontSize: 18, color: TEXT_COLOR.light }}>
          {error.message}
        </Text>
      </View>
    );
  }

  const handleOnRefresh = async () => {
    queryClient.refetchQueries("all_data_patroli");
  };

  function getStatusBg(status) {
    let color;
    switch (status) {
      case "Kebakaran":
        color = "#E72929";
        break;
    }
    return color;
  }

  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          width: "100%",
          zIndex: 1,
          position: "absolute",
          bottom: "2%",
        }}
      >
        <TouchableOpacity
          onPress={handleOnRefresh}
          style={{
            backgroundColor: BG_COLOR.primary,
            borderRadius: 5,
            height: 50,
            width: 50,
          }}
        >
          <EvilIcons
            name="refresh"
            size={50}
            color={ICON_COLOR.light}
            style={{ marginRight: 8 }}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.5,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        {data && data.length > 0 ? (
          data.map((x, y) => {
            return (
              <View
                key={y}
                style={{
                  backgroundColor: "grey",
                  width: "100%",
                  borderRadius: 10,
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  marginVertical: 10,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.5,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      marginVertical: 2,
                      color: TEXT_COLOR.light,
                      paddingVertical: 3,
                      borderRadius: 5,
                    }}
                  >
                    {x.nama_instansi}
                  </Text>
                  <Text style={{ fontSize: 18, color: TEXT_COLOR.light }}>
                    {x.createdAt ? DateFormat(x.createdAt) : "-"}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 18,
                    marginVertical: 2,
                    color: TEXT_COLOR.light,
                  }}
                >
                  Waktu : {x.createdAt ? TimeFormat(x.createdAt) : "-"} WIB
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    marginVertical: 2,
                    color: TEXT_COLOR.light,
                  }}
                >
                  Petugas : {x.nama_lengkap}
                </Text>
                <View
                  style={{
                    marginVertical: 2,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 18, color: TEXT_COLOR.light }}>
                    Lokasi :
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      paddingHorizontal: 5,
                      paddingTop: 3,
                      marginLeft: 5,
                      borderRadius: 3,
                      color: TEXT_COLOR.light,
                      maxHeight: 50,
                      maxWidth: "90%",
                      marginTop: 5,
                    }}
                  >
                    {x.lokasi_pos}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: TEXT_COLOR.light,
                      marginVertical: 2,
                    }}
                  >
                    Status :
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      backgroundColor: getStatusBg(x.status),
                      marginHorizontal: 10,
                      paddingVertical: 2,
                      paddingHorizontal: 6,
                      alignItems: "center",
                      borderRadius: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        color: TEXT_COLOR.light,
                      }}
                    >
                      {x.status}
                    </Text>
                    {x.status === "Kebakaran" ? (
                      <Ionicons
                        name="alert"
                        size={24}
                        color={ICON_COLOR.light}
                      />
                    ) : (
                      ""
                    )}
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      color: TEXT_COLOR.light,
                    }}
                  >
                    Catatan :
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      color: TEXT_COLOR.light,
                      marginVertical: 2,
                      marginHorizontal: 5,
                      maxHeight: 70,
                      maxWidth: "90%",
                    }}
                  >
                    {x.notes}
                  </Text>
                </View>
              </View>
            );
          })
        ) : (
          <View
            style={{
              backgroundColor: BG_COLOR.danger,
              height: 40,

              flexDirection: "row",
              alignItems: "center",
              borderRadius: 7,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                width: "100%",
                color: TEXT_COLOR.light,
                fontSize: 18,
              }}
            >
              Tidak ada patroli yang ditampikan!
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default PatroliHarian;

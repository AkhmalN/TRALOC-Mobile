import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const KodeSos = () => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View>
      <TouchableOpacity style={styles.cardContainer}>
        <View style={styles.iconMenu}>
          <Ionicons name="fitness-outline" size={35} color={"#F5F5F5"} />
        </View>
        <View style={styles.cardTitle}>
          <Text style={styles.cardTextInd}>SOS</Text>
          <Text style={styles.cardTextEng}>Kirim SOS | Send SOS</Text>
        </View>
        <View style={styles.iconRight}>
          <Ionicons
            name="chevron-forward-outline"
            size={30}
            color={"#F5F5F5"}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default KodeSos;

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android" || Platform.OS === "ios") {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: "2e68cc1e-ba07-4332-8b0c-430523de5d53",
      })
    ).data;
    console.log(token);
  } else {
    alert("Push notifications are not supported on this platform.");
  }

  return token;
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    marginBottom: 10,
    borderRadius: 20,
    padding: 10,
    height: 80,
    alignItems: "center",
    backgroundColor: "#D24545",
  },
  iconMenu: {
    width: "10%",
    marginRight: 10,
  },
  cardTitle: {
    width: "80%",
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  iconRight: {
    width: "10%",
    marginRight: 10,
  },
  cardTitle: {
    width: "80%",
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  cardTextInd: {
    fontSize: 18,
    color: "#F5F5F5",
    fontWeight: "bold",
  },
  cardTextEng: {
    color: "#F5F5F5",
  },
});

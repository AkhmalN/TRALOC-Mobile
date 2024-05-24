import React, { useEffect, useRef } from "react";
import MainNavigator from "./ScreenStack.js";
import { UserProvider } from "./context/userContext.js";
import { registerPushNotificationAsync } from "./services/Notification.js";
import * as Notifications from "expo-notifications";
import {
  sendTokenPatroli,
  sendTokenAktivitas,
  sendTokenAtensi,
} from "./api/Notification.js";
import { registerNotificationListeners } from "./services/NotificationConfig.js";

export default function App() {
  const notificationListener = useRef();
  const responseListener = useRef();
  const cleanupRef = useRef(null); // Ref to store cleanup function

  useEffect(() => {
    const setupNotifications = async () => {
      try {
        const token = await registerPushNotificationAsync();
        if (token) {
          await sendTokenPatroli(token);
          await sendTokenAktivitas(token);
          await sendTokenAtensi(token);
        } else {
          console.error("Failed to get push token");
        }

        // Register notification listeners and get cleanup function
        const cleanup = registerNotificationListeners(
          notificationListener,
          responseListener
        );
        cleanupRef.current = cleanup; // Store cleanup function in ref
      } catch (error) {
        console.error("Error setting up notifications:", error);
      }
    };

    setupNotifications();

    // Cleanup listeners on component unmount
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      } else {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return (
    <UserProvider>
      <MainNavigator />
    </UserProvider>
  );
}

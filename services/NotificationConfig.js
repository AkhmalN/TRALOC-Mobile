// services/NotificationConfig.js
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const registerNotificationListeners = (
  notificationListener,
  responseListener
) => {
  notificationListener.current = Notifications.addNotificationReceivedListener(
    (notification) => {
      // Handle notification data here
    }
  );

  responseListener.current =
    Notifications.addNotificationResponseReceivedListener((response) => {
      // Handle notification response here
    });

  return () => {
    if (notificationListener.current) {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
    }
    if (responseListener.current) {
      Notifications.removeNotificationSubscription(responseListener.current);
    }
  };
};

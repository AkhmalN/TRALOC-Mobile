import MainNavigator from "./ScreenStack.js";
import { UserProvider } from "./context/userContext.js";
export default function App() {
  return (
    <UserProvider>
      <MainNavigator />
    </UserProvider>
  );
}

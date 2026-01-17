import { Tabs } from "expo-router";

export default function RootLayout() {
   return <Tabs>
      <Tabs.Screen name="wallet" options={{title: "Dashboard"}} />
      <Tabs.Screen name="index" options={{title: "Home"}} />
   </Tabs>
}

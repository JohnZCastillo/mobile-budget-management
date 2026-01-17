import { Stack } from "expo-router";

import AllowanceContextProvider from "@/context/AllowanceContextProvider";
import '@/global.css';

import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as SQLite from 'expo-sqlite';

const expo = SQLite.openDatabaseSync('db.db');
const db = drizzle(expo);

export default function RootLayout() {
   return (
   <AllowanceContextProvider>
    <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{
            presentation: 'modal',
          }}
        />
          <Stack.Screen
          name="expenseModal"
          options={{
            presentation: 'modal',
          }}
        />
      </Stack>
   </AllowanceContextProvider>
   )
}

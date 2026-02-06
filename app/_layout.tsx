import { Stack } from "expo-router";

import AllowanceContextProvider from "@/context/AllowanceContextProvider";
import '@/global.css';

import migrations from '@/drizzle/migrations';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';

import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { KeyboardProvider } from "react-native-keyboard-controller";

import * as SQLite from 'expo-sqlite';
import { SafeAreaProvider } from "react-native-safe-area-context";

const expo = SQLite.openDatabaseSync('db.db');
const db = drizzle(expo);

export default function RootLayout() {

  const {success, error} = useMigrations(db, migrations)
  
  useDrizzleStudio(expo);

   return (
    <SafeAreaProvider>
      <KeyboardProvider>
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
              <Stack.Screen
                name="addBudgetModal"
                options={{
                  presentation: 'transparentModal',
                  headerShown: false
                }}
              />
              <Stack.Screen
                name="addBudget"
                options={{
                  presentation: 'transparentModal',
                  headerShown: false
                }}
              />
              <Stack.Screen
                name="addExpense"
                options={{
                  presentation: 'transparentModal',
                  headerShown: false
                }}
              />
            </Stack>
        </AllowanceContextProvider>
      </KeyboardProvider>
    </SafeAreaProvider>
   )
}

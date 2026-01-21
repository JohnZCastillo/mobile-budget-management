import { AllowanceContext } from "@/context/AllowanceContextProvider";
import db from "@/db/db";
import * as schema from '@/db/schema';
import Ionicons from '@expo/vector-icons/Ionicons';
import { eq } from 'drizzle-orm';
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useContext } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
  
export default function ModalScreen(){
    
    const {selectedAllowance} = useContext(AllowanceContext);
    
    const {data: expenses} = useLiveQuery(db.select().from(schema.expense).where(eq(schema.expense.id, selectedAllowance.id)));

    const renderExpense = ({item}) => {
        return (
                <View className="flex-row justify-between items-center mb-2 border-b border-gray-300">
                    <View>
                        <Text className="text-xl fw-bold">{item.title}</Text>
                        <Text>{item.amount}</Text>
                    </View>
                    <Text>{item.date}</Text>
                </View>
        )
    }

    return (
    <View className="py-2 px-5">


        <View className="border border-gray-300 rounded bg-white p-5 mb-[50]">
            <View className="flex-row justify-between items-center mb-5">
                <Text className="text-3xl fw-bold">{selectedAllowance?.title}</Text>
                <TouchableOpacity className='ms-auto'>
                <Ionicons name="add-circle-outline" size={30} color="black" />
                </TouchableOpacity>
            </View>
                
            <View className="flex-row gap-5">
                <View>
                    <Text className="text-sm text-gray-500">Budget</Text>
                    <Text className="text-3xl">{selectedAllowance?.amount}</Text>
                </View>
                <View>
                    <Text className="text-sm text-gray-500">Expense</Text>
                    <Text className="text-3xl">{300}</Text>
                </View>
                <View>
                    <Text className="text-sm text-gray-500">Remaining</Text>
                    <Text className="text-3xl">{300}</Text>
                </View>
            </View>
        </View>


        <View>
            <Text className="text-gray-500 text-md border-b border-gray-300 pb-2 mb-2">Expenses</Text>
            <FlatList
                data={expenses}
                renderItem={renderExpense}
            />
        </View>
    </View>);
}
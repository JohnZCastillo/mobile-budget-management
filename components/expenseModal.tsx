import Selection from '@/components/selection';
import db from '@/db/db';
import * as schema from '@/db/schema';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

export default function ExpenseModal(){

    const [amount, setAmount] = useState('');
    const [title, setTitle] = useState('');
    const [budget, setBudget] = useState(null);

    const [selectedLanguage, setSelectedLanguage] = useState();

    const {data: budgets} = useLiveQuery(db.select().from(schema.budget));
    
    const router = useRouter();

    const handleOnBack = ()=>{
        router.back();
    }

    const handleOnAdd = async () => {
        try{

        return db.insert(schema.expense)
                    .values({
                        title: title,
                        amount: amount,
                        budgetId: budget.id,
                        date: Date(),
                    });

        }catch(err){
            console.log('err: ', err.message)    
        }finally{
            handleOnBack();
        }
    }

    return (
            <View className='h-full items-center justify-center'>
                <KeyboardAvoidingView
                    behavior={"padding"}
                    keyboardVerticalOffset={50}
                    className='w-full px-5' 
                >
                    <View className="border border-gray-300 w-full px-5 py-3 rounded-md bg-white">
                            <View className="flex-row items-center justify-between border-b border-gray-200 pt-2 pb-4 mb-5">
                                <Text>New Expense</Text>
                                <TouchableOpacity>
                                    <Text>Exit</Text>
                                </TouchableOpacity>
                            </View>

                            <View className='gap-5 border-b border-gray-200 pb-[30]'>
                                <View>
                                    <Text className="mb-2">Title</Text>
                                    <View className="border p-1 border-gray-300">
                                        <TextInput value={title} onChangeText={setTitle} placeholder="type here"/>
                                    </View>
                                </View>
                                <View>
                                    <Text className="mb-2">Enter Amount</Text>
                                    <View className="border p-1 border-gray-300">
                                        <TextInput inputMode='numeric' value={amount} onChangeText={setAmount} placeholder="type here"/>
                                    </View>
                                </View>

                                  <View>
                                    <Text className="mb-2">Select Budget</Text>
                                    <Selection onChange={setBudget} options={budgets.map(budget => ({label: budget.title, value: budget.id}))} />
                                </View>
                            </View>
                          
                            <View className='mt-2 flex-row gap-3 py-2'>
                                    
                                <TouchableOpacity onPress={handleOnAdd} className='px-3 py-2 border border-gray-300 rounded '>
                                    <Text>Confirm</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={handleOnBack} className='px-3 py-2 border border-gray-300 rounded '>
                                    <Text>Cancel</Text>
                                </TouchableOpacity>
                                
                            </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
    )
       
}
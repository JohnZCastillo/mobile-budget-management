import db from '@/db/db';
import * as schema from '@/db/schema';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Dimensions, Text, TextInput, TouchableOpacity, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

export default function ExpenseModal({onCancel}){

    const [amount, setAmount] = useState('');
    const [title, setTitle] = useState('');
    const [budget, setBudget] = useState(null);

    const [selectedLanguage, setSelectedLanguage] = useState();

    const {data: budgets} = useLiveQuery(db.select().from(schema.budget));
    
    const router = useRouter();

    const handleOnAdd = async () => {
        try{

        await db.insert(schema.expense)
                    .values({
                        title: title,
                        amount: amount,
                        budgetId: budget.id,
                        date: Date(),
                    });

        }catch(err){
            console.log('err: ', err.message)    
        }finally{
            onCancel();
        }
    }

    const budgetRenderer = ({item} ) => {
        return (
            <View className="rounded-5xl p-2">
                <View className='p-2 bg-gray-200 rounded flex-row gap-5 items-center'>
                    <Ionicons name="bus" size={40} color="black" />
                    <Text className='font-bold text-3xl capitalize'>{item?.title}</Text>
                </View>
            </View>
        );
    }

    return (
        <View className='p-2'>

            <View id="carousel-component" className='border-b border-gray-100 mb-5'>

                <Carousel
                    autoPlayInterval={2000}
                    loop={false}
                      pagingEnabled={true}
                    snapEnabled={true}
                    width={Dimensions.get('screen').width}
                    style={{
                        width: '100%',
                        height: 70,
                        // alignItems: "center",
                        // justifyContent: "center",
                    }}
                    // mode="parallax"
                    modeConfig={{
                     parallaxScrollingScale: 1,
                    }}
                    renderItem={budgetRenderer}
                    data={budgets ?? []}
                //   onSnapToItem={(index) => setPageState(promotions?.data?.[index])}
                />

            </View>
                    
            <View className='gap-5 mb-5'>
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
            </View>
                
            <TouchableOpacity className='bg-indigo-500 rounded p-3' onPress={onCancel}>
                    <Text className='text-xl text-center text-white font-bold'>Proceed</Text>
            </TouchableOpacity>
        </View>

    )
       
}
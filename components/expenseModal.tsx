import db from '@/db/db';
import * as schema from '@/db/schema';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Dimensions, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
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
        <View className="rounded-5xl border w-full">
            <Ionicons name="add-circle-outline" size={30} color="black" />
            <Text className='text-5xl font-bold'>Helloslafksadgsdasdafsdafsdafsdjf</Text>
            <Text className='text-5xl font-bold'>tang ina</Text>
        </View>
        );
    }


    return (
            <View className='h-full items-center justify-center'>
                <KeyboardAvoidingView
                    behavior={"padding"}
                    keyboardVerticalOffset={50}
                    className='w-full px-5' 
                >

        <View  id="carousel-component">
            <Carousel
            //   onScrollStart={() => setScrollEnabled(false)}
            //   onScrollEnd={() => setScrollEnabled(true)}
              autoPlayInterval={2000}
              loop={false}
            //   pagingEnabled={true}
              snapEnabled={true}
              width={Dimensions.get('screen').width}
              style={{
                width: '100%',
                height: 100,
              }}
              mode="parallax"
              modeConfig={{
                parallaxScrollingScale: 1,
              }}
              renderItem={budgetRenderer}
            //   enabled={promotions?.data?.length > 1 ? true : false}
              data={budgets ?? []}
            //   onSnapToItem={(index) => setPageState(promotions?.data?.[index])}
            />
          </View>


                    <View className="w-full py-2 rounded-md">
                            
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
                            </View>
                          
                            <View className='flex-1 bg-indigo-500 p-5 rounded-lg'>
                                <TouchableOpacity onPress={onCancel}>
                                    <Text className='text-xl text-center text-white font-bold'>Confirm</Text>
                                </TouchableOpacity>
                            </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
    )
       
}
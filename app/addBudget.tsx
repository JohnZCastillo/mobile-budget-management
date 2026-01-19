import db from '@/db/db';
import * as schema from '@/db/schema';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { SafeAreaView } from "react-native-safe-area-context";

export default function ModalScreen(){


    const [amount, setAmount] = useState('');
    const [title, setTitle] = useState('');

    const router = useRouter();

    const handleOnBack = ()=>{
        router.back();
    }

    const handleOnAdd = async () => {
        try{

        return db.insert(schema.budget)
                    .values({
                    title: title,
                    amount: amount,
                    });

        }catch(err){
            console.log('err: ', err.message)    
        }finally{
            handleOnBack();
        }
    }

    return <SafeAreaView className="flex-1" edges={['left','right','top']}>
        <BlurView intensity={800} className='flex-1'>
            <View className='h-full items-center justify-center'>
                <KeyboardAvoidingView
                    behavior={"padding"}
                    keyboardVerticalOffset={50}
                    className='w-full px-5' 
                >
                    <View className="border border-gray-300 w-full px-5 py-3 rounded-md bg-white">
                            <View className="flex-row items-center justify-between border-b border-gray-200 pt-2 pb-4 mb-5">
                                <Text>New Budget</Text>
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
        </BlurView>
</SafeAreaView>
}
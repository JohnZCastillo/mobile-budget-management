import ExpenseModal from '@/components/expenseModal';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { AllowanceContext } from '@/context/AllowanceContextProvider';
import * as schema from '@/db/schema';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { drizzle, useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { useRouter } from 'expo-router';
import { openDatabaseSync } from 'expo-sqlite';
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';

  const expo = openDatabaseSync('db.db', { enableChangeListener: true }); 
  const db = drizzle(expo);

export default function Index() {

  const router = useRouter();

  const {data: [wallet]} = useLiveQuery(db.select().from(schema.walletTable).limit(1));
  
  const {data: budgets} = useLiveQuery(db.select().from(schema.budget));

  console.log('wallet: ', wallet);

   const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const {setSelectedBudget} = useContext(AllowanceContext);

  const [budget,setBudget] = useState(100);
  
  const [allowance , setAllowance] = useState([
    {
      title: 'Fare Allowance',
      allowance: 500,
    },
     {
      title: 'Good Allowance',
      allowance: 500,
    }
  ]);
  
  const handleOnSelectAllowance = (allowance) => {
    setSelectedBudget(allowance);
    router.navigate('/modal');
  }

  const snapPoints =  ['50%'];

  const allowanceRenderer = ({item})=> {
    return <View className='mb-2 bg-white py-3 px-5 rounded-lg flex-row items-center'>
        <View>
          <Text className='text-sm text-gray-500'>{item?.title}</Text>
          <Text className='text-3xl font-bold'>{item?.amount}</Text>
        </View>
        <TouchableOpacity onPress={()=> handleOnSelectAllowance(item)} className='ms-auto'>
           <Ionicons name="chevron-forward-sharp" size={20} color="black" />
        </TouchableOpacity>
      </View>
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePresentModalPress = () => {
    setIsModalOpen(prev => !prev);
  };

  useEffect(()=>{
    if(isModalOpen){
     bottomSheetModalRef.current?.present();
    }else{
     bottomSheetModalRef.current?.dismiss();
    }
  },[isModalOpen])
  
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);


  return (
    <SafeAreaView edges={['left','right']} className='flex-1'>
      <KeyboardAvoidingView
          behavior={"padding"}
          keyboardVerticalOffset={100}
          className='flex-1'
      >
      <GestureHandlerRootView>
        <BottomSheetModalProvider>

          <Card size="lg" variant="elevated" className="m-3 bg-white rounded-lg justify-between">
            <View className='flex-row justify-between items-center mb-5'>
              <View>
                  <Text className='text-gray-500' size="sm">Balance</Text>
                  <Heading size="5xl" className="mb-1">{wallet?.amount ?? 0}</Heading>
              </View>
              <TouchableOpacity onPress={()=>   router.navigate('/addBudgetModal')} className='mt-2'>
              <Ionicons name="add-circle-outline" size={30} color="black" />
              </TouchableOpacity>                   
          </View>

          <View className='flex-row gap-8'>
            <View>
              <Text className='text-gray-500 text-sm'>Income</Text>
              <Text>500</Text>
            </View>
            <View>
              <Text className='text-gray-500 text-sm'>Expenses</Text>
              <Text>500</Text>
            </View>
          </View>  

          </Card>

          <View className='flex-row gap-5 p-2'>
            
            <View>
              <TouchableOpacity onPress={()=> router.navigate('/addBudget')} className='bg-white p-3 rounded-r-md'>
                <Ionicons name="cash-outline" size={33} color="black" />
              </TouchableOpacity>
              <Text className='text-sm text-center mt-2'>Budget</Text>
            </View>

              
            <View>
              <TouchableOpacity onPress={handlePresentModalPress} className='bg-white p-3 rounded-md'>
                <Ionicons name="add-circle-outline" size={33} color="black" />
              </TouchableOpacity>
              <Text className='text-sm text-center mt-2'>Expense</Text>
            </View>

          </View>

          <FlatList data={budgets} renderItem={allowanceRenderer}/>

          <BottomSheetModal
            ref={bottomSheetModalRef}
            onChange={handleSheetChanges}
            snapPoints={snapPoints}
            index={1}
            onDismiss={()=> setIsModalOpen(false)}
        >

          <BottomSheetView >
            <ExpenseModal  onCancel={()=> setIsModalOpen(false)}/>
          </BottomSheetView>
          
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
      </KeyboardAvoidingView>
    </SafeAreaView>

  );
}
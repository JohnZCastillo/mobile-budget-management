import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { AllowanceContext } from '@/context/AllowanceContextProvider';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useContext, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

export default function Index() {

  const router = useRouter();
  
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

  const allowanceRenderer = ({item})=> {
    return <View className='mb-2 bg-white py-3 px-5 rounded-lg flex-row items-center'>
        <View>
          <Text className='text-sm text-gray-500'>{item?.title}</Text>
          <Text className='text-3xl font-bold'>{item?.allowance}</Text>
        </View>
        <TouchableOpacity onPress={()=> handleOnSelectAllowance(item)} className='ms-auto'>
           <Ionicons name="chevron-forward-sharp" size={20} color="black" />
        </TouchableOpacity>
      </View>
  }

  
  return (
  <View className='px-2' style={{flex: 1}}>
      
      <Card size="lg" variant="elevated" className="m-3 bg-white rounded-lg justify-between">
        <View className='flex-row justify-between items-center mb-5'>
          <View>
              <Text className='text-gray-500' size="sm">Balance</Text>
              <Heading size="5xl" className="mb-1">{budget}</Heading>
          </View>
          <TouchableOpacity className='mt-2'>
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
    <FlatList data={allowance} renderItem={allowanceRenderer}/>
      
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // position: 'relative',
    // padding: 5,
    // backgroundColor: 'red',
    flex: 1,
    alignItems: 'stretch',
    // justifyContent: 'center',
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  floatingButton: {
    position: 'absolute',
    bottom: 50,
    right: 50
  },
  text: {
    color: '#fff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  scrollView: {
  }
});
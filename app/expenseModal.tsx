import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import NumericField from '@/components/ui/input/numericField';
import SelectionPicker from '@/components/ui/picker/selectionPicker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { View } from "react-native";
import { useDefaultStyles } from 'react-native-ui-datepicker';

export default function ExpenseModal(){

  const defaultStyles = useDefaultStyles();
  
  const [state, setState] = useState({
    date: new Date(),
    isDateTimePickerShowing: false
  });

  console.log('fucking state: ', state);
  
    return <View className='p-5 gap-3'>
        <View className='gap-1'>
            <Heading size='xl'>Title</Heading>
                <Input
                    variant="outline"
                    size="md"
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                >
                <InputField placeholder="Enter Text here..." />
            </Input>
        </View>

          <View className='gap-1'>
            <Heading size='xl'>Amount</Heading>
            <NumericField placeholder="Enter Text here..."/>
        </View>

        <View className='gap-1'>
            <Heading size='xl'>Category</Heading>
            <SelectionPicker/>
        </View>



         <View className='gap-1'>
            <Heading size='xl'>Date</Heading>

            <Button onPress={()=>setState(prev => ({...prev, isDateTimePickerShowing: true}))} className='p-0' variant="solid" size="md" action="primary">
              <ButtonText className='py-2 w-[100] text-center bg-gray-500 text-white rounded'>Select Date</ButtonText>
            </Button>

            {state.isDateTimePickerShowing && (
                <RNDateTimePicker 
                    onChange={(event,selectedDate)=> {
                        // console.log('fucking value: ', selectedDate);
                        setState(prev => ({...prev, isDateTimePickerShowing: false, date: selectedDate}))
                    }} 
                value={state.date} />
            )}
            
                <Input
                    variant="outline"
                    size="md"
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                >

            </Input>
        </View> 

        <View className='gap-3 flex-row items-start justify-start'>
            <Button className='p-0' variant="solid" size="md" action="primary">
              <ButtonText className='py-2 w-[100] text-center bg-indigo-800 text-white rounded'>Confirm</ButtonText>
            </Button>

            <Button className='p-0' variant="solid" size="md" action="primary">
              <ButtonText className='py-2 w-[100] text-center bg-gray-500 text-white rounded'>Cancel</ButtonText>
            </Button>
        </View>
    </View>
}


import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

interface SelectionItemProps {
    value: any,
    label: any
}

interface SelectionPickerProps {
    items?: Array<SelectionItemProps>,
    selectedValue?: any,
    ref?: React.Ref<TextInput>
}

const defaultSelection = {
    label: 'a...',
    value: 'a'
}

const defaultItems = [defaultSelection, {
    label: 'b...',
    value: 'b'
}];

export default function SelectionPicker({items = defaultItems, selectedValue = null, ref}: SelectionPickerProps){

    const [selectedItem, setSelectedItem] = useState(selectedValue);

    console.log('mother fucker: ', selectedItem);

    const [selectedLanguage, setSelectedLanguage] = useState();

    const test = [{label: "Java", value: "java"},{label:"JavaScript", value:"js" }];

    return <View className='border rounded'>
            <Picker
            mode='dropdown'
            style={{ backgroundColor: 'orange',
            margin: 0,
            textAlign: 'center',
            fontSize: 10,
            borderRadius: 10}}
            placeholder='mother fucker'
            ref={ref}
            prompt='tang ina mo'
            className='bg-yellow-500 border'
            selectedValue={selectedItem}
            onValueChange={(itemValue, itemIndex) => {
                setSelectedItem(itemValue)
                console.log(itemValue)
            }
            }>
                {items.map(item => (<Picker.Item  label={item.label} value={item.value} />))}
            </Picker>
        </View>
}

const styles = StyleSheet.create({
     selection: {
        backgroundColor: 'orange',
        margin: 0,
        color: 'black',
        height: 35,
        padding: 0,
        fontSize: 5,
        borderRadius: 10,
    }
})
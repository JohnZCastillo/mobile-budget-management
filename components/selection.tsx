import Ionicons from "@expo/vector-icons/Ionicons"
import { useEffect, useState } from "react"
import { FlatList, Text, TouchableOpacity, View } from "react-native"

type SelectionItem = {
    label: string,
    value: string|number
}

type SelectionProps = {
    options: SelectionItem[],
    onChange: (item) => {}
}

export default function Selection({options, onChange}: SelectionProps){

    const [selected, setSelected] = useState<SelectionItem|null>(null);
    const [isModalShowing, setIsModalShowing] = useState(false);


    const handleOnSelectOption = (selectedOption) =>{
        setSelected(selectedOption);
        setIsModalShowing(false);
    }

    const selectionItemRenderer = ({item}) => {
        return (
                <TouchableOpacity className="mb-1 p-1" onPress={()=> handleOnSelectOption(item)}>
                    <Text>{item.label}</Text>
                </TouchableOpacity>
        )
    }

    useEffect(()=>{
        if(!onChange) return;
        onChange(selected)
    },[selected])

    return (
        <View className="relative border border-gray-300 p-2">
            <TouchableOpacity onPress={()=> setIsModalShowing(prev =>!prev)} className="flex-row justify-between p-2">
                <Text>{selected?.label ?? 'Select'}</Text>
               <Ionicons name="chevron-down-outline" size={20} color="gray" />
            </TouchableOpacity>
            {isModalShowing && (
                <View className="bg-white w-full absolute top-[48] left-0 max-h-[120]">
                    <FlatList data={options} renderItem={selectionItemRenderer}/>
                </View>
            )}
        </View>
    )
}
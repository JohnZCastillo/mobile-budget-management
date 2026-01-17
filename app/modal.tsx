import { AllowanceContext } from "@/context/AllowanceContextProvider";
import { useContext } from "react";
import { Text, View } from "react-native";

export default function ModalScreen(){
    
    const {selectedAllowance} = useContext(AllowanceContext);

    return <View>
        <Text>{selectedAllowance?.title}</Text>
    </View>
}
import React from "react";
import { TextInput } from "react-native";

interface NumericFieldProps {
  className?: string;
  placeholder?: string;
  ref?: React.Ref<TextInput>
}

export default function NumericField({className = 'w-full border rounded p-0 py-2 px-2', placeholder, ref}: NumericFieldProps){
    return <TextInput inputMode="numeric" ref={ref} className={className} placeholder={placeholder}/>;
}
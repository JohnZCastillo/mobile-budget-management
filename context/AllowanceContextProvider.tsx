import { createContext, useState } from "react";

export const AllowanceContext = createContext({
    selectedAllowance: null,
    setSelectedBudget: null,
});

export default function AllowanceContextProvider({children}){
    
    const [allowanceContext, setAllowanceContext] = useState(null);

    return <>
    <AllowanceContext.Provider value={{
        selectedAllowance:  allowanceContext,
        setSelectedBudget: setAllowanceContext
    }}>
        {children}
    </AllowanceContext.Provider>
    </>
}

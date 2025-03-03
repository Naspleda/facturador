import { createContext } from "react";
import { useState } from "react";

export const CountContext = createContext();

const CountProvider = ({ children }) => {
    const [counter, setCounter] = useState(0);

    return (
        <CountContext.Provider value={{ counter, setCounter }}>
        {children}
        </CountContext.Provider>
    );
}

export default CountProvider;
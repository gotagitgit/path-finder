import { createContext, ReactNode, useReducer } from "react";
import { IRootState } from "./models";
import { reducer } from "./reducer";

export const initialState: IRootState =
{
    nodes: [],
    grid: {
        row: 0,
        col: 0,
    }
}

export const AppContext = createContext<IRootState>(initialState)

export const AppContextProvider = ({ children }: { children: ReactNode }) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <AppContext.Provider value={state}>
            {children}
        </AppContext.Provider>
    )
}
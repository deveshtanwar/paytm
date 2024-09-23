import { createContext, useReducer } from "react";

const initialState = {
    user: {}
}

const userReducer = (state, action) => {
    switch (action.type) {
        case 'USER_UPDATE':
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}

// create context
export const userContext = createContext();

// create provider

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState)
    return (
        <userContext.Provider value={{ state, dispatch }}>
            {children}
        </userContext.Provider>
    )
}

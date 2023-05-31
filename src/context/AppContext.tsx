import { ReactNode, createContext, useState } from "react";

export interface Cart {
  name: string;
  price: number;
  quantity: number;
}

interface AppContextData {
  cart: Cart[];
  setCart: React.Dispatch<React.SetStateAction<Cart[]>>
}

const AppContext = createContext({} as AppContextData);

interface AppContextProviderProps {
  children: ReactNode;
}

function AppContextProvider({ children }: AppContextProviderProps) {
  const [cart, setCart] = useState<Cart[]>([]);

  return (
    <AppContext.Provider value={{
      cart,
      setCart
    }}>
      {children}
    </AppContext.Provider>
  );
}

export { AppContextProvider, AppContext }

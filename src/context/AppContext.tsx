import { ReactNode, createContext, useState } from "react";

export interface Cart {
  name: string;
  price: number;
  quantity: number;
}

interface AppContextData {
  cart: Cart[];
  setCart: React.Dispatch<React.SetStateAction<Cart[]>>
  isMovieFormOpen: boolean;
  setIsMovieFormOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AppContext = createContext({} as AppContextData);

interface AppContextProviderProps {
  children: ReactNode;
}

function AppContextProvider({ children }: AppContextProviderProps) {
  const [cart, setCart] = useState<Cart[]>([]);

  const [ isMovieFormOpen, setIsMovieFormOpen ] = useState(false);

  return (
    <AppContext.Provider value={{
      cart,
      setCart,
      isMovieFormOpen,
      setIsMovieFormOpen
    }}>
      {children}
    </AppContext.Provider>
  );
}

export { AppContextProvider, AppContext }

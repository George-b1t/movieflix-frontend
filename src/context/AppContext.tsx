import { ReactNode, createContext, useState } from "react";
import { Movie } from "../pages/Movie";

export interface Cart {
  name: string;
  price: number;
  quantity: number;
}

interface Filial {
  cidade: string;
}

interface User {
  name: string;
  email: string;
  role: "user" | "admin" | "manager" | "employee";
}

interface AppContextData {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  cart: Cart[];
  setCart: React.Dispatch<React.SetStateAction<Cart[]>>
  currentFilial: string;
  setCurrentFilial: React.Dispatch<React.SetStateAction<string>>;
  filiais: Filial[];
  setFiliais: React.Dispatch<React.SetStateAction<Filial[]>>;

  isMovieFormOpen: boolean;
  setIsMovieFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSnackFormOpen: boolean;
  setIsSnackFormOpen: React.Dispatch<React.SetStateAction<boolean>>;

  currentMovie: Movie | null;
  setCurrentMovie: React.Dispatch<React.SetStateAction<Movie | null>>;
}

const AppContext = createContext({} as AppContextData);

interface AppContextProviderProps {
  children: ReactNode;
}

function AppContextProvider({ children }: AppContextProviderProps) {
  const [cart, setCart] = useState<Cart[]>([]);
  const [currentFilial, setCurrentFilial] = useState("");
  const [ filiais, setFiliais ] = useState<Filial[]>([]);
  const [ user, setUser ] = useState<User | null>(null);

  const [ isMovieFormOpen, setIsMovieFormOpen ] = useState(false);
  const [ isSnackFormOpen, setIsSnackFormOpen ] = useState(false);

  const [ currentMovie, setCurrentMovie ] = useState<Movie | null>(null);

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      cart,
      setCart,
      isMovieFormOpen,
      setIsMovieFormOpen,
      currentFilial,
      setCurrentFilial,
      filiais,
      setFiliais,
      isSnackFormOpen,
      setIsSnackFormOpen,
      currentMovie,
      setCurrentMovie
    }}>
      {children}
    </AppContext.Provider>
  );
}

export { AppContextProvider, AppContext }

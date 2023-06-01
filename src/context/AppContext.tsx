import { ReactNode, createContext, useEffect, useState } from "react";
import { MovieProps } from "../pages/Movie";
import { api } from "../services/api";

export interface Cart {
  name: string;
  price: number;
  quantity: number;
}

interface Filial {
  id: string;
  nome: string;
}

export interface ProductProps {
  id: string;
  nome: string;
  preco: number;
  descricao: string;
  srcSnack: string;
}

interface Emploee {
  id: string;
  nome: string;
  cargo: string;
  email: string;
  salario: string;
  senha: string;
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
  currentFilial: Filial | null;
  setCurrentFilial: React.Dispatch<React.SetStateAction<Filial | null>>;
  filiais: Filial[];
  setFiliais: React.Dispatch<React.SetStateAction<Filial[]>>;

  isMovieFormOpen: boolean;
  setIsMovieFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSnackFormOpen: boolean;
  setIsSnackFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEmployeeFormOpen: boolean;
  setIsEmployeeFormOpen: React.Dispatch<React.SetStateAction<boolean>>;

  movies: MovieProps[];
  setMovies: React.Dispatch<React.SetStateAction<MovieProps[]>>;
  currentMovie: MovieProps | null;
  setCurrentMovie: React.Dispatch<React.SetStateAction<MovieProps | null>>;
  employees: Emploee[];
  setEmployees: React.Dispatch<React.SetStateAction<Emploee[]>>;
  currentEmployee: Emploee | null;
  setCurrentEmployee: React.Dispatch<React.SetStateAction<Emploee | null>>;

  saveMovie(movie: MovieProps): void;
  updateMovie(movie: MovieProps): void;
  
  saveProduct(product: ProductProps): void;
  updateProduct(product: ProductProps): void;

  products: ProductProps[];
  setProducts: React.Dispatch<React.SetStateAction<ProductProps[]>>;
  currentProduct: ProductProps | null;
  setCurrentProduct: React.Dispatch<React.SetStateAction<ProductProps | null>>;
}

const AppContext = createContext({} as AppContextData);

interface AppContextProviderProps {
  children: ReactNode;
}

function AppContextProvider({ children }: AppContextProviderProps) {
  const [cart, setCart] = useState<Cart[]>([]);
  const [currentFilial, setCurrentFilial] = useState<Filial | null>(null);
  const [ filiais, setFiliais ] = useState<Filial[]>([]);
  const [ user, setUser ] = useState<User | null>(null);

  const [ isMovieFormOpen, setIsMovieFormOpen ] = useState(false);
  const [ isSnackFormOpen, setIsSnackFormOpen ] = useState(false);
  const [ isEmployeeFormOpen, setIsEmployeeFormOpen ] = useState(false);

  const [ currentMovie, setCurrentMovie ] = useState<MovieProps | null>(null);
  const [ currentProduct, setCurrentProduct ] = useState<ProductProps | null>(null);
  const [ employees, setEmployees ] = useState<Emploee[]>([]);
  const [ currentEmployee, setCurrentEmployee ] = useState<Emploee | null>(null);

  const [ movies, setMovies ] = useState<MovieProps[]>([]);
  const [ products, setProducts ] = useState<ProductProps[]>([]);

  useEffect(() => {
    getMovies();
    getProducts();
  }, [currentFilial]);

  useEffect(() => {
    if (filiais.length > 0) return;

    api.get("/filial")
      .then(response => {
        setFiliais(response.data.content)
        setCurrentFilial(response.data.content[0])
      });
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function getMovies() {
    if (currentFilial === null) return;

    api.get(`/catalogo/${currentFilial?.id}`)
      .then(response => {
        setMovies(response.data.map((movie: any) => movie.filmeId));
      })
  }

  function getProducts() {
    if (currentFilial === null) return;

    api.get(`/estoque/${currentFilial?.id}`)
      .then(response => {
        setProducts(response.data.map((produto: any) => produto.produtoId));
      })
  }

  function saveMovie(movie: MovieProps) {
    if (movie === null) return;

    api.post("/filme", movie)
      .then(() => {
        getMovies();
        setIsMovieFormOpen(false);
        setCurrentMovie(null);
      })
  }

  function updateMovie(movie: MovieProps) {
    if (movie === null) return;

    api.put(`/filme/${movie.id}`, movie)
      .then(() => {
        getMovies();
        setIsMovieFormOpen(false);
        setCurrentMovie(null);
      })
  }

  function saveProduct(product: ProductProps) {
    if (product === null) return;

    api.post("/produto", product)
      .then(() => {
        getProducts();
        setIsSnackFormOpen(false);
        setCurrentProduct(null);
      })
  }

  function updateProduct(product: ProductProps) {
    if (product === null) return;

    api.put(`/produto/${product.id}`, product)
      .then(() => {
        getProducts();
        setIsSnackFormOpen(false);
        setCurrentProduct(null);
      })
  }

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
      setCurrentMovie,
      movies,
      setMovies,
      employees,
      setEmployees,
      currentEmployee,
      setCurrentEmployee,
      isEmployeeFormOpen,
      setIsEmployeeFormOpen,
      saveMovie,
      updateMovie,
      products,
      setProducts,
      currentProduct,
      setCurrentProduct,
      saveProduct,
      updateProduct
    }}>
      {children}
    </AppContext.Provider>
  );
}

export { AppContextProvider, AppContext }

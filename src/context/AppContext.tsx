import { ReactNode, createContext, useEffect, useState } from "react";
import { MovieProps } from "../pages/Movie";
import { api } from "../services/api";
import { Room } from "../pages/MovieSchedule";

export interface Cart {
  name: string;
  price: number;
  quantity: number;
  type: "movie" | "snack";
  seats?: number[];
  sessionId?: string;
  productId?: string;
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
  estoqueId?: string;
}

export interface Emploee {
  id: string;
  nome: string;
  gerente: string;
  email: string;
  salario: string;
  senha: string;
}

interface User {
  cpf: string;
  nome: string;
  email: string;
  role: "user" | "admin" | "manager" | "func";
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
  
  isDateFormOpen: boolean;
  setIsDateFormOpen: React.Dispatch<React.SetStateAction<boolean>>;

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

  getProducts(): void;

  getMovies(): void;

  getProductsByFilial(): void;

  allMovies: MovieProps[];
  setAllMovies: React.Dispatch<React.SetStateAction<MovieProps[]>>;
  products: ProductProps[];
  setProducts: React.Dispatch<React.SetStateAction<ProductProps[]>>;
  allProducts: ProductProps[];
  setAllProducts: React.Dispatch<React.SetStateAction<ProductProps[]>>;
  currentProduct: ProductProps | null;
  setCurrentProduct: React.Dispatch<React.SetStateAction<ProductProps | null>>;

  isSelectMovieFormOpen: boolean;
  setIsSelectMovieFormOpen: React.Dispatch<React.SetStateAction<boolean>>;

  addCatalogo(movieId: string): void;
  getMoviesByFilial(): void;

  isSelectProductFormOpen: boolean;
  setIsSelectProductFormOpen: React.Dispatch<React.SetStateAction<boolean>>;

  addEstoque(productId: string): void;
  removeCatalogo(id: string | null): void;
  removeEstoque(id: string | null): void;

  removeFilme(id: string | null): void;
  removeProduto(id: string | null): void;

  getEmployeesByFilial(): void;

  currentRoom: Room | null;
  setCurrentRoom: React.Dispatch<React.SetStateAction<Room | null>>;
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
  const [ allMovies, setAllMovies ] = useState<MovieProps[]>([]);
  const [ products, setProducts ] = useState<ProductProps[]>([]);
  const [ allProducts, setAllProducts ] = useState<ProductProps[]>([]);

  const [ isSelectMovieFormOpen, setIsSelectMovieFormOpen ] = useState(false);
  const [ isSelectProductFormOpen, setIsSelectProductFormOpen ] = useState(false);
  const [ isDateFormOpen, setIsDateFormOpen ] = useState(false);

  const [ currentRoom, setCurrentRoom ] = useState<Room | null>(null);

  useEffect(() => {
    getMovies();
    getProductsByFilial();
    getMoviesByFilial();

    // api.post("/login", {
    //   email: "pabllo@gmail.com",
    //   senha: "pabllo123"
    // }).then(response => {
    //   setUser(response.data);
    //   setCurrentFilial(response.data.filial);
    // })
  }, []);

  useEffect(() => {
    if (filiais.length > 0) return;

    api.get("/filial")
      .then(response => {
        setFiliais(response.data.content)
        setCurrentFilial(oldV => !oldV ? response.data.content[0] : oldV)
      });
  }, [])

  function getMoviesByFilial() {
    if (currentFilial === null) return;

    api.get(`/catalogo/${currentFilial?.id}`)
      .then(response => {
        setMovies(response.data.map((item: any) => ({
          ...item.filmeId,
          dataLancamento: item.filmeId.dataLancamento.split("T")[0],
          catalogoId: item.id
        })));
      })
  }

  function removeFilme(id: string | null) {
    if (id === null) return;

    api.delete(`/filme/${id}`)
      .then(() => {
        getMovies();
        setIsMovieFormOpen(false);
        setCurrentMovie(null);
      })
  }

  function removeProduto(id: string | null) {
    if (id === null) return;

    api.delete(`/produto/${id}`)
      .then(() => {
        getProducts();
        setIsSnackFormOpen(false);
        setCurrentProduct(null);
      })
  }

  function getEmployeesByFilial() {
    if (currentFilial === null) return;

    api.get(`/funcionario/filial/${currentFilial?.id}`)
      .then(response => {
        setEmployees(response.data);
      })
  }
    

  function getMovies() {
    api.get("/filme")
      .then(response => {
        setAllMovies(response.data.content.map((item: any) => ({
          ...item,
          dataLancamento: item.dataLancamento.split("T")[0]
        })));
      })
  }

  function getProductsByFilial() {
    if (currentFilial === null) return;

    api.get(`/estoque/${currentFilial?.id}`)
      .then(response => {
        setProducts(response.data.map((produto: any) => ({
          ...produto.produtoId,
          estoqueId: produto.id
        })));
      })
  }

  function getProducts() {
    api.get(`/produto`)
      .then(response => {
        setAllProducts(response.data.content);
      })
  }

  function removeCatalogo(id: string | null) {
    if (id === null) return;

    api.delete(`/catalogo/${id}`)
      .then(() => {
        getMoviesByFilial();
      })
  }

  function removeEstoque(id: string | null) {
    if (id === null) return;

    api.delete(`/estoque/${id}`)
      .then(() => {
        getProductsByFilial();
      })
  }

  function addCatalogo(movieId: string) {
    if (movieId === null || currentFilial === null) return;

    api.post("/catalogo", {
      filmeId: movieId,
      filialId: currentFilial.id
    })
      .then(() => {
        getMoviesByFilial();
        setIsSelectMovieFormOpen(false);
        setCurrentMovie(null);
      })
  }

  function addEstoque(productId: string) {
    if (productId === null || currentFilial === null) return;

    api.post("/estoque", {
      produtoId: productId,
      filialId: currentFilial.id,
      quantidade: 100
    })
      .then(() => {
        getProductsByFilial();
        setIsSelectProductFormOpen(false);
        setCurrentProduct(null);
      })
  }

  function saveMovie(movie: MovieProps) {
    if (movie === null) return;

    api.post("/filme", {
      ...movie,
      id: undefined,
      faixaEtaria: Number(movie.faixaEtaria)
    })
      .then(() => {
        getMovies();
        setIsMovieFormOpen(false);
        setCurrentMovie(null);
      })
  }

  function updateMovie(movie: MovieProps) {
    if (movie === null) return;

    api.put(`/filme/${movie.id}`, {
      ...movie,
      faixaEtaria: Number(movie.faixaEtaria),
      id: undefined
    })
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

    api.put(`/produto/${product.id}`, {
      ...product,
      id: undefined
    })
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
      updateProduct,
      getMovies,
      getProducts,
      allProducts,
      setAllProducts,
      allMovies,
      setAllMovies,
      getProductsByFilial,
      isSelectMovieFormOpen,
      setIsSelectMovieFormOpen,
      addCatalogo,
      getMoviesByFilial,
      isSelectProductFormOpen,
      setIsSelectProductFormOpen,
      addEstoque,
      removeCatalogo,
      getEmployeesByFilial,
      isDateFormOpen,
      setIsDateFormOpen,
      removeEstoque,
      removeFilme,
      removeProduto,
      currentRoom,
      setCurrentRoom
    }}>
      {children}
    </AppContext.Provider>
  );
}

export { AppContextProvider, AppContext }

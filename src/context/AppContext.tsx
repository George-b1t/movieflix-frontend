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
  cidade: string;
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
}

const AppContext = createContext({} as AppContextData);

interface AppContextProviderProps {
  children: ReactNode;
}

// const moviesTemp: Movie[] = [
//   {
//     nome: "Guardiões da Galáxia Vol. 3",
//     nota: "8.0",
//     lancamento: "2023-05-04",
//     diretor: "James Gunn",
//     faixaEtaria: "14",
//     descricao: "Terceiro filme da franquia Guardiões da Galáxia, da Marvel Studios.",
//     linkImagem: "https://cdnim.prd.cineticket.com.br/asset/movie/7942/guardioes-da-galaxia-vol-3-poster-desktop-4965c.jpg"
//   },
//   {
//     nome: "Velozes e Furiosos 9",
//     nota: "8.5",
//     lancamento: "2021-06-24",
//     diretor: "Justin Lin",
//     faixaEtaria: "14",
//     descricao: "Dominic Toretto (Vin Diesel) e Letty (Michelle Rodriguez) vivem uma vida pacata ao lado de seu filho Brian. Mas eles logo são ameaçados pelo passado de Dom: seu irmão desaparecido Jakob (John Cena). Trata-se de um assassino habilidoso e motorista excelente, que está trabalhando ao lado de Cipher (Charlize Theron), vilã de Velozes & Furiosos 8. Para enfrentá-los, Toretto vai precisar reunir sua equipe novamente, inclusive Han (Sung Kang), que todos acreditavam estar morto.",
//     linkImagem: "https://cdnim.prd.cineticket.com.br/asset/movie/7942/guardioes-da-galaxia-vol-3-poster-desktop-4965c.jpg"
//   },
//   {
//     nome: "Viúva Negra",
//     nota: "8.0",
//     lancamento: "2021-07-08",
//     diretor: "Cate Shortland",
//     faixaEtaria: "14",
//     descricao: "Natasha Romanoff precisa confrontar partes de sua história quando surge uma conspiração perigosa ligada ao seu passado. Perseguida por uma força que não irá parar até derrotá-la, Natasha terá que lidar com sua antiga vida de espiã, e também reencontrar membros de sua família que deixou para trás antes de se tornar parte dos Vingadores.",
//     linkImagem: "https://cdnim.prd.cineticket.com.br/asset/movie/7942/guardioes-da-galaxia-vol-3-poster-desktop-4965c.jpg"
//   },
//   {
//     nome: "Space Jam: Um Novo Legado",
//     nota: "7.0",
//     lancamento: "2021-07-15",
//     diretor: "Malcolm D. Lee",
//     faixaEtaria: "L",
//     descricao: "O superastro LeBron James se junta à gangue Looney Tunes para derrotar o Goon Squad e salvar seu filho.",
//     linkImagem: "https://cdnim.prd.cineticket.com.br/asset/movie/7942/guardioes-da-galaxia-vol-3-poster-desktop-4965c.jpg"
//   },
//   {
//     nome: "Um Lugar Silencioso - Parte II",
//     nota: "7.9",
//     lancamento: "2021-06-10",
//     diretor: "John Krasinski",
//     faixaEtaria: "14",
//     descricao: "Logo após os acontecimentos mortais, até mesmo dentro de casa, a família Abbott precisa agora encarar o terror mundo afora, continuando a lutar para sobreviver em silêncio. Obrigados a se aventurar pelo desconhecido, eles rapidamente percebem que as criaturas que caçam pelo som não são as únicas ameaças que os observam pelo caminho de areia.",
//     linkImagem: "https://cdnim.prd.cineticket.com.br/asset/movie/7942/guardioes-da-galaxia-vol-3-poster-desktop-4965c.jpg"
//   },
// ]

function AppContextProvider({ children }: AppContextProviderProps) {
  const [cart, setCart] = useState<Cart[]>([]);
  const [currentFilial, setCurrentFilial] = useState<Filial | null>(null);
  const [ filiais, setFiliais ] = useState<Filial[]>([]);
  const [ user, setUser ] = useState<User | null>(null);

  const [ isMovieFormOpen, setIsMovieFormOpen ] = useState(false);
  const [ isSnackFormOpen, setIsSnackFormOpen ] = useState(false);
  const [ isEmployeeFormOpen, setIsEmployeeFormOpen ] = useState(false);

  const [ currentMovie, setCurrentMovie ] = useState<MovieProps | null>(null);
  const [ employees, setEmployees ] = useState<Emploee[]>([]);
  const [ currentEmployee, setCurrentEmployee ] = useState<Emploee | null>(null);

  const [ movies, setMovies ] = useState<MovieProps[]>([]);

  useEffect(() => {
    getMovies();
  }, [currentFilial, getMovies]);

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
    api.get(`http://localhost:8080/catalogo/${currentFilial?.id}`)
      .then(response => {
        setMovies(response.data.map((movie: any) => movie.filmeId));
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
      setIsEmployeeFormOpen
    }}>
      {children}
    </AppContext.Provider>
  );
}

export { AppContextProvider, AppContext }

import { useContext } from "react";
import styles from "./styles.module.scss"
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { MovieForm } from "../../components/MovieForm";
import { AppContext } from "../../context/AppContext";

export interface Movie {
  nome: string;
  nota: string;
  lancamento: string;
  diretor: string;
  faixaEtaria: string;
  descricao: string;
  linkImagem: string;
}

const movies: Movie[] = [
  {
    nome: "Guardiões da Galáxia Vol. 3",
    nota: "8.0",
    lancamento: "2023-05-04",
    diretor: "James Gunn",
    faixaEtaria: "14",
    descricao: "Terceiro filme da franquia Guardiões da Galáxia, da Marvel Studios.",
    linkImagem: "https://cdnim.prd.cineticket.com.br/asset/movie/7942/guardioes-da-galaxia-vol-3-poster-desktop-4965c.jpg"
  },
  {
    nome: "Velozes e Furiosos 9",
    nota: "8.5",
    lancamento: "2021-06-24",
    diretor: "Justin Lin",
    faixaEtaria: "14",
    descricao: "Dominic Toretto (Vin Diesel) e Letty (Michelle Rodriguez) vivem uma vida pacata ao lado de seu filho Brian. Mas eles logo são ameaçados pelo passado de Dom: seu irmão desaparecido Jakob (John Cena). Trata-se de um assassino habilidoso e motorista excelente, que está trabalhando ao lado de Cipher (Charlize Theron), vilã de Velozes & Furiosos 8. Para enfrentá-los, Toretto vai precisar reunir sua equipe novamente, inclusive Han (Sung Kang), que todos acreditavam estar morto.",
    linkImagem: "https://cdnim.prd.cineticket.com.br/asset/movie/7942/guardioes-da-galaxia-vol-3-poster-desktop-4965c.jpg"
  },
  {
    nome: "Viúva Negra",
    nota: "8.0",
    lancamento: "2021-07-08",
    diretor: "Cate Shortland",
    faixaEtaria: "14",
    descricao: "Natasha Romanoff precisa confrontar partes de sua história quando surge uma conspiração perigosa ligada ao seu passado. Perseguida por uma força que não irá parar até derrotá-la, Natasha terá que lidar com sua antiga vida de espiã, e também reencontrar membros de sua família que deixou para trás antes de se tornar parte dos Vingadores.",
    linkImagem: "https://cdnim.prd.cineticket.com.br/asset/movie/7942/guardioes-da-galaxia-vol-3-poster-desktop-4965c.jpg"
  },
  {
    nome: "Space Jam: Um Novo Legado",
    nota: "7.0",
    lancamento: "2021-07-15",
    diretor: "Malcolm D. Lee",
    faixaEtaria: "L",
    descricao: "O superastro LeBron James se junta à gangue Looney Tunes para derrotar o Goon Squad e salvar seu filho.",
    linkImagem: "https://cdnim.prd.cineticket.com.br/asset/movie/7942/guardioes-da-galaxia-vol-3-poster-desktop-4965c.jpg"
  },
  {
    nome: "Um Lugar Silencioso - Parte II",
    nota: "7.9",
    lancamento: "2021-06-10",
    diretor: "John Krasinski",
    faixaEtaria: "14",
    descricao: "Logo após os acontecimentos mortais, até mesmo dentro de casa, a família Abbott precisa agora encarar o terror mundo afora, continuando a lutar para sobreviver em silêncio. Obrigados a se aventurar pelo desconhecido, eles rapidamente percebem que as criaturas que caçam pelo som não são as únicas ameaças que os observam pelo caminho de areia.",
    linkImagem: "https://cdnim.prd.cineticket.com.br/asset/movie/7942/guardioes-da-galaxia-vol-3-poster-desktop-4965c.jpg"
  },
]

function Movie() {
  const { user, isMovieFormOpen, setIsMovieFormOpen, setCurrentMovie } = useContext(AppContext);

  return (
    <div className={styles.container}>
      {isMovieFormOpen && <MovieForm />}

      <Header/>
      
      <div className={styles.propaganda}>

      {movies.map((movie, index) => (
        <a key={index} href="#/movieschedule" onClick={() => setCurrentMovie(movie)} className={styles.propagandaBox}>
          <img src={movie.linkImagem} className={styles.movieImage} alt="" />

          <p>Ver filme</p>
        </a>
      ))}

      {
        (user?.role === "manager" || user?.role === "employee") && (
          <a onClick={() => setIsMovieFormOpen(true)} className={styles.propagandaBox}>
            <div className={styles.fieldImageAdd}>
              <img className={styles.addImage} src="/add.png" alt="add" />
            </div>
          </a>
        )
      }

      </div>
      
      <Footer/>
      
    </div>
  )
}

export { Movie }

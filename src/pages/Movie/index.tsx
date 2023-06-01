import { useContext } from "react";
import styles from "./styles.module.scss"
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { MovieForm } from "../../components/MovieForm";
import { AppContext } from "../../context/AppContext";

export interface MovieProps {
  nome: string;
  nota: string;
  dataLancamento: string;
  diretor: string;
  faixaEtaria: string;
  sinopse: string;
  srcCapa: string;
}

function Movie() {
  const { user, isMovieFormOpen, setIsMovieFormOpen, setCurrentMovie, movies } = useContext(AppContext);

  return (
    <div className={styles.container}>
      {isMovieFormOpen && <MovieForm />}

      <Header/>
      
      <div className={styles.propaganda}>

        {movies.map((movie, index) => (
          <a key={index} href="#/movieschedule" onClick={() => setCurrentMovie(movie)} className={styles.propagandaBox}>
            <img
              src="/movieTestImage.png"
              className={styles.movieImage} alt="" />
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

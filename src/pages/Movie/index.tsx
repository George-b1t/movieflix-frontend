import { useContext } from "react";
import styles from "./styles.module.scss"
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { AppContext } from "../../context/AppContext";
import { SelectMovieForm } from "../../components/SelectMovieForm";

export interface MovieProps {
  id: string;
  nome: string;
  nota: string;
  dataLancamento: string;
  diretor: string;
  faixaEtaria: string;
  sinopse: string;
  srcCapa: string;
  dublado: boolean;
  catalogoId?: string;
}

function Movie() {
  const { user, isSelectMovieFormOpen, setIsSelectMovieFormOpen, setCurrentMovie, movies, removeCatalogo } = useContext(AppContext);

  return (
    <div className={styles.container}>
      {isSelectMovieFormOpen && <SelectMovieForm />}

      <Header/>
      
      <div className={styles.propaganda}>

        {movies.map((movie, index) => (
          <div className={styles.fieldImage}>
            {
              (user?.role === "manager" || user?.role === "func") && (
                <div className={styles.fieldImage}>
                  <button onClick={() => removeCatalogo(movie?.catalogoId || null)}>Remover</button>
                </div>
              )
            }

            <a key={index} href="#/movieschedule" onClick={() => setCurrentMovie(movie)} className={styles.propagandaBox}>
              <img
                src={movie.srcCapa}
                className={styles.movieImage} alt="" />
              <p>Ver filme</p>
            </a>
          </div>
        ))}

        {
          (user?.role === "manager" || user?.role === "func") && (
            <div className={styles.fieldImage}>
              <a onClick={() => setIsSelectMovieFormOpen(true)} className={styles.propagandaBox}>
                <div className={styles.fieldImageAdd}>
                  <img className={styles.addImage} src="/add.png" alt="add" />
                </div>
              </a>
            </div>
          )
        }

      </div>
      
      <Footer/>
      
    </div>
  )
}

export { Movie }

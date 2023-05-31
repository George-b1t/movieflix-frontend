import { useContext } from "react";
import styles from "./styles.module.scss"
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { MovieForm } from "../../components/MovieForm";
import { AppContext } from "../../context/AppContext";

function Movie() {
  const { isMovieFormOpen, setIsMovieFormOpen } = useContext(AppContext);

  return (
    <div className={styles.container}>
      {isMovieFormOpen && <MovieForm movie={null} />}

      <Header/>
      
      <div className={styles.propaganda}>

      {[1,1,1,1,1].map(() => (
        <a href="#/movieschedule" className={styles.propagandaBox}>
          <img src="/movieTestImage.png" alt="" />
          
          <div className={styles.buttonPropaganda}>
            <div className={styles.TextButtonPropaganda}>
              <p>Ver filme</p>
            </div>
          </div>
        </a>
      ))}

      <a onClick={() => setIsMovieFormOpen(true)} className={styles.propagandaBox}>
        <div className={styles.fieldImageAdd}>
          <img className={styles.addImage} src="/add.png" alt="add" />
        </div>
      </a>

      </div>
      
      <Footer/>
      
    </div>
  )
}

export { Movie }

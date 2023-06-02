import { useContext, useEffect } from "react";
import styles from "./styles.module.scss";
import { AppContext } from "../../context/AppContext";

function SelectMovieForm() {
  const { allMovies, setIsSelectMovieFormOpen, addCatalogo, getMovies, movies, getMoviesByFilial } = useContext(AppContext);

  useEffect(() => {
    getMovies();
    getMoviesByFilial();
  }, []);

  const moviesFiltered = allMovies.filter((item) => {
    return !movies.some((movie) => movie.id === item.id);
  });

  function handleClick(id: string) {
    addCatalogo(id);
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Filme</h1>

        <div className={styles.fieldOptions}>
          {moviesFiltered.map((item, index) => {
            return (
              <button onClick={() => handleClick(item.id)} key={index} className={styles.fieldOption}>
                {item.nome}
              </button>
            )
          })}

          <div className={styles.fieldButtons}>
            <input className={styles.closeButton} type="button" value="Fechar" onClick={() => setIsSelectMovieFormOpen(false)} />
            {/* <input type="button" value="Enviar" onClick={() => } /> */}
          </div>
        </div>
      </div>

    </div>
  )
}

export { SelectMovieForm }

import { useState, useContext } from "react";
import styles from "./styles.module.scss";
import { AppContext } from "../../context/AppContext";

function DataForm() {
  const {setIsDateFormOpen } = useContext(AppContext);

  const [ dataSession, setDataSession ] = useState("");
  const [ hourSession, setHourSession ] = useState("");

  function addMovieHandle() {
    const newSession = {
      
    };
    
    // saveMovie(newMovie);
  }


  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Sessão</h1>

        <div className={styles.fieldInputs}>
          <input type="date" name="lancamento" value={dataSession} onChange={e => setDataSession(e.target.value)} placeholder="Data da Sessão" />
          <input type="time" name="lancamento" value={hourSession} onChange={e => setHourSession(e.target.value)} placeholder="Hora da Sessão" />

          <div>
            <input className={styles.closeButton} type="button" value="Fechar" onClick={() => setIsDateFormOpen(false)} />
            <input type="button" value="Enviar" onClick={() => addMovieHandle()} />
          </div>
        </div>
      </div>

    </div>
  )
}

export { DataForm }

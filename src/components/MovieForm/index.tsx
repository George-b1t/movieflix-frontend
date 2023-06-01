import { useState, useContext } from "react";
import styles from "./styles.module.scss";
import { AppContext } from "../../context/AppContext";

function MovieForm() {
  const { setIsMovieFormOpen, currentMovie, updateMovie, saveMovie } = useContext(AppContext);

  const isEditing = !!currentMovie;

  const [ nome, setNome ] = useState(currentMovie?.nome || "");
  const [ nota, setNota ] = useState(currentMovie?.nota || "");
  const [ dataLancamento, setDataLancamento ] = useState(currentMovie?.dataLancamento || "");
  const [ diretor, setDiretor ] = useState(currentMovie?.diretor || "");
  const [ faixaEtaria, setFaixaEtaria ] = useState(currentMovie?.faixaEtaria || "");
  const [ sinopse, setSinopse ] = useState(currentMovie?.sinopse || "");

  function handleClick() {
    if (isEditing) {
      updateMovieHandle();
    } else {
      addMovieHandle();
    }
  }

  function addMovieHandle() {
    const newMovie = {
      id: "",
      nome,
      nota,
      dataLancamento,
      diretor,
      faixaEtaria,
      sinopse,
      srcCapa: "https://www.themoviedb.org/t/p/w220_and_h330_face/6MKr3KgOLmzOP6MSuZERO41Lpkt.jpg",
      dublado: false
    };
    
    saveMovie(newMovie);
  }

  function updateMovieHandle() {
    const updatedMovie = {
      id: isEditing ? currentMovie?.id : "",
      nome,
      nota,
      dataLancamento,
      diretor,
      faixaEtaria,
      sinopse,
      srcCapa: "https://www.themoviedb.org/t/p/w220_and_h330_face/6MKr3KgOLmzOP6MSuZERO41Lpkt.jpg",
      dublado: false,
    };

    updateMovie(updatedMovie);
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Filme</h1>

        <div className={styles.fieldInputs}>
          <input type="text" name="nome" value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome do filme" />
          <input type="text" name="nota" value={nota} onChange={e => setNota(e.target.value)} placeholder="Nota" />
          <input type="date" name="lancamento" value={dataLancamento} onChange={e => setDataLancamento(e.target.value)} placeholder="Data de Lançamento" />
          <input type="text" name="diretor" value={diretor} onChange={e => setDiretor(e.target.value)} placeholder="Diretor" />
          <input type="number" name="faixaEtaria" value={faixaEtaria} onChange={e => setFaixaEtaria(e.target.value)} placeholder="Faixa Etária" />
          <textarea name="descricao" value={sinopse} onChange={e => setSinopse(e.target.value)} placeholder="Descrição" />

          <div>
            <input className={styles.closeButton} type="button" value="Fechar" onClick={() => setIsMovieFormOpen(false)} />
            <input type="button" value="Enviar" onClick={() => handleClick()} />
          </div>
        </div>
      </div>

    </div>
  )
}

export { MovieForm }

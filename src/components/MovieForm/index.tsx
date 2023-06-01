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
  const [ srcCapa, setSrcCapa ] = useState(currentMovie?.srcCapa || "");
  const [ dublado, setDublado ] = useState(currentMovie?.dublado || false);

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
      dublado
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
      dublado,
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
          <input type="text" name="capa" value={srcCapa} onChange={e => setSrcCapa(e.target.value)} placeholder="Link imagem" />
          <textarea name="descricao" value={sinopse} onChange={e => setSinopse(e.target.value)} placeholder="Descrição" />
          <div className={styles.check}> 
            <input type="checkbox" name="dublado" checked={dublado} onChange={e => setDublado(e.target.checked)}/>
            <p>Dublado</p>
          </div>
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

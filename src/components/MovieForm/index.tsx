import { useState, useContext } from "react";
import styles from "./styles.module.scss";
import { AppContext } from "../../context/AppContext";

function MovieForm() {
  const { setIsMovieFormOpen, currentMovie } = useContext(AppContext);

  const [ nome, setNome ] = useState(currentMovie?.nome || "");
  const [ nota, setNota ] = useState(currentMovie?.nota || "");
  const [ lancamento, setLancamento ] = useState(currentMovie?.lancamento || "");
  const [ diretor, setDiretor ] = useState(currentMovie?.diretor || "");
  const [ faixaEtaria, setFaixaEtaria ] = useState(currentMovie?.faixaEtaria || "");
  const [ descricao, setDescricao ] = useState(currentMovie?.descricao || "");

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Filme</h1>

        <div className={styles.fieldInputs}>
          <input type="text" name="nome" value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome do filme" />
          <input type="text" name="nota" value={nota} onChange={e => setNota(e.target.value)} placeholder="Nota" />
          <input type="date" name="lancamento" value={lancamento} onChange={e => setLancamento(e.target.value)} placeholder="Data de Lançamento" />
          <input type="text" name="diretor" value={diretor} onChange={e => setDiretor(e.target.value)} placeholder="Diretor" />
          <input type="number" name="faixaEtaria" value={faixaEtaria} onChange={e => setFaixaEtaria(e.target.value)} placeholder="Faixa Etária" />
          <textarea name="descricao" value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Descrição" />

          <div>
            <input className={styles.closeButton} type="button" value="Fechar" onClick={() => setIsMovieFormOpen(false)} />
            <input type="button" value="Enviar" onClick={() => setIsMovieFormOpen(false)} />
          </div>
        </div>
      </div>

    </div>
  )
}

export { MovieForm }

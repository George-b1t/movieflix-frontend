import { useState, useContext } from "react";
import styles from "./styles.module.scss";
import { AppContext } from "../../context/AppContext";

interface Movie {
  nome: string;
  nota: string;
  lancamento: string;
  diretor: string;
  faixaEtaria: string;
  descricao: string;
}

interface MovieFormProps {
  movie: Movie | null;
}

function MovieForm({ movie }: MovieFormProps) {
  const { setIsMovieFormOpen } = useContext(AppContext);

  const [ nome, setNome ] = useState(movie?.nome || "");
  const [ nota, setNota ] = useState(movie?.nota || "");
  const [ lancamento, setLancamento ] = useState(movie?.lancamento || "");
  const [ diretor, setDiretor ] = useState(movie?.diretor || "");
  const [ faixaEtaria, setFaixaEtaria ] = useState(movie?.faixaEtaria || "");
  const [ descricao, setDescricao ] = useState(movie?.descricao || "");

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

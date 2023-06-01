import { useState, useContext } from "react";
import styles from "./styles.module.scss";
import { AppContext } from "../../context/AppContext";

interface Snack {
  nome: string;
  valor: string;
  descricao: string;
  imagem: string;
}

interface SnackFormProps {
  snack: Snack | null;
}

function SnackForm({ snack }: SnackFormProps) {
  const { setIsSnackFormOpen } = useContext(AppContext);

  const [ nome, setNome ] = useState(snack?.nome || "");
  const [ valor, setValor ] = useState(snack?.valor || "");
  const [ descricao, setDescricao ] = useState(snack?.descricao || "");
  const [ imagem, setImagem ] = useState(snack?.imagem || "");

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Produto</h1>

        <div className={styles.fieldInputs}>
          <input type="text" name="nome" value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome" />
          <input type="text" name="valor" value={valor} onChange={e => setValor(e.target.value)} placeholder="Valor" />
          <input type="text" name="imagem" value={imagem} onChange={e => setImagem(e.target.value)} placeholder="Link Imagem" />
          <textarea name="descricao" value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Descrição" />

          <div>
            <input className={styles.closeButton} type="button" value="Fechar" onClick={() => setIsSnackFormOpen(false)} />
            <input type="button" value="Enviar" onClick={() => setIsSnackFormOpen(false)} />
          </div>
        </div>
      </div>

    </div>
  )
}

export { SnackForm }

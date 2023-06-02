import { useState, useContext } from "react";
import styles from "./styles.module.scss";
import { AppContext } from "../../context/AppContext";

function SnackForm() {
  const { setIsSnackFormOpen, saveProduct, currentProduct, updateProduct } = useContext(AppContext);

  const isEditing = !!currentProduct;

  const [ nome, setNome ] = useState(currentProduct?.nome || "");
  const [ preco, setPreco ] = useState(currentProduct?.preco || "");
  const [ descricao, setDescricao ] = useState(currentProduct?.descricao || "");
  const [ imagem, setImagem ] = useState(currentProduct?.srcSnack || "");

  function handleClick() {
    if (isEditing) {
      updateSnackHandle();
    } else {
      addSnackHandle();
    }
  }

  function addSnackHandle() {
    const newProduct = {
      id: "",
      nome,
      preco: Number(preco),
      descricao,
      srcSnack: imagem,
    }
    
    saveProduct(newProduct);
  }

  function updateSnackHandle() {
    const updatedProduct = {
      id: isEditing ? currentProduct?.id : "",
      nome,
      preco: Number(preco),
      descricao,
      srcSnack: imagem,
    };

    updateProduct(updatedProduct);
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Produto</h1>

        <div className={styles.fieldInputs}>
          <input type="text" name="nome" value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome" />
          <input type="text" name="valor" value={preco} onChange={e => setPreco(e.target.value)} placeholder="Valor" />
          <input type="text" name="imagem" value={imagem} onChange={e => setImagem(e.target.value)} placeholder="Link Imagem" />
          <textarea name="descricao" value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Descrição" />

          <div>
            <input className={styles.closeButton} type="button" value="Fechar" onClick={() => setIsSnackFormOpen(false)} />
            <input type="button" value="Enviar" onClick={() => handleClick()} />
          </div>
        </div>
      </div>

    </div>
  )
}

export { SnackForm }

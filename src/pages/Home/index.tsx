import { useHistory } from "react-router-dom";
import styles from "./styles.module.scss"

function Home() {
  const navigate = useHistory();

  function goProducts() {
    navigate.push("/products");
  }

  return (
    <div className={styles.container}>
      <h1>Hello World</h1>
      <button
        onClick={goProducts}
      >
        Ir para Produtos
      </button>
    </div>
  )
}

export { Home }

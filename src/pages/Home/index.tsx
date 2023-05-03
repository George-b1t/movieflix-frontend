import { useHistory } from "react-router-dom";
import styles from "./styles.module.scss"
import { Header } from "../../components/Header";

function Home() {
  const navigate = useHistory();

  function goProducts() {
    navigate.push("/products");
  }

  return (
    <div className={styles.container}>
      <div className={styles.main_background}>
        {/* <img src="/background_home.png" alt="background" /> */}
      </div>

      <Header />

      <button
        onClick={goProducts}
        style={{ display: "none" }}
      >
        Ir para Produtos
      </button>
    </div>
  )
}

export { Home }

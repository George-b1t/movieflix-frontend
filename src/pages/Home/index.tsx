import { useHistory } from "react-router-dom";
import styles from "./styles.module.scss"
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

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

      {/* Nome do Filme */}
      <div className={styles.main_title}>
        <h1>Trem-Bala</h1>
      </div>

      {/* Botão de Comprar ingresso */}
      <div >
        <button className={styles.main_button}>
          Comprar Ingresso
        </button>
      </div>

      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>

      {/* Area De Propaganda */}
      <div className={styles.propagandas}>
        Propagandas
      </div>

    
      {/* filmes */}

      <div className={styles.filmes}>
        <div className={styles.filme}>
          
        </div>
        <div className={styles.filme}>
          
        </div>
      </div>


      <button
        onClick={goProducts}
        style={{ display: "none" }}
      >
        Ir para Produtos
      </button>


      <Footer></Footer>
    </div>
  )
}

export { Home }

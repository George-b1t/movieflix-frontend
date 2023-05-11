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
      <Header/>
      <div className={styles.tudo}>
        <div className={styles.title}>Trem-Bala</div>
        <div>
          {/* <Button label="Comprar Ingresso" icon="pi pi-shopping-cart" severity="warning" iconPos="right" rounded/> */}
        </div>
      </div>
      
      <div className={styles.propaganda}>

      <a href="#" className={styles.propagandaBox}>
        
        <div className={styles.buttonPropaganda}><div className={styles.TextButtonPropaganda}><p>Filmes</p></div></div>

      </a>

      <a href="#" className={styles.propagandaBox}>
        
        <div className={styles.buttonPropaganda}><div className={styles.TextButtonPropaganda}><p>Filmes</p></div></div>

      </a>

      <a href="#" className={styles.propagandaBox}>
        
        <div className={styles.buttonPropaganda}><div className={styles.TextButtonPropaganda}><p>Filmes</p></div></div>

      </a>

      <a href="#" className={styles.propagandaBox}>
        
        <div className={styles.buttonPropaganda}><div className={styles.TextButtonPropaganda}><p>Filmes</p></div></div>

      </a>

      <a href="#" className={styles.propagandaBox}>
        
        <div className={styles.buttonPropaganda}><div className={styles.TextButtonPropaganda}><p>Filmes</p></div></div>

      </a>

      <a href="#" className={styles.propagandaBox}>
        
        <div className={styles.buttonPropaganda}><div className={styles.TextButtonPropaganda}><p>Filmes</p></div></div>

      </a>



      </div>
      
      <Footer/>
      
    </div>
  )
}

export { Home }

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
      
      <div className={styles.propaganda}>

      {[1,1,1,1,1,].map(item => (
        <a href="#/movieschedule" className={styles.propagandaBox}>
          <img src="/movieTestImage.png" alt="" />
          
          <div className={styles.buttonPropaganda}><div className={styles.TextButtonPropaganda}><p>Ver filme</p></div></div>

        </a>
      ))}
      </div>
      
      <Footer/>
      
    </div>
  )
}

export { Home }

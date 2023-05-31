import { useHistory } from "react-router-dom";
import styles from "./styles.module.scss"
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

function Movie() {
  const navigate = useHistory();

  function goProducts() {
    navigate.push("/products");
  }

  return (
    <div className={styles.container}>
      <Header/>
      
      <div className={styles.propaganda}>

      {[1,1,1,1,1].map(item => (
        <a href="#/movieschedule" className={styles.propagandaBox}>
          <img src="/movieTestImage.png" alt="" />
          
          <div className={styles.buttonPropaganda}>
            <div className={styles.TextButtonPropaganda}>
              <p>Ver filme</p>
            </div>
          </div>
        </a>
      ))}

      <a href="#/movieschedule" className={styles.propagandaBox}>
        <div className={styles.fieldImageAdd}>
          <img className={styles.addImage} src="/add.png" alt="add" />
        </div>
      </a>

      </div>
      
      <Footer/>
      
    </div>
  )
}

export { Movie }

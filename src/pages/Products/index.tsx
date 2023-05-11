import { useHistory } from "react-router-dom"
import styles from "./styles.module.scss"
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

function Products() {
  const navigate = useHistory();

  function goHome() {
    navigate.push("/");
  }

  return (
    <div className={styles.container}>
      <Header/>
      <h1 className={styles.TitleSnack}>Snack Bar</h1>
      <div className="Tudo"></div>

      <Footer/>
    </div>
  )
}

export { Products }

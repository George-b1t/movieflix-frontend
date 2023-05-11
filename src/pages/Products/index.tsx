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
      <Header />
      <h1 className={styles.TitleSnack}>Snack Bar</h1>

      <div className={styles.Tudo}>

        <div className={styles.comboPopUp}>

          <div className={styles.insidePopUp}>

            <div className={styles.insideHalfPopUp}><img src="/combo_baldao.png" alt="" /></div>
            <div className={styles.insideHalfPopUp}></div>

          </div>
          <div className={styles.comboPopUpButton}></div>

        </div>

        <div className={styles.comboPopUp}>

          <div className={styles.comboPopUpButton}></div>

        </div>

      </div>

      <div className={styles.Tudo}>

        <div className={styles.comboPopUp}>

          <div className={styles.comboPopUpButton}></div>

        </div>
        <div className={styles.comboPopUp}>

          <div className={styles.comboPopUpButton}></div>

        </div>

      </div>

      <div className={styles.Tudo}>

        <div className={styles.comboPopUp}>

          <div className={styles.comboPopUpButton}></div>

        </div>
        <div className={styles.comboPopUp}>

          <div className={styles.comboPopUpButton}></div>

        </div>

      </div>

      <Footer />
    </div>
  )
}

export { Products }

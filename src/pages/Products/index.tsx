import { useHistory } from "react-router-dom"
import styles from "./styles.module.scss"

function Products() {
  const navigate = useHistory();

  function goHome() {
    navigate.push("/");
  }

  return (
    <div className={styles.container}>
      <h1>Página produtos</h1>
      <button
        onClick={goHome}
      >
        Ir para Home
      </button>
    </div>
  )
}

export { Products }

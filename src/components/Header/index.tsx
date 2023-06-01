import { useContext } from "react"

import styles from "./styles.module.scss"
import { AppContext } from "../../context/AppContext";

function Header() {
  const {
    setCurrentFilial,
    currentFilial,
    filiais,
    user
  } = useContext(AppContext);

  return (
    <div className={styles.container}>
      <a href="#/"><h1>MOVIEFLIX</h1></a>

      <nav>
        <p className={styles.selectFilial}>
          Local: {currentFilial?.nome}

          <div className={styles.listFiliais}>
            {filiais.map((filial) => (
              <p onClick={() => setCurrentFilial(filial)}>{filial.nome}</p>
            ))}
          </div>
        </p>
        <a href="/#/movies">Filmes</a>
        <a href="/#/products">Snacks</a>
        <a href="/#/cart">Carrinho</a>
      </nav>

      <a className={styles.login} href="/#/enter">{user ? user.name : "Entrar"}</a>
    </div>
  )
}

export { Header }

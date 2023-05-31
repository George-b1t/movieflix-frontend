import { useEffect, useContext } from "react"

import { api } from "../../services/api";
import styles from "./styles.module.scss"
import { AppContext } from "../../context/AppContext";

function Header() {
  const {
    setCurrentFilial,
    currentFilial,
    filiais,
    setFiliais,
    user
  } = useContext(AppContext);

  useEffect(() => {
    if (filiais.length > 0) return;

    api.get("/filial")
      .then(response => {
        setFiliais(response.data.content)
        setCurrentFilial(response.data.content[0].cidade)
      });
  }, [])

  return (
    <div className={styles.container}>
      <a href="#/"><h1>MOVIEFLIX</h1></a>

      <nav>
        <p className={styles.selectFilial}>
          Local: {currentFilial}

          <div className={styles.listFiliais}>
            {filiais.map((filial) => (
              <p onClick={() => setCurrentFilial(filial.cidade)}>{filial.cidade}</p>
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

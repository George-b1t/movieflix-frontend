import { useState, useEffect } from "react"

import { api } from "../../services/api";
import styles from "./styles.module.scss"

function Header() {
  const [ filiais, setFiliais ] = useState([]);

  const [ selectedFilial, setSelectedFilial ] = useState("");

  useEffect(() => {
    api.get("/filial")
      .then(response => {
        setFiliais(response.data.content)
        setSelectedFilial(response.data.content[0].cidade)
      });
  }, [])

  return (
    <div className={styles.container}>
      <a href="/"><h1>MOVIEFLIX</h1></a>

      <nav>
        <p className={styles.selectFilial}>
          Local: {selectedFilial}

          <div className={styles.listFiliais}>
            {filiais.map((filial: any) => (
              <p onClick={() => setSelectedFilial(filial.cidade)}>{filial.cidade}</p>
            ))}
          </div>
        </p>
        <a href="/#/movies">Filmes</a>
        <a href="/#/products">Snacks</a>
        <a href="/#/cart">Carrinho</a>
      </nav>

      <a className={styles.login} href="/#/enter">Entrar</a>
    </div>
  )
}

export { Header }

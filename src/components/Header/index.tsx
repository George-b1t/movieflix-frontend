import styles from "./styles.module.scss"

function Header() {
  return (
    <div className={styles.container}>
      <a href="/"><h1>MOVIEFLIX</h1></a>

      <nav>
        <a href="#">Local: Aracaju</a>
        <a href="#">Filmes</a>
        <a href="/#/products">Snacks</a>
        <a href="#">Carrinho</a>
      </nav>

      <a className={styles.login} href="#">Login</a>
    </div>
  )
}

export { Header }

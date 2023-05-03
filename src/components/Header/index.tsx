import styles from "./styles.module.scss"

function Header() {
  return (
    <div className={styles.container}>
      <h1>MOVIEFLIX</h1>

      <nav>
        <a href="#">Local: Aracaju</a>
        <a href="#">Filmes</a>
        <a href="#">Snacks</a>
      </nav>

      <a className={styles.login} href="#">Login</a>
    </div>
  )
}

export { Header }

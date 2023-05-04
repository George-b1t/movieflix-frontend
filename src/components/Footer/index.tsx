import styles from "./styles.module.scss"

function Footer() {
  return (
    <div className={styles.container}>
      <h1>MOVIEFLIX</h1>

    <nav>
        <a> Copyright @ 2023 Movieflix</a>
        <a>Termos de Uso</a>
        <a>Politica de Privacidade</a>
    </nav>
      
    </div>
  )
}

export { Footer }

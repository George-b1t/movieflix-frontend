import { useState } from "react";
import { Header } from "../../components/Header"
import styles from "./styles.module.scss"

function Enter() {
  const [ isRegister, setIsRegister ] = useState(false);

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.fieldOptions}>
        <h1>{isRegister ? "Cadastro" : "Login"}</h1>

        <input placeholder="Email" />
        <input placeholder="Senha" />
        <button>{isRegister ? "Criar conta" : "Entrar"}</button>
        <p>{isRegister ? "Já possui conta?" : "Não possui conta?"}
          <span onClick={() => setIsRegister(!isRegister)}>{isRegister ? " Entrar" : " Criar conta"}</span>
        </p>
      </div>
    </div>
  )
}

export { Enter }

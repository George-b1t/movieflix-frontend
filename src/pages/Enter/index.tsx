import { useState, useContext } from "react";
import { Header } from "../../components/Header"
import styles from "./styles.module.scss"
import { AppContext } from "../../context/AppContext";

function Enter() {
  const { setUser } = useContext(AppContext);

  const [ isRegister, setIsRegister ] = useState(false);

  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  function enter() {
    if (isRegister) return;

    setUser({
      name: "Teste",
      email
    })
  }

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.fieldOptions}>
        <h1>{isRegister ? "Cadastro" : "Login"}</h1>

        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Senha" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={() => enter()}>{isRegister ? "Criar conta" : "Entrar"}</button>
        <p>{isRegister ? "Já possui conta?" : "Não possui conta?"}
          <span onClick={() => setIsRegister(!isRegister)}>{isRegister ? " Entrar" : " Criar conta"}</span>
        </p>
      </div>
    </div>
  )
}

export { Enter }

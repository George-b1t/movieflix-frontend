import { useState, useContext, useEffect } from "react";
import { Header } from "../../components/Header"
import styles from "./styles.module.scss"
import { AppContext } from "../../context/AppContext";
import { api } from "../../services/api";
import { toast } from "react-toastify";

function Enter() {
  const { user, setUser, setCurrentFilial } = useContext(AppContext);

  const [ isRegister, setIsRegister ] = useState(false);

  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  useEffect(() => {
    if (user) {
      window.location.href = "/#/";
    }
  }, []);

  function enter() {
    if (isRegister) {
      api.post("/usuario", {
        nome: name,
        email,
        senha: password,
        dataNascimento: "2000-01-01",
        cpf: Math.random() * 10000000
      }).then(response => {
        toast.success("Conta criada com sucesso");
        setUser(response.data);
        window.location.href = "/#/profile";
      })

      return
    }

    api.post("/login", {
      email,
      senha: password
    }).then(response => {
      setUser({
        cpf: response.data.cpf,
        email: response.data.email,
        nome: response.data.nome,
        role: response.data.gerente ? "manager" : response.data.role,
        pontos: response.data.pontos,
      });

      if (response.data.role === "manager" || response.data.role === "func") {
        setCurrentFilial(response.data.filial);
        window.location.href = "/#/profileEmployee";
      }
      else window.location.href = "/#/profile";

      toast.success("Login realizado com sucesso");
    })
    .catch(err => {
      toast.error("Email ou senha incorretos");
    })
  }

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.fieldOptions}>
        <h1>{isRegister ? "Cadastro" : "Login"}</h1>

        {isRegister && <input placeholder="Nome" value={name} onChange={e => setName(e.target.value)} />}
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

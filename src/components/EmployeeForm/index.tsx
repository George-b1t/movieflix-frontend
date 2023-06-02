import { useState, useContext } from "react";
import styles from "./styles.module.scss";
import { AppContext } from "../../context/AppContext";

function EmployeeForm() {
  const { setIsEmployeeFormOpen, currentEmployee, saveEmployee } = useContext(AppContext);

  const [ nome, setNome ] = useState(currentEmployee?.nome || "");
	const [ email, setEmail ] = useState(currentEmployee?.email || "");
	const [ senha, setSenha ] = useState(currentEmployee?.senha || "");

  function handleSaveEmployee() {
    saveEmployee({
      nome,
      email,
      senha,
      gerente: false,
      salario: 4000,
      id: ""
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Funcionário</h1>

        <div className={styles.fieldInputs}>
          <input type="text" name="nome" value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome do funcionário" />
					<input type="text" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
					<input type="text" name="senha" value={senha} onChange={e => setSenha(e.target.value)} placeholder="Senha" />
         
          <div>
            <input className={styles.closeButton} type="button" value="Fechar" onClick={() => setIsEmployeeFormOpen(false)} />
            <input type="button" value="Enviar" onClick={() => handleSaveEmployee()} />
          </div>
        </div>
      </div>

    </div>
  )
}

export { EmployeeForm }

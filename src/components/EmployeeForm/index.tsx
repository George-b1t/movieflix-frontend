import { useState, useContext } from "react";
import styles from "./styles.module.scss";
import { AppContext } from "../../context/AppContext";

function EmployeeForm() {
  const { setIsEmployeeFormOpen, currentEmployee } = useContext(AppContext);

  const [ nome, setNome ] = useState(currentEmployee?.nome || "");
  const [ cargo, setCargo ] = useState(currentEmployee?.cargo || "");
	const [ email, setEmail ] = useState(currentEmployee?.email || "");
	const [ salario, setSalario ] = useState(currentEmployee?.salario || "");
	const [ senha, setSenha ] = useState(currentEmployee?.senha || "");

  
 
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Employee</h1>

        <div className={styles.fieldInputs}>
          <input type="text" name="nome" value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome do filme" />
					<input type="text" name="cargo" value={cargo} onChange={e => setCargo(e.target.value)} placeholder="Cargo" />
					<input type="text" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
					<input type="text" name="salario" value={salario} onChange={e => setSalario(e.target.value)} placeholder="Salário" />
					<input type="text" name="senha" value={senha} onChange={e => setSenha(e.target.value)} placeholder="Senha" />
         
          <div>
            <input className={styles.closeButton} type="button" value="Fechar" onClick={() => setIsEmployeeFormOpen(false)} />
            <input type="button" value="Enviar" onClick={() => setIsEmployeeFormOpen(false)} />
          </div>
        </div>
      </div>

    </div>
  )
}

export { EmployeeForm }

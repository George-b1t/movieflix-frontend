import styles from "./styles.module.scss"
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { EmployeeForm } from "../../components/EmployeeForm";
import { AppContext, Emploee } from "../../context/AppContext";
import { useContext, useEffect, useState } from "react";
import { api } from "../../services/api";

function Employee(){
    const { setIsEmployeeFormOpen, isEmployeeFormOpen, currentFilial } = useContext(AppContext);

    const [ funcionarios, setFuncionarios ] = useState<Emploee[]>([]);

    useEffect(() => {
        if (!currentFilial) return;

        api.get(`/funcionario/${currentFilial.id}`)
            .then(response => {
                setFuncionarios(response.data.content);
            })
    }, [])

    return (
            <div className={styles.container} >
                <Header />
                {isEmployeeFormOpen && <EmployeeForm />}

                <div className={styles.content}>
                    
                    <div className={styles.pageHeader}>

                        <h1 className={styles.title}> Funcionários </h1> 

                        <button onClick={() => setIsEmployeeFormOpen(true)} className={styles.buttonCadastrar}>Cadastrar</button>


                    </div>

                    <div className={styles.employeeTable}>
                        
                        <div className={styles.employeeHeader}> 

                        
                            
                            <p>ID</p>
                            <p>Nome</p>
                            <p>Cargo</p>
                            <p>Email</p>
                            <p>Senha</p>
                            <p>Editar</p>

                        </div>
                        
                        {funcionarios.map((item, index) => {
                            return (
                                <div className={styles.employeeBody}> 
                                    
                                    <p>{item.id}</p>
                                    <p>{item.nome}</p>
                                    <p>{item.gerente}</p>
                                    <p>{item.email}</p>
                                    <p>{item.senha}</p>
                                    <button>Editar</button>
                            
                                
                                </div>
                            )
                        }
                        )}


                    </div>

                </div>
        

                <Footer />
            </div>
        )



}

export {Employee}
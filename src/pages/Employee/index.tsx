import styles from "./styles.module.scss"
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { EmployeeForm } from "../../components/EmployeeForm";
import { AppContext, Emploee } from "../../context/AppContext";
import { useContext, useEffect } from "react";


function Employee(){
    const { user, setIsEmployeeFormOpen, isEmployeeFormOpen, currentFilial, getEmployeesByFilial, employees, setCurrentEmployee } = useContext(AppContext);

    useEffect(() => {
        if (!user || user.role !== "manager") {
            window.location.href = "/#/";
            return;
        }

        getEmployeesByFilial();
    }, [currentFilial])

    function editEmployee(employee: Emploee) {
        setIsEmployeeFormOpen(true);
        setCurrentEmployee(employee);
    }

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
                            <p>Email</p>

                        </div>
                        
                        {employees.filter(i => !i.gerente).map((item, index) => {
                            return (
                                <div className={styles.employeeBody}> 
                                    
                                    <p>{item.id}</p>
                                    <p>{item.nome}</p>
                                    <p>{item.email}</p>

                            
                                
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
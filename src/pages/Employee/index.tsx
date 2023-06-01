import styles from "./styles.module.scss"
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { EmployeeForm } from "../../components/EmployeeForm";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

function Employee(){

    const { setIsEmployeeFormOpen, isEmployeeFormOpen } = useContext(AppContext);
    const listafuncionarios = [
        {
            id: 1,
            nome: "João",
            cargo: "Gerente",
            email: "sfsf",
            senha: "123"
        },
        {
            id: 2,
            nome: "João",
            cargo: "Gerente",
            email: "sfsf",
            senha: "123"
        },
        {
            id: 3,
            nome: "João",
            cargo: "Gerente",
            email: "sfsf",
            senha: "123"
        },
        {
            id: 4,
            nome: "João",
            cargo: "Gerente",
            email: "sfsf",
            senha: "123"
        },
        {
            id: 5,
            nome: "João",
            cargo: "Gerente",
            email: "sfsf",
            senha: "123"
        },
        {
            id: 5,
            nome: "João",
            cargo: "Gerente",
            email: "sfsf",
            senha: "123"
        },
        {
            id: 5,
            nome: "João",
            cargo: "Gerente",
            email: "sfsf",
            senha: "123"
        },
        {
            id: 5,
            nome: "João",
            cargo: "Gerente",
            email: "sfsf",
            senha: "123"
        },
        {
            id: 5,
            nome: "João",
            cargo: "Gerente",
            email: "sfsf",
            senha: "123"
        },
        {
            id: 5,
            nome: "João",
            cargo: "Gerente",
            email: "sfsf",
            senha: "123"
        },
        {
            id: 5,
            nome: "João",
            cargo: "Gerente",
            email: "sfsf",
            senha: "123"
        },
        {
            id: 5,
            nome: "João",
            cargo: "Gerente",
            email: "sfsf",
            senha: "123"
        },
        {
            id: 5,
            nome: "João",
            cargo: "Gerente",
            email: "sfsf",
            senha: "123"
        },
        {
            id: 5,
            nome: "João",
            cargo: "Gerente",
            email: "sfsf",
            senha: "123"
        },
    ]


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
                        
                        {listafuncionarios.map((item, index) => {
                            return (
                                <div className={styles.employeeBody}> 
                                    
                                    <p>{item.id}</p>
                                    <p>{item.nome}</p>
                                    <p>{item.cargo}</p>
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
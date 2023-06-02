import { useContext, useEffect } from "react"
import styles from "./styles.module.scss"
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { AppContext } from "../../context/AppContext";

function Profile(){
    const { setUser, user } = useContext(AppContext);

    useEffect(() => {
        if (!user || user.role !== "user") {
            window.location.href = "/#/";
        }
    }, [])

    const listaDePedidos = [
        {
            id: 1,
            local: "São Paulo",
            data: "12/12/12",
            valor: "R$ 200,00"
        },
        {
            id: 2,
            local: "São Paulo",
            data: "12/12/12",
            valor: "R$ 200,00"
        },
        {
            id: 3,
            local: "São Paulo",
            data: "12/12/12",
            valor: "R$ 200,00"
        },
        {
            id: 4,
            local: "São Paulo",
            data: "12/12/12",
            valor: "R$ 200,00"
        },
        {
            id: 5,
            local: "São Paulo",
            data: "12/12/12",
            valor: "R$ 200,00"
        },
        {
            id: 5,
            local: "São Paulo",
            data: "12/12/12",
            valor: "R$ 200,00"
        },
        {
            id: 5,
            local: "São Paulo",
            data: "12/12/12",
            valor: "R$ 200,00"
        },
        {
            id: 5,
            local: "São Paulo",
            data: "12/12/12",
            valor: "R$ 200,00"
        },
        {
            id: 5,
            local: "São Paulo",
            data: "12/12/12",
            valor: "R$ 200,00"
        },
        {
            id: 5,
            local: "São Paulo",
            data: "12/12/12",
            valor: "R$ 200,00"
        },
    ]

    return (
            <div className={styles.container}>
                <Header />
                
                <div className={styles.profileTitle}> 
                    
                    
                    <h1 className={styles.profileName}>{user?.nome}</h1>


                    <a href="/#/" className={styles.buttonSair} onClick={() => setUser(null)}>Logout</a>
                
                </div>

                <div className={styles.content}>

                

                    


                    <div className={styles.profilePage}>

                        <h1 className={styles.profilePage}>Meus Pedidos</h1>

                        


                    </div>

                    <div className={styles.profileTable}>


                        <div className={styles.profileHeader}> 

                            
                                
                            <p>ID da Compra</p>
                            <p>Local</p>
                            <p>Data</p>
                            <p>Valor</p>

                        

                        </div>
                        

                         {listaDePedidos.map((item, index) => {
                            return (
                                <div className={styles.profileBody}> 
                                    
                                    <p>{item.id}</p>
                                    <p>{item.local}</p>
                                    <p>{item.data}</p>
                                    <p>{item.valor}</p>
                            
                                
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

export {Profile}
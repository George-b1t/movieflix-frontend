import { useContext, useEffect, useState } from "react"
import styles from "./styles.module.scss"
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { AppContext } from "../../context/AppContext";
import { api } from "../../services/api";

interface Pedido {
    id: string;
    data: string;
    value: number;
}

function Profile(){
    const { setUser, user } = useContext(AppContext);

    const [ compras, setCompras ] = useState([]);
    const [ reservas, setReservas ] = useState([]);

    const [ pedidos, setPedidos ] = useState<Pedido[]>([]);

    useEffect(() => {
        api.get("/compra")
            .then(response => {
                setCompras(response.data.content)

                api.get("/reserva?size=100000")
                    .then(response => {
                        setReservas(response.data.content)
                    }
                )
            }
        )
    }, [])

    useEffect(() => {
        const comprasList: any = [];

        compras.forEach((compra: any) => {
            if (compra.usuario.cpf === user?.cpf) {
                let value = 0;
                
                compra.produtosCompra.forEach((produto: any) => {
                    value += produto.preco;
                })

                comprasList.push({id: compra.id, data: new Date(compra.dataCompra).toLocaleDateString(), value});
            }
        })

        for (let i = 0; i < comprasList.length; i++) {
            const myReservas = reservas.filter((reserva: any) => reserva.compraId.id === comprasList[i].id);

            comprasList[i].value += myReservas.length * 20;
        }

        setPedidos(comprasList);
    }, [reservas])

    useEffect(() => {
        if (!user || user.role !== "user") {
            window.location.href = "/#/";
        }
    }, [])

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
                        

                         {pedidos.map((item, index) => {
                            return (
                                <div className={styles.profileBody}> 
                                    
                                    <p>{item.id}</p>
                                    <p>Aracaju</p>
                                    <p>{item.data}</p>
                                    <p>{item.value}</p>
                            
                                
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
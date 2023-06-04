import { useContext, useEffect, useState } from "react"
import styles from "./styles.module.scss"
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { AppContext } from "../../context/AppContext";
import { api } from "../../services/api";
import { ViewOrderForm } from "../../components/ViewOrder";

interface Pedido {
    id: string;
    data: string;
    value: number;
}

function Profile(){
    const { setUser, user, setIsViewOrderFormOpen, isViewOrderFormOpen, setCurrentOrder } = useContext(AppContext);

    const [ compras, setCompras ] = useState([]);
    const [ reservas, setReservas ] = useState([]);

    const [ pedidos, setPedidos ] = useState<Pedido[]>([]);

    useEffect(() => {
        api.get("/compra?size=100000")
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

                comprasList.push({
                    id: compra.id,
                    data: new Date(compra.dataCompra).toLocaleDateString(),
                    value,
                    produtos: compra.produtosCompra.map((item: any) => ({
                        nome: item.nome,
                        preco: item.preco,
                    })),
                    ingressos: []
                });
            }
        })

        for (let i = 0; i < comprasList.length; i++) {
            const myReservas = reservas.filter((reserva: any) => reserva.compraId.id === comprasList[i].id);

            comprasList[i].ingressos = myReservas.map((reserva: any) => ({
                nome: reserva.sessaoId.filmeId.nome,
                preco: 20,
                cadeira: reserva.cadeira,
            }));

            comprasList[i].value += myReservas.length * 20;
        }

        setPedidos(comprasList);
    }, [reservas])

    useEffect(() => {
        if (!user || user.role !== "user") {
            window.location.href = "/#/";
        }
    }, [])

    function openModal(item: any) {
        setIsViewOrderFormOpen(true);
        setCurrentOrder(item);
    }

    return (
        <div className={styles.container}>
            {isViewOrderFormOpen && <ViewOrderForm />}

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
                        <p>Ver Item</p>

                    

                    </div>
                    

                        {pedidos.map((item, index) => {
                        return (
                            <div key={index} className={styles.profileBody}> 
                                
                                <p>{item.id}</p>
                                <p>Aracaju</p>
                                <p>{item.data}</p>
                                <p>{item.value}</p>
                                <button onClick={() => openModal(item)}>Ver</button>
                            
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
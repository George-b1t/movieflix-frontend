import { useHistory } from "react-router-dom";
import styles from "./styles.module.scss"
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { useState } from "react";

function Cart(){
    const navigate = useHistory();

    const [isPaying, setIsPaying] = useState(false);
    const [items , setItems] = useState([
        {
            name: "Ingresso filme: guardiões da Galáxia",
            price: 20.00,
            quantity: 2
        },
        {
            name: "Combo Guardião",
            price: 50.00,
            quantity: 1
        }
    ]);

    function changeQuantity(index: number, quantity: number) {
        const newItems = [...items];
        newItems[index].quantity = quantity;
        setItems(newItems);
    }

    function goCart() {
        navigate.push("/cart");
    }

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.cart}>
            <div className={styles.carrinho}>
                
                    <section className={styles.itenscarrinho}>
                    <h2>Meu carrinho</h2>

                    {
                        items.map((item, index) => (
                            <article key={index}>
                                <p>{item.name}</p>
                                <div className={styles.quantidade}>
                                    <p>Qtd:</p>
                                    <input type="text" value={item.quantity} onChange={(e) => changeQuantity(index, Number(e.target.value))} />
                                </div>
                            </article>
                        ))
                    }
                    
                    </section>

                    <section className={styles.itensvalores}>

                    <h2>{isPaying ? "Pagamento" : "Valores"}</h2>

                    <article>
                        
                        {
                            isPaying ? (
                                <>
                                    <button className={styles.opcaoPagamento}>
                                        Pix
                                    </button>
                                    <button className={styles.opcaoPagamento}>
                                        Cartão de crédito
                                    </button>
                                </>
                            )
                            : (
                                <>
                                    {items.map((item, index) => (
                                        <>
                                            <div className={styles.itensingressos} key={index}>
                                                <h3>{item.name}</h3>
                                                <p>R$ {item.price * item.quantity}</p>
                                            </div>

                                            {index % 2 === 0 && <div className={styles.line} />}
                                        </>
                                    ))}
                                </>
                            )
                        }

                    </article>

                    {
                        !isPaying && <button className={styles.payButton} onClick={() => setIsPaying(true)}>Continuar</button>
                    }

                    </section>
            </div>

            </div>
            <Footer />
        </div>
    )



}

export {Cart}
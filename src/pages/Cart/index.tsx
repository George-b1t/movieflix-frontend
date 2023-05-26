import { useHistory } from "react-router-dom";
import styles from "./styles.module.scss"
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { useState } from "react";

function Cart(){
    const navigate = useHistory();

    const [isPaying, setIsPaying] = useState(false);

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

                    <article>
                        <p>Ingresso filme: guardiões da Galáxia</p>
                        <div className={styles.quantidade}>
                            <p>Qtd:</p>
                            <select value={2} name="" id="">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                    </article>

                    <article>
                        <p>Combo Guardião</p>
                        <div className={styles.quantidade}>
                            <p>Qtd:</p>
                            <select value={1} name="" id="">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                    </article>
                    
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
                                    <div className={styles.itensingressos}>
                                        <h3>Ingresso filme: guardiões da Galáxia</h3>
                                        <p>R$ 40,00</p>
                                    </div>

                                    <div className={styles.line}></div>

                                    <div className={styles.itensingressos}>
                                        <h3>Combo Guardião</h3>
                                        <p>R$ 50,00</p>
                                    </div>
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
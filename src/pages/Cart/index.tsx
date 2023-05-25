import { useHistory } from "react-router-dom";
import styles from "./styles.module.scss"
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

function Cart(){
    const navigate = useHistory();

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
                            <p>Ingresso filme: Guardiões da Galáxia</p>
                            <div className={styles.quantidade}>
                                <p>Qtd:</p>
                                <select name="" id="">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                        </article>

                        <article>
                            <p>Ingresso filme: Guardiões da Galáxia</p>
                            <div className={styles.quantidade}>
                                <p>Qtd:</p>
                                <select name="" id="">
                                <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                        </article>

                        <article>
                            <p>Ingresso filme: Guardiões da Galáxia</p>
                            <div className={styles.quantidade}>
                                <p>Qtd:</p>
                                <select name="" id="">
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

                        <h2>Valores</h2>

                        <article>
                            
                            <div className={styles.itensingressos}>
                                <h3>Ingresso filme: guardiões da Galáxia</h3>
                                <p>R$ 60,00</p>
                            </div>

                            <div className={styles.line}></div>

                            <div className={styles.itensingressos}>
                                <h3>Ingresso filme: guardiões da Galáxia</h3>
                                <p>R$ 60,00</p>
                            </div>

                            <div className={styles.line}></div>

                            <div className={styles.itensingressos}>
                                <h3>Ingresso filme: guardiões da Galáxia</h3>
                                <p>R$ 60,00</p>
                            </div>

                            <div className={styles.line}></div>

                            <div className={styles.itensingressos}>
                                <h3>Total</h3>
                                <p>R$ 180,00</p>
                            </div>

                        </article>

                        
                        <button>Continuar</button>

                     </section>
                </div>

                </div>
                <Footer />
            </div>
        )



}

export {Cart}
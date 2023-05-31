import styles from "./styles.module.scss"
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

function Home(){
    return (
            <div className={styles.container}>
                <Header />
                
                <div className={styles.box}> 
                
                    <p> Trem Bala </p>

                    <button className={styles.buyTicketButton}>Comprar Ingresso</button>

                </div>
                <Footer />
            </div>
        )



}

export {Home}
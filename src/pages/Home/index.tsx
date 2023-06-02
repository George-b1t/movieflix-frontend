import styles from "./styles.module.scss"
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

function Home(){
    return (
            <div className={styles.container}>
                <Header />
                
                <div className={styles.box}> 
                
                    <p> Batman</p>

                    <a href="#/movies "> <button className={styles.buyTicketButton}>Comprar Ingresso</button> </a>

                </div>
                <Footer />
            </div>
        )



}

export {Home}
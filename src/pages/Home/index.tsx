import { useHistory } from "react-router-dom";
import styles from "./styles.module.scss"
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

function Home(){
    const navigate = useHistory();

    function goMovie() {
        navigate.push("/movies");
    }

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
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
                  
                <div className={styles.ItensContainer}>a</div>
                <div className={styles.payContainer}>a</div>


                </div>
                <Footer />
            </div>
        )



}

export {Cart}